<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NDrawer, NDrawerContent } from 'naive-ui'
import { Menu2, X, Search } from '@vicons/tabler'
import { profile, navLinks } from '../data/portfolio.js'
import { useActiveSection } from '../composables/useActiveSection.js'
import { useShortcutLabel } from '../composables/useShortcutLabel.js'

const emit = defineEmits(['open-palette'])

const scrolled = ref(false)
const progress = ref(0)
const drawerOpen = ref(false)
const active = useActiveSection(navLinks.map(l => l.href.slice(1)))
const mod = useShortcutLabel()

let ticking = false
function onScroll() {
  if (ticking) return
  ticking = true
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    scrolled.value = window.scrollY > 12
    progress.value = max > 0 ? window.scrollY / max : 0
    ticking = false
  })
}

function go(e, href) {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ block: 'start' })
  history.replaceState(null, '', href)
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
    <div class="navbar__progress" :style="{ transform: `scaleX(${progress})` }" aria-hidden="true" />
    <div class="navbar__inner">
      <a href="#hero" class="navbar__brand" @click="e => go(e, '#hero')">
        <span class="brand-prompt">~/</span>{{ profile.name.split(' ')[0].toLowerCase() }}<span class="brand-caret" aria-hidden="true">_</span>
      </a>

      <nav class="navbar__links" aria-label="Primary">
        <a
          v-for="link in navLinks"
          :key="link.href"
          :href="link.href"
          :class="{ 'is-active': active === link.href.slice(1) }"
          :aria-current="active === link.href.slice(1) ? 'true' : undefined"
          @click="e => go(e, link.href)"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="navbar__actions">
        <button class="navbar__cmd" type="button" :aria-label="`Open command menu (${mod}+K)`" @click="emit('open-palette')">
          <Search class="navbar__cmd-icon" aria-hidden="true" />
          <span class="navbar__cmd-text">Search</span>
          <kbd>{{ mod }} K</kbd>
        </button>
        <button
          class="navbar__hamburger"
          type="button"
          aria-label="Open menu"
          :aria-expanded="drawerOpen"
          @click="drawerOpen = true"
        >
          <Menu2 aria-hidden="true" />
        </button>
      </div>
    </div>

    <n-drawer v-model:show="drawerOpen" :width="300" placement="right">
      <n-drawer-content :native-scrollbar="false" body-content-style="padding: 0;">
        <div class="drawer-head">
          <span class="drawer-name"><span class="brand-prompt">~/</span>{{ profile.name.split(' ')[0].toLowerCase() }}</span>
          <button class="drawer-close" type="button" aria-label="Close menu" @click="drawerOpen = false">
            <X aria-hidden="true" />
          </button>
        </div>
        <nav class="drawer-nav" aria-label="Mobile">
          <a
            v-for="(link, i) in navLinks"
            :key="link.href"
            :href="link.href"
            :class="{ 'is-active': active === link.href.slice(1) }"
            @click="e => go(e, link.href)"
          >
            <span class="drawer-num">0{{ i + 1 }}</span>
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
  border-bottom: 1px solid transparent;
  transition: background var(--dur) ease, border-color var(--dur) ease;
}

.navbar--scrolled {
  background: rgba(6, 8, 11, 0.78);
  backdrop-filter: blur(16px) saturate(140%);
  -webkit-backdrop-filter: blur(16px) saturate(140%);
  border-bottom-color: var(--border);
}

.navbar__progress {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: linear-gradient(90deg, var(--primary), var(--cyan));
  transform-origin: left;
  pointer-events: none;
}

.navbar__inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.navbar__brand {
  font-family: var(--font-mono);
  font-weight: 600;
  font-size: 16px;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

.brand-prompt {
  color: var(--primary);
}

.brand-caret {
  color: var(--primary);
  animation: blink 1.1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.navbar__links {
  display: flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: rgba(11, 15, 20, 0.6);
}

.navbar__links a {
  font-size: 14px;
  color: var(--text-muted);
  padding: 8px 14px;
  border-radius: 999px;
  transition: color var(--dur-fast) ease, background var(--dur-fast) ease;
}

.navbar__links a:hover {
  color: var(--text);
}

.navbar__links a.is-active {
  color: var(--primary-strong);
  background: var(--primary-soft);
}

.navbar__actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar__cmd {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 8px 0 12px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(11, 15, 20, 0.6);
  color: var(--text-muted);
  font-size: 13px;
  cursor: pointer;
  transition: border-color var(--dur-fast) ease, color var(--dur-fast) ease;
}

.navbar__cmd:hover {
  border-color: var(--border-strong);
  color: var(--text);
}

.navbar__cmd-icon {
  width: 16px;
  height: 16px;
}

.navbar__hamburger,
.drawer-close {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: 1px solid var(--border);
  color: var(--text);
  border-radius: 10px;
  cursor: pointer;
}

.navbar__hamburger svg,
.drawer-close svg {
  width: 20px;
  height: 20px;
}

.drawer-close {
  display: inline-flex;
}

.drawer-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 16px 14px 20px;
  border-bottom: 1px solid var(--border);
}

.drawer-name {
  font-family: var(--font-mono);
  font-weight: 600;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.drawer-nav a {
  display: flex;
  align-items: center;
  gap: 14px;
  min-height: 52px;
  padding: 0 14px;
  border-radius: 10px;
  font-size: 16px;
  color: var(--text);
}

.drawer-nav a:hover,
.drawer-nav a.is-active {
  background: var(--primary-soft);
  color: var(--primary-strong);
}

.drawer-num {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-dim);
}

@media (max-width: 960px) {
  .navbar__links {
    display: none;
  }
  .navbar__hamburger {
    display: inline-flex;
  }
}

@media (max-width: 480px) {
  .navbar__cmd-text,
  .navbar__cmd kbd {
    display: none;
  }
  .navbar__cmd {
    width: 44px;
    height: 44px;
    padding: 0;
    justify-content: center;
  }
  .navbar__inner {
    padding: 8px 16px;
  }
}
</style>
