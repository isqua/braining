<template>
    <div id="app">
      <Calculating />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Calculating from './components/Calculating.vue';

@Component({
    components: {
        Calculating,
    },
})
export default class App extends Vue {}
</script>

<style>
body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 32px;
    font-weight: bold;
    background: #003554;
    color: #fff;
    text-align: center;
}
</style>
