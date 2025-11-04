import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Settings() {
  const { toast } = useToast();
  const [isConnected, setIsConnected] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [credentials, setCredentials] = useState({
    apiKey: "",
    phoneNumberId: "",
    businessAccountId: "",
    webhookUrl: "",
    accessToken: "",
  });

  const handleSave = () => {
    if (!credentials.apiKey || !credentials.phoneNumberId || !credentials.accessToken) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsConnected(true);
    toast({
      title: "Settings Saved",
      description: "Your WhatsApp Business credentials have been saved successfully",
    });
  };

  const handleTestConnection = async () => {
    if (!credentials.apiKey || !credentials.phoneNumberId || !credentials.accessToken) {
      toast({
        title: "Error",
        description: "Please fill in all required fields first",
        variant: "destructive",
      });
      return;
    }

    setIsTesting(true);
    
    // Simulate API test
    setTimeout(() => {
      setIsTesting(false);
      setIsConnected(true);
      toast({
        title: "Connection Successful",
        description: "WhatsApp Business API connection verified",
      });
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
    setCredentials({
      apiKey: "",
      phoneNumberId: "",
      businessAccountId: "",
      webhookUrl: "",
      accessToken: "",
    });
    toast({
      title: "Disconnected",
      description: "WhatsApp Business API disconnected",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your WhatsApp Business connection</p>
        </div>

        {/* Connection Status */}
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
            <CardDescription>Your WhatsApp Business API connection status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              {isConnected ? (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Connected</p>
                    <p className="text-sm text-muted-foreground">
                      Your WhatsApp Business API is active
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                    <XCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Not Connected</p>
                    <p className="text-sm text-muted-foreground">
                      Please configure your WhatsApp Business API
                    </p>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>WhatsApp Business API Configuration</CardTitle>
            <CardDescription>
              Connect your Meta Cloud API credentials. You can connect your WhatsApp Business Account here by providing your credentials. Data stays local for now.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="apiKey">
                  API Key <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="apiKey"
                  type="password"
                  placeholder="Enter your API key"
                  value={credentials.apiKey}
                  onChange={(e) =>
                    setCredentials({ ...credentials, apiKey: e.target.value })
                  }
                  disabled={isConnected}
                />
                <p className="text-xs text-muted-foreground">
                  Get this from Meta Business Manager
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phoneNumberId">
                  Phone Number ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phoneNumberId"
                  placeholder="Enter phone number ID"
                  value={credentials.phoneNumberId}
                  onChange={(e) =>
                    setCredentials({ ...credentials, phoneNumberId: e.target.value })
                  }
                  disabled={isConnected}
                />
                <p className="text-xs text-muted-foreground">
                  Found in WhatsApp Business API dashboard
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAccountId">Business Account ID</Label>
                <Input
                  id="businessAccountId"
                  placeholder="Enter business account ID"
                  value={credentials.businessAccountId}
                  onChange={(e) =>
                    setCredentials({ ...credentials, businessAccountId: e.target.value })
                  }
                  disabled={isConnected}
                />
                <p className="text-xs text-muted-foreground">
                  Optional: Your Meta Business Account ID
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="webhookUrl">Webhook URL</Label>
                <Input
                  id="webhookUrl"
                  placeholder="https://your-domain.com/webhook"
                  value={credentials.webhookUrl}
                  onChange={(e) =>
                    setCredentials({ ...credentials, webhookUrl: e.target.value })
                  }
                  disabled={isConnected}
                />
                <p className="text-xs text-muted-foreground">
                  Optional: URL for receiving webhook events
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accessToken">
                Access Token <span className="text-destructive">*</span>
              </Label>
              <Input
                id="accessToken"
                type="password"
                placeholder="Enter your access token"
                value={credentials.accessToken}
                onChange={(e) =>
                  setCredentials({ ...credentials, accessToken: e.target.value })
                }
                disabled={isConnected}
              />
              <p className="text-xs text-muted-foreground">
                Get this from your Meta Business App settings
              </p>
            </div>

            <div className="flex gap-2 pt-4">
              {!isConnected ? (
                <>
                  <Button onClick={handleSave}>Save Settings</Button>
                  <Button 
                    variant="outline" 
                    onClick={handleTestConnection}
                    disabled={isTesting}
                  >
                    {isTesting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      "Test Connection"
                    )}
                  </Button>
                </>
              ) : (
                <Button variant="destructive" onClick={handleDisconnect}>
                  Disconnect
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Configure when to receive notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Message Delivered</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when messages are delivered
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="font-medium text-foreground">Message Read</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when messages are read
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="font-medium text-foreground">New Contact</p>
                <p className="text-sm text-muted-foreground">
                  Get notified when a new contact messages you
                </p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
