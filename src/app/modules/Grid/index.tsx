'use client'
import Cell from './components/Cell';
import GridClass from '../../Grid.class';
import './styles/index.scss';

const Grid = () => {
    const gridC = new GridClass();
    return (
        <div className='grid__container'>
            {gridC.getGrid().map((rows, rowIndex) => {
                return (
                    <div className='grid__container__row'>
                        {rows.map((cell, colIndex) => <Cell rowIndex={rowIndex} colIndex={colIndex } key={`${cell.id}-key`} />)}
                    </div>
                )
            })}
        </div>
    )
}

export default Grid;