<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { BrandGithub, BrandLinkedin, Download, ArrowDown, Terminal2 } from '@vicons/tabler'
import { profile, experiences, projects, achievements } from '../data/portfolio.js'
import { openResume } from '../composables/useResumeDownload.js'
import { useTerminal } from '../composables/useTerminal.js'

const stats = [
  { value: experiences.length, label: 'Companies' },
  { value: projects.length, label: 'Projects' }
]

// Snapshot card: everything is read from portfolio.js.
const current = experiences.find(e => /present/i.test(e.period)) || experiences[0]
const previous = experiences.filter(e => e !== current).map(e => e.company)
const certs = achievements.map(a => a.shortTitle || a.title)
const since = current.period.split('—')[0].trim()

const terminalOpen = useTerminal()

const typed = ref('')
let roleIdx = 0
let charIdx = 0
let deleting = false
let timer = null

const TYPE_SPEED = 70
const DELETE_SPEED = 35
const HOLD_TIME = 1600

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
      timer = setTimeout(tick, 240)
      return
    }
    timer = setTimeout(tick, DELETE_SPEED)
  }
}

onMounted(() => {
  // Reduced motion: show the first role as static text, no typing loop.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    typed.value = profile.roles[0]
    return
  }
  timer = setTimeout(tick, 500)
})
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>

<template>
  <section id="hero" class="section hero">
    <div class="section-inner hero__grid">
      <div class="hero__copy">
        <h1 v-reveal class="hero__name">
          <span class="hero__hello">Hi, I'm</span>
          {{ profile.name }}
        </h1>

        <p v-reveal="160" class="hero__roles">
          <span class="sr-only">{{ profile.roles.join(', ') }}</span>
          <span aria-hidden="true">
            <span class="hero__roles-prefix">$</span>
            <span class="hero__roles-text">{{ typed }}</span><span class="hero__caret" />
          </span>
        </p>

        <p v-reveal="240" class="hero__tagline">{{ profile.tagline }}</p>

        <div v-reveal="320" class="hero__cta">
          <button type="button" class="btn btn--primary" @click="openResume('hero')">
            <Download aria-hidden="true" />
            Download CV
          </button>
          <a :href="profile.github" target="_blank" rel="noopener noreferrer" class="btn">
            <BrandGithub aria-hidden="true" />
            GitHub
          </a>
          <a :href="profile.linkedin" target="_blank" rel="noopener noreferrer" class="btn">
            <BrandLinkedin aria-hidden="true" />
            LinkedIn
          </a>
        </div>

        <dl v-reveal="400" class="hero__stats">
          <div v-for="s in stats" :key="s.label" class="hero__stat">
            <dt>{{ s.label }}</dt>
            <dd>{{ String(s.value).padStart(2, '0') }}</dd>
          </div>
        </dl>
      </div>

      <aside v-reveal="200" v-spotlight class="card snap" aria-label="Quick profile">
        <div class="snap__head">
          <span class="snap__avatar" aria-hidden="true">{{ profile.name.split(' ').map(w => w[0]).join('') }}</span>
          <div>
            <p class="snap__name">{{ profile.name }}</p>
            <p class="snap__role">{{ current.role }}</p>
          </div>
        </div>

        <dl class="snap__list">
          <div class="snap__row">
            <dt>Currently</dt>
            <dd>{{ current.company }} <span class="snap__muted">· since {{ since }}</span></dd>
          </div>
          <div class="snap__row">
            <dt>Previously</dt>
            <dd>{{ previous.join(' · ') }}</dd>
          </div>
          <div class="snap__row">
            <dt>Focus</dt>
            <dd>{{ profile.focus.join(' · ') }}</dd>
          </div>
          <div class="snap__row">
            <dt>Core stack</dt>
            <dd class="snap__chips">
              <span v-for="t in profile.coreStack" :key="t" class="pill">{{ t }}</span>
            </dd>
          </div>
          <div class="snap__row">
            <dt>Certified</dt>
            <dd>{{ certs.join(' · ') }}</dd>
          </div>
        </dl>

        <button type="button" class="snap__term" @click="terminalOpen = true">
          <Terminal2 aria-hidden="true" />
          <span>Prefer the command line? <strong>Open terminal</strong></span>
        </button>
      </aside>
    </div>

    <a href="#experience" class="hero__scroll" aria-label="Scroll to experience">
      <ArrowDown aria-hidden="true" />
    </a>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  padding-top: 120px;
  padding-bottom: 96px;
}

.hero__grid {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: 56px;
  align-items: center;
}

