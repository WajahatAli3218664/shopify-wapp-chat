import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { ContactsList, Contact } from "@/components/chat/ContactsList";
import { ChatWindow, Message } from "@/components/chat/ChatWindow";

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "John Doe",
    lastMessage: "Thank you so much!",
    timestamp: "2m ago",
    unread: 2,
    avatar: "JD",
  },
  {
    id: "2",
    name: "Jane Smith",
    lastMessage: "When will it arrive?",
    timestamp: "15m ago",
    unread: 0,
    avatar: "JS",
  },
  {
    id: "3",
    name: "Mike Johnson",
    lastMessage: "I'd like to place an order",
    timestamp: "1h ago",
    unread: 1,
    avatar: "MJ",
  },
  {
    id: "4",
    name: "Sarah Williams",
    lastMessage: "Perfect, thanks!",
    timestamp: "2h ago",
    unread: 0,
    avatar: "SW",
  },
  {
    id: "5",
    name: "Alex Brown",
    lastMessage: "Can I change my address?",
    timestamp: "3h ago",
    unread: 0,
    avatar: "AB",
  },
];

const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      text: "Hi! I'd like to know about my order status.",
      sender: "customer",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "2",
      text: "Hello! I'll check that for you right away. Can you provide your order number?",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
    {
      id: "3",
      text: "Sure, it's #12345",
      sender: "customer",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
    },
    {
      id: "4",
      text: "Thank you! Your order has been shipped and should arrive by tomorrow. Here's your tracking number: TRK123456789",
      sender: "user",
      timestamp: new Date(Date.now() - 1000 * 60 * 2),
    },
    {
      id: "5",
      text: "Perfect, thank you so much!",
      sender: "customer",
      timestamp: new Date(Date.now() - 1000 * 60 * 1),
    },
  ],
  "2": [
    {
      id: "1",
      text: "Hi, I ordered yesterday. When will it arrive?",
      sender: "customer",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
    },
  ],
  "3": [
    {
      id: "1",
      text: "Hello! I'd like to place an order for 3 items.",
      sender: "customer",
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
    },
  ],
};

export default function Chat() {
  const [selectedContact, setSelectedContact] = useState("1");
  const [messagesByContact, setMessagesByContact] = useState<Record<string, Message[]>>(initialMessages);

  const currentContact = mockContacts.find((c) => c.id === selectedContact);
  const currentMessages = messagesByContact[selectedContact] || [];

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessagesByContact((prev) => ({
      ...prev,
      [selectedContact]: [...(prev[selectedContact] || []), newMessage],
    }));

    // Simulate customer response
    setTimeout(() => {
      const autoReply: Message = {
        id: (Date.now() + 1).toString(),
        text: "Thanks for your message! This is a demo response.",
        sender: "customer",
        timestamp: new Date(),
      };
      setMessagesByContact((prev) => ({
        ...prev,
        [selectedContact]: [...(prev[selectedContact] || []), autoReply],
      }));
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Live Chat</h1>
          <p className="text-muted-foreground">WhatsApp-style messaging interface</p>
        </div>

        {/* Chat Container */}
        <div className="h-[calc(100vh-16rem)] flex rounded-lg overflow-hidden border border-border">
          {/* Left: Contacts List */}
          <div className="w-80 flex-shrink-0">
            <ContactsList
              contacts={mockContacts}
              selectedId={selectedContact}
              onSelect={setSelectedContact}
            />
          </div>

          {/* Right: Chat Window */}
          <div className="flex-1">
            {currentContact && (
              <ChatWindow
                contactName={currentContact.name}
                contactAvatar={currentContact.avatar}
                messages={currentMessages}
                onSendMessage={handleSendMessage}
              />
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
