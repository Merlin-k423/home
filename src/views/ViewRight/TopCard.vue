<template>
  <div class="top-card">
    <el-row :gutter="20">
      <el-col :span="12">
        <div class="hitokoto card">
          <Transition name="fade" mode="out-in">
            <div class="contents" @click="updateByClick" :key="hitokotoData.hitokoto">
              <span class="text">{{ hitokotoData.hitokoto }}</span>
              <span class="from">-「&nbsp;{{ hitokotoData.from }}&nbsp;」</span>
            </div>
          </Transition>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="time card">
          <div class="date">
            <span>{{ currentTime.year }} 年 </span>
            <span>{{ currentTime.month }} 月 </span>
            <span>{{ currentTime.day }} 日 </span>
            <span>{{ currentTime.weekdays }}</span>
          </div>
          <div class="date-clock">
            <span
              >{{ currentTime.hour }}:{{ currentTime.minute }}:{{
                currentTime.second
              }}</span
            >
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { Error } from '@icon-park/vue-next'
import { ElMessage } from 'element-plus'
import { h, onMounted, onUnmounted, reactive, ref } from 'vue'
import { getHitokoto } from '../../api'
import { debounce } from '../../utils/debounce'
import { getCurrentTime } from '../../utils/getTime'

const hitokotoData = reactive({
  hitokoto: '善恶错乱之世，同病相怜之人。',
  from: '佚名'
})
const hitokotoInterval = ref(null)
const abortController = ref(null)
const currentTime = ref({})
const timeInterval = ref(null)

const updateTime = () => {
  currentTime.value = getCurrentTime()
}
// 更新一言数据
const updateHitokoto = async () => {
  if (abortController.value) abortController.value.abort()
  abortController.value = new AbortController()
  const { signal } = abortController.value
  try {
    const data = await getHitokoto(signal)
    hitokotoData.hitokoto = data.hitokoto
    hitokotoData.from = data.from
  } catch (error) {
    if (hitokotoInterval.value) clearInterval(hitokotoInterval.value)
    ElMessage({
      message: '一言获取失败',
      icon: h(Error, {
        theme: 'filled',
        fill: '#efefef'
      })
    })
    hitokotoData.hitokoto = '无法获取一言数据，换个时间试试吧~。'
    hitokotoData.from = '系统提示(っ ̯ -｡)'
  }
}

const resetInterval = () => {
  if (hitokotoInterval.value) clearInterval(hitokotoInterval.value)
  updateByAuto()
}

const updateByClick = debounce(
  () => {
    updateHitokoto()
    resetInterval()
  },
  500,
  true
)

const updateByAuto = () => {
  hitokotoInterval.value = setInterval(updateHitokoto, 8000)
}

onMounted(() => {
  updateTime()
  updateByAuto()
  timeInterval.value = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(hitokotoInterval.value)
  clearInterval(timeInterval.value)
  if (abortController.value) abortController.value.abort()
})
</script>
<style scoped lang="scss">
.top-card {
  height: 165px;
  width: 100%;

  :deep(.el-row) {
    height: 100%;
  }

  :deep(.el-col) {
    height: 100%;
  }

  .hitokoto {
    width: 100%;
    height: 100%;
    padding: 20px;
    .contents {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .text {
        font-size: 1.1rem;
        word-break: break-all;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      .from {
        font-size: 1rem;
        margin-top: 10px;
        font-weight: bold;
        align-self: flex-end;
      }
    }
  }
  .time {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    .date {
      text-overflow: ellipsis;
      overflow-x: hidden;
      white-space: nowrap;
    }
    .date-clock {
      margin-top: 10px;
      font-size: 3.25rem;
      letter-spacing: 2px;
      font-family: 'UnidreamLED';
    }
  }
}
</style>
