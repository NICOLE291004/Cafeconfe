"use client";

import { Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ExportCsvButtonProps {
  filename: string;
  rows: Record<string, string | number>[];
}

function toCsv(rows: Record<string, string | number>[]): string {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (value: string | number) => `"${String(value).replace(/"/g, '""')}"`;
  const lines = [
    headers.map(escape).join(","),
    ...rows.map((row) => headers.map((h) => escape(row[h] ?? "")).join(",")),
  ];
  return lines.join("\n");
}

export function ExportCsvButton({ filename, rows }: ExportCsvButtonProps) {
  function handleExport() {
    const csv = toCsv(rows);
    const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Button variant="secondary" size="sm" onClick={handleExport} disabled={rows.length === 0}>
      <Download className="h-4 w-4" strokeWidth={1.5} />
      Exportar CSV
    </Button>
  );
}
