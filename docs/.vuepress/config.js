module.exports = {
	title: 'IndulgeBack',
	description: 'May there be enough clouds in your life to make a beautiful sunset.',
	theme: 'reco',
	logo: '/logo.png',
	base: '/',
	locales: {
		'/': {
			lang: 'zh-CN'
		}
	},
	head: [
		['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
		["link", { rel: "icon", href: "/logo.png" }],
	],
	themeConfig: {
		author: 'Liuwy',
		authorAvatar: '/logo.png',
		blogConfig: {
			category: {
				location: 2,     // 在导航栏菜单中所占的位置，默认2
				text: '分类'     // 默认文案 “分类”
			},
			tag: {
				location: 3,     // 在导航栏菜单中所占的位置，默认3
				text: '标签'      // 默认文案 “标签”
			},
			socialLinks: [     // 信息栏展示社交信息
				{ link: "https://juejin.cn/user/1410020421418286", icon: 'reco-juejin' },
				{ link: "https://github.com/indulgeback", icon: 'reco-github' },
				{ link: "https://blog.csdn.net/weixin_63001592", icon: 'reco-csdn' },
			]
		},
		type: 'blog',
		subSidebar: 'auto',//在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
		nav: [
			{ text: "首页", link: "/", icon: 'reco-home' },
			{ text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' },
			{
				text: "关注我",
				items: [
					{ text: "掘金", link: "https://juejin.cn/user/1410020421418286", icon: 'reco-juejin' },
					{ text: "GitHub", link: "https://github.com/indulgeback", icon: 'reco-github' },
					{ text: "CSDN", link: "https://blog.csdn.net/weixin_63001592", icon: 'reco-csdn' }
				],
				icon: 'reco-three'
			},
		]
	},
	plugins: [
		// 提示更新网站内容
		[
			'@vuepress/pwa', {
				serviceWorker: true,
				updatePopup: {
					message: '发现新内容可用',
					buttonText: '刷新'
				}
			}
		],
		// 返回最上面的吊绳猫
		[
			'go-top'
		],
		// 点击小星星
		[
			'cursor-effects', {
				size: 2, // size of the particle, default: 2
				shape: 'star', // ['star' | 'circle'], // shape of the particle, default: 'star'
				zIndex: 999999999, // z-index property of the canvas, default: 999999999
			}
		],
		// 看板娘
		[
			'vuepress-plugin-helper-live2d', {
				live2d: {
					// 是否启用(关闭请设置为false)(default: true)
					enable: true,
					// 模型名称(default: hibiki)>>>取值请参考：
					// https://github.com/JoeyBling/hexo-theme-yilia-plus/wiki/live2d%E6%A8%A1%E5%9E%8B%E5%8C%85%E5%B1%95%E7%A4%BA
					model: 'shizuku',
					display: {
						position: "right", // 显示位置：left/right(default: 'right')
						width: 205.5, // 模型的长度(default: 135)
						height: 450, // 模型的高度(default: 300)
						hOffset: 150, //  水平偏移(default: 65)
						vOffset: 0, //  垂直偏移(default: 0)
					},
					mobile: {
						show: false // 是否在移动设备上显示(default: false)
					},
					react: {
						opacity: 0.8 // 模型透明度(default: 0.8)
					}
				}
			}
		],
		// 随机彩带
		[
			'ribbon-animation',
			{
				size: 120, // 默认数据
				opacity: 0.3, //  透明度
				zIndex: -1, //  层级
				opt: {
					// 色带HSL饱和度
					colorSaturation: '80%',
					// 色带HSL亮度量
					colorBrightness: '60%',
					// 带状颜色不透明度
					colorAlpha: 0.65,
					// 在HSL颜色空间中循环显示颜色的速度有多快
					colorCycleSpeed: 6,
					// 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
					verticalPosition: 'max',
					// 到达屏幕另一侧的速度有多快
					horizontalSpeed: 200,
					// 在任何给定时间，屏幕上会保留多少条带
					ribbonCount: 2,
					// 添加笔划以及色带填充颜色
					strokeSize: 0,
					// 通过页面滚动上的因子垂直移动色带
					parallaxAmount: -0.5,
					// 随着时间的推移，为每个功能区添加动画效果
					animateSections: true
				},
				//  点击彩带  true显示  false为不显示
				ribbonShow: false,
				// 滑动彩带
				ribbonAnimationShow: true
			}
		],
		// 有趣的标题
		[
			'dynamic-title',
			{
				// showIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
				showText: '(/≧▽≦/)欢迎回来~~',
				// hideIcon: 'https://www.typescriptlang.org/favicon-32x32.png?v=8944a05a8b601855de116c8a56d3b3ae',
				hideText: '/(ㄒoㄒ)/你不要走啊~~',
				recoverTime: 1000,
			},
		],
		// 樱花
		[
			"sakura", {
				num: 20,  // 默认数量
				show: true, //  是否显示
				zIndex: -1,   // 层级
				img: {
					replace: false,  // false 默认图 true 换图 需要填写httpUrl地址
					httpUrl: '...'     // 绝对路径
				}
			}
		],
		// 音乐播放器
		[
			'@vuepress-reco/vuepress-plugin-bgm-player',
			{
				audios: [
					{
						name: '暗号',
						artist: '周杰伦',
						url: '/bgm/暗号 - 周杰伦.mp3',
						cover: '/bgm/暗号.png'
					},
					{
						name: '单车',
						artist: '陈奕迅',
						url: '/bgm/单车 - 陈奕迅.mp3',
						cover: '/bgm/单车.png'
					},
					{
						name: 'lemon',
						artist: '米津玄師',
						url: '/bgm/Lemon - 米津玄師.mp3',
						cover: '/bgm/lemon.png'
					},
					{
						name: 'LoveYourself',
						artist: 'JustinBieber',
						url: '/bgm/LoveYourself - JustinBieber.mp3',
						cover: '/bgm/LoveYourself.png'
					},
					{
						name: '半岛铁盒',
						artist: '周杰伦',
						url: '/bgm/半岛铁盒 - 周杰伦.mp3',
						cover: '/bgm/半岛铁盒.png'
					},
					{
						name: '富士山下',
						artist: '陈奕迅',
						url: '/bgm/富士山下 - 陈奕迅.mp3',
						cover: '/bgm/富士山下.png'
					},
					{
						name: '珊瑚海',
						artist: '周杰伦、Lara梁心颐',
						url: '/bgm/珊瑚海 - 周杰伦、Lara梁心颐.mp3',
						cover: '/bgm/珊瑚海.png'
					},
					{
						name: 'LOSER',
						artist: '米津玄師',
						url: '/bgm/LOSER - 米津玄師.mp3',
						cover: '/bgm/LOSER.png'
					},
					{
						name: '红玫瑰',
						artist: '陈奕迅',
						url: '/bgm/红玫瑰 - 陈奕迅.mp3',
						cover: '/bgm/红玫瑰.png'
					}
				],
				// 是否默认缩小
				autoShrink: false,
				// 缩小时缩为哪种模式
				shrinkMode: 'float',
				// 悬浮窗样式
				floatStyle: { bottom: '10px', 'z-index': '999999' }
			}
		]
	],

}