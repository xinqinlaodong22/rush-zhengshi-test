<template>
  <div :class="['g-tabbar', { 'g-tabbar-hidden': hidden }]">
    <ul>
      <li>
        <router-link class="link" :to="{ name: 'Index' }">
          <i class="g-iconfont">&#xe6e6;</i>
          <span>首页</span>
        </router-link>
      </li>
      <li>
        <router-link class="link" :to="{ name: 'ZhiyuanPlan' }">
          <i class="g-iconfont">&#xe6e5;</i>
          <span>志愿方案</span>
        </router-link>
      </li>
      <li>
        <router-link class="link" :to="{ name: 'Member' }">
          <i class="g-iconfont">&#xe6eb;</i>
          <span>我的</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
const route = useRoute()

const hidden = ref(true)
// 只有以下数组内的页面可见，一般是一级页面
const pages = reactive(['Index', 'ZhiyuanPlan', 'Member'])

if (pages.includes(route.name as string)) {
  hidden.value = false
}

watch(
  () => route.name,
  newValue => {
    if (pages.includes(newValue as string)) {
      hidden.value = false
    } else {
      hidden.value = true
    }
  }
)
</script>

<style lang="scss">
.g-tabbar {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  box-shadow: 0 -2px 6px rgb(170 170 170 / 20%);
  transition-duration: 0.4s;

  &.g-tabbar-hidden {
    transform: translate3d(0, 200%, 0);
  }

  ul {
    display: flex;
    align-items: center;
    justify-content: space-around;
  }

  li {
    width: 33.33%;
    text-align: center;

    .link,
    .icon,
    span {
      display: block;
    }

    .g-iconfont {
      font-size: 20px;
    }

    .link {
      box-sizing: border-box;
      height: 50px;
      padding: 8px 0 0;
      color: #a0a5b1;

      &.router-link-exact-active {
        color: #3384ff;

        .g-iconfont {
          color: #3384ff;
        }
      }
    }

    span {
      padding-top: 3px;
      font-size: 10px;
    }
  }
}
</style>
