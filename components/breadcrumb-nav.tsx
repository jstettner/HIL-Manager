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

const routeMap: Record<
  string,
  { title: string; parent?: string; child?: string }
> = {
  "/dashboard$": { title: "Overview" },
  "/dashboard/overview$": { title: "Overview", parent: "Dashboard" },
  "/dashboard/changesets$": { title: "Changesets", parent: "Dashboard" },
  "/dashboard/changesets/(.*)$": { title: "Changeset", parent: "Dashboard" },
  "/dashboard/testcases$": { title: "Library", parent: "Testcases" },
  "/dashboard/lab$": { title: "Lab", parent: "Testcases" },
  "/dashboard/testbeds$": { title: "Armory", parent: "Environments " },
  "/dashboard/builder$": { title: "Builder", parent: "Environments" },
};

export function BreadcrumbNav() {
  const pathname = usePathname();

  let route_key = "";
  let child = "";
  for (const _route in routeMap) {
    const match = pathname.match(_route);
    if (match) {
      route_key = _route;
      child = match[1] || "";
    }
  }

  const route = routeMap[route_key];

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
        {child && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={child}>{child}</BreadcrumbLink>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
