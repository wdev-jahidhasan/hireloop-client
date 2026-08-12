import React from 'react';
import { Card } from '@heroui/react';

export default function StatCard({ stats = [] }) {
  if (!stats.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <Card 
            key={item.id || index}
            className="bg-[#18181b] border border-[#27272a] shadow-sm rounded-xl p-2"
          >
            <Card.Content className="flex flex-col justify-between gap-6 p-4">
              {Icon && (
                <div className="w-10 h-10 rounded-lg bg-[#27272a] flex items-center justify-center text-zinc-300">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <Card.Description className="text-xs font-medium text-zinc-400 tracking-wide m-0">
                  {item.title}
                </Card.Description>

                <span className="text-2xl font-semibold text-white tracking-tight">
                  {item.value}
                </span>
              </div>
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
}