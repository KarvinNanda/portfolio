<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useMessage } from 'naive-ui'
import { Search, Hash, Download, Copy, BrandGithub, BrandLinkedin, CornerDownLeft, Terminal2 } from '@vicons/tabler'
import { profile, navLinks } from '../data/portfolio.js'
import { openResume } from '../composables/useResumeDownload.js'
import { useTerminal } from '../composables/useTerminal.js'

const props = defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['update:open'])

const message = useMessage()
const query = ref('')
const activeIdx = ref(0)
const inputEl = ref(null)
const terminalOpen = useTerminal()
let lastFocused = null

function goTo(href) {
  document.querySelector(href)?.scrollIntoView({ block: 'start' })
  history.replaceState(null, '', href)
}

const items = [
  ...navLinks.map(l => ({
    id: `go-${l.href.slice(1)}`,
    group: 'Navigate',
    label: l.label,
    icon: Hash,
    run: () => goTo(l.href)
  })),
  { id: 'terminal', group: 'Actions', label: 'Open terminal', keywords: 'shell cli command', icon: Terminal2, run: () => (terminalOpen.value = true) },
  { id: 'cv', group: 'Actions', label: 'Download CV', keywords: 'resume', icon: Download, run: () => openResume('palette') },
  {
    id: 'copy-email',
    group: 'Actions',
    label: 'Copy email address',
    keywords: profile.email,
    icon: Copy,
    run: async () => {
      try {
        await navigator.clipboard.writeText(profile.email)
        message.success('Email copied to clipboard')
      } catch {
        message.error('Could not copy the email')
      }
    }
  },
  { id: 'github', group: 'Links', label: 'Open GitHub', icon: BrandGithub, run: () => window.open(profile.github, '_blank', 'noopener,noreferrer') },
  { id: 'linkedin', group: 'Links', label: 'Open LinkedIn', icon: BrandLinkedin, run: () => window.open(profile.linkedin, '_blank', 'noopener,noreferrer') }
]

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return items
  return items.filter(i => `${i.label} ${i.group} ${i.keywords || ''}`.toLowerCase().includes(q))
})

// Group for display, but keep one flat index for keyboard navigation.
const groups = computed(() => {
  const out = []
  filtered.value.forEach((item, idx) => {
    let g = out.find(x => x.name === item.group)
    if (!g) out.push((g = { name: item.group, items: [] }))
    g.items.push({ ...item, idx })
  })
  return out
})

watch(query, () => (activeIdx.value = 0))

watch(
  () => props.open,
  open => {
    if (open) {
      lastFocused = document.activeElement
      query.value = ''
      activeIdx.value = 0
      document.documentElement.style.overflow = 'hidden'
      nextTick(() => inputEl.value?.focus())
    } else {
      document.documentElement.style.overflow = ''
      lastFocused?.focus?.({ preventScroll: true })
    }
  }
)

function close() {
  emit('update:open', false)
}

function select(item) {
  close()
  // Run after the dialog closes so focus restore does not fight with scrolling/new tabs.
  nextTick(() => item.run())
}

function onKeydown(e) {
  const n = filtered.value.length
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
  } else if (e.key === 'ArrowDown' && n) {
    e.preventDefault()
    activeIdx.value = (activeIdx.value + 1) % n
    scrollActive()
  } else if (e.key === 'ArrowUp' && n) {
    e.preventDefault()
    activeIdx.value = (activeIdx.value - 1 + n) % n
    scrollActive()
  } else if (e.key === 'Enter' && n) {
    e.preventDefault()
    select(filtered.value[activeIdx.value])
  } else if (e.key === 'Tab') {
    // Only one focusable element inside: keep focus trapped in the dialog.
    e.preventDefault()
  }
}

function scrollActive() {
  nextTick(() => document.getElementById(`cmd-${filtered.value[activeIdx.value]?.id}`)?.scrollIntoView({ block: 'nearest' }))
}
</script>

