"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, MoreHorizontal, Plus, Filter } from "lucide-react"

const patients = [
  {
    id: "P001",
    name: "John Smith",
    avatar: "",
    initials: "JS",
    age: 45,
    gender: "Male",
    phone: "+1 (555) 234-5678",
    condition: "Diabetes Type 2",
    status: "Active",
    lastVisit: "Mar 15, 2026",
  },
  {
    id: "P002",
    name: "Emily Davis",
    avatar: "",
    initials: "ED",
    age: 32,
    gender: "Female",
    phone: "+1 (555) 345-6789",
    condition: "Hypertension",
    status: "Active",
    lastVisit: "Mar 14, 2026",
  },
  {
    id: "P003",
    name: "Michael Johnson",
    avatar: "",
    initials: "MJ",
    age: 58,
    gender: "Male",
    phone: "+1 (555) 456-7890",
    condition: "Cardiac Arrhythmia",
    status: "Critical",
    lastVisit: "Mar 17, 2026",
  },
  {
    id: "P004",
    name: "Sarah Williams",
    avatar: "",
    initials: "SW",
    age: 28,
    gender: "Female",
    phone: "+1 (555) 567-8901",
    condition: "Prenatal Care",
    status: "Active",
    lastVisit: "Mar 16, 2026",
  },
  {
    id: "P005",
    name: "Robert Brown",
    avatar: "",
    initials: "RB",
    age: 67,
    gender: "Male",
    phone: "+1 (555) 678-9012",
    condition: "Post-surgery Recovery",
    status: "Recovering",
    lastVisit: "Mar 12, 2026",
  },
]

const statusColors: Record<string, string> = {
  Active: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  Recovering: "bg-chart-4/10 text-chart-4 border-chart-4/20",
}

export function PatientsTable() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <CardTitle className="text-lg font-semibold">Patient Management</CardTitle>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search patients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 bg-secondary border-0"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Patient
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Patient</TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">ID</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">Age/Gender</TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">Condition</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold hidden xl:table-cell">Last Visit</TableHead>
                <TableHead className="font-semibold w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id} className="hover:bg-muted/30">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={patient.avatar} alt={patient.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {patient.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground sm:hidden">{patient.id}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-muted-foreground">
                    {patient.id}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground">
                    {patient.age} / {patient.gender}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">{patient.condition}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[patient.status]}>
                      {patient.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden xl:table-cell text-muted-foreground">
                    {patient.lastVisit}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Patient</DropdownMenuItem>
                        <DropdownMenuItem>Schedule Appointment</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
