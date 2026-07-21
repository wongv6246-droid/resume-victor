<template>
  <div id="app-root">
    <nav class="nav-bar">
      <router-link to="/" class="nav-brand">
        <span class="brand-accent">王泽伟</span>
        <span> - 个人求职</span>
      </router-link>
      <ul class="nav-links">
        <li>
          <router-link to="/" class="nav-link" exact-active-class="active">
            📋 个人简介
          </router-link>
        </li>
        <li>
          <router-link to="/portfolio" class="nav-link" active-class="active">
            🎨 作品集
          </router-link>
        </li>
      </ul>
    </nav>
    <main class="main-container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
// 页面标题同步
import { watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
watch(() => route.meta?.title, (title) => {
  if (title) document.title = `${title} - 王泽伟`
})
</script>
