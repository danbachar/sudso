import * as readline from 'readline';
import { SudokuCell } from './bo/sudokuCell';
import { Sudoku } from './bo/sudoku';
import { Coords } from './bo/coords';
import { SudokuBox } from './bo/sudokuBox';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const getLine = (function () {
    const getLineGen = (async function* () {
        for await (const line of rl) {
            yield line;
        }
    })();
    return async () => ((await getLineGen.next()).value);
})();

const main = async() => {
    console.log("insert n for n x n sudoku represented by array:");
    const n = Number(await getLine());
    const cellArr: SudokuCell[][] = [];

    for (let y = 0; y < n; y++) {
        console.log("insert sudoku row, numbers separated by `,`, `-` for empty cell:")
        const row = await getLine() as string;
        const parsedRow: SudokuCell[] = [];
        let x = 0;
        
        const splitRow = row.split(',');
        splitRow.map(char => {
            const cell = new SudokuCell(0, new Coords(x, y));
            
            if (char != "-") {
                const cellParsed = parseInt(char);
                cell.value = cellParsed;
            }
    
            parsedRow.push(cell);
            x++;
        }); 

        cellArr[y] = parsedRow;  
    }

    const boxes = SudokuBox.convertSudokuCellsToBoxes(cellArr);
    const sudoku = new Sudoku(boxes);

    solve(sudoku);
    process.exit(0);
}


const solve = (sudoku: Sudoku) => {
    console.log("TODO solve");
}

main();