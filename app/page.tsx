"use client"

import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar"
import { TopNavbar } from "@/components/dashboard/top-navbar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { PatientsTable } from "@/components/dashboard/patients-table"
import { AppointmentsSection } from "@/components/dashboard/appointments-section"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="lg:pl-64 transition-all duration-300">
        <TopNavbar
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />

        <main className="p-4 lg:p-6 space-y-6">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-balance">
                Hospital Dashboard
              </h1>
              <p className="text-muted-foreground">
                Welcome back, Dr. Wilson. Here is what is happening today.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Appointments Section */}
          <AppointmentsSection />

          {/* Patients Table */}
          <PatientsTable />
        </main>
      </div>
    </div>
  )
}
