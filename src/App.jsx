import { useState, useEffect, useRef } from "react";
import MazePanel from "./MazePanel";

function App() {
    //TODO: update font-size based on rows
    const rows = 4;
    const columns = rows;
    const boardRef = useRef(null);

    useEffect(() => {
        boardRef.current.style.setProperty("--grid-size", rows);
      }, [rows]);


    return (
        <div className="outer-container">
            <div className="start-container">start</div>
            <div ref={boardRef} className="app-container">
                <MazePanel r={rows} c={columns} />
            </div>
            <div className="end-container">end</div>
        </div>
    );
}

export default App;
