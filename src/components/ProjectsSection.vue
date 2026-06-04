<script setup>
import { NCard, NButton, NIcon, NTag } from 'naive-ui'
import { BrandGithub, ExternalLink } from '@vicons/tabler'
import { projects } from '../data/portfolio.js'
</script>

<template>
  <section id="projects" class="section">
    <div class="section-inner reveal">
      <h2 class="section-title">Projects</h2>
      <p class="section-subtitle">A selection of things I've built.</p>

      <div class="projects-grid">
        <n-card
          v-for="project in projects"
          :key="project.name"
          class="project-card"
          :bordered="false"
        >
          <div class="project-card__head">
            <h3 class="project-card__name">{{ project.name }}</h3>
          </div>

          <p class="project-card__desc">{{ project.description }}</p>

          <div class="project-card__tech">
            <span v-for="t in project.tech" :key="t" class="tech-pill">{{ t }}</span>
          </div>

          <div class="project-card__footer">
            <n-button
              size="small"
              tag="a"
              :href="project.repo"
              target="_blank"
              rel="noopener noreferrer"
              ghost
            >
              <template #icon>
                <n-icon><BrandGithub /></n-icon>
              </template>
              View Repository
            </n-button>
          </div>
        </n-card>
      </div>
    </div>
  </section>
</template>

<style scoped>
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.project-card {
  background: var(--bg-elevated) !important;
  border: 1px solid var(--border) !important;
  border-radius: 14px;
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
}

.project-card:hover {
  transform: translateY(-3px);
  border-color: rgba(16, 185, 129, 0.45) !important;
  box-shadow: 0 12px 30px -16px rgba(16, 185, 129, 0.4);
}

.project-card :deep(.n-card__content) {
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
}

.project-card__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.project-card__name {
  margin: 0;
  font-size: 17px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.01em;
}

.project-card__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  border: 1px solid var(--border);
  color: var(--text-muted);
  transition: color 0.15s ease, border-color 0.15s ease;
}

.project-card__icon:hover {
  color: var(--accent-strong);
  border-color: var(--accent);
}

.project-card__desc {
  margin: 0;
  color: var(--text-muted);
  font-size: 14px;
  line-height: 1.65;
  flex: 1;
}

.project-card__tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-pill {
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid var(--border);
  color: var(--text);
  font-family: 'JetBrains Mono', monospace;
}

.project-card__footer {
  margin-top: 4px;
}

@media (max-width: 760px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
