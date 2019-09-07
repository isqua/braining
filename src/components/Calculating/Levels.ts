import { getNumber, getNumberBetween } from '../../utils/numbers';

const LEVELS = [
    () => [ getNumber(1), getNumber(1) ],
    () => [ getNumber(1), getNumber(1) ],
    () => [ getNumber(1), getNumber(1) ],
    () => [ getNumber(1), getNumber(1) ],
    () => [ getNumber(1), getNumber(1) ],
    () => [ getNumberBetween(10, 19), getNumber(1) ],
    () => [ getNumber(1), getNumberBetween(10, 19) ],
    () => [ getNumberBetween(10, 19), getNumber(1) ],
    () => [ getNumber(1), getNumberBetween(10, 19) ],
    () => [ getNumber(2), getNumber(1) ],
];

export class Task {
    public operator: string;
    public left: number;
    public right: number;

    constructor(levelNumber: number) {
        this.operator = Math.random() < 0.65 ? '+' : '−';

        const [ first, second ] = LEVELS[levelNumber]();
        let left;
        let right;

        if (this.operator === '−') {
            left = Math.max(first, second);
            right = Math.min(first, second);
        } else {
            left = first;
            right = second;
        }

        this.left = left;
        this.right = right;
    }

    public checkAnswer(answer: number) {
        return this.getAnswer() === answer;
    }

    private getAnswer() {
        switch (this.operator) {
            case '+':
                return this.left + this.right;
            case '−':
                return this.left - this.right;
        }
    }
}

export default function *level(): IterableIterator<Task> {
    for (let i = 0; i < LEVELS.length; i++) {
        yield new Task(i);
    }
}