.hero__name {
  font-family: var(--font-mono);
  font-size: clamp(40px, 6.4vw, 76px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.045em;
  margin: 0 0 20px 0;
  color: var(--text);
  text-wrap: balance;
}

.hero__hello {
  display: block;
  font-size: 0.32em;
  font-weight: 500;
  letter-spacing: 0;
  color: var(--text-muted);
  margin-bottom: 12px;
}

.hero__roles {
  font-family: var(--font-mono);
  font-size: clamp(17px, 2vw, 22px);
  font-weight: 500;
  min-height: 1.6em;
  margin: 0 0 20px 0;
}

.hero__roles-prefix {
  color: var(--text-dim);
  margin-right: 10px;
}

.hero__roles-text {
  color: var(--primary);
}

.hero__caret {
  display: inline-block;
  width: 0.55em;
  height: 1.1em;
  margin-left: 2px;
  vertical-align: -0.18em;
  background: var(--primary);
  animation: blink 1s steps(1) infinite;
}

@keyframes blink {
  50% { opacity: 0; }
}

.hero__tagline {
  max-width: 560px;
  font-size: 17px;
  line-height: 1.7;
  color: var(--text-muted);
  margin: 0 0 32px 0;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 40px;
}

.hero__stats {
  display: flex;
  gap: 0;
  margin: 0;
  border-top: 1px solid var(--border);
  padding-top: 20px;
}

.hero__stat {
  display: flex;
  flex-direction: column-reverse;
  gap: 2px;
  padding-right: 28px;
  margin-right: 28px;
  border-right: 1px solid var(--border);
}

.hero__stat:last-child {
  border-right: 0;
}

.hero__stat dd {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 28px;
  font-weight: 700;
  color: var(--text);
  font-variant-numeric: tabular-nums;
}

.hero__stat dt {
  font-size: 13px;
  color: var(--text-muted);
}

.hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid var(--border);
  color: var(--text-muted);
  animation: nudge 2.4s ease-in-out infinite;
  transition: color var(--dur-fast) ease, border-color var(--dur-fast) ease;
}

.hero__scroll:hover {
  color: var(--primary);
  border-color: var(--primary);
}

.hero__scroll svg {
  width: 18px;
  height: 18px;
}

@keyframes nudge {
  0%, 100% { transform: translate(-50%, 0); }
  50% { transform: translate(-50%, 6px); }
}

/* Snapshot card */
.snap {
  padding: 28px;
}

.snap__head {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border);
}

.snap__avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  font-family: var(--font-mono);
  font-weight: 700;
  color: var(--on-primary);
  background: linear-gradient(135deg, var(--primary), var(--cyan));
}

.snap__name {
  margin: 0;
  font-weight: 600;
  font-size: 17px;
}

.snap__role {
  margin: 2px 0 0 0;
  font-size: 14px;
  color: var(--primary);
}

.snap__list {
  margin: 0;
  padding: 8px 0;
}

.snap__row {
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px dashed var(--border);
}

.snap__row dt {
  font-family: var(--font-mono);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--text-dim);
  padding-top: 2px;
}

.snap__row dd {
  margin: 0;
  font-size: 15px;
  line-height: 1.5;
  color: var(--text);
}

.snap__muted {
  color: var(--text-muted);
}

.snap__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.snap__term {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  min-height: 44px;
  margin-top: 16px;
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid var(--border);
  background: rgba(6, 8, 11, 0.5);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
  transition: border-color var(--dur-fast) ease, color var(--dur-fast) ease;
}

.snap__term:hover {
  border-color: rgba(74, 222, 128, 0.4);
  color: var(--text);
}

.snap__term strong {
  color: var(--primary);
  font-weight: 600;
}

.snap__term svg {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  color: var(--primary);
}

@media (max-width: 960px) {
  .hero {
    min-height: auto;
  }
  .hero__grid {
    grid-template-columns: 1fr;
    gap: 48px;
  }
  .hero__scroll {
    display: none;
  }
}

@media (max-width: 640px) {
  .hero {
    padding-top: 104px;
    padding-bottom: 64px;
  }
  .hero__tagline {
    font-size: 16px;
  }
  .hero__stat {
    padding-right: 16px;
    margin-right: 16px;
  }
  .hero__stat dd {
    font-size: 22px;
  }
  .hero__cta .btn {
    flex: 1 1 auto;
  }
  .snap {
    padding: 20px;
  }
  .snap__row {
    grid-template-columns: 1fr;
    gap: 4px;
  }
}
</style>
