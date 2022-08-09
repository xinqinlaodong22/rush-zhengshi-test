/**
 * 处理用户数据
 * 这里的state是最原始的数据，sessionStorage.getItem('user')的数据是正在使用的数据
 */

// import * as types from '../types'

// ==========
// state

import { defineStore } from 'pinia'
interface todoBuyCardIosVerifyType {
  receiptData: string
  orderNo: string
  time: number
}
interface useStoreDataType {
  utype?: number
  provinceId?: number
  provinceName?: string
  liberalScience?: number
  liberalScienceMode?: null
  realName?: string
  gaoKaoYear?: string
  grade?: string
  accessToken?: string
  refreshToken?: string
  userIcon?: string
  id?: number
  cardNumber?: string
  collegeSearchHistory?: string[]
  majorSearchHistory?: string[]
  mobile?: number
  nickname?: string
  gender?: string
  todoAppVersionCheckedTime?: number
  todoBuyCardIosVerify?: todoBuyCardIosVerifyType
  zybUid?: string
}

export const useStore = defineStore('user', {
  state: () => {
    return {
      // 用户类型
      utype: 0,
      // 所在省份id
      provinceId: 0,
      // 所在省份名称
      provinceName: '',
      // 文理科，0:文科，1:理科，2:未分科
      liberalScience: 0,
      liberalScienceMode: null,
      // 真实姓名
      realName: '',
      // 高考年份
      gaoKaoYear: '',
      // 年级
      grade: '',
      // token
      accessToken: '',
      refreshToken: '',
      // 用户头像
      userIcon: '',
      // 用户id
      id: 0,
      // 用户卡号
      cardNumber: '',
      // 搜索历史
      collegeSearchHistory: [],
      majorSearchHistory: [],
      // 手机号
      mobile: 0,
      nickname: '',
      gender: '',
      // 通过苹果IAP购买钻石卡，用户付款成功之后，因为各种原因导致中断，用户再次进入时，要进行漏单处理
      // 见buy-write.vue
      todoBuyCardIosVerify: {
        // AppStore返回的购买凭证
        receiptData: '',
        // 订单号
        orderNo: '',
        // 下单时间
        time: 0
      },
      // app 检查版本更新的时间
      todoAppVersionCheckedTime: 0,
      zybUid: ''
    }
  },

  actions: {
    // 更新state
    update_user(payload: useStoreDataType) {
      if (payload) {
        if (payload.id !== undefined && payload.id !== this.id) {
          this.$reset()
        }
        // 把payload并入state.user
        // const that = this
        // Object.keys(this.$state).forEach((k: keyof useStoreDataType) => {
        //   if (payload && payload[k] !== undefined) {
        //     this.$state[k] = payload[k]
        //   }
        // })
        localStorage.setItem('_userinfo_caches', JSON.stringify(this.$state))
      }
    },

    // accessToken过期之后，通过refreshToken刷新accessToken
    user_update_accesstoken(payload: useStoreDataType) {
      if (payload && payload.accessToken) {
        this.$state.accessToken = payload.accessToken

        // 将用户信息存储到localStorage
        localStorage.setItem('_userinfo_caches', JSON.stringify(this.$state))
      }
    },
    // 更新用户的省份信息
    user_update_province(payload: useStoreDataType) {
      if (payload && payload.provinceId && payload.provinceName) {
        this.$state.provinceId = payload.provinceId
        this.$state.provinceName = payload.provinceName

        // 将用户信息存储到localStorage
        localStorage.setItem('_userinfo_caches', JSON.stringify(this.$state))
      }
    },
    // 用户修改个人信息之后，更新用户的头像和文理科

    user_update_avatar_liberalscience(payload: useStoreDataType) {
      if (payload && payload.userIcon && payload.grade && payload.liberalScience) {
        this.$state.userIcon = payload.userIcon
        this.$state.grade = payload.grade
        this.$state.liberalScience = payload.liberalScience

        // 将用户信息存储到localStorage
        localStorage.setItem('_userinfo_caches', JSON.stringify(this.$state))
      }
    },

    // 退出登录
    app_user_logout() {
      // 重置state.user
      this.$reset()

      // 退出登陆时清除之前用户所选的成绩和科目
      localStorage.removeItem('schoolGuideScore')
      localStorage.removeItem('schoolGuideForm')

      // 将用户信息存储到localStorage
      localStorage.setItem('_userinfo_caches', JSON.stringify(this.$state))
    }

    // 院校搜索历史
    // user_update_college_search_history(payload) {
    //   if (payload && payload.collegeId) {
    //     const list = this.$state.collegeSearchHistory
    //     let isExist = false

    //     for (let i = 0; i < list.length; i++) {
    //       // 如果在历史记录里面，删除旧的，添加新的到前面
    //       if (payload.collegeId === list[i].collegeId) {
    //         list.splice(i, 1)
    //         list.unshift(payload)
    //         isExist = true
    //         break
    //       }
    //     }

    //     // 如果不在，直接添加到前面
    //     if (!isExist) list.unshift(payload)

    //     // 最多8条记录
    //     if (list.length > 8) list.length = 8

    //     // 将用户信息存储到localStorage
    //     localStorage.setItem('_userinfo_caches', JSON.stringify(state.user))
    //   }
    // }
    // #region
    // 专业搜索历史
    // [types.APP_USER_UPDATE_MAJOR_SEARCH_HISTORY](state, payload) {
    //   if (payload) {
    //     const list = state.user.majorSearchHistory
    //     let isExist = false

    //     for (let i = 0; i < list.length; i++) {
    //       // 如果在历史记录里面，删除旧的，添加新的到前面
    //       if (payload.majorCode === list[i].majorCode) {
    //         list.splice(i, 1)
    //         list.unshift(payload)
    //         isExist = true
    //         break
    //       }
    //     }

    //     // 如果不在，直接添加到前面
    //     if (!isExist) list.unshift(payload)

    //     // 最多8条记录
    //     if (list.length > 8) list.length = 8

    //     // 将用户信息存储到localStorage
    //     localStorage.setItem('_userinfo_caches', JSON.stringify(state.user))
    //   }
    // },
    // #endregion
  }
})

