/**
 * 站点全局静态配置
 * 使用 Object.freeze() 冻结对象，防止运行时被意外修改
 */
const resolveAsset = (relativePath) =>
  new URL(relativePath, import.meta.url).href

export const SITE_CONFIG = Object.freeze({
  // 站点基础信息
  site: Object.freeze({
    name: 'entelecheia',
    title: 'Merlinの主页',
    author: 'merlin',
    description: '一个不知名的主页',
    icp: '',
    startDate: '2025-4-1'
  }),

  // 标语
  desc: Object.freeze({
    english:
      'The only limit to our realization of tomorrow is our doubts of today.',
    chinese: '我们对实现明天的唯一限制是我们今天的疑虑',
    tips: 'Oops !',
    tipsText: '哎呀，这都被你发现了（ 再点击一次可关闭 ）'
  }),

  notes: Object.freeze([
    '站点的设计灵感来源于imsyy的开源项目。',
    '所有图标均来自于 IconPark 图标库，使用时遵循其授权协议。',
    '站点的背景图片来自于网络，版权归原作者所有，如有侵权请联系本人删除。'
  ])
})

export const SITE_LINKS = Object.freeze({
  siteLinks: Object.freeze([
  {
    "icon": "Blog",
    "name": "博客",
    "link": "https://blog.imsyy.top/"
  },
  {
    "icon": "Search",
    "name": "搜索",
    "url": "https://kaifa.baidu.com/"
  },
  {
    "icon": "Train",
    "name": "开往",
    "link": "https://www.foreverblog.cn/go.html"
  },
  {
    "icon": "Code",
    "name": "分享",
    "link": "https://blog.imsyy.top/"
  },
  {
    "icon": "Box",
    "name": "扩建中",
    "link": "#"
  }
  ]),
  socialLinks: Object.freeze([
    {
      name: 'Github',
      icon: '/github.png',
      tip: '去 Github 看看',
      url: 'https://github.com/Merlin-k423'
    },
    {
      name: 'BiliBili',
      icon: '/bilibili.png',
      tip: '(゜-゜)つロ 干杯 ~',
      url: 'https://space.bilibili.com/413028526'
    },
    {
      name: 'QQ',
      icon: '/qq.png',
      tip: '有什么事吗',
      url: 'https://res.abeim.cn/api/qq/?qq=1689477059'
    },
    {
      name: 'Email',
      icon: '/email.png',
      tip: '来封 Email ~',
      url: 'mailto:1689477059@qq.com'
    }
  ])
})