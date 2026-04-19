import axios from 'axios'

const HITOKOTO_API = import.meta.env.VITE_HITOKOTO_API

// 获取一言数据
export const getHitokoto = async (signal) => {
  try {
    const { data } = await axios.get(HITOKOTO_API, { signal })
    return data
  } catch (error) {
    console.error('请求一言失败：', error)
    throw error
  }
}
