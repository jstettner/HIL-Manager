"use client";

import React from "react";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type BreadcrumbItem = {
  name: string;
  link: string;
};

const routeMap: Record<string, BreadcrumbItem[]> = {
  "/dashboard$": [{ name: "Overview", link: "/dashboard" }],
  "/dashboard/overview$": [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Overview", link: "/dashboard/overview" },
  ],
  "/dashboard/changesets$": [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Changesets", link: "/dashboard/changesets" },
  ],
  "/dashboard/changesets/(.*)$": [
    { name: "Dashboard", link: "/dashboard" },
    { name: "Changesets", link: "/dashboard/changesets" },
    { name: "Details", link: "" }, // Will be populated with actual ID
  ],
  "/dashboard/testcases$": [
    { name: "Testcases", link: "/dashboard/testcases" },
    { name: "Library", link: "/dashboard/testcases" },
  ],
  "/dashboard/lab$": [
    { name: "Testcases", link: "/dashboard/testcases" },
    { name: "Lab", link: "/dashboard/lab" },
  ],
  "/dashboard/testbeds$": [
    { name: "Environments", link: "/dashboard/testbeds" },
    { name: "Armory", link: "/dashboard/testbeds" },
  ],
  "/dashboard/builder$": [
    { name: "Environments", link: "/dashboard/builder" },
    { name: "Builder", link: "/dashboard/builder" },
  ],
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

  if (!route) return null;

  // For dynamic routes with IDs, update the last item's link
  const breadcrumbs = [...route];
  if (child && breadcrumbs.length > 0) {
    const lastItem = breadcrumbs[breadcrumbs.length - 1];
    lastItem.link = `${pathname}`;
    lastItem.name = child;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <React.Fragment key={item.name}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{item.name}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={item.link}>{item.name}</BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
