import { Coords } from "./coords";

export class SudokuCell {
    constructor(public value: number, public coords: Coords) { }
}