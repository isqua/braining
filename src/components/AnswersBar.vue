<template>
    <ul class="AnswersBar">
        <li
            v-for="(answer, index) in answers"
            v-bind:key=index
            class="Answer"
            v-bind:class="{ correct: answer, incorrect: !answer}">
        </li>
    </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class AnswersBar extends Vue {
    @Prop() private answers: boolean[] = [];
}
</script>

<style scoped>
.AnswersBar {
    margin: 0 0 20px;
    padding: 0;
    list-style: none;
    height: 10px;
    line-height: 10px;
}

.Answer {
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 10px;
    margin: 0 5px;
}

.Answer.correct {
    background: #04C932;
}

.Answer.incorrect {
    background: crimson;
}
</style>
