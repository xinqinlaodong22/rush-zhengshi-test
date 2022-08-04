import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'count',
  state: () => ({
    counter: 789,
    shuzi: 123123
  }),
  getters: {
    doubleCount: state => state.counter * 2
  },
  actions: {
    increment() {
      this.counter++
    }
  }
})
