<template>
  <footer class="footer">
    <span class="footer-text">
      &copy; {{ startYear }} - {{ currentYear }} Made by
      <a :href="siteGitHub" target="_blank" rel="noopener noreferrer author">
        {{ siteAuthor }}
      </a>
    </span>
    <span v-if="siteIcp">
      &amp;
      <a href="#">{{ siteIcp }}</a>
    </span>
  </footer>
</template>

<script setup>
import { SITE_CONFIG } from '../config/site.config'

const currentYear = new Date().getFullYear()
const startYear = SITE_CONFIG.site.startDate
  ? SITE_CONFIG.site.startDate.substring(0, 4)
  : null
const siteAuthor = SITE_CONFIG.site.author
const siteGitHub = SITE_CONFIG.site.github
const siteIcp = SITE_CONFIG.site.icp
</script>

<style scoped lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 46px;
  font-size: 14px;
  text-align: center;
  word-break: break-all;
  white-space: nowrap;
  z-index: 0;
}
</style>
