<template>
  <div class="page-member">
    <GNavBar title="会员中心" back-button bottom-border back-icon :share-icon="false" />

    <div class="page-content">
      <div class="hd">
        <div class="login">
          <router-link v-if="!user.accessToken" class="link" :to="{ name: 'Login' }">
            <div class="avatar">
              <img
                v-if="!user.userIcon"
                src="https://s.diyigaokao.com/diyigaokaoapp/web/3.1.7/static/img/2016030109.7802835.png"
                alt=""
              />
              <!-- <van-icon name="user-circle-o" size="60px"/> -->
              <img v-if="user.userIcon" :src="user.userIcon" alt="" />
            </div>
            <div class="info">
              <span v-if="!user.accessToken">点击登录</span>
            </div>
          </router-link>
          <a v-else href="javascript:;" @click="modifyInfo">
            <div class="link">
              <div class="avatar">
                <img
                  v-if="!user.userIcon"
                  src="https://s.diyigaokao.com/diyigaokaoapp/web/3.1.7/static/img/2016030109.7802835.png"
                  alt=""
                />
                <img v-if="user.userIcon" :src="user.userIcon" alt="" />
              </div>
              <div class="info">
                <span class="username">{{ user.realName }}</span>
                <!-- <p class="subinfo"><span>{{user.gaoKaoYear}}年-{{user.provinceName}}<span v-if="user.liberalScience">-{{userLiberalScience[user.liberalScience].type}}</span> </span><em class="g-iconfont" v-if="false">&#xe61c;</em></p> -->
                <p class="subinfo">
                  <span>
                    {{ user.gaoKaoYear }}年-{{ user.provinceName }}
                    <span>-{{ kaoshengType }}</span>
                  </span>
                  <em v-if="false" class="g-iconfont">&#xe61c;</em>
                </p>
                <p v-if="user.cardNumber && !$device.zuoyebang" class="account">
                  会员账号：
                  <em>{{ user.cardNumber }}</em>
                </p>
              </div>
            </div>
          </a>
        </div>
        <div class="user">
          <div class="tip">[{{ agency.name }}]将为您提供专业的高考志愿辅导服务。</div>
        </div>
      </div>

      <div class="list">
        <!-- 作业帮站点 -->
        <div v-if="$device.zuoyebang">
          <!-- 'https://vip.zuoyebang.com/static/hy/gaokao/package.html?hideNativeTitleBar=1&fromchannel=' -->
          <a class="a_van_cell" :href="zybBuySite" @click="$recordClick('DYGK_028')">
            <van-cell :title="openVip" is-link size="large">
              <van-icon slot="icon" class="left_icon">
                <img class="cart" src="../assets/imgs/2021032400.png" alt="" />
              </van-icon>
            </van-cell>
          </a>
        </div>

        <div v-else>
          <!-- ios购买 -->
          <van-cell
            v-if="$device.nativeApp && $device.ios"
            :title="openVip"
            is-link
            size="large"
            :to="{ name: 'buyWrite' }"
          >
            <van-icon slot="icon" class="left_icon">
              <img class="cart" src="../assets/imgs/2021032400.png" alt="" />
            </van-icon>
          </van-cell>
          <!-- 安卓购买 -->
          <a v-if="$device.nativeApp && $device.android" class="a_van_cell" @click="androidClick">
            <van-cell :title="openVip" is-link size="large">
              <van-icon slot="icon" class="left_icon">
                <img class="cart" src="../assets/imgs/2021032400.png" alt="" />
              </van-icon>
            </van-cell>
          </a>
          <!-- 普通购买 -->
          <a
            v-if="!$device.nativeApp"
            class="a_van_cell"
            href="https://www.diyigaokao.com/mobileWxPay/index.html?prdApplyId=34"
          >
            <van-cell :title="openVip" is-link size="large">
              <van-icon slot="icon" class="left_icon">
                <img class="cart" src="../assets/imgs/2021032400.png" alt="" />
              </van-icon>
            </van-cell>
          </a>
        </div>
        <van-cell
          v-if="!$device.zuoyebang"
          ref="MemberShengXueCourse"
          title="预约升学规划课程"
          size="large"
          is-link
          @click="nav('MemberShengXueCourse')"
        >
          <van-icon slot="icon" class="left_icon">
            <img
              class="feedback"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAfCAYAAACGVs+MAAAABHNCSVQICAgIfAhkiAAAA2hJREFUSEvNV0Fy4lYQfU9ib1J4b3ICK/YBgk9g5wKDqMrenmVqQhkXTmUXMycA5QIhJ7Cd/TiaE4xnj6vwXtJL9UfCwhhMgLjyVyD93/3+637dLQLAwaXOCDQBBPZ/naX8EJ8dtufTZ8Iw9XARf2BcbGPu/Godp8WZwsmMs/zl83cSxlkF38U/8d628KCrmMQ+gCgVBmsBEQLfw1UmRMKsDQKhRzSzDG16+JHAnoSLuzY7DsDhpRx7qXAUt3mzDoCgq4ZPXJcNF3YOuuqQODf7HtCw3xJu79ps/GcAgl9VN+NG85sDIBAL6DsGPLxHhvqbMWCXNiVJ+OzoJfYF3BOov0kI8rhHn35m6OTdVY/EaZFjK+WAxY/C3irJKOHRNB10VPUrGIgY3n3gjJIOuzoBEaYJQs/H2atJeHipMYCdVQDYHhGt504XnS0ScqkKSnVhFQyPqXCyrny3JsNVkC7as5VC9L8EoP5uAz5cleW70e3KDOTSsd6wcImIXko855Q6BXkyd1gaQvzI1mim3M+FYBUVlLPYKaFfrYL+FTjRPwC7cdmRAZpcSugxHL0vAM4BsMZiBWMZA1kFg6KdOpvRrlXAfUB/IkvP2Bq7Vlte6lfr8CpDt08aMHxobUUFimo9gKcGg82HgoHF4YtqA4A2/FywOepspIL8Vl+McjZHS1krELlweX4McA9Z8u1mAIrbZzh6nlwvUaB+NQD9c2T6C773m2Nhk4FEUW0yVjUfXP9fqpyJ82s3Iiq13zHIeEMAu6bzV+lXv2YNqQ/yK7IkZGscK9o1lXy/FQDI0HH6V9pia2zNbLr0ey2EaAPKZ2RJo3i/ZQBJ6CgFv0DJUcmJDZ7nuTzt5lNwE+mquiEDtSHAY2TJNwDqoH9TgIDnmzybL8nzST2KNgPwRK/TtCvFHq4hjUFWC63PFaVCPVRrIwCTKli7h7ADpUZ9PI25GX/3MPed4aToVf62nGBzFEwBQPjhU5tWKv/Vmhq0W+cgFhnIm9UfuRQtIZ0MzemxfTKRbqp9ddnUe9fm2bS6WSgy9EDuWJ2H0o9m/Kn6ORkeu2YlPUI8KQoXg18U+HKda/U5sPRlUyqxRm3PtL3kBrfIEmtWTx+nttmm2nxitZnekue1FZcZmNH9JMbWfsu94QZZMiw7Ls78A3eoiBQ+Ol/tAAAAAElFTkSuQmCC"
              alt=""
            />
          </van-icon>
        </van-cell>
        <van-cell
          v-if="!$device.zuoyebang"
          ref="Suggestion"
          title="用户反馈"
          size="large"
          is-link
          @click="nav('Suggestion')"
        >
          <van-icon slot="icon" class="left_icon">
            <img class="feedback" src="../assets/imgs/2021032401.png" alt="" />
          </van-icon>
        </van-cell>
        <van-cell
          v-if="!$device.zuoyebang"
          title="系统设置"
          size="large"
          is-link
          :to="{ name: 'Setting' }"
        >
          <van-icon slot="icon" class="left_icon">
            <img class="setting" src="../assets/imgs/2021032402.png" alt="" />
          </van-icon>
        </van-cell>
        <van-cell
          v-if="$device.zuoyebang"
          title="咨询客服"
          size="large"
          is-link
          url="tel:4006905100"
          @click="$recordClick('DYGK_029')"
        >
          <van-icon slot="icon" class="left_icon">
            <img class="setting" src="../assets/imgs/2022030701.png" alt="" />
          </van-icon>
        </van-cell>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GNavBar from '@/components/g/GNavBar.vue'
