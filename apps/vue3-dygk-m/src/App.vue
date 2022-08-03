<template>
  <div>
    <aaa></aaa>
    <div class="view">
      <router-view></router-view>
    </div>
    <GTabBar></GTabBar>
  </div>
</template>

<script setup lang="ts">
import GTabBar from './components/g/GTabBar.vue'
import aaa from './views/aaa.vue'
</script>
