import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export const AdsGuide = () => {
  return (
    <Card className="p-6 mb-6">
      <h2 className="text-xl font-semibold mb-4">Getting Started Guide</h2>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="setup">
          <AccordionTrigger>Initial Setup Requirements</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">1. Google Ads Account Setup</h3>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Create a Google Ads account if you haven't already</li>
                  <li>Set up billing information</li>
                  <li>Create at least one campaign</li>
                  <li>
                    <a
                      href="https://ads.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      Go to Google Ads
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">2. API Access Configuration</h3>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Create a Google Cloud Project</li>
                  <li>Enable the Google Ads API</li>
                  <li>Set up a service account</li>
                  <li>Download your service account key (JSON)</li>
                  <li>
                    <a
                      href="https://console.cloud.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center"
                    >
                      Go to Google Cloud Console
                      <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="optimizer">
          <AccordionTrigger>Using the Campaign Performance Analyzer</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Steps to Analyze Campaigns:</h3>
                <ol className="list-decimal pl-6 mt-2 space-y-2">
                  <li>Click "Connect with Service Account" to import your campaign data</li>
                  <li>Enter your service account credentials in the settings panel</li>
                  <li>Select the metric you want to optimize (e.g., conversions, CTR)</li>
                  <li>Review your campaign data in the text area</li>
                  <li>Click "Get Recommendations" to receive AI-powered optimization suggestions</li>
                </ol>
              </div>
              <div>
                <h3 className="font-medium">Tips:</h3>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Keep your service account key secure and never share it</li>
                  <li>Update your campaign data regularly for the best recommendations</li>
                  <li>Try different optimization metrics to get varied insights</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="local-services">
          <AccordionTrigger>Managing Local Services Ads</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Setup Instructions:</h3>
                <ol className="list-decimal pl-6 mt-2 space-y-2">
                  <li>Ensure you have a Google Local Services account</li>
                  <li>Click "Connect Local Services Ads"</li>
                  <li>Enter your API key and account ID in the settings</li>
                  <li>View your performance metrics and AI recommendations</li>
                </ol>
              </div>
              <div>
                <h3 className="font-medium">Key Features:</h3>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Real-time performance metrics</li>
                  <li>AI-powered optimization suggestions</li>
                  <li>Lead quality analysis</li>
                  <li>Cost tracking and optimization</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="troubleshooting">
          <AccordionTrigger>Troubleshooting Common Issues</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Connection Issues:</h3>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Verify your service account key is valid and not expired</li>
                  <li>Ensure your account has the necessary permissions</li>
                  <li>Check if the API is enabled in your Google Cloud Console</li>
                  <li>Verify your client customer ID is correct</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Data Import Problems:</h3>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Confirm your campaign data format is correct</li>
                  <li>Check your internet connection</li>
                  <li>Try refreshing the page and reimporting</li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};