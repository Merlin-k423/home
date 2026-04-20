<template>
  <div class="bottom-card">
    <div class="line">
      <Icon size="20">
        <Link />
      </Icon>
      <span class="title"> 网站列表 </span>
    </div>

    <swiper
      :modules="[pagination, mousewheel]"
      :slides-per-view="'1'"
      :space-between="40"
      :pagination="{
        el: '.swiper-pagination',
        clickable: true,
        bulletElement: 'div'
      }"
      :mousewheel="true"
    >
      <swiper-slide v-for="page in pagedSiteLinks" :key="page.id">
        <el-row :gutter="20" class="link-row">
          <el-col :span="8" v-for="(link, index) in page.items" :key="link.url">
            <div
              class="items card"
              :style="index < 3 ? 'margin-bottom: 20px' : null"
            >
              <a :href="link.url" class="site-link" rel="noopener noreferrer">
                <Icon size="26">
                  <component :is="iconMap[link.icon]" />
                </Icon>
                <span class="link-name">{{ link.name }}</span>
              </a>
            </div>
          </el-col>
        </el-row>
      </swiper-slide>
      <div class="swiper-pagination"></div>
    </swiper>
  </div>
</template>
<script setup>
import { Icon } from '@vicons/utils'
import { SITE_LINKS } from '../../config/site.config'
import { Swiper, SwiperSlide } from 'swiper/vue'
import {
  Mousewheel as mousewheel,
  Pagination as pagination
} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import {
  Blog,
  Search,
  Train,
  Code,
  Box,
  Link
} from '@vicons/fa'
import { computed } from 'vue'

const siteLinks = SITE_LINKS.siteLinks

const iconMap = {
  Blog,
  Search,
  Train,
  Code,
  Box
}

// 每页显示的链接数量
const PAGE_SIZE = 6

const pagedSiteLinks = computed(() => {
  const pageCount = Math.ceil(siteLinks.length / PAGE_SIZE)
  return Array.from({ length: pageCount }, (_, pageIndex) => {
    const start = pageIndex * PAGE_SIZE
    return {
      id: `page-${pageIndex + 1}`,
      items: siteLinks.slice(start, start + PAGE_SIZE)
    }
  })
})
</script>
<style scoped lang="scss">
.bottom-card {
  .line {
    margin: 2rem 0.25rem 1rem;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    .title {
      font-size: 1.15rem;
      margin-left: 8px;
      text-shadow: 0 0 5px #00000050;
    }
  }

  .swiper {
    left: -10px;
    width: calc(100% + 20px);
    padding: 5px 10px 12px;
    z-index: 0;
    .swiper-slide {
      height: 100%;
    }
    .swiper-pagination {
      position: static;
      width: 100%;
      margin-top: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      :deep(.swiper-pagination-bullet) {
        background-color: #fff;
        width: 20px;
        height: 4px;
        margin: 0 4px;
        border-radius: 4px;
        opacity: 0.2;
        transition: opacity 0.3s;
        &.swiper-pagination-bullet-active {
          opacity: 1;
        }
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  .link-row {
    height: 220px;
    .items {
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;
      &:hover {
        transform: scale(1.02);
        background: rgb(0 0 0 / 40%);
        transition: 0.3s;
      }

      .site-link {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        .link-name {
          font-size: 1.1rem;
          margin-left: 8px;
        }

        &:hover {
          color: #fff;
          text-decoration: none;
        }
      }
    }
  }
}
</style>
