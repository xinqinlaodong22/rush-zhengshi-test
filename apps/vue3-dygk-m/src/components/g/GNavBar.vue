<template>
  <div class="g-navbar">
    <van-nav-bar
      :title="title"
      :border="bottomBorder === true"
      :right-text="rightText"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template v-if="backButton === true" #left>
        <i v-if="backIcon === true" class="g-iconfont">&#xe666;</i>
        <slot name="left"></slot>
      </template>
      <template #right>
        <van-icon v-if="shareIcon === true" color="#666" name="share-o" size="16" />
        <slot name="right"></slot>
      </template>
    </van-nav-bar>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const props = defineProps<{
  // title
  title: string
  // 是否显示返回按钮
  backButton: boolean
  // 是否需要底部边框
  bottomBorder: boolean
  // 右侧文本
  rightText?: string
  // 是否显示返回图标
  backIcon: boolean
  // 分享按钮
  // shareIcon: {
  //   type: boolean
  //   default: false
  // }
  shareIcon: boolean
}>()

const emit = defineEmits(['onClickLeft', 'onClickRight'])

function onClickLeft() {
  props.backButton === true && emit('onClickLeft')
  props.backButton === true && router.go(-1)
}

function onClickRight() {
  emit('onClickRight')
}
</script>

<style lang="scss">
.g-navbar {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
}
</style>
