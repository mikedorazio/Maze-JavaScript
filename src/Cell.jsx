import {useState} from 'react';

export default function Cell( {isFirst, isLast, row, column, instructions, cellIndex} ) {
    //console.log("Cell.row.column", isFirst, isLast, row, column);

    let position = ""
    // we need these attribute values so when we put the attributes that will draw the left and right 
    // wall we can skip over these to leave an opening for the start and end positions
    if (isFirst) position = "start";
    if (isLast) position = "end";

    return (
        <div className="cell"  id={`cell-${row}-${column}`} instructions={instructions}>
            {/* <div row="0" column="0" index={cellIndex} >{`${cellIndex} : ${row}-${column}`}</div> */}
            {/* <div row="0" column="0" index={cellIndex} >{`${cellIndex}`}</div> */}
            <div row="0" column="0" index={cellIndex} ></div>
        </div>
    )
}