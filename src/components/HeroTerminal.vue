<script setup>
import { ref, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { profile, experiences, skills, projects, achievements, navLinks } from '../data/portfolio.js'
import { openResume } from '../composables/useResumeDownload.js'
import { useTerminal } from '../composables/useTerminal.js'

const PROMPT = 'guest@karvin:~$'
const MAX_LINES = 200

// Each line: { kind: 'cmd' | 'out' | 'muted' | 'accent' | 'err', text, href? }
const lines = ref([
  { kind: 'muted', text: 'karvin-os v2.0 — interactive shell' },
  { kind: 'muted', text: "Type 'help' to see what you can do." }
])
const input = ref('')
const history = []
let historyIdx = -1

const outputEl = ref(null)
const inputEl = ref(null)
let introTimer = null

const sections = navLinks.map(l => l.href.slice(1))
const terminalOpen = useTerminal()

const commands = {
  help: () => [
    { kind: 'accent', text: 'Available commands:' },
    ...[
      ['whoami', 'who I am'],
      ['experience', 'where I have worked'],
      ['skills', 'my tech stack'],
      ['projects', 'things I have built'],
      ['certs', 'security certifications'],
      ['contact', 'how to reach me'],
      ['cv', 'open my résumé'],
      ['cd <section>', `jump to: ${sections.join(', ')}`],
      ['clear', 'clear the screen']
    ].map(([c, d]) => ({ kind: 'out', text: `  ${c.padEnd(14)}${d}` }))
  ],
  whoami: () => [
    { kind: 'accent', text: profile.name },
    { kind: 'out', text: profile.roles.join(' · ') },
    { kind: 'muted', text: profile.tagline }
  ],
  experience: () =>
    experiences.flatMap(e => [
      { kind: 'accent', text: `▸ ${e.role} @ ${e.company}` },
      { kind: 'muted', text: `  ${e.period}${e.duration ? ` · ${e.duration}` : ''}` }
    ]),
  skills: () => [
    ['languages', skills.languages],
    ['frameworks', skills.frameworks],
    ['database', skills.database],
    ['infra', skills.infrastructure]
  ].map(([k, v]) => ({ kind: 'out', text: `${k.padEnd(12)}${v.join(', ')}` })),
  projects: () =>
    projects.map(p => ({ kind: 'out', text: `▸ ${p.name}`, href: p.repo })),
  certs: () => achievements.map(a => ({ kind: 'accent', text: `✓ ${a.title}` })),
  contact: () => [
    { kind: 'out', text: `email     ${profile.email}`, href: `mailto:${profile.email}` },
    { kind: 'out', text: 'github    ' + profile.github.replace('https://', ''), href: profile.github },
    { kind: 'out', text: 'linkedin  ' + profile.linkedin.replace('https://www.', ''), href: profile.linkedin }
  ],
  cv: () => {
    openResume('terminal')
    return [{ kind: 'accent', text: 'Opening résumé in a new tab…' }]
  },
  ls: () => [{ kind: 'out', text: sections.map(s => `${s}/`).join('  ') }],
  cd: arg => {
    const target = (arg || '').replace(/\/$/, '').toLowerCase()
    if (!target || target === '~') return [{ kind: 'muted', text: 'Already home.' }]
    if (!sections.includes(target)) return [{ kind: 'err', text: `cd: no such section: ${target}` }]
    // Close the modal first, otherwise it covers the section we scroll to.
    terminalOpen.value = false
    setTimeout(() => document.getElementById(target)?.scrollIntoView({ block: 'start' }), 220)
    return [{ kind: 'muted', text: `→ ${target}` }]
  },
  sudo: () => [{ kind: 'err', text: 'guest is not in the sudoers file. This incident will be reported.' }],
  exit: () => [{ kind: 'muted', text: "There's no escape. Try 'contact' instead." }]
}
const aliases = { exp: 'experience', certifications: 'certs', resume: 'cv', cls: 'clear', '?': 'help' }

function scrollToBottom() {
  nextTick(() => {
    if (outputEl.value) outputEl.value.scrollTop = outputEl.value.scrollHeight
  })
}

function run(raw) {
  const text = raw.trim()
  lines.value.push({ kind: 'cmd', text })
  if (text) {
    history.unshift(text)
    const [name, ...rest] = text.split(/\s+/)
    const key = aliases[name.toLowerCase()] || name.toLowerCase()
    if (key === 'clear') {
      lines.value = []
    } else if (commands[key]) {
      lines.value.push(...commands[key](rest.join(' ')))
    } else {
      lines.value.push({ kind: 'err', text: `command not found: ${name}. Try 'help'.` })
    }
  }
  if (lines.value.length > MAX_LINES) lines.value.splice(0, lines.value.length - MAX_LINES)
  historyIdx = -1
  scrollToBottom()
}

function onSubmit() {
  cancelIntro()
  run(input.value)
  input.value = ''
}

function complete() {
  const v = input.value.trim().toLowerCase()
  if (!v) return
  const [name, arg] = v.split(/\s+/)
  if (name === 'cd' && arg !== undefined) {
    const match = sections.filter(s => s.startsWith(arg))
    if (match.length === 1) input.value = `cd ${match[0]}`
    return
  }
  const match = Object.keys(commands).filter(c => c.startsWith(name))
  if (match.length === 1) input.value = match[0] + (match[0] === 'cd' ? ' ' : '')
  else if (match.length > 1) lines.value.push({ kind: 'cmd', text: v }, { kind: 'muted', text: match.join('  ') })
  scrollToBottom()
}

function onKeydown(e) {
  cancelIntro()
  if (e.key === 'Tab' && input.value.trim()) {
    e.preventDefault()
    complete()
  } else if (e.key === 'ArrowUp') {
    if (historyIdx < history.length - 1) {
      e.preventDefault()
      historyIdx++
      input.value = history[historyIdx]
    }
  } else if (e.key === 'ArrowDown') {
    e.preventDefault()
    historyIdx = Math.max(historyIdx - 1, -1)
    input.value = historyIdx === -1 ? '' : history[historyIdx]
  } else if (e.key === 'l' && e.ctrlKey) {
    e.preventDefault()
    lines.value = []
  }
}

function focusInput() {
  // Do not steal focus when the user is selecting output text.
  if (window.getSelection()?.toString()) return
  inputEl.value?.focus({ preventScroll: true })
}

function quick(cmd) {
  cancelIntro()
  run(cmd)
}

// Intro: type "whoami" automatically once, unless the user starts first.
function playIntro() {
  const cmd = 'whoami'
  let i = 0
  const step = () => {
    input.value = cmd.slice(0, ++i)
    if (i < cmd.length) introTimer = setTimeout(step, 90)
    else introTimer = setTimeout(() => { run(cmd); input.value = ''; introTimer = null }, 350)
  }
  introTimer = setTimeout(step, 900)
}

function cancelIntro() {
  if (!introTimer) return
  clearTimeout(introTimer)
  introTimer = null
  input.value = ''
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) run('whoami')
  else playIntro()
})
onBeforeUnmount(() => clearTimeout(introTimer))
</script>

