'use client';

import React, { useEffect, useState } from 'react';

const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

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
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const dayOfWeek = daysOfWeek[time.getDay()];
  const day = time.getDate();
  const month = months[time.getMonth()];
  const year = time.getFullYear();

  return (
    <div className="relative bg-blue-300 rounded-lg p-6 shadow-lg overflow-hidden h-[200px]">
      {/* Time and Date */}
      <div className="text-left z-20 relative">
        <h1 className="text-5xl font-bold text-gradientblue">{`${hours} : ${minutes} : ${seconds}`}</h1>
        <p className="text-2xl mt-2 text-gradientblue">{dayOfWeek}</p>

        <p className="text-lg mt-1 text-white">{`${day} ${month}, ${year}`}</p>
      </div>

      {/* SVG Vector 1 - Wrapped in a Div */}
      <div className="absolute bottom-0 right-0 h-[150px] w-1/2 ">
        <svg className="h-full w-full" viewBox="0 0 762 192" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M402.14 14.0833C587.211 -21.0881 719.16 17.8242 762 41.6769V192H0V89.2449C56.9338 78.8458 217.069 49.2548 402.14 14.0833Z" fill="url(#paint0_linear_1996_6726)" />
          <defs>
            <linearGradient id="paint0_linear_1996_6726" x1="762" y1="174.497" x2="192.561" y2="-192.192" gradientUnits="userSpaceOnUse">
              <stop stopColor="#004680" />
              <stop offset="1" stopColor="#00B5D0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* SVG Vector 2 - Wrapped in a Div */}
      <div className="absolute bottom-0 left-0 h-[100px] w-full ">
        <svg className="h-full w-full" viewBox="0 0 1439 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M679.578 11.0026C330.081 -16.4751 80.9022 13.9252 0 32.5601V150H1439V69.7226C1331.48 61.5983 1029.08 38.4803 679.578 11.0026Z" fill="url(#paint0_linear_1996_6730)" />
          <defs>
            <linearGradient id="paint0_linear_1996_6730" x1="0" y1="136.325" x2="444.443" y2="-555.476" gradientUnits="userSpaceOnUse">
              <stop stopColor="#004680" />
              <stop offset="1" stopColor="#00B5D0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export default ClockWidget;
