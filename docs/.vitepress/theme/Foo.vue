<template>
  <div>
    hidsafdsfdsfadsafds
    <div>
      asdsada
    </div>
    <slot></slot>
    <button @click="click">点击我</button>
    <div>文本：{{text}}</div>
    <h1>{{ site.title }}</h1>
    <p>{{ site.description }}</p>
    <Content />
  </div>
</template>
<script setup lang="ts">
import { useData } from 'vitepress'
import { ref } from 'vue'
const { site, frontmatter } = useData()
const showModal = ref(false)
const text=ref("")

function click(){
  text.value=new Date().getTime()
}
</script>