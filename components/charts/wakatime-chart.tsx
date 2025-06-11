"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function WakatimeChart() {
  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-sm">
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