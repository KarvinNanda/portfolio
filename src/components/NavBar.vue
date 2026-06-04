<script setup>
import { ref, onMounted, onBeforeUnmount, h } from 'vue'
import { NDrawer, NDrawerContent, NButton, NIcon } from 'naive-ui'
import { Menu2, X } from '@vicons/tabler'
import { profile, navLinks } from '../data/portfolio.js'

const scrolled = ref(false)
const drawerOpen = ref(false)

function onScroll() {
  scrolled.value = window.scrollY > 12
}

function smoothScroll(e, href) {
  e.preventDefault()
  const target = document.querySelector(href)
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  drawerOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header :class="['navbar', { 'navbar--scrolled': scrolled }]">
    <div class="navbar__inner">
      <a href="#hero" class="navbar__brand" @click="e => smoothScroll(e, '#hero')">
        <!-- <span class="brand-dot" />
        {{ profile.name }} -->
      </a>

      <nav class="navbar__links">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          @click="e => smoothScroll(e, link.href)"
        >
          {{ link.label }}
        </a>
      </nav>

      <button
        class="navbar__hamburger"
        aria-label="Open menu"
        @click="drawerOpen = true"
      >
        <n-icon size="22"><Menu2 /></n-icon>
      </button>
    </div>

    <n-drawer v-model:show="drawerOpen" :width="280" placement="right">
      <n-drawer-content :native-scrollbar="false" body-content-style="padding: 0;">
        <div class="drawer-head">
          <span class="brand-dot" />
          <span class="drawer-name">{{ profile.name }}</span>
          <button
            class="drawer-close"
            aria-label="Close menu"
            @click="drawerOpen = false"
          >
            <n-icon size="20"><X /></n-icon>
          </button>
        </div>
        <nav class="drawer-nav">
          <a
            v-for="link in navLinks"
            :key="link.href"
            :href="link.href"
            @click="e => smoothScroll(e, link.href)"
          >
            {{ link.label }}
          </a>
        </nav>
      </n-drawer-content>
    </n-drawer>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  background: rgba(10, 15, 26, 0.6);
  border-bottom: 1px solid transparent;
  transition: background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease;
}

.navbar--scrolled {
  background: rgba(10, 15, 26, 0.75);
  backdrop-filter: saturate(180%) blur(14px);
  -webkit-backdrop-filter: saturate(180%) blur(14px);
  border-bottom-color: rgba(255, 255, 255, 0.08);
}

.navbar__inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.navbar__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: -0.01em;
}

.brand-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.18);
}

.navbar__links {
  display: flex;
  gap: 28px;
}

.navbar__links a {
  font-size: 14px;
  color: var(--text-muted);
  position: relative;
  transition: color 0.2s ease;
}

.navbar__links a:hover {
  color: var(--text);
}

.navbar__links a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -6px;
  width: 0;
  height: 1px;
  background: var(--accent);
  transition: width 0.2s ease;
}

.navbar__links a:hover::after {
  width: 100%;
}

.navbar__hamburger {
  display: none;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
}

.drawer-head {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 18px 20px;
  border-bottom: 1px solid var(--border);
}

.drawer-name {
  font-weight: 700;
  flex: 1;
}

.drawer-close {
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 8px;
  padding: 6px;
  cursor: pointer;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 12px 0;
}

.drawer-nav a {
  padding: 14px 20px;
  font-size: 15px;
  color: var(--text);
  border-bottom: 1px solid var(--border);
}

.drawer-nav a:hover {
  background: rgba(255, 255, 255, 0.03);
  color: var(--accent-strong);
}

@media (max-width: 820px) {
  .navbar__links {
    display: none;
  }
  .navbar__hamburger {
    display: inline-flex;
  }
}
</style>