// ------------------------------------------
// #region
// const state = {
//   // 用户类型
//   utype: 0,
//   // 所在省份id
//   provinceId: 0,
//   // 所在省份名称
//   provinceName: '',
//   // 文理科，0:文科，1:理科，2:未分科
//   liberalScience: 0,
//   liberalScienceMode: null,
//   // 真实姓名
//   realName: '',
//   // 高考年份
//   gaoKaoYear: '',
//   // 年级
//   grade: '',
//   // token
//   accessToken: '',
//   refreshToken: '',
//   // 用户头像
//   userIcon: '',
//   // 用户id
//   id: 0,
//   // 用户卡号
//   cardNumber: '',
//   // 搜索历史
//   collegeSearchHistory: [],
//   majorSearchHistory: [],
//   // 手机号
//   mobile: 0,
//   nickname: '',
//   gender: '',
//   // 通过苹果IAP购买钻石卡，用户付款成功之后，因为各种原因导致中断，用户再次进入时，要进行漏单处理
//   // 见buy-write.vue
//   todoBuyCardIosVerify: {
//     // AppStore返回的购买凭证
//     receiptData: '',
//     // 订单号
//     orderNo: '',
//     // 下单时间
//     time: 0
//   },
//   // app 检查版本更新的时间
//   todoAppVersionCheckedTime: 0,
//   zybUid: ''
// }

// 重置state
// 保留provinceId和provinceName，因为项目在任何状况下这两条数据都得存在
// const reset = function (data: resetParamsType) {
//   data.utype = 0
//   data.liberalScience = 0
//   data.liberalScienceMode = null
//   data.realName = ''
//   data.gaoKaoYear = ''
//   data.grade = ''
//   data.accessToken = ''
//   data.refreshToken = ''
//   data.userIcon = ''
//   data.id = 0
//   data.cardNumber = ''
//   data.collegeSearchHistory = []
//   data.majorSearchHistory = []
//   data.mobile = 0
//   data.nickname = ''
//   data.gender = ''
//   data.todoBuyCardIosVerify.receiptData = ''
//   data.todoBuyCardIosVerify.orderNo = ''
//   data.todoBuyCardIosVerify.time = 0
//   data.zybUid = ''
// }
//#endregion

// vueX的 mutations
// #region
// const mutations = {
//   // 更新state.user
//   [types.APP_USER_UPDATE_USER](state, payload) {
//     if (payload) {
//       // 当用户登录/切换账号之后，user.id会改变，此时先重置state.user
//       if (payload.id !== undefined && payload.id !== state.user.id) {
//         reset(state.user)
//       }

