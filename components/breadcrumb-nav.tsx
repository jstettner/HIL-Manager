"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeMap: Record<string, { title: string; parent?: string }> = {
  "/dashboard": { title: "Overview" },
  "/dashboard/overview": { title: "Overview", parent: "Dashboard" },
  "/dashboard/changesets": { title: "Changesets", parent: "Dashboard" },
  "/dashboard/testcases": { title: "Library", parent: "Testcases" },
  "/dashboard/lab": { title: "Lab", parent: "Testcases" },
  "/dashboard/testbeds": { title: "Armory", parent: "Environments " },
  "/dashboard/builder": { title: "Builder", parent: "Environments" },
};

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
