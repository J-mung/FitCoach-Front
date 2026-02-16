import React from "react";
import { LayoutShell } from "@src/layout";
import { Typography } from "@src/components";

export function ProfileScreen() {
  return (
    <LayoutShell title="Profile">
      <Typography variant="titleLg">Profile</Typography>
      <Typography variant="bodyMd" tone="secondary">
        프로필/설정 화면
      </Typography>
    </LayoutShell>
  );
}
