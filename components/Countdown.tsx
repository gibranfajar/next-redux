import React, { useEffect, useState } from "react";
import { parse, format } from "date-fns";

interface CountdownProps {
  targetDate: string; // format string yang akan diubah menjadi Date
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const [remainingTime, setRemainingTime] = useState<string>("");

  const formatDate = (dateString: string): string => {
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date()); // Parse format DD/MM/YYYY
    return format(parsedDate, "yyyy-MM-dd"); // Format ke YYYY-MM-DD
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(formatDate(targetDate)); // Mengonversi string targetDate menjadi Date
      const now = new Date();
      const difference = target.getTime() - now.getTime();

      if (difference <= 0) {
        setRemainingTime("Waktu telah habis!");
        return;
      }

      const days = Math.floor(difference / (1000 * 3600 * 24));

      setRemainingTime(`${days} Hari lagi`);
    };

    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);
  return <span className="text-xs">{remainingTime}</span>;
};

export default Countdown;
