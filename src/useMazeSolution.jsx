import { useState } from "react";

const useMazeSolution = (walls, realWalls, rows) => {
    const [isSolved, setIsSolved] = useState(false);
    let solveVisited = [];
    let columns = rows;
    const totalCells = rows * columns;
    console.log("walls", walls, realWalls, totalCells);
    let currentSolutionCell = 0;

    function handleMouseOver(event) {
        //console.log(event.target, walls);
        const currentElement = event.target;
        //console.log("currentElement", currentElement);
        const solutionCell = parseInt(currentElement.getAttribute("index"));
        //console.log("solutionCell", solutionCell, "currentSolutionCell", currentSolutionCell, "totalCells", totalCells);
        // we entered the Maze
        if (currentSolutionCell != solutionCell && pathExists(currentSolutionCell, solutionCell)) {
            solveVisited.push(solutionCell);
            setStatus("current", currentElement);
            //console.log("path exists between ", currentSolutionCell, solutionCell);
            currentSolutionCell = solutionCell;
        }
        if (solutionCell == 0) {
            setStatus("current", currentElement);
            currentSolutionCell = solutionCell;
        }
        if (currentSolutionCell == totalCells - 1) {
            console.log("YOU WIN");
            // this will cause a new maze to be drawn...until we fix useMaze() to use state variables
            //setIsSolved(true);
        } else {
            //console.log(currentSolutionCell, "does not == ", totalCells - 1);
        } 
    }

    function setStatus(status, currentElement) {
        //console.log("setStatus", status, currentElement);
        currentElement.setAttribute("status", status);
    }

    function pathExists(a,  b) {
		const c = ((isRightOf(a, b) || isRightOf(b, a) ||  isBelow(a, b) || isBelow(b, a)) && ! (wallExists(a, b) || wallExists(b, a)));
		//console.log("checked path between " + a + " and " + b + " returning " + c);
		return c;
	}

    function isRightOf(a, b) {
        //console.log("isRightOf", a, b);
        if ( (a + 1 == b) && (getRowOfCell(a) == getRowOfCell(b))) return true;
        //console.log("isRightOf is false", a, b);
        return false;
    }
    function isBelow(a, b) {
        //console.log("isBelow", a, b);
        if (b > totalCells) return false;
        //console.log("isBelow returning", (a + columns == b));
        return a + columns == b;
    }
    function wallExists(a, b) {
        const elem = realWalls.findIndex((obj) => obj.i == a && obj.j == b);
        //console.log("wall exists is ", elem);
		return elem >= 0;
	}
    function getRowOfCell(cell) {
        //console.log("getRowOfCell", cell, "returning ", parseInt(cell / columns));
        return parseInt(cell / columns);
    }

    return {handleMouseOver, isSolved};
}

export default useMazeSolution;