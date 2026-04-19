<template>
  <div id="loader-main" :class="mainStore.imgLoadStatus ? 'loaded' : null">
    <div class="loader">
      <div class="loader-circle"></div>
      <div class="loader-text">
        <span>{{ siteName }}</span>
        <span class="tip">加载中</span>
      </div>
    </div>
    <div class="loader-section section-left"></div>
    <div class="loader-section section-right"></div>
  </div>
</template>
<script setup>
import { SITE_CONFIG } from '../config/site.config'
import { useMainStore } from '../stores/mainStore'

const mainStore = useMainStore()
const siteName = SITE_CONFIG.site.name
</script>
<style scoped lang="scss">
#loader-main {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;

  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .loader-circle {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      border: 3px solid transparent;
      border-top-color: #fff;
      animation: spin 1.8s linear infinite;
      z-index: 2;

      &::before {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        bottom: 5px;
        right: 5px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #a4a4a4;
        animation: spin-reverse 0.6s linear infinite;
      }

      &::after {
        content: '';
        position: absolute;
        top: 15px;
        left: 15px;
        bottom: 15px;
        right: 15px;
        border-radius: 50%;
        border: 3px solid transparent;
        border-top-color: #d3d3d3;
        animation: spin 1s linear infinite;
      }
    }

    .loader-text {
      margin-top: 40px;
      color: #fff;
      font-size: 24px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 2;

      .tip {
        margin-top: 8px;
        font-size: 18px;
        opacity: 0.75;
      }
    }
  }

  .loader-section {
    position: absolute;
    width: 51%;
    height: 100%;
    top: 0;
    background-color: #333;
    z-index: 1;

    &.section-left {
      left: 0;
    }
    &.section-right {
      right: 0;
    }
  }
  &.loaded {
    visibility: hidden;
    transform: translateY(-100%);
    transition:
      visibility 0.3s 1s ease-in-out,
      transform 0.3s 1s ease-in-out;

    .loader {
      .loader-text,
      .loader-circle {
        opacity: 0;
        transition: opacity 0.3s ease-out;
      }
    }

    .section-left {
      transform: translateX(-100%);
      transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
    .section-right {
      transform: translateX(100%);
      transition: transform 0.5s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
