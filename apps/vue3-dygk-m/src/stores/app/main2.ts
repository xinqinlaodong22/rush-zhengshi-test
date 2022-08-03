import { defineStore } from 'pinia'
export const main2Store = defineStore('main2', {
  state: () => {
    return {
      bookName: '三国演义',
      bookPrice: 100
    }
  },
  getters: {
    zhekou(state) {
      return state.bookPrice * 0.8
    }
  },
  actions: {}
})
