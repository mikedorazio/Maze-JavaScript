import {useState} from 'react';
import Cell from './Cell';
import useMaze from './useMaze';

export default function MazePanel( {r, c} ) {
    const [rows, setRows] = useState(r);
    const [columns, setColumns] = useState(c);
    const { walls } = useMaze(rows, columns );
    //console.log("walls", walls);
    
    return (
        <div className="panel-container">
            {walls.map((wall, index) => {
                return <Cell key={index} isFirst={index == 0} isLast={index==r*c-1} row={wall.row} cellIndex={index}    
                                                                column={wall.column} instructions={wall.instructions} />
            })}
        </div>
    )
}