
'use client'
import Grid from './modules/Grid/index';
import { useState } from 'react';
import { initializeGrid } from './redux/grid.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';

export default function Home() {
  const dispatch = useDispatch();
  const grid = useSelector((state: RootState) => state.grid.gridCells);
  const [rows, setRows] = useState('');
  const [cols, setCols] = useState('');
  const [bombs, setBombs] = useState('');

  const handleInputChange = (key: 'rows' | 'cols' | 'bombs') => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (key === 'bombs') setBombs(e?.target?.value);
    if (key === 'cols') setCols(e?.target?.value);
    if (key === 'rows') setRows(e?.target?.value);
  }

  const handleSetGrid = () => {
    dispatch(initializeGrid({ columns: parseInt(cols, 10), rows: parseInt(rows, 10), totalBombs: parseInt(bombs, 10) }));
  }
  
  if (grid?.[0]?.[0]) {
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
