<script setup lang="ts">
import TheWelcome from '@/components/TheWelcome.vue'
import { useCounterStore } from 'dygk-interface'
const user = useCounterStore()
console.log(user)

// import { useCounterStore } from 'dygk-interface/src/stores/counter'
// const userCount = useCounterStore()
// console.log('userCount.shuzi', userCount.shuzi)
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
