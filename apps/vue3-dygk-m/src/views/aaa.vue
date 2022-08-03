<template>
  <div>
    <div>姓：{{ firstName }}</div>
    <div>名：{{ lastName }}</div>
    <div>全名：{{ fullName }}</div>
    <div>年龄：{{ age }}</div>
    <div>爱好：{{ user.lanhe }}</div>
    <div>{{ user.useOtherGetter }}</div>
  </div>
  <div><button @click="change">修改</button></div>
  <div><button @click="reset">重置</button></div>
  <div><button @click="getState">获取state</button></div>
</template>

<script setup lang="ts">
import { userStore } from '../stores/app/main'
import { storeToRefs } from 'pinia'

const user = userStore()

const { firstName, lastName, fullName, age } = storeToRefs(user)
user.$patch({
  firstName: '张',
  lastName: '三',
  age: 98
})
const change = function () {
  user.$patch(state => {
    state.age++
  })
}

const reset = function () {
  user.reset()
}

const getState = function () {
  user.getState()
}
user.$subscribe(
  (m, state) => {
    console.log('这是aaa组件')
    // console.log('payload', m.payload)
  },
  { detached: true }
)
</script>
