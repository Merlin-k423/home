<template>
  <div
    class="view-other card"
    @mouseenter="closeShow = true"
    @mouseleave="closeShow = false"
  >
    <transition name="fade" mode="out-in">
      <CloseOne
        class="close"
        theme="filled"
        size="28"
        fill="#ffffff60"
        v-show="closeShow"
        @click="mainStore.setBoxStatus(false)"
      />
    </transition>
    <div class="content">
      <div class="time">
        <div class="title">
          <HourglassFull
            theme="two-tone"
            size="24"
            :fill="['#efefef', '#00000020']"
          />
          <span> 时光胶囊 </span>
        </div>
        <div class="timeCapsule">
          <div
            v-for="(item, tag, index) in timeData"
            :key="index"
            class="timeCapsule-item"
          >
            <div class="item-title">
              <span class="title-left">
                {{ item.name }}已度过
                <strong>{{ item.passed }}</strong>
                {{ tag === 'day' ? '小时' : '天' }}
              </span>
              <span class="title-right">
                剩余 {{ item.remaining }} {{ tag === 'day' ? '小时' : '天' }}
              </span>
            </div>
            <el-progress
              :text-inside="true"
              :stroke-width="20"
              :percentage="parseFloat(item.percentage)"
            />
          </div>
        </div>
      </div>
      <div class="others">
        <el-collapse class="collapse" v-model="activeNames" accordion>
          <el-collapse-item title="其他信息" name="1">
            <div class="bg-set">
              <el-radio-group v-model="mainStore.coverType">
                <el-radio value="'0'" size="large" border>默认背景</el-radio>
                <el-radio value="'1'" size="large" border>随机背景</el-radio>
                <el-radio value="'2'" size="large" border>ACG背景</el-radio>
              </el-radio-group>
            </div>
            <div class="log">
              <el-card class="log-card" shadow="hover">
                <template #header>
                  <div class="card-header">
                    <span>记事杂录</span>
                  </div>
                </template>
                <div class="log-note">
                  <div v-for="item in notes" :key="item" class="log-text">
                    <p>- {{ item }}</p>
                  </div>
                </div>
              </el-card>
            </div>
          </el-collapse-item>
        </el-collapse>
        <div class="version">
          <span class="num">v {{ config.version }}</span>
          <GithubOne class="github" theme="outline" size="24" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { CloseOne, GithubOne, HourglassFull } from '@icon-park/vue-next'
import { onMounted, onUnmounted, ref } from 'vue'
import { useMainStore } from '../stores/mainStore'
import { getTimeCapsule } from '../utils/getTime'
import config from '@/../package.json'
import { SITE_CONFIG } from '../config/site.config'

const mainStore = useMainStore()
const closeShow = ref(false)
const timeData = ref(getTimeCapsule())
const timeInterval = ref(null)
const activeNames = ref([])
const notes = SITE_CONFIG.notes || []
onMounted(() => {
  timeInterval.value = setInterval(() => {
    timeData.value = getTimeCapsule()
  }, 1000)
})

onUnmounted(() => {
  clearInterval(timeInterval.value)
})
</script>
<style scoped lang="scss">
.view-other {
  width: 49%;
  height: 100%;
  animation: fade 0.5s;
  overflow-y: auto;

  .close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 28px;
    height: 28px;
    transition:
      transform 0.3s,
      opacity 0.3s;
  }
  .content {
    display: flex;
    flex-direction: column;
    padding: 30px;
    width: 100%;
    height: 100%;

    .time {
      .title {
        display: flex;
        align-items: center;
        margin: 0.2rem 0 1rem;
        font-size: 1.1rem;
        .i-icon {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 6px;
        }
      }
      .timeCapsule {
        .timeCapsule-item {
          margin-bottom: 1rem;
          .item-title {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.25rem;
            .title-left {
              font-size: 0.9rem;
            }
            .title-right {
              opacity: 0.6;
              font-size: 0.85rem;
              font-style: oblique;
            }
          }
        }
      }
    }
    .others {
      .collapse {
        border-radius: 8px;
        --el-collapse-content-bg-color: #ffffff10;
        border-color: transparent;
        overflow: hidden;

        :deep(.el-collapse-item__header) {
          background-color: #ffffff30;
          color: #fff;
          font-size: 15px;
          padding-left: 18px;
          border-color: transparent;
        }

        :deep(.el-collapse-item__wrap) {
          border-color: transparent;

          .el-collapse-item__content {
            padding: 20px;
            .el-radio-group {
              .el-radio {
                margin: 2px 10px 2px 0;
                border-radius: 5px;

                &:last-child {
                  margin-right: 0;
                }
              }
            }
          }
          .el-radio-group {
            justify-content: space-between;

            .el-radio {
              margin: 10px 16px;
              background: #ffffff26;
              border: 2px solid transparent;
              border-radius: 8px;

              .el-radio__label {
                color: #fff;
              }

              .el-radio__inner {
                background: #ffffff06 !important;
                border: 2px solid #eeeeee !important;
              }

              &.is-checked {
                background: #ffffff06 !important;
                border: 2px solid #eeeeee !important;
              }

              .is-checked {
                .el-radio__inner {
                  background-color: #ffffff30 !important;
                  border-color: #fff !important;
                }

                & + .el-radio__label {
                  color: #fff !important;
                }
              }
            }
          }
        }
        .log {
          margin-top: 16px;
          .log-card {
            :deep(.el-card__header) {
              font-size: 16px;
              padding: 8px 20px !important;
            }
            .log-note {
              padding: 20px;

              // .log-text{
              //      padding-bottom: 16px;
              // }
            }
          }
        }
      }
      .version {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 22px;
        font-family: 'Playball';
        .num {
          margin-top: 8px;
        }
        .github {
          width: 24px;
          height: 24px;
          margin-left: 12px;
        }
      }
    }
  }
}
</style>
