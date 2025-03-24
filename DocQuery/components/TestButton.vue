<template>
  <button class="btn" :class="btnClass" @click="handleClick">
    Change Color
  </button>
</template>

<script setup lang="ts">
defineProps({
  btnClass: {
    type: String,
    default: 'btn-primary',
  },
});

const handleClick = () => {
  /*eslint-disable-next-line*/
  console.log('Button Clicked');
};
</script>

<style>
.btn {
  width: fit-content;
  padding-inline: 2rem;
  padding-block: 1rem;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
  border-radius: 1rem;
}
.btn-primary {
  background-color: green;
}
.btn-secondary {
  background-color: red;
}
</style>
