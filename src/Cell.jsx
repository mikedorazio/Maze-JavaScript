import {useState} from 'react';

export default function Cell( {isFirst, isLast, row, column, instructions, cellIndex} ) {
    //console.log("Cell.row.column", isFirst, isLast, row, column);

    let position = ""
    if (isFirst) position = "start";
    if (isLast) position = "end";

    return (
        <div className="cell" position={position} id={`cell-${row}-${column}`} instructions={instructions}>
           
            {/* <div row="0" column="0" index={cellIndex} >{`${cellIndex} : ${row}-${column}`}</div> */}
            <div row="0" column="0" index={cellIndex} >{position.charAt(0).toUpperCase()}</div>
        </div>
    )
}