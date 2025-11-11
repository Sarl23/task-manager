"use client";

import { Header as CarbonHeader, HeaderName } from "@carbon/react";

export function Header() {
  return (
    <CarbonHeader aria-label="Task Manager">
      <HeaderName href="/" prefix="">
        📋 Task Manager
      </HeaderName>
    </CarbonHeader>
  );
}
