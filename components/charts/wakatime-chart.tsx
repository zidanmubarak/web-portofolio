"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function WakatimeChart() {
  return (
    <Card className="bg-white/5 backdrop-blur-xl border border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Weekly Coding Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 flex items-center justify-center text-slate-400">
          Chart visualization would go here
        </div>
      </CardContent>
    </Card>
  );
}
