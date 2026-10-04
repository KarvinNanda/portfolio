<script setup>
import { ref, watch, nextTick } from 'vue'
import { X } from '@vicons/tabler'
import HeroTerminal from './HeroTerminal.vue'
import { useTerminal } from '../composables/useTerminal.js'

const open = useTerminal()
const panelEl = ref(null)
let lastFocused = null

watch(open, isOpen => {
  if (isOpen) {
    lastFocused = document.activeElement
    document.documentElement.style.overflow = 'hidden'
    nextTick(() => panelEl.value?.querySelector('#term-input')?.focus())
  } else {
    document.documentElement.style.overflow = ''
    lastFocused?.focus?.({ preventScroll: true })
  }
})

function close() {
  open.value = false
}

// Keep Tab inside the dialog; Esc closes it.
function onKeydown(e) {
  if (e.key === 'Escape') {
    e.preventDefault()
    close()
    return
  }
  if (e.key !== 'Tab') return
  const focusables = [...panelEl.value.querySelectorAll('button, a[href], input')].filter(el => !el.disabled)
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault()
    last.focus()
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault()
    first.focus()
  }
}
</script>

<template>
  <Teleport to="body">
    <Transition name="tmodal">
      <div v-if="open" class="tmodal" @mousedown.self="close">
        <div
          ref="panelEl"
          class="tmodal__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Interactive terminal"
          @keydown="onKeydown"
        >
          <button type="button" class="tmodal__close" aria-label="Close terminal" @click="close">
            <X aria-hidden="true" />
          </button>
          <HeroTerminal />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.tmodal {
  position: fixed;
  inset: 0;
  z-index: 1400;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background: rgba(2, 4, 6, 0.7);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
}

.tmodal__panel {
  position: relative;
  width: 100%;
  max-width: 680px;
}

.tmodal__close {
  position: absolute;
  top: -52px;
  right: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  border: 1px solid var(--border-strong);
  background: var(--surface);
  color: var(--text);
  cursor: pointer;
}

.tmodal__close:hover {
  border-color: var(--primary);
  color: var(--primary-strong);
}

.tmodal__close svg {
  width: 20px;
  height: 20px;
}

.tmodal-enter-active,
.tmodal-leave-active {
  transition: opacity 180ms ease;
}
.tmodal-enter-active .tmodal__panel,
.tmodal-leave-active .tmodal__panel {
  transition: transform 220ms var(--ease-out);
}
.tmodal-enter-from,
.tmodal-leave-to {
  opacity: 0;
}
.tmodal-enter-from .tmodal__panel,
.tmodal-leave-to .tmodal__panel {
  transform: translateY(12px) scale(0.98);
}
</style>
