import { ref } from 'vue'

// Shared open state for the terminal modal (opened from the hero card and the command palette).
const open = ref(false)

export function useTerminal() {
  return open
}
