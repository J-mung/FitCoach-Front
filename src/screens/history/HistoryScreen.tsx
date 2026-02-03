import React from "react";
import { LayoutShell } from "@src/layout";
import { Typography } from "@src/components";

export function HistoryScreen() {
  return (
    <LayoutShell title="History">
      <Typography variant="titleLg">History</Typography>
      <Typography variant="bodyMd" tone="secondary">
        운동 기록 리스트 화면
      </Typography>
    </LayoutShell>
  );
}
