// Modifier key label for the command palette shortcut: "⌘" on Apple devices, "Ctrl" elsewhere.
// The handler in App.vue already accepts both metaKey and ctrlKey; this only fixes the label.
export function isApplePlatform() {
  if (typeof navigator === 'undefined') return false
  const platform = navigator.userAgentData?.platform || navigator.platform || ''
  return /mac|iphone|ipad|ipod/i.test(platform)
}

export function useShortcutLabel() {
  return isApplePlatform() ? '⌘' : 'Ctrl'
}
