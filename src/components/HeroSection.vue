<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { NButton, NIcon } from 'naive-ui'
import { BrandGithub, BrandLinkedin, Download } from '@vicons/tabler'
import { profile } from '../data/portfolio.js'

// Google Drive direct-download URL (converted from the share/view link).
// File ID: 12hzDXXFrxIz8OgDZTCG27oULhlCcjmC-
const CV_URL = 'https://drive.google.com/uc?export=download&id=12hzDXXFrxIz8OgDZTCG27oULhlCcjmC-'

function downloadCV() {
  const a = document.createElement('a')
  a.href = CV_URL
  a.download = 'Karvin_Nanda_CV.pdf'
  a.rel = 'noopener noreferrer'
  a.target = '_blank'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

const typed = ref('')
let roleIdx = 0
let charIdx = 0
let deleting = false
let timer = null

const TYPE_SPEED = 80
const DELETE_SPEED = 40
const HOLD_TIME = 1400

function tick() {
  const current = profile.roles[roleIdx]
  if (!deleting) {
    charIdx++
    typed.value = current.slice(0, charIdx)
    if (charIdx === current.length) {
      deleting = true
      timer = setTimeout(tick, HOLD_TIME)
      return
    }
    timer = setTimeout(tick, TYPE_SPEED)
  } else {
    charIdx--
    typed.value = current.slice(0, charIdx)
    if (charIdx === 0) {
      deleting = false
      roleIdx = (roleIdx + 1) % profile.roles.length
      timer = setTimeout(tick, 220)
      return
    }
    timer = setTimeout(tick, DELETE_SPEED)
  }
}

onMounted(() => {
  timer = setTimeout(tick, 400)
})
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <section id="hero" class="section hero">
    <div class="section-inner hero__inner reveal">
      <p class="hero__greeting">Hello, I'm</p>
      <h1 class="hero__name">{{ profile.name }}</h1>

      <div class="hero__roles">
        <span class="hero__roles-prefix">&gt;</span>
        <span class="hero__roles-text">{{ typed }}</span>
        <span class="hero__caret" aria-hidden="true">|</span>
      </div>

      <p class="hero__tagline">{{ profile.tagline }}</p>

      <div class="hero__cta">
        <n-button type="primary" size="large" @click="downloadCV">
          <template #icon>
            <n-icon><Download /></n-icon>
          </template>
          Download CV
        </n-button>
        <n-button
          size="large"
          tag="a"
          :href="profile.github"
          target="_blank"
          rel="noopener noreferrer"
          ghost
        >
          <template #icon>
            <n-icon><BrandGithub /></n-icon>
          </template>
          GitHub
        </n-button>
        <n-button
          size="large"
          tag="a"
          :href="profile.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          ghost
        >
          <template #icon>
            <n-icon><BrandLinkedin /></n-icon>
          </template>
          LinkedIn
        </n-button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 160px;
  padding-bottom: 120px;
  position: relative;
}

.hero__greeting {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: var(--accent-strong);
  margin: 0 0 16px 0;
  letter-spacing: 0.04em;
}

.hero__name {
  font-size: clamp(48px, 7vw, 84px);
  font-weight: 800;
  line-height: 1.05;
  letter-spacing: -0.03em;
  margin: 0 0 20px 0;
  background: linear-gradient(180deg, #ffffff 0%, #c8d3df 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero__roles {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: 'JetBrains Mono', monospace;
  font-size: clamp(18px, 2.4vw, 26px);
  font-weight: 500;
  color: var(--text);
  min-height: 38px;
  margin-bottom: 28px;
}

.hero__roles-prefix {
  color: var(--accent);
  font-weight: 700;
}

.hero__roles-text {
  color: var(--accent-strong);
}

.hero__caret {
  display: inline-block;
  width: 2px;
  color: var(--accent);
  animation: blink 1s steps(1) infinite;
  font-weight: 300;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.hero__tagline {
  max-width: 720px;
  font-size: 17px;
  line-height: 1.7;
  color: var(--text-muted);
  margin: 0 0 36px 0;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 640px) {
  .hero {
    padding-top: 120px;
    padding-bottom: 80px;
  }
  .hero__tagline {
    font-size: 15px;
  }
}
</style>
