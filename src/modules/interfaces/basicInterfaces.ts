
export class Value {
    current: number;
    initial: number;
    diff = 0;
    

    constructor(val: number) {
        this.initial = val;
        this.current = val;
    }

    add(val : number) {
        this.diff += val; 
        this.current += val;
    }

    sub(val: number) {
        this.diff -= val;
        this.current -= val;
    }
}