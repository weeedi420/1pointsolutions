import Vapi from "@vapi-ai/web";

const VAPI_API_KEY = "3fa8e663-5960-4fb6-9637-ac96e864a340";

// Initialize Vapi client
export const vapiClient = new Vapi(VAPI_API_KEY);

type DeepgramTranscriberType = {
  provider: "deepgram";
  model: "nova-2";
  language: "en-US";
};

type VoiceType = {
  provider: "11labs";
  voiceId: string;
};

export interface AssistantOptions {
  firstMessage?: string;
  model?: string;
  voice?: VoiceType;
  transcriber?: DeepgramTranscriberType;
}

export const startWebCall = async (assistantId?: string, options?: AssistantOptions) => {
  try {
    if (assistantId) {
      const assistantOverrides = options ? {
        firstMessage: options.firstMessage,
        model: options.model,
        voice: options.voice,
        transcriber: {
          provider: "deepgram" as const,
          model: "nova-2" as const,
          language: "en-US" as const,
        },
      } : undefined;

      await vapiClient.start(assistantId, assistantOverrides);
    } else {
      // If no assistantId provided, create a temporary assistant
      const defaultOptions = {
        firstMessage: "Hello! How can I help you today?",
        model: "gpt-4",
        voice: {
          provider: "11labs" as const,
          voiceId: "rachel"
        },
        transcriber: {
          provider: "deepgram" as const,
          model: "nova-2" as const,
          language: "en-US" as const
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