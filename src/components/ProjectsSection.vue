<script setup>
import { ref, computed } from 'vue'
import { BrandGithub, ArrowUpRight } from '@vicons/tabler'
import { projects } from '../data/portfolio.js'
import ArchDiagram from './ArchDiagram.vue'

// Filter chips: only tech shared by 2+ projects. A chip that matches one card does not filter anything useful.
const techCounts = projects.flatMap(p => p.tech).reduce((acc, t) => ({ ...acc, [t]: (acc[t] || 0) + 1 }), {})
const techs = Object.keys(techCounts)
  .filter(t => techCounts[t] > 1)
  .sort((a, b) => techCounts[b] - techCounts[a])

const filter = ref('All')

const visible = computed(() =>
  filter.value === 'All' ? projects : projects.filter(p => p.tech.includes(filter.value))
)

const repoPath = url => url.replace('https://github.com/', '')
</script>

<template>
  <section id="projects" class="section">
    <div class="section-inner">
      <header v-reveal class="section-head">
        <p class="eyebrow"><span class="eyebrow__num">03.</span> projects</p>
        <h2 class="section-title">Things I've built</h2>
        <p class="section-subtitle">From an AI security intelligence platform to a full booking system. Each card shows how the pieces connect.</p>
      </header>

      <div v-reveal="60" class="filters" role="group" aria-label="Filter projects by technology">
        <button
          v-for="t in ['All', ...techs]"
          :key="t"
          type="button"
          :class="['filter', { 'is-active': filter === t }]"
          :aria-pressed="filter === t"
          @click="filter = t"
        >
          {{ t }}
          <span class="filter__count">{{ t === 'All' ? projects.length : techCounts[t] }}</span>
        </button>
      </div>

      <p class="sr-only" aria-live="polite">{{ visible.length }} projects shown</p>

      <TransitionGroup tag="ul" name="grid" class="projects">
        <li
          v-for="project in visible"
          :key="project.name"
          v-spotlight
          class="card project"
        >
          <div class="project__top">
            <span class="project__icon" aria-hidden="true"><BrandGithub /></span>
            <ArrowUpRight class="project__arrow" aria-hidden="true" />
          </div>

          <h3 class="project__name">
            <a :href="project.repo" target="_blank" rel="noopener noreferrer" class="project__link">
              {{ project.name }}
              <span class="sr-only">(opens GitHub repository in a new tab)</span>
            </a>
          </h3>

          <p class="project__desc">{{ project.description }}</p>

          <ArchDiagram v-if="project.architecture" :stages="project.architecture" />

          <div class="project__foot">
            <ul class="project__tech" aria-label="Tech stack">
              <li v-for="t in project.tech" :key="t" :class="{ 'is-match': t === filter }">{{ t }}</li>
            </ul>
            <span class="project__repo">{{ repoPath(project.repo) }}</span>
          </div>
        </li>
      </TransitionGroup>
    </div>
  </section>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.filter {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: rgba(11, 15, 20, 0.6);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 13px;
  cursor: pointer;
  transition: color var(--dur-fast) ease, border-color var(--dur-fast) ease, background var(--dur-fast) ease;
}

.filter:hover {
  color: var(--text);
  border-color: var(--border-strong);
}

.filter.is-active {
  color: var(--primary-strong);
  border-color: rgba(74, 222, 128, 0.5);
  background: var(--primary-soft);
}

.filter__count {
  font-size: 11px;
  color: var(--text-dim);
}

.projects {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.project {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px;
  min-height: 260px;
}

.project:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 50px -28px rgba(74, 222, 128, 0.35);
}

.project:focus-within {
  border-color: var(--primary);
}

.project__top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.project__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  border: 1px solid var(--border);
  color: var(--text-muted);
}

.project__icon svg {
  width: 18px;
  height: 18px;
}

.project__arrow {
  width: 20px;
  height: 20px;
  margin-left: auto;
  color: var(--text-dim);
  transition: transform var(--dur) var(--ease-out), color var(--dur-fast) ease;
}

.project:hover .project__arrow {
  color: var(--primary);
  transform: translate(3px, -3px);
}

.project__name {
  margin: 8px 0 0 0;
  font-family: var(--font-mono);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

/* Stretched link: the whole card is clickable, but only one link in the tab order. */
.project__link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
}

.project__link:focus-visible {
  outline: none;
}

.project__desc {
  margin: 0;
  color: var(--text-muted);
  font-size: 15px;
  line-height: 1.65;
  flex: 1;
}

.project__foot {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.project__tech {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.project__tech li {
  font-family: var(--font-mono);
  font-size: 12px;
  padding: 3px 9px;
  border-radius: 6px;
  color: var(--text-muted);
  background: rgba(148, 163, 184, 0.06);
  border: 1px solid var(--border);
}

.project__tech li.is-match {
  color: var(--primary-strong);
  border-color: rgba(74, 222, 128, 0.4);
  background: var(--primary-soft);
}

.project__repo {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-dim);
  padding-top: 14px;
  border-top: 1px dashed var(--border);
}

/* Filter animation */
.grid-move,
.grid-enter-active,
.grid-leave-active {
  transition: opacity 280ms ease, transform 380ms var(--ease-out);
}
.grid-enter-from,
.grid-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
.grid-leave-active {
  position: absolute;
  visibility: hidden;
}

@media (max-width: 860px) {
  .projects {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .project {
    min-height: 0;
    padding: 20px;
  }
  .filter {
    min-height: 44px;
  }
}
</style>
