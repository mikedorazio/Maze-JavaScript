import { useState } from "react";

const useMaze = (rows, columns) => {
    let buildVisited = [];
    let history = [];
    let realWalls = [];
    let totalCells = rows * columns;
    realWalls = createInitialWallList();
    build();
    let walls = createInstructions();

    // create the array of objects that list all neighboring cells. We don't need left and above
    // since the right and below of earliser cells will handle that relationship.
    // For rows/columns = 3 [{"i":0,"j":1},{"i":0,"j":3},{"i":1,"j":2},{"i":1,"j":4}.....]
    function createInitialWallList() {
        let w = [];
        for (let i = 0; i < rows * columns; i++) {
            for (let j = i; j < rows * columns; j++) {
                if (isRightOf(i, j)) {
                    w.push({ i: i, j: j });
                    //console.log("createInitialWallList", j + " is right: " + i);
                }
                if (isBelow(i, j)) {
                    w.push({ i: i, j: j });
                    //console.log("createInitialWallList", j + " is below: " + i);
                }
            }
        }
        console.log("createInitialWallList.w : " + JSON.stringify(w));
        return w;
    }

    function getBuildVisited() {
        return buildVisited;
    }

    function createInstructions() {
        //console.log("createInstructions realWalls", realWalls);
        // start off with each cell with no drawn walls and then loop through the realWalls
        // array and insert walls that need to be drawn using the cell number as the key.
        let instructionWalls = [];
        let borderCellInstruction = "";
        for (var i = 0; i < rows * columns; i++) {
            borderCellInstruction = "";
            if ((i+1) % columns == 0 && (i + 1 != rows*columns)) {
                //console.log("settting farRight at", i);
                borderCellInstruction = "farRight"
            }
            if (i % columns == 0 && (i != 0)) {
                //console.log("settting farLeft at", i);
                borderCellInstruction = "farLeft"
            }
            instructionWalls.push({
                cell: i,
                row: getRowOfCell(i),
                column: getColumnOfCell(i),
                instructions: borderCellInstruction,
            });
        }

        for (let index = 0; index < realWalls.length; index++) {
            let i = realWalls[index].i;
            let j = realWalls[index].j;
            //TOFIX: combine this declaration and if/else with turnary
            let newTextInstruction = "";
            /// TOFIX: we must append the right or bottom in case the cell already has a value
            if (isRightOf(i, j)) {
                newTextInstruction = " right";
            } else {
                newTextInstruction = " bottom";
            }
            //console.log(j, " is right of ", i);
            const elem = instructionWalls.findIndex((obj) => obj.cell == i);
            //console.log("elem", elem);
            if (elem >= 0) instructionWalls[elem].instructions = instructionWalls[elem].instructions + newTextInstruction;
            //console.log("createInstructions i", index, i, j);
        }
        //console.log("createInstructions.instructionWalls", instructionWalls);
        return instructionWalls;
    }

    function isRightOf(a, b) {
        if (a + 1 == b && getRowOfCell(a) == getRowOfCell(b)) return true;
        return false;
    }
    function isBelow(a, b) {
        if (b > rows * columns) return false;
        return a + columns == b;
    }
    function getRowOfCell(cell) {
        //console.log("getRowOfCell", cell, "returning ", parseInt(cell / columns));
        return parseInt(cell / columns);
    }
    function getColumnOfCell(cell) {
        return cell % columns;
    }

    // for a given cell, determine which other cells in the grid are neighbors that have
    // not yet been visited. this method gets called while the maze is created via the build() method.
    function getNeighbors(cellNumber) {
        //console.log("getNeighbors called with ", cellNumber);
        let neighborArray = [];
        let visited = getBuildVisited();
        let left = cellNumber - 1;
        if (left >= 0 && getRowOfCell(left) == getRowOfCell(cellNumber)) {
            if (!visited.includes(left)) {
                //console.log("cellNumber", cellNumber, "has left neighbor", left);
                neighborArray.push(left);
            } else {
                //console.log("not adding neighbor since it contains", left);
            }
        } else {
            //console.log("either left", left, "was not >= 0 or different row");
        }

        let right = cellNumber + 1;
        if (right < rows * columns && getRowOfCell(right) == getRowOfCell(cellNumber)) {
            if (!visited.includes(right)) {
                //console.log("cellNumber", cellNumber, "has right neighbor", right);
                neighborArray.push(right);
            } else {
                //console.log("not adding neighbor since it contains", right);
            }
        } else {
            //console.log("either right", right, "was not >= 0 or different row");
        }

        let above = cellNumber - columns;
        if (above >= 0) {
            if (!visited.includes(above)) {
                //console.log("cellNumber", cellNumber, "has above neighbor", above);
                neighborArray.push(above);
            } else {
                //console.log("not adding above neighbor since it contains", above);
            }
        } else {
            //console.log("above", above, "was not >= 0 ");
        }

        let below = cellNumber + columns;
        if (below < rows * columns) {
            if (!visited.includes(below)) {
                //console.log("cellNumber", cellNumber, "has below neighbor", below);
                neighborArray.push(below);
            } else {
                // console.log("not adding below neighbor since it contains", below);
            }
        } else {
            //console.log("below", below, "was not >= 0 ");
        }
        console.log("getNeighbors called with", cellNumber, "and returning", neighborArray);
        return neighborArray;
    }

    // starting at cell 0, remove a random neighbor for every cell. If a cell does not have a neighbor, use the
    // history array to go back to the previous cell until you find a cell that has a neighbor. Do that until
    // every cell in the grid (rows*columns) has been visited.
    function build() {
        //console.log("build");
        let numberVisited = 1;
        let currentCell = 0;
        let neighbors = [];
        history.push(currentCell);
        getBuildVisited().push(currentCell);
        //console.log("build at start", JSON.stringify(realWalls));

        let loopCount = 0; // this is just a catch in case we are in an infinite loop...we can remove soon
        while (numberVisited < rows * columns) {
            loopCount++;
            // get all the neighbors of this cell
            neighbors = getNeighbors(currentCell);
            //console.log("build.neighbors", neighbors);
            if (neighbors.length > 0) {
                let neighborCount = neighbors.length;
                //console.log("build neighborCount", neighborCount);
                let randomCount = Math.floor(Math.random() * neighborCount);
                //console.log("build randomCount", randomCount);
                let randomNeighbor = neighbors[randomCount];
                //console.log("build randomNeighbor", randomNeighbor);
                let index = realWalls.findIndex((wall) => {
                    // console.log("lookin for ", Math.min(currentCell, randomNeighbor), " and ", Math.max(currentCell, randomNeighbor));
                    return (
                        wall.i == Math.min(currentCell, randomNeighbor) &&
                        wall.j == Math.max(currentCell, randomNeighbor)
                    );
                });
                //console.log("build index", index);
                if (index >= 0) {
                    realWalls.splice(index, 1);
                    history.push(currentCell);
                    //console.log("build.history", history);
                }
                //console.log("build after splice realWalls", JSON.stringify(realWalls));
                getBuildVisited().push(currentCell);
                currentCell = randomNeighbor;
                numberVisited++;
            } else {
                // this cell has no unvisited neighbors so add to visited array and pop off a history cell
                getBuildVisited().push(currentCell);
                currentCell = history.pop();
            }
            // TOFIX: remove this safety check
            if (loopCount > 3000) {
                console.log("build.loopCount exceeded Max", loopCount);
                break;
            }
        }
    }
    return { walls };
};

export default useMaze;