import { useStore } from '@/stores/app/user'

const user = useStore()
// import { mapState } from 'vuex'

// const data=reactive({
//   environment:'' || null
// })
const openVip = ref('开通会员')
const kaoshengType = ref('')
const fromchannel = ref(sessionStorage.getItem('fromchannel'))
const zybBuySite = ref('')
const environment = ref(sessionStorage.getItem('environment'))
// data() {
//   return {
//     // openVip: '开通会员',
//
//     // kaoshengType: '',
//     // fromchannel: '',
//     // zybBuySite: '',
//     // environment: ''
//   }
// },
// ---------------------
// computed: {
//   ...mapState({
//     agency: state => state.app.agency.config,
//     user: state => state.app.user
//     // userLiberalScience: state => state.app.userLiberalScience
//   })
// },
// -----------------------------

function init() {
  if (environment.value === 'test') {
    zybBuySite.value =
      'https://vip-yzg-e.suanshubang.com/static/hy/gaokao/package.html?ZybDisableLoading=1&fromchannel=' +
      fromchannel.value
  } else if (environment.value === 'tips') {
    zybBuySite.value =
      'https://vip.zuoyebang.com/static/hy/gaokao/package.html?ZybDisableLoading=1&__tips__=1&fromchannel=' +
      fromchannel.value
  } else {
    zybBuySite.value =
      'https://vip.zuoyebang.com/static/hy/gaokao/package.html?ZybDisableLoading=1&fromchannel=' +
      fromchannel.value
  }
  // if (this.$device.zuoyebang) this.openVip = '开通志愿填报卡'
  user.accessToken && this.getLiberalScienceList()
}

