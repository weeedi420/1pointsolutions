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

// Define the model types based on Vapi's latest supported models
type OpenAIModel = {
  provider: "openai";
  model: "gpt-4-turbo-preview" | "gpt-4" | "gpt-3.5-turbo";
};

type AnthropicModel = {
  provider: "anthropic";
  model: "claude-3-opus-20240229" | "claude-3-sonnet-20240229" | "claude-3-haiku-20240307" | "claude-3-5-sonnet-20240620";
};

type ModelType = OpenAIModel | AnthropicModel;

export interface AssistantOptions {
  firstMessage?: string;
  model?: ModelType;
  voice?: VoiceType;
  transcriber?: DeepgramTranscriberType;
}

export interface Call {
  id: string;
  status: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export const startWebCall = async (assistantId?: string, options?: AssistantOptions) => {
  try {
    if (assistantId) {
      const assistantOverrides = options ? {
        firstMessage: options.firstMessage,
        model: options.model || {
          provider: "openai" as const,
          model: "gpt-4-turbo-preview" as const
        },
        voice: options.voice,
        transcriber: {
          provider: "deepgram" as const,
          model: "nova-2" as const,
          language: "en-US" as const,
        },
      } : undefined;

      await vapiClient.start(assistantId, assistantOverrides);
    } else {
      const defaultOptions = {
        firstMessage: "Hello! How can I help you today?",
        model: {
          provider: "openai" as const,
          model: "gpt-4-turbo-preview" as const
        },
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