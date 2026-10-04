// v-spotlight: expose pointer position as --mx / --my so CSS can draw a glow
// under the cursor (see .spotlight in style.css). Mouse/pen only, not touch.
function onMove(e) {
  if (e.pointerType === 'touch') return
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

export const vSpotlight = {
  mounted(el) {
    el.classList.add('spotlight')
    el.addEventListener('pointermove', onMove, { passive: true })
  },
  unmounted(el) {
    el.removeEventListener('pointermove', onMove)
  }
}
