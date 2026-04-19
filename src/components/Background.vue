<template>
  <div :class="mainStore.backgroundShow ? 'cover show' : 'cover'">
    <img
      v-show="mainStore.imgLoadStatus"
      :src="bgUrl"
      alt="cover"
      class="bg"
      @load="imgLoaded"
      @error="imgLoadError"
      @animationend="imgAnimationEnd"
    />
    <div :class="mainStore.backgroundShow ? 'gray hidden' : 'gray'"></div>
  </div>
</template>

<script setup>
import { Error } from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'
import { h, onUnmounted, onMounted, ref, watch } from 'vue'
import { useMainStore } from '../stores/mainStore'

const bgUrl = ref('')
const bgRandom = ref(0)
const mainStore = useMainStore()
const imgTimeout = ref(null)
const emit = defineEmits(['bgLoaded'])

// 随机图片
bgRandom.value = Math.floor(Math.random() * 4) + 1 // 生成1到5之间的随机数

// 切换壁纸类型
const changeBg = (type) => {
  if (type === '0') {
    bgUrl.value = `/src/assets/images/bg0${bgRandom.value}.jpg`
  } else if (type === '1') {
    bgUrl.value = 'https://api.dujin.org/bing/1920.php'
  } else if (type === '2') {
    bgUrl.value = 'https://api.vvhan.com/api/wallpaper/acg'
  }
}

// 图片加载完成后显示壁纸
const imgLoaded = () => {
  imgTimeout.value = setTimeout(
    () => {
      mainStore.setImgLoadStatus(true)
    },
    Math.floor(Math.random() * (300 + 1)) + 300
  )
}

// 图片显示失败
const imgLoadError = () => {
  console.error('壁纸加载失败：', bgUrl.value)
  ElMessage({
    message: '壁纸加载失败，已临时切换回默认',
    icon: h(Error, {
      theme: 'filled',
      fill: '#efefef'
    })
  })
  bgUrl.value = `/images/background${bgRandom}.jpg`
}

// 图片动画结束后显示壁纸
const imgAnimationEnd = () => {
  console.log('壁纸动画结束')
  emit('bgLoaded')
}

// 鼠标中键点击显示壁纸
window.addEventListener('mousedown', (e) => {
  if (e.button === 1) {
    mainStore.setBackgroundShow(!mainStore.backgroundShow)
    ElMessage({
      message: `已${mainStore.backgroundShow ? '开启' : '关闭'}壁纸展示`,
      grouping: true
    })
  }
})

// 监听壁纸类型变化
watch(
  () => mainStore.coverType,
  (newType) => {
    changeBg(newType)
  }
)

onMounted(() => {
  mainStore.setImgLoadStatus(false)
  changeBg(mainStore.coverType)
})

onUnmounted(() => {
  clearTimeout(imgTimeout.value)
})
</script>

<style scoped lang="scss">
.cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  &.show {
    z-index: 1;
  }

  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    backface-visibility: hidden;
    filter: blur(20px) brightness(0.3);
    transition:
      filter 0.3s,
      transform 0.3s;
    animation: fade-blur-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.45s;
  }

  .gray {
    opacity: 1;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0.32) 100%),
      radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.18) 166%);
    transition: 1.5s;
    &.hidden {
      opacity: 0;
    }
  }
}
</style>
