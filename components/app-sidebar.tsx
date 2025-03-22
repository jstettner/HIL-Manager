"use client"

import * as React from "react"
import {
  LifeBuoy,
  Castle,
  Send,
  LayoutDashboard,
  FlaskConical,
  BedDouble,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "stet",
    email: "jack@halidom.ai",
    avatar: "/avatars/jack.jpg",
  },
  navMain: [
    {
      title: "Overview",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Changesets",
          url: "/changesets",
        },
      ]
    },
    {
      title: "Testcases",
      url: "#",
      icon: FlaskConical,
      isActive: true,
      items: [
        {
          title: "Library",
          url: "/testcases",
        },
        {
          title: "Lab",
          url: "/testcases",
        },
      ]
    },
    {
      title: "Testbeds",
      url: "#",
      icon: BedDouble,
      isActive: true,
      items: [
        {
          title: "Armory",
          url: "/testbeds",
        },
        {
          title: "Builder",
          url: "/testbeds",
        },
      ]
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="border-r"
      variant="inset"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="blue-shiny flex aspect-square size-8 items-center justify-center rounded-lg">
                  <Castle className="size-5 text-white" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">HalidomAI</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
