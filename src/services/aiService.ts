import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import type { Content, Part, FunctionDeclarationsTool } from '@google/generative-ai';

// --- Product API Types ---

interface ProductFromAPI {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice: number;
  brand: string;
  categoryName: string;
  isActive: boolean;
  imageUrl: string;
}

interface PaginatedProducts {
  items: ProductFromAPI[];
  totalCount: number;
}

// --- Tool Function: Fetch products from backend API ---

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://exe201-fit3dbe.onrender.com/api';

export async function getAvailableProducts(): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(`${API_BASE_URL}/products?size=50`);
    if (!response.ok) {
      return { error: `API returned status ${response.status}` };
    }
    const data: PaginatedProducts = await response.json();
    const products = data.items
      .filter((p) => p.isActive)
      .map((p) => ({
        name: p.name,
        description: p.description,
        price: p.price,
        salePrice: p.salePrice > 0 ? p.salePrice : null,
        brand: p.brand,
        category: p.categoryName,
      }));
    return {
      totalProducts: products.length,
      products,
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return { error: message };
  }
}

// --- Tool declarations for Gemini function calling ---

const toolDeclarations: FunctionDeclarationsTool[] = [
  {
    functionDeclarations: [
      {
        name: 'get_available_products',
        description:
          'Fetches the list of available clothing products from the Fitt3D store catalog. Returns product names, descriptions, prices, brands, and categories. Use this tool whenever the user asks for product recommendations, wants to browse what is available, or needs help picking an outfit from the store.',
        parameters: { type: SchemaType.OBJECT, properties: {} },
      },
    ],
  },
];

// Execute a tool by name
async function executeTool(name: string): Promise<Record<string, unknown>> {
  switch (name) {
    case 'get_available_products':
      return await getAvailableProducts();
    default:
      return { error: `Unknown tool: ${name}` };
  }
}

// --- Chat Message Types ---

export interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

// --- Clothing Context Types ---

export interface ClothingItem {
  id: number;
  name: string;
  price: number;
  colors: string[];
}

export interface UserProfile {
  gender: string;
  height: number;
  weight: number;
  bodyType: string;
}

export interface ClothingContext {
  availableItems: ClothingItem[];
  selectedItems: string[];
  userProfile: UserProfile;
}

// --- AI Chat Service ---

const SYSTEM_INSTRUCTION = `You are Fitt3D's AI Styling Assistant — a friendly, knowledgeable fashion advisor integrated into a 3D virtual try-on experience.

Your role is to help users find the perfect outfit by suggesting clothing combinations, offering styling tips, and giving personalized fashion advice based on their body profile and current selections.

You have access to a tool called get_available_products that fetches real product data from the Fitt3D store. USE THIS TOOL whenever:
- The user asks what products are available
- The user wants outfit recommendations or suggestions
- The user asks about specific clothing categories, brands, or price ranges
- You need to reference actual products by name to make a recommendation

You will also receive context about:
- The user's body profile (gender, height, weight, body type)
- Items the user currently has selected to try on

Guidelines:
1. Always call get_available_products to fetch real store inventory before suggesting items — do NOT make up product names.
2. Suggest specific items from the fetched catalog, referencing them by name and price.
3. Consider the user's body type, gender, and proportions when making suggestions.
4. Offer advice on color coordination, layering, and occasion-appropriate styling.
5. Be encouraging, positive, and fashion-forward in your responses.
6. When asked about occasions (date night, work, casual, etc.), suggest complete outfits from the fetched catalog.
7. Keep responses concise and actionable — suggest 2-3 items at a time rather than overwhelming lists.
8. If the user has items selected, comment on their current choices and suggest complementary pieces.
9. Use fashion terminology naturally but keep explanations accessible.`;

export class AIChatService {
  private genAI: GoogleGenerativeAI;
  private history: Content[];
  private clothingContext: ClothingContext | null;

  constructor(apiKey: string) {
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.history = [];
    this.clothingContext = null;
  }

  setClothingContext(context: ClothingContext): void {
    this.clothingContext = context;
  }

  clearHistory(): void {
    this.history = [];
  }

  private buildContextPrefix(): string {
    if (!this.clothingContext) return '';

    const { availableItems, selectedItems, userProfile } = this.clothingContext;

    const catalogList = availableItems
      .map((item) => `- ${item.name} ($${item.price})`)
      .join('\n');

    const selectedNames = selectedItems
      .map((id) => {
        const item = availableItems.find((i) => i.id.toString() === id);
        return item ? item.name : null;
      })
      .filter(Boolean);

    const selectedText =
      selectedNames.length > 0
        ? `Currently trying on: ${selectedNames.join(', ')}`
        : 'No items currently selected.';

    return `[CONTEXT]
User Profile: ${userProfile.gender}, ${userProfile.height}cm, ${userProfile.weight}kg, ${userProfile.bodyType} build.
${selectedText}
Available catalog:
${catalogList}
[END CONTEXT]

`;
  }

  async sendMessage(userMessage: string): Promise<string> {
    const model = this.genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: toolDeclarations,
    });

    const contextPrefix = this.buildContextPrefix();
    const fullMessage = contextPrefix + userMessage;

    // Add user message to history
    this.history.push({
      role: 'user',
      parts: [{ text: fullMessage }],
    });

    const chat = model.startChat({
      history: this.history.slice(0, -1),
    });

    let response = await chat.sendMessage(fullMessage);
    let result = response.response;

    // Handle function calling loop (Google ADK pattern)
    while (result.candidates?.[0]?.content?.parts?.some((p: Part) => 'functionCall' in p)) {
      const functionCallParts = result.candidates![0].content.parts.filter(
        (p: Part) => 'functionCall' in p
      );

      const functionResponses: Part[] = [];

      for (const part of functionCallParts) {
        if ('functionCall' in part && part.functionCall) {
          const toolName = part.functionCall.name;
          const toolResult = await executeTool(toolName);
          functionResponses.push({
            functionResponse: {
              name: toolName,
              response: toolResult,
            },
          });
        }
      }

      // Send function results back to the model
      response = await chat.sendMessage(functionResponses);
      result = response.response;
    }

    const assistantText = result.text() || 'Sorry, I could not generate a response.';

    // Update history with the full conversation
    this.history = await chat.getHistory();

    return assistantText;
  }
}

// Singleton instance
let chatServiceInstance: AIChatService | null = null;

export function getChatService(): AIChatService {
  if (!chatServiceInstance) {
    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY || '';
    if (!apiKey) {
      throw new Error('VITE_GOOGLE_API_KEY environment variable is not set. Please add it to your .env file.');
    }
    chatServiceInstance = new AIChatService(apiKey);
  }
  return chatServiceInstance;
}

export function resetChatService(): void {
  chatServiceInstance = null;
}
