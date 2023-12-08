"use client";
import Cell from "./components/Cell";
import "./styles/index.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Timer from "./components/Timer";

const Grid = () => {
  const grid = useSelector((state: RootState) => state.grid.gridCells);
  const totalBombs = useSelector((state: RootState) => state?.grid?.totalBombs);
  const totalFlagged = useSelector((state: RootState) => state?.grid?.totalFlagged);

  return (
    <div className="grid__container">
      <div className="grid__container__label">
        <div className="grid__timeLabel">
          Time: <Timer />
        </div>
        <div className="grid__bombLabel">Bombs: {totalBombs - totalFlagged} </div>
      </div>
      <div style={{ flex: 4 }}>
        {grid.map((rows, rowIndex) => {
          return (
            <div className="grid__container__row" key={`${rowIndex}-key`}>
              {rows.map((cell, colIndex) => (
                <Cell rowIndex={rowIndex} colIndex={colIndex} key={`${cell.id}-key`} />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
