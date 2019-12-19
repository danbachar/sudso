import { Coords } from "./coords";
import { SudokuCell } from "./sudokuCell";
import { Sudoku } from "./sudoku";

export class SudokuBox {
    private cells: SudokuCell[][];
    
    constructor(public beginCoordinates: Coords, public endCoordinates: Coords) { 
        //this.values = new Number[3][3];
    }

    getCells() {
        return this.cells;
    }

    public includedInBox(cell: Coords): boolean {
        return cell.x >= this.beginCoordinates.x && cell.x <= this.endCoordinates.x && 
            cell.y >= this.beginCoordinates.y && cell.y <= this.endCoordinates.y;
    }

    public validateBox(): boolean {
        // reduce 2d array to 1d array
        const cellsReduced: SudokuCell[] = [].concat(...this.cells);

        const values = cellsReduced.map(cell => cell.value);

        for (let num = 1; num <= 9; num++) {
            if (!values.includes(num)) { 
                return false;
            }

            if (this.duplicateFound(num, values)) {
                return false;
            }

            return true;
        }

    }

    public insertNumber(num: number, row: number, column: number): void {
        this.cells[row][column].value = num;
    }

    public static convertSudokuCellsToBoxes(cells: SudokuCell[][]): SudokuBox[][] {
        for (let y = 0; y < cells.length; y++) {
            const element = cells[y];

            let row = "\n";
            for (let x = 0; x < element.length; x++) {
                const cell = element[x];
                cell.value = ((y*9)+x);

                if (x == 0) {
                    row += "|";
                }
                row += cell.value + ((cell.value < 10) ? " " : "") + "|";
            }
            console.log(row);
        }

        const boxes: SudokuBox[][] = [];

        const cellsReduced: SudokuCell[] = [].concat(...cells);

        // 0..8
        for (let x = 0; x < cells.length; x++) {
            const columnsForBox = cellsReduced.filter(cell => cell.coords.x / 3 == x);// && cell.coords.y / 3 == j); // 10

            for (let y = 0; y < cells.length; y++) {
                const cellsForBox = columnsForBox.filter(cell => cell.coords.y / 3 == (y%3))
                const box: SudokuBox = this.createBoxBasedOnCells(cellsForBox);
                boxes[x][y] = box;  
            }
        }

        return boxes;
    }

    private static createBoxBasedOnCells(cells: SudokuCell[]): SudokuBox {
        const boxCells: SudokuCell[][] = [];

        let minX = cells[0].coords.x, minY = cells[0].coords.y, maxX, maxY;
        
        for (let indexX = 0; indexX < 3; indexX++) {
            const column = cells.filter(cell => cell.coords.x % 3 == indexX);
            for (let indexY = 0; indexY < 3; indexY++) {
                const cell = column.filter(cell => cell.coords.y % 3 == indexY);
                
                if (cell.length > 1) {
                    throw new Error("scheisse was ist passirt");
                }

                boxCells[indexY][indexX] = cell[0];
            }
        }
        // const secondColumn = cells.filter(cell => cell.coords.x % 3 == 1);
        // const thirdColumn = cells.filter(cell => cell.coords.x % 3 == 2);

        for (let index = 0; index < cells.length; index++) {
            const cell = cells[index];
            
            if (cell.coords.x < minX) {
                minX = cell.coords.x;
            }

            if (cell.coords.x > maxX) {
                maxX = cell.coords.x;
            }

            if (cell.coords.y < minY) {
                minY = cell.coords.y;
            }

            if (cell.coords.y > maxY) {
                maxY = cell.coords.y;
            }
        }
        
        const box = new SudokuBox(new Coords(minX, minY), new Coords(maxX, maxY));
        box.cells = boxCells;
        return box;
    }

    private duplicateFound(num: number, arr: number[]): boolean {
        return arr.indexOf(num) != arr.lastIndexOf(num);
    }
}