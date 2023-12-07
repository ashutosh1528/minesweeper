'use client'
import { useDispatch, useSelector } from 'react-redux';
import '../styles/cell.scss';
import { RootState } from '@/app/redux/store';
import { handleCellOpen, handleCellDoubleClick, handleCellFlagging, handleCellDeFlagging } from '@/app/redux/grid.slice';

const Cell = ({ rowIndex, colIndex }: { rowIndex: number, colIndex: number }) => {
    const dispatch = useDispatch();
    const { id, number, isOpen, isFlagged } = useSelector((state: RootState) => state?.grid?.gridCells?.[rowIndex]?.[colIndex])
    const handleCellClick = () => {
        console.log(number, isOpen, id)
    }

    const handleOpenCell = () => {
        dispatch(handleCellOpen({ colIndex, rowIndex }))
    }

    const handleDoubleClickOpen = () => {
        dispatch(handleCellDoubleClick({ colIndex, rowIndex }))
    }

    const handleRightClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(handleCellFlagging({ colIndex, rowIndex }));
    }

    const handleFlagClick = () => {
        dispatch(handleCellDeFlagging({ colIndex, rowIndex }));
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
        if (isFlagged) {
            return (
                <button className='cell__unOpened' onClick={handleFlagClick}>F</button>
            )
        }
        if (isOpen) {
            return (
                <button className='cell__opened' onDoubleClickCapture={handleDoubleClickOpen} style={{ color: numberToColor[number.toString() as keyof typeof numberToColor ]}}>{number || ''}</button>
            )
        }
        return (
            <button className='cell__unOpened' onContextMenuCapture={handleRightClick} onClick={handleOpenCell}></button>
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