//       // 把payload并入state.user
//       Object.keys(state.user).forEach(function (k) {
//         if (payload[k] !== undefined) state.user[k] = payload[k]
//       })

//       // 将用户信息存储到localStorage
//       localStorage.setItem('_userinfo_caches', JSON.stringify(state.user))

//       // 触发小程序账号更新
//       if (this._vm.$device.miniProgram) {
//         window.wx.miniProgram.postMessage({
//           data: {
//             updateUser: {
//               authorizationToken: state.user.accessToken,
//               authorizationId: state.user.id
//             }
//           }
//         })
//       }
//     }
//   },
//   // accessToken过期之后，通过refreshToken刷新accessToken
//   [types.APP_USER_UPDATE_ACCESSTOKEN](state, payload) {
//     console.log('APP_USER_UPDATE_ACCESSTOKEN')
//     if (payload) {
//       state.user.accessToken = payload.accessToken

//       // 将用户信息存储到localStorage
//       localStorage.setItem('_userinfo_caches', JSON.stringify(state.user))

//       // 触发小程序账号更新
//       if (this._vm.$device.miniProgram) {
//         window.wx.miniProgram.postMessage({
//           data: {
//             updateUser: {
//               authorizationToken: state.user.accessToken,
//               authorizationId: state.user.id
//             }
//           }
//         })
//       }
//     }
//   },
//   // 更新用户的省份信息
//   [types.APP_USER_UPDATE_PROVINCE](state, payload) {
//     if (payload) {
//       state.user.provinceId = payload.provinceId
//       state.user.provinceName = payload.provinceName

//       // 将用户信息存储到localStorage
//       localStorage.setItem('_userinfo_caches', JSON.stringify(state.user))
//     }
//   },
//   // 用户修改个人信息之后，更新用户的头像和文理科
//   [types.APP_USER_UPDATE_AVATAR_LIBERALSCIENCE](state, payload) {
//     if (payload) {
//       state.user.userIcon = payload.userIcon
//       state.user.grade = payload.grade
//       state.user.liberalScience = payload.liberalScience

//       // 将用户信息存储到localStorage
//       localStorage.setItem('_userinfo_caches', JSON.stringify(state.user))
//     }
//   },
//   // 院校搜索历史
//   [types.APP_USER_UPDATE_COLLEGE_SEARCH_HISTORY](state, payload) {
//     if (payload) {
//       const list = state.user.collegeSearchHistory
//       let isExist = false

//       for (let i = 0; i < list.length; i++) {
//         // 如果在历史记录里面，删除旧的，添加新的到前面
//         if (payload.collegeId === list[i].collegeId) {
//           list.splice(i, 1)
//           list.unshift(payload)
//           isExist = true
//           break
//         }
//       }

//       // 如果不在，直接添加到前面
//       if (!isExist) list.unshift(payload)

//       // 最多8条记录
//       if (list.length > 8) list.length = 8

//       // 将用户信息存储到localStorage
//       localStorage.setItem('_userinfo_caches', JSON.stringify(state.user))
//     }
//   },
//   // 专业搜索历史
//   [types.APP_USER_UPDATE_MAJOR_SEARCH_HISTORY](state, payload) {
//     if (payload) {
//       const list = state.user.majorSearchHistory
//       let isExist = false

//       for (let i = 0; i < list.length; i++) {
//         // 如果在历史记录里面，删除旧的，添加新的到前面
//         if (payload.majorCode === list[i].majorCode) {
//           list.splice(i, 1)
//           list.unshift(payload)
//           isExist = true
//           break
//         }
//       }

//       // 如果不在，直接添加到前面
//       if (!isExist) list.unshift(payload)

//       // 最多8条记录
//       if (list.length > 8) list.length = 8

//       // 将用户信息存储到localStorage
//       localStorage.setItem('_userinfo_caches', JSON.stringify(state.user))
//     }
//   },
//   // 退出登录
//   [types.APP_USER_LOGOUT](state) {
//     // 重置state.user
//     reset(state.user)

//     // 退出登陆时清除之前用户所选的成绩和科目
//     localStorage.removeItem('schoolGuideScore')
//     localStorage.removeItem('schoolGuideForm')

//     // 将用户信息存储到localStorage
//     localStorage.setItem('_userinfo_caches', JSON.stringify(state.user))
//   }
// }
// #endregion
