"use client";

import * as React from "react";
import {
  LifeBuoy,
  Heading,
  Send,
  LayoutDashboard,
  FlaskConical,
  GalleryVerticalEnd,
} from "lucide-react";

import { usePathname } from "next/navigation";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "stet",
    email: "jack@halidom.ai",
    avatar: "/avatars/jack.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/dashboard/overview",
        },
        {
          title: "Changesets",
          url: "/dashboard/changesets",
        },
      ],
    },
    {
      title: "Testcases",
      url: "#",
      icon: FlaskConical,
      isActive: true,
      items: [
        {
          title: "Library",
          url: "/dashboard/testcases",
        },
        {
          title: "Lab",
          url: "/dashboard/lab",
        },
      ],
    },
    {
      title: "Environments",
      url: "#",
      icon: GalleryVerticalEnd,
      isActive: true,
      items: [
        {
          title: "Armory",
          url: "/dashboard/testbeds",
        },
        {
          title: "Builder",
          url: "/dashboard/builder",
        },
      ],
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isVisible } = useSidebar();

  // Only display the sidebar if we are in the application.
  if (!isVisible) return null;
  return (
    <Sidebar className="border-r" variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div
                  className="flex aspect-square size-8 items-center justify-center rounded-lg"
                  style={{
                    background: `url('/images/square-grad.png')`,
                    backgroundSize: "cover",
                  }}
                >
                  <Heading className="size-5 text-white" />
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
  );
}
