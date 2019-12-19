import { SudokuBox } from "./sudokuBox";
import { Coords } from "./coords";
import { SudokuCell } from "./sudokuCell";

export class Sudoku {
    private values: SudokuCell[][];
    
    constructor(private boxes: SudokuBox[][]) { 
        const cells: SudokuCell[] = [];
        
        const boxesReduced: SudokuBox[] = [].concat(...boxes);
        
        boxesReduced.map(box => box.getCells().map(cells => cells.map(cell => cells[cell.coords.y][cell.coords.x] = cell)));
    }

    private allTrue(arr: boolean[]): boolean {
        return arr.includes(false);
    }

    public validateSudoku(): boolean {
        const validBoxes = [].concat(...this.boxes).map(box => box.validateBox());

        return this.allTrue(validBoxes);
    }

    public getBoxForCoordinates(coords: Coords): SudokuBox|null {
        // TOOD: make up smart formula to find box based on coordinate
        // i=2, j=3 -> rowOfI = 0, colOfJ = 1 => i: 0->2, j: 3->5
        //const rowOfI = i/3, colOfJ = j/3;
        
        return [].concat(this.boxes).find(box => coords.x >= box.beginCoordinates.y && coords.x <= box.endCoordinates.y && coords.y >= box.beginCoordinates.y && coords.y <= box.endCoordinates.y) || null;
    }
}