<template>
  <div v-spotlight class="term card" @click="focusInput">
    <div class="term__bar">
      <span class="term__dots" aria-hidden="true"><i /><i /><i /></span>
      <span class="term__title">karvin — zsh</span>
      <span class="term__badge">interactive</span>
    </div>

    <div ref="outputEl" class="term__out" role="log" aria-live="polite" aria-label="Terminal output">
      <div v-for="(l, i) in lines" :key="i" :class="['term__line', `term__line--${l.kind}`]">
        <template v-if="l.kind === 'cmd'">
          <span class="term__prompt">{{ PROMPT }}</span> {{ l.text }}
        </template>
        <a
          v-else-if="l.href"
          :href="l.href"
          target="_blank"
          rel="noopener noreferrer"
          class="term__link"
          @click.stop
        >{{ l.text }}</a>
        <template v-else>{{ l.text }}</template>
      </div>
    </div>

    <form class="term__form" @submit.prevent="onSubmit">
      <label for="term-input" class="term__prompt">{{ PROMPT }}</label>
      <input
        id="term-input"
        ref="inputEl"
        v-model="input"
        class="term__input"
        type="text"
        autocomplete="off"
        autocapitalize="off"
        spellcheck="false"
        enterkeyhint="send"
        aria-label="Terminal command"
        aria-describedby="term-hint"
        @keydown="onKeydown"
      />
    </form>

    <div class="term__chips">
      <span id="term-hint" class="sr-only">Type a command and press Enter. Type help for a list.</span>
      <button
        v-for="c in ['help', 'skills', 'projects', 'contact']"
        :key="c"
        type="button"
        class="term__chip"
        @click.stop="quick(c)"
      >{{ c }}</button>
    </div>
  </div>
