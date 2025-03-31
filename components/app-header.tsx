"use client";

import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { NavigationMenuDemo } from "@/components/landing-nav";

export function AppHeader() {
  const { isVisible } = useSidebar();

  if (!isVisible) return <NavigationMenuDemo />;

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <BreadcrumbNav />
      </div>
    </header>
  );
}
