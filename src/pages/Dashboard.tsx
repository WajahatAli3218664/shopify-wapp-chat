import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, Send, Clock, CheckCircle, Eye } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatsChart } from "@/components/ui/stats-chart";

const stats = [
  {
    title: "Messages Sent",
    value: "2,543",
    change: "+12.5%",
    icon: Send,
    color: "text-primary",
  },
  {
    title: "Delivered",
    value: "2,418",
    change: "+11.8%",
    icon: CheckCircle,
    color: "text-chart-2",
  },
  {
    title: "Read",
    value: "1,892",
    change: "+8.2%",
    icon: Eye,
    color: "text-chart-3",
  },
  {
    title: "Pending",
    value: "125",
    change: "-3.1%",
    icon: Clock,
    color: "text-orange-600",
  },
];

const chartData = [
  { date: "Mon", sent: 420, delivered: 398, read: 312 },
  { date: "Tue", sent: 380, delivered: 365, read: 285 },
  { date: "Wed", sent: 450, delivered: 428, read: 356 },
  { date: "Thu", sent: 410, delivered: 392, read: 320 },
  { date: "Fri", sent: 485, delivered: 461, read: 398 },
  { date: "Sat", sent: 320, delivered: 305, read: 245 },
  { date: "Sun", sent: 280, delivered: 269, read: 210 },
];

const recentActivity = [
  {
    template: "Order Confirmation",
    sent: "45 minutes ago",
    status: "Delivered",
    customer: "John Doe",
  },
  {
    template: "Shipping Update",
    sent: "1 hour ago",
    status: "Read",
    customer: "Jane Smith",
  },
  {
    template: "Abandoned Cart",
    sent: "2 hours ago",
    status: "Delivered",
    customer: "Mike Johnson",
  },
  {
    template: "Order Confirmation",
    sent: "3 hours ago",
    status: "Delivered",
    customer: "Sarah Williams",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your WhatsApp Business messaging activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.title} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={stat.change.startsWith("+") ? "text-green-600" : "text-red-600"}>
                    {stat.change}
                  </span>{" "}
                  from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Chart */}
        <StatsChart data={chartData} />

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest messages sent to customers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <MessageSquare className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{activity.template}</p>
                      <p className="text-sm text-muted-foreground">To: {activity.customer}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">{activity.status}</p>
                    <p className="text-xs text-muted-foreground">{activity.sent}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
