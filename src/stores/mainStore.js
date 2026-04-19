import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    imgLoadStatus: false, //背景图加载状态
    backgroundShow: false, //背景图展示状态
    coverType: '0', //背景类型 0为默认，1为随机背景， 2为acg背景
    boxStatus: false //盒子状态
  }),
  actions: {
    // 设置背景图加载状态
    setImgLoadStatus(value) {
      this.imgLoadStatus = value
    },
    // 设置背景图展示状态
    setBackgroundShow(value) {
      this.backgroundShow = value
    },
    // 设置盒子状态
    setBoxStatus(value) {
      this.boxStatus = value
    }
  },
  persist: {
    key: 'data',
    storage: window.localStorage,
    pick: ['coverType']
  }
})