init()

function buyCard() {
  window.location.href = 'https://www.diyigaokao.com/mobileWxPay/index.html?prdApplyId=34'
}

// --------练习到这里---------
const getLiberalScienceList = function () {
  if (user.liberalScienceMode) {
    kaoshengType.value = user.liberalScienceMode.find(
      item => item.liberalScience === user.liberalScience
    ).name
    return
  }
  this.$api
    .get('/liberalSciencesNew', {
      params: {
        provinceId: this.user.provinceId,
        queryType: 5, // 计划数据
        year: this.user.gaoKaoYear
      }
    })
    .then(res => {
      const liberalScienceMode = res.data
      this.$store.commit('app/user/UPDATE_USER', { liberalScienceMode })
      const item = res.data.find(i => i.liberalScience === this.user.liberalScience)
      this.kaoshengType = item.name
      localStorage.setItem('liberalScienceList', JSON.stringify(res.data))
    })
    .catch(() => {})
}
// created() {
//   this.environment = sessionStorage.getItem('environment')
//   this.fromchannel = sessionStorage.getItem('fromchannel')
//   if (this.environment === 'test') {
//     this.zybBuySite =
//       'https://vip-yzg-e.suanshubang.com/static/hy/gaokao/package.html?ZybDisableLoading=1&fromchannel=' +
//       this.fromchannel
//   } else if (this.environment === 'tips') {
//     this.zybBuySite =
//       'https://vip.zuoyebang.com/static/hy/gaokao/package.html?ZybDisableLoading=1&__tips__=1&fromchannel=' +
//       this.fromchannel
//   } else {
//     // environment === 'prod'
//     this.zybBuySite =
//       'https://vip.zuoyebang.com/static/hy/gaokao/package.html?ZybDisableLoading=1&fromchannel=' +
//       this.fromchannel
//   }

