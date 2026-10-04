// v-reveal: fade/slide an element in the first time it enters the viewport.
// Usage: v-reveal or v-reveal="120" (delay in ms).
// Works for elements rendered later too (filtered lists), unlike a one-time querySelectorAll.
let observer = null

function getObserver() {
  if (observer) return observer
  observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
  )
  return observer
}

export const vReveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) el.style.setProperty('--reveal-delay', `${binding.value}ms`)
    getObserver().observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  }
}