<template>
  <Teleport to="body">
    <Transition name="palette">
      <div v-if="open" class="palette" @mousedown.self="close">
        <div class="palette__panel" role="dialog" aria-modal="true" aria-label="Command menu">
          <div class="palette__search">
            <Search class="palette__search-icon" aria-hidden="true" />
            <input
              ref="inputEl"
              v-model="query"
              class="palette__input"
              type="text"
              placeholder="Type a command or search…"
              role="combobox"
              aria-label="Search commands"
              aria-expanded="true"
              aria-controls="cmd-list"
              :aria-activedescendant="filtered[activeIdx] ? `cmd-${filtered[activeIdx].id}` : undefined"
              autocomplete="off"
              spellcheck="false"
              @keydown="onKeydown"
            />
            <kbd>esc</kbd>
          </div>

          <div id="cmd-list" class="palette__list" role="listbox" aria-label="Commands">
            <template v-for="g in groups" :key="g.name">
              <div class="palette__group" role="presentation">{{ g.name }}</div>
              <div
                v-for="item in g.items"
                :id="`cmd-${item.id}`"
                :key="item.id"
                role="option"
                :aria-selected="item.idx === activeIdx"
                :class="['palette__item', { 'is-active': item.idx === activeIdx }]"
                @mousemove="activeIdx = item.idx"
                @click="select(item)"
              >
                <component :is="item.icon" class="palette__item-icon" aria-hidden="true" />
                <span class="palette__item-label">{{ item.label }}</span>
                <CornerDownLeft v-if="item.idx === activeIdx" class="palette__enter" aria-hidden="true" />
              </div>
            </template>
            <p v-if="!filtered.length" class="palette__empty">No results for “{{ query }}”</p>
          </div>

          <div class="palette__foot" aria-hidden="true">
            <span><kbd>↑</kbd> <kbd>↓</kbd> navigate</span>
            <span><kbd>↵</kbd> select</span>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.palette {
  position: fixed;
  inset: 0;
  z-index: 1500;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 14vh 16px 16px;
  background: rgba(2, 4, 6, 0.6);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.palette__panel {
  width: 100%;
  max-width: 560px;
  border-radius: 14px;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  box-shadow: 0 40px 100px -20px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(74, 222, 128, 0.06);
  overflow: hidden;
}

.palette__search {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 16px;
  border-bottom: 1px solid var(--border);
}

.palette__search-icon {
  width: 18px;
  height: 18px;
  color: var(--text-dim);
}

.palette__input {
  flex: 1;
  min-width: 0;
  height: 56px;
  background: transparent;
  border: 0;
  outline: 0;
  color: var(--text);
  font-size: 16px;
  font-family: var(--font-sans);
}

.palette__input::placeholder {
  color: var(--text-dim);
}

.palette__list {
  max-height: min(380px, 50vh);
  overflow-y: auto;
  padding: 8px;
  overscroll-behavior: contain;
}

.palette__group {
  padding: 10px 10px 6px;
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
}

.palette__item {
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 8px;
  color: var(--text-muted);
  cursor: pointer;
}

.palette__item.is-active {
  background: var(--primary-soft);
  color: var(--text);
}

.palette__item-icon {
  width: 18px;
  height: 18px;
}

.palette__item.is-active .palette__item-icon {
  color: var(--primary);
}

.palette__item-label {
  flex: 1;
  font-size: 15px;
}

.palette__enter {
  width: 16px;
  height: 16px;
  color: var(--text-dim);
}

.palette__empty {
  margin: 0;
  padding: 24px;
  text-align: center;
  color: var(--text-muted);
  font-size: 14px;
}

.palette__foot {
  display: flex;
  gap: 16px;
  padding: 10px 16px;
  border-top: 1px solid var(--border);
  font-size: 12px;
  color: var(--text-dim);
}

.palette__foot span {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.palette-enter-active,
.palette-leave-active {
  transition: opacity 180ms ease;
}
.palette-enter-active .palette__panel,
.palette-leave-active .palette__panel {
  transition: transform 220ms var(--ease-out), opacity 180ms ease;
}
.palette-enter-from,
.palette-leave-to {
  opacity: 0;
}
.palette-enter-from .palette__panel,
.palette-leave-to .palette__panel {
  opacity: 0;
  transform: translateY(-8px) scale(0.98);
}

@media (hover: none) {
  .palette__foot {
    display: none;
  }
}
</style>
