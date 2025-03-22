'use client'

import { usePathname } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const routeMap: Record<string, { title: string, parent?: string }> = {
  "/": { title: "Overview" },
  "/dashboard": { title: "Dashboard", parent: "Overview" },
  "/testcases": { title: "Library", parent: "Testcases" },
  "/testbeds": { title: "Armory", parent: "Testbeds" },
  "/mcp": { title: "MCP", parent: "Overview" },
  "/support": { title: "Support", parent: "Overview" },
  "/settings": { title: "Settings", parent: "Overview" }
}

export function BreadcrumbNav() {
  const pathname = usePathname();
  const route = routeMap[pathname];
  
  if (!route) return null;
  
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {route.parent && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">{route.parent}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}
        <BreadcrumbItem>
          <BreadcrumbPage>{route.title}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
