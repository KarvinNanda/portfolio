<script setup>
import { onMounted } from 'vue'
import { NConfigProvider, NMessageProvider, darkTheme } from 'naive-ui'
import NavBar from './components/NavBar.vue'
import HeroSection from './components/HeroSection.vue'
import ExperienceSection from './components/ExperienceSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import ProjectsSection from './components/ProjectsSection.vue'
import AchievementsSection from './components/AchievementsSection.vue'
import ContactSection from './components/ContactSection.vue'

const themeOverrides = {
  common: {
    primaryColor: '#10b981',
    primaryColorHover: '#34d399',
    primaryColorPressed: '#059669',
    primaryColorSuppl: '#10b981',
    bodyColor: 'transparent',
    cardColor: 'rgba(15, 22, 38, 0.4)',
    modalColor: 'rgba(15, 22, 38, 0.8)',
    fontFamily:
      "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    fontWeightStrong: '700',
    borderRadius: '8px'
  }
}

onMounted(() => {
  // Intersection observer for reveal-on-scroll
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -50px 0px' }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="bg-animation"></div>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-message-provider>
      <NavBar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <ContactSection />
      </main>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
main {
  width: 100%;
  overflow-x: hidden;
}
</style>
