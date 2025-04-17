"use client";

import { Switch } from "@/components/ui/switch";
import { useSearchParams, useRouter } from "next/navigation";
import { useState, useCallback } from "react";

export default function QuerySwitch({
  queryKey,
  defaultChecked,
}: {
  queryKey: string;
  defaultChecked: boolean;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [enabled, setEnabled] = useState(() => {
    const queryValue = searchParams.get(queryKey);
    return queryValue === "true" || defaultChecked;
  });

  // Update URL when switch is toggled
  const handleChange = useCallback(
    (checked: boolean) => {
      setEnabled(checked);

      // Update URL without navigation
      const newParams = new URLSearchParams(searchParams.toString());
      if (checked) {
        newParams.set(queryKey, "true");
      } else {
        newParams.delete(queryKey);
      }

      const newUrl = `${window.location.pathname}?${newParams.toString()}`;
      router.replace(newUrl);
    },
    [searchParams, queryKey],
  );

  return (
    <Switch
      checked={enabled}
      onCheckedChange={handleChange}
      className="bg-gray-200 rounded-full relative data-[state=checked]:bg-white"
    />
  );
}
