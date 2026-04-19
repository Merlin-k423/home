<template>
  <div class="main-view">
    <ViewLeft />
    <ViewRight v-show="!mainStore.boxStatus" />
    <ViewOther v-show="mainStore.boxStatus" />
  </div>
</template>
<script setup>
import ViewLeft from './ViewLeft.vue'
import ViewRight from './ViewRight.vue'
import ViewOther from './ViewOther.vue'
import { useMainStore } from '../stores/mainStore'

const mainStore = useMainStore()
</script>

<style scoped lang="scss">
.main-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
</style>
