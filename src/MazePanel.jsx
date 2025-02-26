import {useState, useRef, useEffect} from 'react';
import Cell from './Cell';
import useMaze from './useMaze';
import useMazeSolution from './useMazeSolution';

export default function MazePanel( {r, c} ) {
    const [rows, setRows] = useState(r);
    const [columns, setColumns] = useState(c);
    const panelRef = useRef(null);
    const { walls, realWalls } = useMaze(rows, columns );
    const {handleMouseOver, isSolved} = useMazeSolution(walls, realWalls, rows);
    console.log("isSolved", isSolved);

    useEffect(() => {
        console.log("useEffect running");
        const panelDiv = panelRef.current;
        panelDiv.addEventListener("mouseover", handleMouseOver);

        return () => {
            console.log("MazePanel.return from useEffect");
            panelDiv.removeEventListener("mouseover", handleMouseOver);
        };
    }, [handleMouseOver, isSolved]);

    return (
        <div ref={panelRef} className="panel-container">
            {walls.map((wall, index) => {
                return <Cell key={index} isFirst={index == 0} isLast={index==r*c-1} row={wall.row} cellIndex={index}    
                             onMouseOver={handleMouseOver}  column={wall.column} instructions={wall.instructions} />
            })}
        </div>
    )
}