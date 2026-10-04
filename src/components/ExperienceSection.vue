<script setup>
import { experiences } from '../data/portfolio.js'

const isCurrent = exp => /present/i.test(exp.period)
</script>

<template>
  <section id="experience" class="section">
    <div class="section-inner">
      <header v-reveal class="section-head">
        <p class="eyebrow"><span class="eyebrow__num">01.</span> experience</p>
        <h2 class="section-title">Where I've been building</h2>
        <p class="section-subtitle">Backend systems, internal tools and integrations, from logistics to asset management.</p>
      </header>

      <ol class="timeline">
        <li
          v-for="(exp, i) in experiences"
          :key="exp.company"
          v-reveal="i * 100"
          :class="['timeline__item', { 'is-current': isCurrent(exp) }]"
        >
          <span class="timeline__dot" aria-hidden="true" />
          <p class="timeline__period">
            <span class="timeline__dates">{{ exp.period }}</span>
            <span v-if="exp.duration" class="timeline__duration">{{ exp.duration }}</span>
          </p>
          <article v-spotlight class="card timeline__card">
            <div class="timeline__head">
              <div>
                <h3 class="timeline__role">{{ exp.role }}</h3>
                <p class="timeline__company">{{ exp.company }}</p>
              </div>
              <span v-if="isCurrent(exp)" class="pill pill--live">
                <span class="live-dot" aria-hidden="true" /> Current
              </span>
            </div>
            <p class="timeline__desc">{{ exp.description }}</p>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.timeline {
  --rail-x: 190px;
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Vertical rail */
.timeline::before {
  content: '';
  position: absolute;
  top: 8px;
  bottom: 8px;
  left: var(--rail-x);
  width: 1px;
  background: linear-gradient(to bottom, var(--primary), var(--border-strong) 30%, var(--border) 100%);
}

.timeline__item {
  position: relative;
  display: grid;
  grid-template-columns: var(--rail-x) minmax(0, 1fr);
  column-gap: 32px;
  align-items: start;
}

.timeline__dot {
  position: absolute;
  left: calc(var(--rail-x) - 5px);
  top: 24px;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--bg);
  border: 2px solid var(--border-strong);
}

.timeline__item.is-current .timeline__dot {
  border-color: var(--primary);
  background: var(--primary);
  box-shadow: 0 0 0 4px var(--primary-soft), 0 0 12px var(--primary);
}

.timeline__period {
  margin: 0;
  padding: 18px 24px 0 0;
  text-align: right;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-muted);
}

.timeline__dates {
  display: block;
  white-space: nowrap;
}

.timeline__duration {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-dim);
}

.timeline__item.is-current .timeline__period {
  color: var(--primary);
}

.timeline__card {
  padding: 24px 28px;
}

.timeline__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.timeline__role {
  font-family: var(--font-mono);
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.02em;
  margin: 0;
}

.timeline__company {
  margin: 4px 0 0 0;
  color: var(--primary);
  font-size: 15px;
}

.timeline__desc {
  margin: 14px 0 0 0;
  color: var(--text-muted);
  line-height: 1.75;
  font-size: 16px;
  max-width: 680px;
}

.pill--live {
  color: var(--primary-strong);
  border-color: rgba(74, 222, 128, 0.35);
  background: var(--primary-soft);
}

.live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 8px var(--primary);
}

/* Mobile: rail on the left, period above the card */
@media (max-width: 720px) {
  .timeline {
    --rail-x: 5px;
  }
  .timeline__item {
    grid-template-columns: 1fr;
    padding-left: 28px;
  }
  .timeline__dot {
    left: 0;
    top: 4px;
  }
  .timeline__period {
    display: flex;
    gap: 8px;
    text-align: left;
    padding: 0 0 8px 0;
  }
  .timeline__duration {
    margin-top: 0;
  }
  .timeline__duration::before {
    content: '· ';
  }
  .timeline__card {
    padding: 20px;
  }
  .timeline__role {
    font-size: 17px;
  }
}
</style>
