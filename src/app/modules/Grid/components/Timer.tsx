import { RootState } from "@/app/redux/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Timer = () => {
  const isEnded = useSelector((state: RootState) => state?.grid?.gameStatus.isEnded);
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isEnded) setSec(sec + 1);
    }, 1000);
    return () => clearInterval(timer);
  });

  const getDisplayTime = (seconds: number) => {
    const min = Math.floor(seconds / 60)?.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
    const remainSec = (seconds % 60)?.toLocaleString("en-US", { minimumIntegerDigits: 2, useGrouping: false });
    return `${min}:${remainSec}`;
  };

  return (
    <>
      <label>{getDisplayTime(sec)}</label>
    </>
  );
};

export default Timer;