</template>

<style scoped>
.term {
  display: flex;
  flex-direction: column;
  height: 440px;
  font-family: var(--font-mono);
  font-size: 13.5px;
  cursor: text;
  box-shadow:
    0 0 0 1px rgba(74, 222, 128, 0.06),
    0 30px 80px -30px rgba(0, 0, 0, 0.8),
    0 0 60px -20px rgba(74, 222, 128, 0.18);
}

.term__bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
}

.term__dots {
  display: inline-flex;
  gap: 6px;
}

.term__dots i {
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: #334155;
}

.term__dots i:nth-child(1) { background: #f87171; }
.term__dots i:nth-child(2) { background: #fbbf24; }
.term__dots i:nth-child(3) { background: #4ade80; }

.term__title {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: var(--text-dim);
}

.term__badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 999px;
  color: var(--primary);
  border: 1px solid rgba(74, 222, 128, 0.3);
}

.term__out {
  flex: 1;
  overflow-y: auto;
  padding: 16px 16px 4px;
  line-height: 1.7;
  overscroll-behavior: contain;
}

.term__line {
  white-space: pre-wrap;
  word-break: break-word;
  color: var(--text);
}

.term__line--cmd { margin-top: 6px; }
.term__line--muted { color: var(--text-muted); }
.term__line--accent { color: var(--primary); }
.term__line--err { color: #fca5a5; }

.term__prompt {
  color: var(--cyan);
  white-space: nowrap;
}

.term__link {
  color: var(--text);
  text-decoration: underline;
  text-decoration-color: var(--border-strong);
  text-underline-offset: 3px;
}

.term__link:hover {
  color: var(--primary-strong);
  text-decoration-color: var(--primary);
}

.term__form {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px 12px;
}

.term__input {
  flex: 1;
  min-width: 0;
  min-height: 32px;
  background: transparent;
  border: 0;
  outline: 0;
  color: var(--text);
  font: inherit;
  caret-color: var(--primary);
}

.term__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid var(--border);
}

.term__chip {
  min-height: 32px;
  padding: 0 12px;
  border-radius: 8px;
  border: 1px solid var(--border);
  background: rgba(148, 163, 184, 0.05);
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 12px;
  cursor: pointer;
  transition: color var(--dur-fast) ease, border-color var(--dur-fast) ease, background var(--dur-fast) ease;
}

.term__chip:hover {
  color: var(--primary-strong);
  border-color: rgba(74, 222, 128, 0.4);
  background: var(--primary-soft);
}

.term__chip::before {
  content: '$ ';
  color: var(--text-dim);
}

@media (max-width: 640px) {
  .term {
    height: 380px;
    font-size: 12.5px;
  }
  .term__form .term__prompt {
    display: none;
  }
  .term__form::before {
    content: '$';
    color: var(--cyan);
  }
  .term__input {
    font-size: 16px; /* prevent iOS zoom on focus */
  }
}

@media (pointer: coarse) {
  .term__chip {
    min-height: 44px;
    padding: 0 14px;
  }
}
</style>
