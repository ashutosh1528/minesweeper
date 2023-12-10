import { RootState } from "@/app/redux/store";
import { useSelector } from "react-redux";

const Stats = () => {
  const totalBombs = useSelector((state: RootState) => state?.grid?.totalBombs);
  const totalFlagged = useSelector((state: RootState) => state?.grid?.totalFlagged);
  const { isEnded, isWin } = useSelector((state: RootState) => state?.grid?.gameStatus);
  const getGameStatus = () => {
    if (isEnded && isWin) {
      return "You Won !!";
    } else if (isEnded && !isWin) {
      return "Oops !!";
    } else {
      return "Game is running ...";
    }
  };
  return (
    <>
      <div className="grid__bombLabel">Bombs: {totalBombs - totalFlagged} </div>
      <div className="grid__bombLabel">{getGameStatus()}</div>
    </>
  );
};

export default Stats;
