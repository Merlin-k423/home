<template>
  <div class="view-left">
    <div class="logo">
      <img class="logo-img" :src="siteLogo" alt="logo" />
      <span class="name">
        {{ siteName }}
      </span>
    </div>
    <div class="desc card" @click="changeBox">
      <Icon size="16">
        <QuoteLeft />
      </Icon>
      <Transition name="fade" mode="out-in">
        <div class="text" :key="siteDesc.firstText">
          <p>{{ siteDesc.firstText }}</p>
          <p>{{ siteDesc.secondText }}</p>
        </div>
      </Transition>
      <Icon size="16">
        <QuoteRight />
      </Icon>
    </div>
    <div class="socialLink">
      <div class="link">
        <a
          v-for="link in socialLinks"
          :key="link.name"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          @mouseenter="socialTip = link.tip"
          @mouseleave="socialTip = '通过这里联系我吧'"
        >
          <img :src="link.icon" class="icon" :alt="link.name" />
        </a>
      </div>
      <span class="tip">{{ socialTip }}</span>
    </div>
  </div>
</template>
<script setup>
import { Icon } from '@vicons/utils'
import { SITE_CONFIG, SITE_LINKS } from '../config/site.config'
import { QuoteLeft, QuoteRight } from '@vicons/fa'
import { useMainStore } from '../stores/mainStore'
import { reactive, watch } from 'vue'

const mainStore = useMainStore()
const siteLogo = SITE_CONFIG.logo.main
const siteName = SITE_CONFIG.site.name
const socialLinks = SITE_LINKS.socialLinks
const socialTip = ref('通过这里联系我吧')

const siteDesc = reactive({
  firstText: SITE_CONFIG.desc.english,
  secondText: SITE_CONFIG.desc.chinese
})

// 切换盒子状态
const changeBox = () => {
  mainStore.setBoxStatus(!mainStore.boxStatus)
}

// 监听盒子状态变化，更新描述文本
watch(
  () => mainStore.boxStatus,
  (newVal) => {
    if (newVal) {
      siteDesc.firstText = SITE_CONFIG.desc.tips
      siteDesc.secondText = SITE_CONFIG.desc.tipsText
    } else {
      siteDesc.firstText = SITE_CONFIG.desc.english
      siteDesc.secondText = SITE_CONFIG.desc.chinese
    }
  }
)
</script>
<style scoped lang="scss">
.view-left {
  width: 50%;
  margin-right: 10px;
  transform: translateY(20px);
  .logo {
    display: flex;
    align-items: center;
    .logo-img {
      width: 120px;
      height: auto;
      border-radius: 50%;
    }
    .name {
      font-size: 4rem;
      font-family: 'Playball', cursive;
      padding-left: 22px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .desc {
    padding: 1rem;
    margin-top: 3.5rem;
    height: 146px;
    max-width: 460px;
    display: flex;
    justify-content: space-between;
    .text {
      margin: 0.75rem 1rem;
      line-height: 2rem;
      margin-right: auto;
      transition: opacity 0.2s;
      p:nth-of-type(1) {
        font-family: 'Playball';
        font-size: 22px;
      }
    }
    .xicon:nth-of-type(2) {
      align-self: flex-end;
    }
  }
  .socialLink {
    margin-top: 1rem;
    height: 42px;
    width: 100%;
    max-width: 460px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    border-radius: 6px;
    backdrop-filter: blur(0px);
    transition:
      backdrop-filter 0.3s,
      background-color 0.3s;
    a {
      width: 24px;
      height: 24px;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      .icon {
        height: 24px;
        margin: 0 12px;
        transition: transform 0.3s;
        &:hover {
          transform: scale(1.1);
        }
        &:active {
          transform: scale(0.9);
        }
      }
    }
    .tip {
      display: none;
      margin-right: 12px;
    }

    &:hover {
      background-color: #00000040;
      backdrop-filter: blur(5px);
      .tip {
        display: block;
      }
    }
  }
}
</style>
