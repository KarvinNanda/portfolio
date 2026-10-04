<script setup>
import { NImage } from 'naive-ui'
import { Certificate, ZoomIn } from '@vicons/tabler'
import { achievements } from '@/data/portfolio.js'
</script>

<template>
  <section id="certifications" class="section">
    <div class="section-inner">
      <header v-reveal class="section-head">
        <p class="eyebrow"><span class="eyebrow__num">04.</span> certifications</p>
        <h2 class="section-title">Certifications</h2>
        <p class="section-subtitle">Offensive and defensive security training. Click a certificate to view it full size.</p>
      </header>

      <div class="certs">
        <article
          v-for="(item, i) in achievements"
          :key="item.title"
          v-reveal="i * 100"
          v-spotlight
          class="card cert"
        >
          <div class="cert__image">
            <n-image
              :src="item.image"
              :alt="`${item.title} certificate`"
              :preview-src="item.image"
              object-fit="cover"
              lazy
              class="cert__img"
              show-toolbar-tooltip
            />
            <span class="cert__zoom" aria-hidden="true"><ZoomIn /></span>
          </div>
          <div class="cert__body">
            <span class="cert__icon" aria-hidden="true"><Certificate /></span>
            <div>
              <h3 class="cert__title">{{ item.title }}</h3>
              <p class="cert__type">{{ item.shortTitle || 'Certification' }}</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.certs {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.cert {
  padding: 0;
}

.cert:hover {
  transform: translateY(-4px);
}

.cert__image {
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  border-bottom: 1px solid var(--border);
  background: #000;
}

.cert__img,
.cert__img :deep(img) {
  display: block;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
  cursor: zoom-in;
  transition: transform 600ms var(--ease-out), filter var(--dur) ease;
}

.cert__img :deep(img) {
  filter: saturate(0.85) brightness(0.92);
}

.cert:hover .cert__img :deep(img) {
  transform: scale(1.04);
  filter: none;
}

.cert__zoom {
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(6, 8, 11, 0.75);
  border: 1px solid var(--border-strong);
  color: var(--text);
  pointer-events: none;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity var(--dur) ease, transform var(--dur) var(--ease-out);
}

.cert__zoom svg {
  width: 18px;
  height: 18px;
}

.cert:hover .cert__zoom {
  opacity: 1;
  transform: none;
}

.cert__body {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 20px 24px 24px;
}

.cert__icon {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  color: var(--primary);
  background: var(--primary-soft);
  border: 1px solid rgba(74, 222, 128, 0.3);
}

.cert__icon svg {
  width: 20px;
  height: 20px;
}

.cert__title {
  margin: 0;
  font-size: 17px;
  font-weight: 600;
  line-height: 1.4;
}

.cert__type {
  margin: 4px 0 0 0;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

@media (hover: none) {
  .cert__zoom {
    opacity: 1;
    transform: none;
  }
}

@media (max-width: 720px) {
  .certs {
    grid-template-columns: 1fr;
  }
}
</style>
