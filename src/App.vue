<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import AchievementsSection from './components/AchievementsSection.vue'
import ContactSection from './components/ContactSection.vue'
import TelemetrySection from './components/TelemetrySection.vue'
import CommandPalette from './components/CommandPalette.vue'
import TerminalModal from './components/TerminalModal.vue'
import { profile } from './data/portfolio.js'
import { useShortcutLabel } from './composables/useShortcutLabel.js'
import { useTerminal } from './composables/useTerminal.js'

const themeOverrides = {
  common: {
    primaryColor: '#4ade80',
    primaryColorHover: '#86efac',
    primaryColorPressed: '#22c55e',
    primaryColorSuppl: '#4ade80',
    bodyColor: 'transparent',
    cardColor: '#0b0f14',
    modalColor: '#0b0f14',
    popoverColor: '#10161d',
    fontFamily: "'IBM Plex Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    fontFamilyMono: "'JetBrains Mono', ui-monospace, 'Cascadia Code', Consolas, monospace",
    borderRadius: '10px'
  }
}

const paletteOpen = ref(false)
const terminalOpen = useTerminal()

function onKeydown(e) {
  // Ignored while the terminal modal is open: two stacked modals would fight over the scroll lock.
  if (terminalOpen.value) return
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    paletteOpen.value = !paletteOpen.value
  }
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

const year = new Date().getFullYear()
const mod = useShortcutLabel()
</script>

<template>
  <div class="bg-grid" aria-hidden="true"></div>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-message-provider placement="bottom">
      <a href="#main" class="skip-link">Skip to content</a>
      <NavBar @open-palette="paletteOpen = true" />
      <main id="main">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
        <TelemetrySection />
      </main>
      <footer class="footer">
        <span>© {{ year }} {{ profile.name }}</span>
        <span class="footer__hint">Press <kbd>{{ mod }}</kbd> <kbd>K</kbd> to navigate</span>
      </footer>
      <CommandPalette v-model:open="paletteOpen" />
      <TerminalModal />
    </n-message-provider>
  </n-config-provider>
</template>

<style>
main {
  width: 100%;
  overflow-x: hidden;
}

.skip-link {
  position: fixed;
  top: 12px;
  left: 12px;
  z-index: 2000;
  padding: 10px 14px;
  border-radius: 8px;
  background: var(--primary);
  color: var(--on-primary);
  font-weight: 600;
  transform: translateY(-200%);
  transition: transform var(--dur-fast) ease;
}
.skip-link:focus {
  transform: none;
}

.footer {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 28px 24px 40px;
  border-top: 1px solid var(--border);
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-dim);
}

.footer__hint {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

@media (hover: none) {
  .footer__hint {
    display: none;
  }
}
</style>
