import { defineStore } from 'pinia'
import { main2Store } from './main2'

// const main2 = main2Store()
export const userStore = defineStore('user', {
  state: () => {
    return {
      firstName: '',
      lastName: '',
      age: 0,
      hobby: ['football', 'basketball']
    }
  },
  getters: {
    fullName(): string {
      return this.firstName + this.lastName
    },
    hobbyChange(state) {
      return state.hobby.join('')
    },
    lanhe() {
      return this.fullName + '爱好' + this.hobbyChange
    },
    useOtherGetter() {
      const main2 = main2Store()
      return this.fullName + '花了' + main2.zhekou
    }
  },
  actions: {
    addAge(payload: number) {
      this.age = this.age + payload
    },
    setFullName() {
      this.fullName + '东方'
    },
    reset() {
      this.$reset()
    },
    getState() {
      console.log(this.$state)
    }
  }
})
