
'use client'
import Grid from './modules/Grid/index';
import GridClass from './Grid.class';
import { useEffect, useState } from 'react';
import { setGrid } from './redux/grid.slice';
import { useDispatch } from 'react-redux';

export default function Home() {
  const grid = new GridClass();
  const dispatch = useDispatch();
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [bombs, setBombs] = useState(0);
  const [temp, setTemp] = useState(false);

  useEffect(() => {
    console.log('chasgg', grid.isGridInstanceValid());
  }, [grid.isGridInstanceValid()]);

  const handleInputChange = (key: 'rows' | 'cols' | 'bombs') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (key === 'bombs') setBombs(parseInt(e?.target?.value, 10));
    if (key === 'cols') setCols(parseInt(e?.target?.value, 10));
    if (key === 'rows') setRows(parseInt(e?.target?.value, 10));
  }

  const handleSetGrid = () => {
    const gridCells = grid.initializGrid(rows, cols, bombs);
    setTemp(!temp)
    dispatch(setGrid(gridCells));
  }
  
  if (grid.isGridInstanceValid()) {
    return (
      <main style={{ height: '100vh' }}>
        <div style={{ height: '100%', width: 'auto', background: '#192025' }}>
          <Grid />
        </div>
      </main>
    )
  }
  return (
    <div>
      <div>
        <label>Enter rows </label>
        <input placeholder='rows' value={rows} onChange={handleInputChange('rows')}/>
      </div>
      <div>
        <label>Enter columns </label>
        <input placeholder='columns' value={cols} onChange={handleInputChange('cols')}/>
      </div>
      <div>
        <label>Enter bombs </label>
        <input placeholder='bombs' value={bombs} onChange={handleInputChange('bombs')}/>
      </div>
      <button onClick={handleSetGrid}>Set Grid</button>
    </div>
  )
}
