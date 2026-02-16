import React from "react";
import { LayoutShell } from "@src/layout";
import { Typography } from "@src/components";

export function CoachScreen() {
  return (
    <LayoutShell title="AI Coach">
      <Typography variant="titleLg">AI Coach</Typography>
      <Typography variant="bodyMd" tone="secondary">
        코치 채팅 화면
      </Typography>
    </LayoutShell>
  );
}