//   if (this.$device.zuoyebang) this.openVip = '开通志愿填报卡'
//   this.user.accessToken && this.getLiberalScienceList()
// },
{
  // modifyInfo() {
  //   if (!(this.$device.zuoyebang || this.$device.miniProgram)) {
  //     this.$router.push({ name: 'ModifyInfo' })
  //   }
  // },
  // :to="{name: 'MemberShengXueCourse'}"
  // nav(route) {
  //   if (!this.user.accessToken) {
  //     this.$router.push({
  //       name: 'Login'
  //     })
  //   } else {
  //     this.$router.push({
  //       name: route
  //     })
  //   }
  // },
  // 购买前程卡
  // buyCard() {
  //   window.location.href = 'https://www.diyigaokao.com/mobileWxPay/index.html?prdApplyId=34'
  // },
  // androidClick() {
  //   if (this.$device.zuoyebang) {
  //     window.cordova.InAppBrowser.open(
  //       'https://vip.zuoyebang.com/static/hy/gaokao/package.html?ZybDisableLoading=1&hideNativeTitleBar=1',
  //       '_system'
  //     )
  //   } else {
  //     window.cordova.InAppBrowser.open(
  //       'https://www.diyigaokao.com/mobileWxPay/index.html?prdApplyId=34',
  //       '_system'
  //     )
  //   }
  // },
  // 获取文理科类
  // getLiberalScienceList() {
  //   // if (localStorage.getItem('liberalScienceList')) {
  //   //   this.kaoshengType = JSON.parse(localStorage.getItem('liberalScienceList')).find(i => i.liberalScience === this.user.liberalScience).name
  //   //   return
  //   // }
  //   if (this.user.liberalScienceMode) {
  //     this.kaoshengType = this.user.liberalScienceMode.find(
  //       item => item.liberalScience === this.user.liberalScience
  //     ).name
  //     return
  //   }
  //   this.$api
  //     .get('/liberalSciencesNew', {
  //       params: {
  //         provinceId: this.user.provinceId,
  //         queryType: 5, // 计划数据
  //         year: this.user.gaoKaoYear
  //       }
  //     })
  //     .then(res => {
  //       const liberalScienceMode = res.data
  //       this.$store.commit('app/user/UPDATE_USER', { liberalScienceMode })
  //       const item = res.data.find(i => i.liberalScience === this.user.liberalScience)
  //       this.kaoshengType = item.name
  //       localStorage.setItem('liberalScienceList', JSON.stringify(res.data))
  //     })
  //     .catch(() => {})
  // }
}
</script>

<style lang="scss">
.page-member {
  .hd {
    padding: 0 15px 20px;
    background-color: #fff;

    .link {
      display: flex;
      align-items: center;
      padding: 20px 0;
    }

    .avatar {
      width: 60px;
      height: 60px;
      overflow: hidden;
      border-radius: 50%;

      img {
        width: 100%;
      }
    }

    .info {
      padding-left: 15px;
      user-select: text;

      .username {
        display: block;
        padding-bottom: 4px;
        font-size: 18px;
        line-height: 1;
        color: #333;
      }

      .subinfo {
        font-size: 13px;

        span {
          display: inline-block;
          color: #666;
        }

        em {
          padding: 12px;
          font-size: 12px;
          color: #a0a5b1;
        }
      }

      .account {
        padding: 4px 0 8px;
        line-height: 1;
        color: #474e5a;
        text-align: center;
      }
    }
  }

  .user {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 78px;
    text-align: center;
    background-image: url(../assets/imgs/2020092402.png);
    background-size: cover;

    .tip {
      padding: 5px;
      color: #6c7481;
      text-align: left;
    }
  }

  .list {
    position: relative;

    .van-cell {
      align-items: center;

      &.van-cell--large {
        padding-top: 14px;
        padding-bottom: 14px;
      }

      &:first-child::before {
        position: absolute;
        top: 0;
        right: 16px;
        left: 16px;
        box-sizing: border-box;
        pointer-events: none;
        content: ' ';
        border-top: 1px solid #eee;
        transform: scaleY(0.5);
        transform: scaleY(0.5);
      }

      .icon_size {
        margin-left: -3px;
      }

      .left_icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        text-align: center;

        img {
          &.cart {
            width: 17px;
            height: 14px;
          }

          &.feedback {
            width: 13px;
            height: 16px;
          }

          &.setting {
            width: 15px;
            height: 16px;
          }
        }
      }
    }

    .a_van_cell {
      position: relative;
      display: block;

      &::after {
        position: absolute;
        right: 16px;
        bottom: 0;
        left: 16px;
        box-sizing: border-box;
        pointer-events: none;
        content: ' ';
        border-bottom: 1px solid #eee;
        transform: scaleY(0.5);
        transform: scaleY(0.5);
      }
    }

    .van-cell__left-icon {
      margin-right: 0;
      font-weight: bold;
      color: #3384ff;
    }

    .g-iconfont {
      font-size: 16px;
      color: #3384ff;
    }

    .van-cell__title {
      padding-left: 14px;
    }
  }
}
</style>
