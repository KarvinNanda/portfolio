<script setup>
import { ref } from 'vue'
import { Code, Stack2, Database, Server, Language } from '@vicons/tabler'
import { skills } from '@/data/portfolio.js'

const categories = [
  { key: 'languages', label: 'Languages', icon: Code, color: 'var(--color-languages)', items: skills.languages },
  { key: 'frameworks', label: 'Frameworks', icon: Stack2, color: 'var(--color-frameworks)', items: skills.frameworks },
  { key: 'database', label: 'Database', icon: Database, color: 'var(--color-database)', items: skills.database },
  { key: 'infrastructure', label: 'Infrastructure', icon: Server, color: 'var(--color-infrastructure)', items: skills.infrastructure }
]

const LEVELS = { Basic: 1, Intermediate: 2, Proficient: 3 }

const focus = ref('all')

function toggle(key) {
  focus.value = focus.value === key ? 'all' : key
}
</script>

<template>
  <section id="skills" class="section">
    <div class="section-inner">
      <header v-reveal class="section-head">
        <p class="eyebrow"><span class="eyebrow__num">02.</span> skills</p>
        <h2 class="section-title">Tech stack</h2>
        <p class="section-subtitle">Tools and technologies I work with day to day. Pick a category to focus it.</p>
      </header>

      <div v-reveal="60" class="filters" role="group" aria-label="Focus a category">
        <button
          type="button"
          :class="['filter', { 'is-active': focus === 'all' }]"
          :aria-pressed="focus === 'all'"
          @click="focus = 'all'"
        >All</button>
        <button
          v-for="c in categories"
          :key="c.key"
          type="button"
          :class="['filter', { 'is-active': focus === c.key }]"
          :style="{ '--c': c.color }"
          :aria-pressed="focus === c.key"
          @click="toggle(c.key)"
        >
          <span class="filter__dot" aria-hidden="true" />
          {{ c.label }}
          <span class="filter__count">{{ c.items.length }}</span>
        </button>
      </div>

      <div class="bento">
        <article
          v-for="(c, i) in categories"
          :key="c.key"
          v-reveal="i * 70"
          v-spotlight
          :class="['card', 'bento__cell', `bento__cell--${c.key}`, { 'is-dim': focus !== 'all' && focus !== c.key }]"
          :style="{ '--c': c.color }"
        >
          <div class="cell__head">
            <span class="cell__icon" aria-hidden="true"><component :is="c.icon" /></span>
            <h3 class="cell__title">{{ c.label }}</h3>
          </div>
          <ul class="tags">
            <li v-for="item in c.items" :key="item" class="tag">{{ item }}</li>
          </ul>
        </article>

        <article
          v-reveal="280"
          v-spotlight
          :class="['card', 'bento__cell', 'bento__cell--spoken', { 'is-dim': focus !== 'all' }]"
        >
          <div class="cell__head">
            <span class="cell__icon" aria-hidden="true"><Language /></span>
            <h3 class="cell__title">Spoken</h3>
          </div>
          <ul class="spoken">
            <li v-for="lang in skills.spoken" :key="lang.name" class="spoken__row">
              <span class="spoken__name">{{ lang.name }}</span>
              <span class="spoken__meter" aria-hidden="true">
                <i v-for="n in 3" :key="n" :class="{ on: n <= (LEVELS[lang.level] || 0) }" />
              </span>
              <span class="spoken__level">{{ lang.level }}</span>
            </li>
          </ul>
        </article>
      </div>
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
  font-size: 14px;
  cursor: pointer;
  transition: color var(--dur-fast) ease, border-color var(--dur-fast) ease, background var(--dur-fast) ease;
}

.filter:hover {
  color: var(--text);
  border-color: var(--border-strong);
}

.filter.is-active {
  color: var(--text);
  border-color: var(--c, var(--primary));
  background: color-mix(in srgb, var(--c, var(--primary)) 12%, transparent);
}

.filter__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--c);
}

.filter__count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-dim);
}

.bento {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.bento__cell {
  padding: 24px;
  transition:
    opacity var(--dur) ease,
    filter var(--dur) ease,
    border-color var(--dur) var(--ease-out),
    transform var(--dur) var(--ease-out);
}

.bento__cell--languages {
  grid-column: span 2;
}

.bento__cell.is-dim {
  opacity: 0.35;
  filter: saturate(0.3);
}

.bento__cell:not(.is-dim):hover {
  transform: translateY(-2px);
}

.cell__head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}

.cell__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: var(--c, var(--primary));
  background: color-mix(in srgb, var(--c, var(--primary)) 12%, transparent);
  border: 1px solid color-mix(in srgb, var(--c, var(--primary)) 28%, transparent);
}

.cell__icon svg {
  width: 18px;
  height: 18px;
}

.cell__title {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--text);
}

.tags {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 8px;
  color: var(--text);
  background: color-mix(in srgb, var(--c) 8%, transparent);
  border: 1px solid color-mix(in srgb, var(--c) 24%, transparent);
  transition: border-color var(--dur-fast) ease, background var(--dur-fast) ease;
}

.tag:hover {
  border-color: var(--c);
  background: color-mix(in srgb, var(--c) 16%, transparent);
}

.spoken {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.spoken__row {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-areas:
    'name level'
    'meter meter';
  gap: 6px 12px;
  align-items: center;
}

.spoken__name {
  grid-area: name;
  font-weight: 500;
}

.spoken__level {
  grid-area: level;
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.spoken__meter {
  grid-area: meter;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
}

.spoken__meter i {
  height: 4px;
  border-radius: 2px;
  background: rgba(148, 163, 184, 0.15);
}

.spoken__meter i.on {
  background: var(--primary);
}

@media (max-width: 900px) {
  .bento {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .bento {
    grid-template-columns: 1fr;
  }
  .bento__cell--languages {
    grid-column: auto;
  }
  .filter {
    min-height: 44px;
  }
}
</style>
