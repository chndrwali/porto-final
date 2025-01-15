'use client';

import React, { useEffect, useState } from 'react';
import { ClockIcon, Globe2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

interface TimeZoneData {
  name: string;
  timezone: string;
  flag: string;
}

const timeZones: TimeZoneData[] = [
  { name: 'Jakarta', timezone: 'Asia/Jakarta', flag: '🇮🇩' },
  { name: 'New York', timezone: 'America/New_York', flag: '🇺🇸' },
  { name: 'London', timezone: 'Europe/London', flag: '🇬🇧' },
];

const formatTimeForZone = (date: Date, timeZone: string) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone,
  }).format(date);
};

const ClockWidget: React.FC = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const hours = time.getHours().toString().padStart(2, '0');
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = Number(time.getSeconds().toString().padStart(2, '0'));
  const dayOfWeek = daysOfWeek[time.getDay()];
  const day = time.getDate();
  const month = months[time.getMonth()];
  const year = time.getFullYear();

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/25">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/25 via-transparent to-transparent transition-opacity" style={{ zIndex: 0 }} />
      <CardContent className="relative z-10 p-6">
        <div className="flex flex-col space-y-6">
          {/* Local Time Section */}
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-baseline space-x-2">
                <h2 className="text-4xl font-light tracking-tight lg:text-5xl">
                  {hours}
                  <span className="mx-1">:</span>
                  {minutes}
                </h2>
                <span className="text-2xl font-light text-muted-foreground transition-opacity" style={{ opacity: seconds % 2 ? 0.5 : 1 }}>
                  {time.getSeconds().toString().padStart(2, '0')}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-medium tracking-wide text-foreground/80">{dayOfWeek}</p>
                <p className="text-sm text-muted-foreground">
                  {day} {month}, {year}
                </p>
              </div>
            </div>
            <div className="rounded-full bg-primary/10 p-3 transition-colors group-hover:bg-primary/20">
              <ClockIcon className="h-6 w-6 text-primary" />
            </div>
          </div>

          {/* World Time Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Globe2 className="h-4 w-4" />
              <span>World Time</span>
            </div>
            <Separator className="bg-border/50" />
            <div className="grid gap-3">
              {timeZones.map((tz) => (
                <div key={tz.timezone} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{tz.flag}</span>
                    <span className="font-medium text-foreground/80">{tz.name}</span>
                  </div>
                  <span className="font-mono text-sm text-muted-foreground">{formatTimeForZone(time, tz.timezone)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <div
        className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-primary/50 to-primary/10"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black, transparent)',
          zIndex: 20,
        }}
      />
    </Card>
  );
};

export default ClockWidget;
