export default {
    lang: 'zh-CN',
    ignoreDeadLinks: true,
    title: 'SimplePro',
    base: '/docs/simplepro/',
    themeConfig: {
        siteTitle: 'SimplePro 文档',
        logo: '/logo.png',
        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2019-present Evan You'
        },
        search: {
            provider: 'local'
        },
        externalLinkIcon: true,
        outlineTitle: '大纲',
        lastUpdated: true,
        socialLinks: [
            { icon: 'github', link: 'https://github.com/newpanjing/simplepro_demo' }
        ],
        editLink: {
            pattern: 'https://github.com/newpanjing/simple_plus_docs/edit/main/docs/:path'
        },
        nav: [
            { text: '社区', link: 'https://www.mldoo.com' },
            { text: '首页', link: '/' },
            { text: '路线图🗺', link: '/roadmap' },
            { text: '指南', link: '/guide/description' },
            { text: '配置', link: '/config/global/' },
            { text: '组件', link: '/widget/checkbox' },
            {
                text: '版本', items: [
                    {
                        text: '7.3',
                        items: [
                            { text: 'v7.3.2', link: '/version/7.3.2' },
                            { text: 'v7.3', link: '/version/7.3' },
                        ]
                    },
                    {
                        text: '7.2',
                        items: [
                            { text: 'v7.2.4', link: '/version/7.2.4' },
                            { text: 'v7.2', link: '/version/7.2' },
                        ]
                    },
                    { text: 'v7.1', link: '/version/7.1' },
                    { text: 'v7.0', link: '/version/7.0' },
                ]
            },
            { text: '演示', link: 'https://www.mldoo.com/demo/simplepro' },
        ],
        sidebar: {
            '/': [
                {
                    text: '首页', link: '/',
                },
                {
                    text: '入门指南', items: [
                        { text: '介绍', link: '/guide/description' },
                        { text: '购买', link: '/guide/purchase' },
                        { text: '示例', link: '/guide/demo' },
                        { text: '使用帮助', link: '/guide/contact' },
                    ]
                }, {
                    text: '使用和安装',
                    items: [
                        { text: '安装配置', link: '/guide/project_config' },
                        { text: '激活和绑定', link: '/guide/activate' },
                    ]
                },
                {
                    text: '进阶配置', items: [
                        {
                            text: '全局配置', link: '/config/global/',
                        },
                        {
                            text: 'Pro组件', link: '/widget/checkbox',
                        },
                        { text: 'Admin配置', link: '/config/admin/field' },
                        { text: '主题配置', link: '/config/theme' },
                        { text: 'JS-SDK', link: '/config/jssdk' },
                        { text: '自定义权限', link: '/config/permissions' },
                        { text: '可视化图表', link: '/config/chat' },
                        { text: '富文本插件', link: '/config/editor' },
                    ]
                }, {
                    text: '常见问题', items: [
                        { text: '静态文件', link: '/faq/static' },
                        { text: '安装问题', link: '/faq/install' },
                        { text: '常见错误', link: '/faq/error' },
                        { text: '相关资料', link: '/faq/other' },
                    ]
                }
            ],
            '/config/admin': [
                { text: "<-- 文档首页", link: "/" },
                {
                    text: "Admin配置", items: [
                        { text: "字段&方法", link: "/config/admin/field" },
                        { text: "自定义按钮", link: "/config/admin/action" },
                        { text: "动态显示", link: "/config/admin/dynamic_display" },
                        { text: "弹出层Layer", link: "/config/admin/layer" },
                        { text: "单元格Dialog", link: "/config/admin/dialog" },
                        { text: "单元格调用Aciton", link: "/config/admin/cell_action" },
                    ]
                },
            ],
            '/config/global': [
                { text: "<-- 文档首页", link: "/" },
                {
                    text: "全局配置", items: [
                        { text: "主页配置", link: "/config/global/" },
                        { text: "授权信息", link: "/config/global/licence" },
                        { text: "站点标题", link: "/config/global/site" },
                        { text: "收藏夹图标", link: "/config/global/favicon" },
                        { text: "Logo", link: "/config/global/logo" },
                        { text: "图标", link: "/config/global/icon" },
                        { text: "菜单", link: "/config/global/menu" },
                        { text: "外键搜索", link: "/config/global/fk" },
                    ]
                },
            ],
            '/widget/': [
                { text: "<-- 文档首页", link: "/" },
                {
                    text: "基础组件", items: [
                        { text: "复选框", link: "/widget/checkbox" },
                        { text: "单选框", link: "/widget/radio" },
                        { text: "切换", link: "/widget/switch" },
                        { text: "数字输入框", link: "/widget/input_number" },
                        { text: "滑块", link: "/widget/slider" },
                        { text: "评分", link: "/widget/rate" },
                        { text: "文本输入框", link: "/widget/char" },
                        { text: "时间选择器", link: "/widget/time" },
                        { text: "日期选择器", link: "/widget/date" },
                        { text: "日期时间选择器", link: "/widget/datetime" },
                    ]
                }, {
                    text: "外键组件", items: [
                        { text: "IntegerField", link: "/widget/integer_field" },
                        { text: "ForeignKey外键", link: "/widget/foreignkey" },
                        { text: "OneToOneField", link: "/widget/onetoone" },
                        { text: "ManyToManyField多选", link: "/widget/manytomany" },
                        { text: "Transfer穿梭框", link: "/widget/transfer" },
                        { text: "树形下拉框", link: "/widget/tree" },
                    ]
                },
                {
                    text: "高级组件", items: [
                        { text: "图片上传", link: "/widget/image_upload" },
                        { text: "富文本编辑器", link: "/config/editor" },
                        { text: "地图插件", link: "/widget/map" },
                        { text: "视频播放器", link: "/widget/player" },
                    ]
                }

            ]
        },
    }
}