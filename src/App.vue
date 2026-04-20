<template>
  <Loading />
  <Background @bgLoaded="bgloaded" />

  <Transition name="fade" mode="out-in">
    <main id="main" v-if="mainStore.imgLoadStatus">
      <div class="container">
        <MainView />
      </div>
      <Footer />
    </main>
  </Transition>
</template>

<script setup>
import { nextTick } from 'vue'
import { checkDays, helloInit } from './utils/getTime'
import { useMainStore } from './stores/mainStore'
import Loading from './components/Loading.vue'
import Background from './components/Background.vue'
import Footer from './components/Footer.vue'
import MainView from './views/MainView.vue'
import { onMounted } from 'vue'
import { consoleText } from './utils/consoleText'
import cursorInit from './utils/cursor'

const mainStore = useMainStore()

// 壁纸加载完成后显示内容
const bgloaded = () => {
  nextTick(() => {
    helloInit()
    checkDays()
  })
}

// 控制台内容
const consoleInfo = [
  ["Merlin's home", '欢迎，这里是Merlin的主页，路途的起点'],
  ["Based on IMSYY's website Home.", 'Author IMSYY']
]
const consolePrint = () => {
  consoleText(consoleInfo, 'banner')
}

onMounted(() => {
  cursorInit()
  consolePrint()
})
</script>

<style scoped lang="scss">
#main {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 80%;
    height: 80%;
    margin: 0 auto;
    padding: 0 0.5vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
