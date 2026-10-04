<script setup>
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { Mail, BrandGithub, BrandLinkedin, Copy, Check, ArrowUpRight } from '@vicons/tabler'
import { profile } from '../data/portfolio.js'

const message = useMessage()
const copied = ref(false)
let resetTimer = null

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    message.success('Email copied to clipboard')
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (copied.value = false), 2000)
  } catch {
    message.error('Could not copy. Please select the email manually.')
  }
}

const socials = [
  { label: 'GitHub', handle: profile.github.replace('https://github.com/', '@'), href: profile.github, icon: BrandGithub },
  { label: 'LinkedIn', handle: 'in/karvin~nanda', href: profile.linkedin, icon: BrandLinkedin }
]
</script>

<template>
  <section id="contact" class="section contact">
    <div class="section-inner">
      <div v-reveal v-spotlight class="card contact__card">
        <p class="eyebrow"><span class="eyebrow__num">05.</span> contact</p>
        <h2 class="contact__heading">Let's build something <span class="contact__accent">secure</span>.</h2>
        <p class="contact__lead">
          Open to interesting opportunities, collaborations, and conversations around software, security, and AI.
          The fastest way to reach me is email.
        </p>

        <div class="contact__email">
          <a :href="`mailto:${profile.email}`" class="btn btn--primary contact__mail">
            <Mail aria-hidden="true" />
            {{ profile.email }}
          </a>
          <button
            type="button"
            class="btn contact__copy"
            :aria-label="copied ? 'Email copied' : 'Copy email address'"
            @click="copyEmail"
          >
            <Transition name="swap" mode="out-in">
              <Check v-if="copied" key="ok" aria-hidden="true" class="is-ok" />
              <Copy v-else key="copy" aria-hidden="true" />
            </Transition>
          </button>
        </div>

        <ul class="contact__socials">
          <li v-for="s in socials" :key="s.label">
            <a :href="s.href" target="_blank" rel="noopener noreferrer" class="social">
              <component :is="s.icon" class="social__icon" aria-hidden="true" />
              <span class="social__text">
                <span class="social__label">{{ s.label }}</span>
                <span class="social__handle">{{ s.handle }}</span>
              </span>
              <ArrowUpRight class="social__arrow" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact {
  padding-bottom: 48px;
}

.contact__card {
  padding: clamp(32px, 6vw, 64px);
  text-align: center;
  background:
    radial-gradient(700px circle at 50% 0%, rgba(74, 222, 128, 0.12), transparent 60%),
    linear-gradient(180deg, var(--surface-2), var(--surface));
}

.contact__heading {
  font-family: var(--font-mono);
  font-size: clamp(30px, 5vw, 52px);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1.1;
  margin: 0 auto 16px;
  max-width: 760px;
  text-wrap: balance;
}

.contact__accent {
  color: var(--primary);
}

.contact__lead {
  max-width: 560px;
  margin: 0 auto 32px;
  color: var(--text-muted);
  line-height: 1.7;
}

.contact__email {
  display: inline-flex;
  gap: 8px;
  margin-bottom: 32px;
  max-width: 100%;
}

.contact__mail {
  min-height: 52px;
  padding: 0 22px;
  font-family: var(--font-mono);
  font-size: 15px;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.contact__copy {
  width: 52px;
  min-height: 52px;
  padding: 0;
  flex-shrink: 0;
}

.contact__copy .is-ok {
  color: var(--primary);
}

.swap-enter-active,
.swap-leave-active {
  transition: opacity 120ms ease, transform 120ms ease;
}
.swap-enter-from,
.swap-leave-to {
  opacity: 0;
  transform: scale(0.6);
}

.contact__socials {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.social {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 240px;
  padding: 14px 16px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(6, 8, 11, 0.5);
  text-align: left;
  transition: border-color var(--dur-fast) ease, background var(--dur-fast) ease;
}

.social:hover {
  border-color: rgba(74, 222, 128, 0.4);
  background: var(--primary-soft);
}

.social__icon {
  width: 22px;
  height: 22px;
  color: var(--text-muted);
}

.social__text {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.social__label {
  font-weight: 600;
  font-size: 15px;
}

.social__handle {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-muted);
}

.social__arrow {
  width: 18px;
  height: 18px;
  color: var(--text-dim);
  transition: transform var(--dur) var(--ease-out), color var(--dur-fast) ease;
}

.social:hover .social__arrow {
  color: var(--primary);
  transform: translate(2px, -2px);
}

@media (max-width: 520px) {
  .contact__email {
    display: flex;
  }
  .contact__mail {
    flex: 1;
    font-size: 13px;
    padding: 0 14px;
  }
  .social {
    min-width: 0;
    width: 100%;
  }
  .contact__socials li {
    width: 100%;
  }
}
</style>
