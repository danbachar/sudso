import { SudokuBox } from "./sudokuBox";
import { Sudoku } from "./sudoku";

export class Sudso {

    public Sudoku(public sudoku: Sudoku) { }

    public tryValue(num: number, i: number, j:  number, sudoku: number[][]): boolean {
        return false;
    }

    public static solve(sudoku: number[][]): number[][] {
        // no duplicates in row, col, box
        const solvedSudoku: number[][] = [].concat(...sudoku);
        
        return solvedSudoku;
    }

}