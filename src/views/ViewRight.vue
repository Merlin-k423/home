<template>
  <div class="view-right">
    <TopCard />
    <BottomCard />
  </div>
</template>
<script setup>
import TopCard from './ViewRight/TopCard.vue'
import BottomCard from './ViewRight/BottomCard.vue'
</script>
<style scoped lang="scss">
.view-right {
  width: 49%;
  margin-left: 0.75rem;

  :deep(.card) {
    animation: fade 0.5s;
  }
}
</style>
