import { useState, useEffect, useRef } from "react";
import MazePanel from "./MazePanel";

function App() {
    const rows = 12;
    const columns = rows;
    const boardRef = useRef(null);

    useEffect(() => {
        boardRef.current.style.setProperty("--grid-size", rows);
      }, [rows]);


    return (
        <>
            <div ref={boardRef} className="app-container">
                <MazePanel r={rows} c={columns} />
            </div>
        </>
    );
}

export default App;
