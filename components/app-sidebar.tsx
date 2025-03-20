"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BedDouble, LayoutDashboard, FlaskConical, Split, LifeBuoy, Settings } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Overview",
    url: "/overview",
    icon: LayoutDashboard,
  },
  {
    title: "Testcases",
    url: "/testcases",
    icon: FlaskConical,
  },
  {
    title: "Testbeds",
    url: "/testbeds",
    icon: BedDouble,
  },
  {
    title: "MCP",
    url: "/mcp",
    icon: Split,
  },
  {
    title: "Support",
    url: "/support",
    icon: LifeBuoy,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas" side="left">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg blue-shiny">Halidom</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
