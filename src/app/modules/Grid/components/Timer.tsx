import { useEffect, useState } from "react";

const Timer = () => {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSec(sec + 1);
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
