<template>
    <form class="calculating" v-bind:class="{ message: correct !== null }" @submit="checkOnClick" action="#" method="post">
        <AnswersBar v-bind:answers=answers />

        <div v-if="!isFinish">
            <p class="question">
                <span class="left">{{ task.left }}</span>
                <span class="operator">{{ task.operator }}</span>
                <span class="right">{{ task.right }}</span>
            </p>

            <p class="equals">=</p>

            <p>
                <input class="userAnswer" type="tel" name="userAnswer" id="userAnswer" v-model="userAnswer"
                    v-bind:size="Math.max(3, this.userAnswer.length)"
                    v-on:input="checkOnEdit">
            </p>

            <p>
                <button class="check" type="submit">Check</button>
            </p>
        </div>

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
import AnswersBar from '../AnswersBar.vue';
import Icon from '../Icon.vue';
import Levels, { Task } from './Levels';

const input = document.querySelector<HTMLInputElement>('.userAnswer');

const restoreFocus = () => setTimeout(() => input && input.focus(), 10);

@Component({
    components: {
        AnswersBar,
        Icon,
    },
})
export default class Calculating extends Vue {
    private Levels = Levels();
    private answers: boolean[] = [];
    private userAnswer = '';
    private task: Task = this.Levels.next().value;
    private correct: boolean | null = null;
    private isFinish = false;
    private score = 0;

    private refresh() {
        const level = this.Levels.next();

        if (level.done) {
             this.endGame();
        } else {
            this.task = level.value;
            this.userAnswer = '';
            this.correct = null;

            restoreFocus();
        }
    }

    private getAnswer() {
        return this.task ? this.task.checkAnswer(parseInt(this.userAnswer, 10)) : false;
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
.calculating.message .userAnswer {
    visibility: hidden;
    opacity: 0;
    font-size: 0;
    caret-color: transparent;
}

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

.question {
    display: flex;
}

.left,
.right {
    flex-basis: 50%;
    flex-grow: 1;
}

.left {
    text-align: right;
    padding-right: 0.3em;
}

.right {
    text-align: left;
    padding-left: 0.3em;
}

.operator {
    flex-basis: content;
    flex-shrink: 0;
}

.message {
    position: absolute;
    top: 30px;
    bottom: 20px;
    left: 0;
    right: 0;
    background: #003554;
    text-align: center;
    padding-top: 150px;
}
</style>
