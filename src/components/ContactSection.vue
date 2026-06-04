<script setup>
import { NButton, NIcon } from 'naive-ui'
import { Mail, BrandGithub, BrandLinkedin } from '@vicons/tabler'
import { profile } from '../data/portfolio.js'
</script>

<template>
  <section id="contact" class="section contact">
    <div class="section-inner contact__inner reveal">
      <p class="contact__eyebrow">Get in touch</p>
      <h2 class="contact__heading">Let's Connect</h2>
      <p class="contact__lead">
        Open to interesting opportunities, collaborations, and conversations
        around software, security, and AI.
      </p>

      <div class="contact__buttons">
        <n-button
          type="primary"
          size="large"
          tag="a"
          :href="`mailto:${profile.email}`"
        >
          <template #icon>
            <n-icon><Mail /></n-icon>
          </template>
          {{ profile.email }}
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

      <div class="contact__footer">© 2025 {{ profile.name }}</div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-bottom: 64px;
}

.contact__inner {
  text-align: center;
}

.contact__eyebrow {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--accent-strong);
  letter-spacing: 0.06em;
  margin: 0 0 12px 0;
}

.contact__heading {
  font-size: clamp(34px, 5vw, 52px);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin: 0 0 16px 0;
}

.contact__lead {
  max-width: 580px;
  margin: 0 auto 32px;
  color: var(--text-muted);
  line-height: 1.7;
  font-size: 16px;
}

.contact__buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  margin-bottom: 64px;
}

.contact__footer {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  color: var(--text-muted);
  font-size: 13px;
}
</style>
