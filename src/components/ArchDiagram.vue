<script setup>
import { computed } from 'vue'

// stages: [{ stage: 'Client', nodes: ['Vue 3 SPA'] }, ...] rendered left to right.
const props = defineProps({
  stages: { type: Array, required: true }
})

// Text version for screen readers, since the visual flow is decorative layout.
const summary = computed(() =>
  props.stages.map(s => `${s.stage}: ${s.nodes.join(', ')}`).join(' → ')
)
</script>

<template>
  <figure class="arch">
    <figcaption class="sr-only">Architecture. {{ summary }}</figcaption>
    <div class="arch__flow" aria-hidden="true">
      <template v-for="(s, i) in stages" :key="s.stage">
        <span v-if="i > 0" class="arch__wire" :style="{ '--delay': `${(i - 1) * 0.9}s` }" />
        <div class="arch__stage">
          <span class="arch__label">{{ s.stage }}</span>
          <div class="arch__nodes">
            <span
              v-for="n in s.nodes"
              :key="n"
              :class="['arch__node', `arch__node--${i === 0 ? 'in' : i === stages.length - 1 ? 'out' : 'core'}`]"
            >{{ n }}</span>
          </div>
        </div>
      </template>
    </div>
  </figure>
</template>

<style scoped>
.arch {
  margin: 0;
  padding: 16px;
  border-radius: 12px;
  border: 1px dashed var(--border-strong);
  background: rgba(6, 8, 11, 0.5);
}

.arch__flow {
  display: flex;
  align-items: stretch;
}

/* Labels line up on top; nodes are centered in the space below them. */
.arch__stage {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.arch__nodes {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
}

.arch__label {
  font-family: var(--font-mono);
  font-size: 10.5px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
}

.arch__node {
  font-family: var(--font-mono);
  font-size: 11.5px;
  line-height: 1.35;
  padding: 6px 9px;
  border-radius: 7px;
  border: 1px solid;
  overflow-wrap: anywhere;
}

/* Stage role is also given by the text label above, so color is not the only cue. */
.arch__node--in {
  color: var(--text);
  border-color: rgba(34, 211, 238, 0.28);
  background: rgba(34, 211, 238, 0.06);
}

.arch__node--core {
  color: var(--primary-strong);
  border-color: rgba(74, 222, 128, 0.32);
  background: var(--primary-soft);
}

.arch__node--out {
  color: var(--amber);
  border-color: rgba(251, 191, 36, 0.3);
  background: rgba(251, 191, 36, 0.06);
}

.arch__wire {
  position: relative;
  flex: 0 0 28px;
  height: 1px;
  align-self: center;
  margin-top: 22px; /* label height + gap, so the wire sits at the middle of the nodes */
  background: var(--border-strong);
  overflow: hidden;
}

/* A packet travelling along the wire */
.arch__wire::after {
  content: '';
  position: absolute;
  top: -1px;
  left: -40%;
  width: 40%;
  height: 3px;
  border-radius: 2px;
  background: linear-gradient(90deg, transparent, var(--primary));
  animation: packet 1.8s linear infinite;
  animation-delay: var(--delay, 0s);
}

@keyframes packet {
  to { left: 100%; }
}

@media (max-width: 520px) {
  .arch__flow {
    flex-direction: column;
    align-items: stretch;
  }
  .arch__nodes {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .arch__wire {
    flex: none;
    align-self: center;
    width: 1px;
    height: 16px;
    margin: 6px 0;
  }
  .arch__wire::after {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .arch__wire::after {
    display: none;
  }
}
</style>
