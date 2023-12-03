'use client'
import { useSelector } from 'react-redux';
import '../styles/cell.scss';
import { RootState } from '@/app/redux/store';

const Cell = ({ rowIndex, colIndex }: { rowIndex: number, colIndex: number }) => {
    const { id, number, open } = useSelector((state: RootState) => state?.grid?.gridCells?.[rowIndex]?.[colIndex])
    const handleCellClick = () => {
        console.log(number, open, id)
    }

    const numberToColor = {
        '1': '#0000ff',
        '2': '#008100',
        '3': '#ff1300',
        '4': '#000083',
        '5': '#810500',
        '6': '#2a9494',
        '7': '#000000',
        '8': '#808080',
    };

    const getButton = () => {
        if (open) {
            return (
                <button className='cell__opened' style={{ color: numberToColor[number.toString() as keyof typeof numberToColor ]}} onClick={handleCellClick}>{number || ''}</button>
            )
        }
        return (
            <button className='cell__unOpened' onClick={handleCellClick}></button>
        )
    }
    return (
        <>
            {getButton()}
            {/* <button onClick={handleCellClick}>{getCellContent()}</button> */}
        </>
    )
}

export default Cell;