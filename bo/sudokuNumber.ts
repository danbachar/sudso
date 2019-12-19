export class SudokuNumber {
    public value: number = 1;

    public increment() {
        value++;
        if(value == 10) {
            value = 1;
        }
    }
}