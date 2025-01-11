import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Chrome,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  MessageSquare,
  CreditCard,
} from "lucide-react";

export const IntegrationsSettings = () => {
  const { toast } = useToast();
  const [googleAnalyticsId, setGoogleAnalyticsId] = useState("");
  const [facebookPixelId, setFacebookPixelId] = useState("");
  const [zapierWebhook, setZapierWebhook] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveIntegrations = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('integrations')
        .upsert({
          user_id: user.id,
          google_analytics_id: googleAnalyticsId,
          facebook_pixel_id: facebookPixelId,
          zapier_webhook: zapierWebhook,
        });

      if (error) throw error;

      toast({
        title: "Success",
        description: "Integration settings saved successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const integrations = [
    {
      name: "Google Analytics",
      icon: Chrome,
      connected: !!googleAnalyticsId,
      input: {
        value: googleAnalyticsId,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setGoogleAnalyticsId(e.target.value),
        placeholder: "Enter Google Analytics ID",
      },
    },
    {
      name: "Facebook Pixel",
      icon: Facebook,
      connected: !!facebookPixelId,
      input: {
        value: facebookPixelId,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setFacebookPixelId(e.target.value),
        placeholder: "Enter Facebook Pixel ID",
      },
    },
    {
      name: "Zapier",
      icon: MessageSquare,
      connected: !!zapierWebhook,
      input: {
        value: zapierWebhook,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setZapierWebhook(e.target.value),
        placeholder: "Enter Zapier Webhook URL",
      },
    },
  ];

  const comingSoonIntegrations = [
    { name: "Twitter", icon: Twitter },
    { name: "Instagram", icon: Instagram },
    { name: "LinkedIn", icon: Linkedin },
    { name: "YouTube", icon: Youtube },
    { name: "Email Marketing", icon: Mail },
    { name: "Stripe", icon: CreditCard },
  ];

  return (
    <Card className="p-6">
      <form onSubmit={handleSaveIntegrations} className="space-y-6">
        <div className="space-y-6">
          {integrations.map((integration, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <integration.icon className="h-5 w-5" />
                <Label>{integration.name}</Label>
                {integration.connected && (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                    Connected
                  </span>
                )}
              </div>
              <Input
                value={integration.input.value}
                onChange={integration.input.onChange}
                placeholder={integration.input.placeholder}
              />
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-medium mb-4">Coming Soon</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {comingSoonIntegrations.map((integration, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg flex items-center gap-2 opacity-60 cursor-not-allowed"
              >
                <integration.icon className="h-5 w-5" />
                <span>{integration.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Integrations"}
        </Button>
      </form>
    </Card>
  );
};