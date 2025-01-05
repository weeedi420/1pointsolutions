import Vapi from "@vapi-ai/web";

const VAPI_API_KEY = "3fa8e663-5960-4fb6-9637-ac96e864a340";

// Initialize Vapi client
export const vapiClient = new Vapi(VAPI_API_KEY);

// Define types according to Vapi's documentation
type DeepgramTranscriberType = {
  provider: "deepgram";
  model: "nova-2";
  language: "en-US";
};

type VoiceType = {
  provider: "11labs";
  voiceId: string;
};

// Define the model types based on Vapi's documentation
type OpenAIModel = {
  provider: "openai";
  model: "gpt-4-turbo-preview" | "gpt-4" | "gpt-3.5-turbo";
};

type AnthropicModel = {
  provider: "anthropic";
  model: "claude-3-opus-20240229" | "claude-3-sonnet-20240229" | "claude-3-haiku-20240307";
};

type ModelType = OpenAIModel | AnthropicModel;

export interface AssistantOptions {
  firstMessage?: string;
  model?: ModelType;
  voice?: VoiceType;
  transcriber?: DeepgramTranscriberType;
}

export const startWebCall = async (assistantId?: string, options?: AssistantOptions) => {
  try {
    if (assistantId) {
      const assistantOverrides = {
        firstMessage: options?.firstMessage,
        model: {
          provider: "openai" as const,
          model: "gpt-4-turbo-preview" as const
        },
        voice: options?.voice,
        transcriber: {
          provider: "deepgram" as const,
          model: "nova-2" as const,
          language: "en-US" as const
        }
      };

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

export const purchasePhoneNumber = async (areaCode: string) => {
  try {
    // Using the correct Vapi API endpoint for phone number purchasing
    const response = await fetch(`https://api.vapi.ai/v1/phone/numbers`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        areaCode,
        capabilities: ["voice", "sms"] // Adding capabilities as required by the API
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to purchase number');
    }

    const data = await response.json();
    return data.phoneNumber;
  } catch (error) {
    console.error('Error purchasing number:', error);
    throw error;
  }
};

export const makeOutboundCall = async (phoneNumber: string) => {
  try {
    // Using the correct Vapi API endpoint for outbound calls
    const response = await fetch(`https://api.vapi.ai/v1/calls`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${VAPI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        to: phoneNumber,
        from: "default", // Using default caller ID
        assistantId: "default", // Using default assistant
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to initiate outbound call');
    }

    const data = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error making outbound call:', error);
    throw error;
  }
};