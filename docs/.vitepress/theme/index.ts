import DefaultTheme from 'vitepress/theme'
import Foo from './Foo.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('foo', Foo)
    }
}