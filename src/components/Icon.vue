<template>
    <span class="Icon" v-bind:class="classObject"></span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Icon extends Vue {
    @Prop() private type!: 'cross' | 'checkmark';

    get classObject() {
        const className = `Icon-${this.type}`;

        return {
            [className]: true,
        };
    }
}
</script>

<style scoped>
.Icon {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
}

.Icon-checkmark {
  background: #009322;
}

.Icon-checkmark::before {
  content: '';
  position: absolute;
  width: 12px;
  height: 6px;
  color: #fff;
  border-bottom: 3px solid currentColor;
  border-left: 3px solid currentColor;
  transform: rotate(-45deg);
  top: 31%;
  left: 25%;
  transform-origin: 50% 50%;
}

.Icon-cross {
  background: crimson;
}

.Icon-cross::before,
.Icon-cross::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 4px;
  background: #fff;
  position: absolute;
  top: 13px;
  left: 7px;
  transform-origin: 50% 50%;
}

.Icon-cross::before {
  transform: rotate(45deg);
}

.Icon-cross::after {
  transform: rotate(-45deg);
}
</style>
