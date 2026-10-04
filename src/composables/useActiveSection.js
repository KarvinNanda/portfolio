import { ref, onMounted, onBeforeUnmount } from 'vue'

// Scroll spy: returns the id of the section currently in the middle band of the viewport.
export function useActiveSection(ids) {
  const active = ref(ids[0])
  let observer = null

  onMounted(() => {
    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) active.value = entry.target.id
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}
