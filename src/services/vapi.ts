import Vapi from "@vapi-ai/web";

const VAPI_API_KEY = "3fa8e663-5960-4fb6-9637-ac96e864a340";

// Initialize Vapi client
export const vapiClient = new Vapi(VAPI_API_KEY);

export interface AssistantOptions {
  firstMessage?: string;
  model?: string;
  voice?: {
    provider: string;
    voiceId: string;
  };
  transcriber?: {
    provider: string;
    model: string;
    language: string;
  };
}

export const startWebCall = async (assistantId?: string, options?: AssistantOptions) => {
  try {
    if (assistantId) {
      await vapiClient.start(assistantId, options);
    } else {
      // If no assistantId provided, create a temporary assistant
      const defaultOptions: AssistantOptions = {
        firstMessage: "Hello! How can I help you today?",
        model: "gpt-4",
        voice: {
          provider: "11labs",
          voiceId: "rachel"
        },
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US"
        }
      };
      await vapiClient.start(defaultOptions);
    }
    return true;
  } catch (error) {
    console.error("Error starting web call:", error);
    throw error;
  }
};