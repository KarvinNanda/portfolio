<script setup>
import { NCard, NImage } from 'naive-ui'
import { achievements } from '@/data/portfolio.js'
</script>

<template>
  <section id="achievements" class="section">
    <div class="section-inner reveal">
      <h2 class="section-title">Certifications</h2>
      <p class="section-subtitle">Credentials I've earned along the way.</p>

      <div class="achievements-grid">
        <n-card
          v-for="item in achievements"
          :key="item.title"
          class="achievement-card"
          :bordered="false"
          content-style="padding: 0;"
        >
          <div class="achievement-card__image-wrap">
            <n-image
              :src="item.image"
              :alt="item.title"
              :preview-src="item.image"
              object-fit="cover"
              class="achievement-card__image"
              show-toolbar-tooltip
            />
          </div>
          <div class="achievement-card__body">
            <h3 class="achievement-card__title">{{ item.title }}</h3>
            <span class="achievement-card__badge">Certification</span>
          </div>
        </n-card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.achievement-card {
  background: var(--bg-elevated) !important;
  border: 1px solid var(--border) !important;
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.achievement-card:hover {
  transform: translateY(-3px);
  border-color: rgba(16, 185, 129, 0.45) !important;
  box-shadow: 0 12px 30px -16px rgba(16, 185, 129, 0.4);
}

.achievement-card__image-wrap {
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #000;
  border-bottom: 1px solid var(--border);
}

.achievement-card__image,
.achievement-card__image :deep(img) {
  width: 100% !important;
  height: 200px !important;
  object-fit: cover !important;
  cursor: zoom-in;
  display: block;
  transition: transform 0.4s ease;
}

.achievement-card:hover .achievement-card__image :deep(img) {
  transform: scale(1.03);
}

.achievement-card__body {
  padding: 18px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.achievement-card__title {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.4;
  color: var(--text);
}

.achievement-card__badge {
  align-self: flex-start;
  font-size: 11px;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent-strong);
  border: 1px solid color-mix(in srgb, var(--accent) 32%, transparent);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 600;
}

@media (max-width: 720px) {
  .achievements-grid {
    grid-template-columns: 1fr;
  }
}
</style>
