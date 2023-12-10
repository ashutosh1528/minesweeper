"use client";
import "./styles/index.scss";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Timer from "./components/Timer";
import { useState } from "react";
import Stats from "./components/Stats";
import Cell from "./components/Cell";

const Grid = () => {
  const gridColumns = useSelector((state: RootState) => state.grid.columns);
  const gridRows = useSelector((state: RootState) => state.grid.rows);
  const [grid] = useState(
    Array(gridRows)
      .fill(0)
      .map((_, rowIndex) =>
        Array(gridColumns)
          .fill(0)
          .map((_, colIndex) => <Cell rowIndex={rowIndex} colIndex={colIndex} key={`${rowIndex}-${colIndex}`} />)
      )
  );

  return (
    <div className="grid__container">
      <div className="grid__container__label">
        <div className="grid__timeLabel">
          Time: <Timer />
        </div>
        <Stats />
      </div>
      <div style={{ flex: 4 }}>
        {grid.map((rows, rowIndex) => {
          return (
            <div className="grid__container__row" key={`${rowIndex}-key`}>
              {rows.map((Comp) => {
                return Comp;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Grid;
