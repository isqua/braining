<template>
    <form class="calculating" @submit="checkOnClick" action="#" method="post">
        <AnswersBar v-bind:answers=answers />

        <p class="question">{{ task.left }} {{ task.operator }} {{ task.right }}</p>
        <p class="equals">=</p>

        <p>
            <input class="userAnswer" type="tel" name="userAnswer" id="userAnswer" v-model="userAnswer"
                v-bind:size="Math.max(3, this.userAnswer.length)"
                v-on:input="checkOnEdit">
        </p>

        <p>
            <button class="check" type="submit">Check</button>
        </p>

        <div v-if="correct !== null" class="message">
            <p v-if="correct === true" class="correct">
                <Icon type="checkmark" /> Correct!
            </p>

            <p v-if="correct === false" class="wrong">
                <Icon type="cross" /> Wrong
            </p>
        </div>

        <div v-if="isFinish" class="message">
            Congratulations!<br>Your score is<br>{{ score }} / 10
        </div>
    </form>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import AnswersBar from './AnswersBar.vue';
import Icon from './Icon.vue';

const getNumber = (length: number): number => Math.floor(
    getNumberBetween(
        Math.pow(10, length - 1),
        Math.pow(10, length),
    ),
);

const getNumberBetween = (start: number, end: number): number => (
    start + Math.random() * (end - start)
);

const input = document.querySelector<HTMLInputElement>('.userAnswer');

const restoreFocus = () => setTimeout(() => input && input.focus(), 10);

@Component({
    components: {
        AnswersBar,
        Icon,
    },
})
export default class Calculating extends Vue {
    private answers: boolean[] = [];
    private task = {
        left: getNumber(1),
        right: getNumber(1),
        operator: '+',
    };
    private userAnswer = '';
    private correct: boolean | null = null;
    private isFinish = false;
    private score = 0;

    private generateTask() {
        const operator = Math.random() < 0.65 ? '+' : '−';

        const first = getNumber(1);
        const second = getNumber(1);
        let left;
        let right;

        if (operator === '−') {
            left = Math.max(first, second);
            right = Math.min(first, second);
        } else {
            left = first;
            right = second;
        }

        return {
            left,
            right,
            operator,
        };
    }

    private getTaskSolution() {
        switch (this.task.operator) {
            case '+':
                return this.task.left + this.task.right;
            case '−':
                return this.task.left - this.task.right;
        }
    }

    private getAnswer() {
        return parseInt(this.userAnswer, 0) === this.getTaskSolution();
    }

    private checkAnswer(answer: boolean) {
        this.correct = answer;
        this.answers.push(answer);

        setTimeout(() => this.refresh(), 500);
    }

    private checkFinish() {
        return this.answers.length === 10;
    }

    private endGame() {
        this.isFinish = true;
        this.score = this.answers.filter(Boolean).length;
    }

    private refresh() {
        this.task = this.generateTask();
        this.userAnswer = '';
        this.correct = null;

        if (this.checkFinish()) {
             this.endGame();
        } else {
            restoreFocus();
        }
    }

    private checkOnEdit(e: Event) {
        if (!this.userAnswer) {
            return;
        }

        const answer = this.getAnswer();

        if (answer) {
            this.checkAnswer(answer);
        }
    }

    private checkOnClick(e: Event) {
        e.preventDefault();
        restoreFocus();

        if (!this.userAnswer) {
            return;
        }

        const answer = this.getAnswer();
        this.userAnswer = '';
        this.checkAnswer(answer);
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userAnswer {
    background: transparent;
    border: none;
    border-bottom: 1px solid rgba(255,255,255,0.5);
    font-size: 32px;
    font-family: inherit;
    color: #fff;
    text-align: center;
    border-radius: 0;
}

.userAnswer:focus {
    outline: none;
}

.check {
    background: #fff;
    color: #009322;
    font-size: 24px;
    line-height: 30px;
    border-radius: 24px;
    padding: 4px 20px;
    margin: 30px 0 0;
    border: none;
    font-weight: bold;
}

p {
    margin: 0;
}

.message {
    position: absolute;
    top: 30px;
    bottom: 20px;
    left: 0;
    right: 0;
    background: #003554;
    text-align: center;
    padding-top: 90px;
}
</style>
