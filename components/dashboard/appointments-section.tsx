"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Plus, ChevronLeft, ChevronRight, Video, MapPin } from "lucide-react"

const appointments = [
  {
    id: 1,
    patient: "John Smith",
    initials: "JS",
    doctor: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    time: "09:00 AM",
    duration: "30 min",
    type: "In-person",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Emily Davis",
    initials: "ED",
    doctor: "Dr. Michael Chen",
    specialty: "General Medicine",
    time: "10:30 AM",
    duration: "45 min",
    type: "Video Call",
    status: "Confirmed",
  },
  {
    id: 3,
    patient: "Robert Brown",
    initials: "RB",
    doctor: "Dr. Sarah Wilson",
    specialty: "Cardiology",
    time: "11:15 AM",
    duration: "30 min",
    type: "In-person",
    status: "Pending",
  },
  {
    id: 4,
    patient: "Sarah Williams",
    initials: "SW",
    doctor: "Dr. Jennifer Lee",
    specialty: "OB/GYN",
    time: "02:00 PM",
    duration: "60 min",
    type: "In-person",
    status: "Confirmed",
  },
  {
    id: 5,
    patient: "Michael Johnson",
    initials: "MJ",
    doctor: "Dr. David Park",
    specialty: "Neurology",
    time: "03:30 PM",
    duration: "45 min",
    type: "Video Call",
    status: "Confirmed",
  },
]

const statusColors: Record<string, string> = {
  Confirmed: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Pending: "bg-chart-4/10 text-chart-4 border-chart-4/20",
  Cancelled: "bg-destructive/10 text-destructive border-destructive/20",
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export function AppointmentsSection() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDay = firstDay.getDay()

    const days = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i)
    }
    return days
  }

  const days = getDaysInMonth(selectedDate)
  const currentDay = new Date().getDate()
  const isCurrentMonth =
    selectedDate.getMonth() === new Date().getMonth() &&
    selectedDate.getFullYear() === new Date().getFullYear()

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1))
  }

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1))
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Calendar */}
      <Card className="border-0 shadow-sm lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Calendar</CardTitle>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon" onClick={prevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="font-medium">
              {selectedDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <Button variant="ghost" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="text-xs font-medium text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {days.map((day, index) => (
              <button
                key={index}
                className={`
                  h-9 w-9 rounded-lg text-sm transition-colors mx-auto
                  ${day === null ? "" : "hover:bg-muted"}
                  ${isCurrentMonth && day === currentDay ? "bg-primary text-primary-foreground font-medium" : ""}
                  ${day && [5, 12, 17, 23].includes(day) ? "relative" : ""}
                `}
                disabled={day === null}
              >
                {day}
                {day && [5, 12, 17, 23].includes(day) && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Today's Appointments */}
      <Card className="border-0 shadow-sm lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">{"Today's Appointments"}</CardTitle>
              <p className="text-sm text-muted-foreground">March 17, 2026</p>
            </div>
          </div>
          <Button variant="outline">View All</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <Avatar className="h-11 w-11">
                  <AvatarImage src="" alt={appointment.patient} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {appointment.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{appointment.patient}</p>
                  <p className="text-sm text-muted-foreground">
                    {appointment.doctor} • {appointment.specialty}
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>
                    {appointment.time} ({appointment.duration})
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {appointment.type === "Video Call" ? (
                    <Video className="h-4 w-4" />
                  ) : (
                    <MapPin className="h-4 w-4" />
                  )}
                  <span>{appointment.type}</span>
                </div>
                <Badge variant="outline" className={statusColors[appointment.status]}>
                  {appointment.status}
                </Badge>
              </div>

              <div className="sm:hidden">
                <Badge variant="outline" className={statusColors[appointment.status]}>
                  {appointment.time}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
