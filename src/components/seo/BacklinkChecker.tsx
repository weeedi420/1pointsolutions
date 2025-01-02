import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link2 } from "lucide-react";

const BacklinkChecker = () => {
  const [url, setUrl] = useState("");

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Backlink Checker</h2>
      <div className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter URL to check backlinks..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button>
            <Link2 className="mr-2 h-4 w-4" />
            Check Backlinks
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4">
            <h3 className="font-medium mb-2">Total Backlinks</h3>
            <p className="text-2xl font-bold">0</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Domain Authority</h3>
            <p className="text-2xl font-bold">N/A</p>
          </Card>
          <Card className="p-4">
            <h3 className="font-medium mb-2">Referring Domains</h3>
            <p className="text-2xl font-bold">0</p>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default BacklinkChecker;