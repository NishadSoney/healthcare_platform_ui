import { Card, CardContent } from "@/components/ui/card"
import { Users, UserCog, Calendar, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

const stats = [
  {
    title: "Total Patients",
    value: "2,847",
    change: "+12.5%",
    trend: "up",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Active Doctors",
    value: "156",
    change: "+3.2%",
    trend: "up",
    icon: UserCog,
    color: "bg-accent/10 text-accent",
  },
  {
    title: "Appointments Today",
    value: "284",
    change: "-2.4%",
    trend: "down",
    icon: Calendar,
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    title: "Monthly Revenue",
    value: "$847,250",
    change: "+18.7%",
    trend: "up",
    icon: DollarSign,
    color: "bg-chart-4/10 text-chart-4",
  },
]

export function StatsCards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title} className="border-0 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold tracking-tight">{stat.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-sm">
              {stat.trend === "up" ? (
                <TrendingUp className="h-4 w-4 text-chart-3" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={stat.trend === "up" ? "text-chart-3" : "text-destructive"}>
                {stat.change}
              </span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
