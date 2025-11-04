import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Edit, Trash2, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  title: string;
  message: string;
  variables: string[];
}

const initialTemplates: Template[] = [
  {
    id: "1",
    title: "Order Confirmation",
    message: "Hi {{customer_name}}! Your order {{order_id}} has been confirmed. Total: {{order_total}}. Thank you for shopping with us!",
    variables: ["customer_name", "order_id", "order_total"],
  },
  {
    id: "2",
    title: "Shipping Update",
    message: "Hello {{customer_name}}! Your order {{order_id}} has been shipped. Track it here: {{tracking_url}}",
    variables: ["customer_name", "order_id", "tracking_url"],
  },
  {
    id: "3",
    title: "Abandoned Cart",
    message: "Hi {{customer_name}}! You left items in your cart. Complete your order now: {{cart_url}}",
    variables: ["customer_name", "cart_url"],
  },
];

export default function Templates() {
  const { toast } = useToast();
  const [templates, setTemplates] = useState<Template[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", message: "" });
  const [previewData, setPreviewData] = useState<Record<string, string>>({});
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  // Load templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("whatsapp-templates");
    if (saved) {
      setTemplates(JSON.parse(saved));
    } else {
      setTemplates(initialTemplates);
      localStorage.setItem("whatsapp-templates", JSON.stringify(initialTemplates));
    }
  }, []);

  // Save templates to localStorage
  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem("whatsapp-templates", JSON.stringify(templates));
    }
  }, [templates]);

  const extractVariables = (message: string): string[] => {
    const matches = message.match(/{{(.*?)}}/g);
    return matches ? matches.map((m) => m.replace(/{{|}}/g, "")) : [];
  };

  const handleSave = () => {
    if (!formData.title || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newTemplate: Template = {
      id: Date.now().toString(),
      title: formData.title,
      message: formData.message,
      variables: extractVariables(formData.message),
    };

    setTemplates([...templates, newTemplate]);
    setFormData({ title: "", message: "" });
    setShowForm(false);
    toast({
      title: "Success",
      description: "Template created successfully",
    });
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    toast({
      title: "Deleted",
      description: "Template removed successfully",
    });
  };

  const handlePreview = (template: Template) => {
    setSelectedTemplate(template);
    const initialPreviewData: Record<string, string> = {};
    template.variables.forEach((variable) => {
      initialPreviewData[variable] = "";
    });
    setPreviewData(initialPreviewData);
  };

  const renderPreview = () => {
    if (!selectedTemplate) return selectedTemplate?.message;
    let preview = selectedTemplate.message;
    Object.entries(previewData).forEach(([key, value]) => {
      preview = preview.replace(new RegExp(`{{${key}}}`, "g"), value || `{{${key}}}`);
    });
    return preview;
  };

  const handleSendTest = () => {
    toast({
      title: "Test Message Sent",
      description: "Your test message has been sent successfully (mock)",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">Templates</h1>
            <p className="text-muted-foreground">Create and manage message templates</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="gap-2">
            <Plus className="h-4 w-4" />
            New Template
          </Button>
        </div>

        {/* Create Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle>Create New Template</CardTitle>
              <CardDescription>
                Use variables like {"{{customer_name}}"}, {"{{order_id}}"}, {"{{order_total}}"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Template Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Order Confirmation"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message Body</Label>
                <Textarea
                  id="message"
                  placeholder="Hi {{customer_name}}! Your order {{order_id}} has been confirmed..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSave}>Save Template</Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Preview Section */}
        {selectedTemplate && (
          <Card className="border-primary/50">
            <CardHeader>
              <CardTitle>Live Preview: {selectedTemplate.title}</CardTitle>
              <CardDescription>Fill in the variables to see the preview</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {selectedTemplate.variables.map((variable) => (
                  <div key={variable} className="space-y-2">
                    <Label htmlFor={variable}>{variable.replace(/_/g, " ")}</Label>
                    <Input
                      id={variable}
                      placeholder={`Enter ${variable.replace(/_/g, " ")}`}
                      value={previewData[variable] || ""}
                      onChange={(e) =>
                        setPreviewData({ ...previewData, [variable]: e.target.value })
                      }
                    />
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <Label>Preview</Label>
                <div className="rounded-lg bg-muted p-4 min-h-[80px]">
                  <p className="text-sm text-foreground whitespace-pre-wrap">{renderPreview()}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleSendTest} className="gap-2">
                  <Send className="h-4 w-4" />
                  Send Test Message
                </Button>
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Close Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Templates List */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="transition-all hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{template.title}</CardTitle>
                    <CardDescription className="mt-1">
                      {template.variables.length} variables
                    </CardDescription>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handlePreview(template)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleDelete(template.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground line-clamp-3">{template.message}</p>
                  <div className="flex flex-wrap gap-1">
                    {template.variables.map((variable) => (
                      <span
                        key={variable}
                        className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
                      >
                        {"{{" + variable + "}}"}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
