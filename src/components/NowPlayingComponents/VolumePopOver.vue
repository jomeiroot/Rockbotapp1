<script setup lang="js">
import { ref, computed } from "vue";
import Volume from "./Volume.vue";

const props = defineProps({
  current_volume: Number,
  min: { type: Number, default: 0 },
  max: { type: Number, default: 10 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: "Volume" }
});

const emit = defineEmits(["update:current_volume", "change_vol"]);
function clamp(v) {
  const n = Math.round(Number(v) || 0);
  return Math.max(props.min, Math.min(props.max, n));
}
const proxy = computed({
  get: () => props.current_volume,
  set: v => emit("update:current_volume", clamp(v))
});

// open states
const open = ref(false);       // click to pin open
const hovering = ref(false);   // hover/focus reveal
const isOpen = computed(() => open.value || hovering.value);

function toggle() {
  if (!props.disabled) open.value = !open.value;
}
function onBlurAll(e) {
  // close when focus leaves the entire widget
  if (!e.currentTarget.contains(e.relatedTarget)) open.value = false;
}

// v-model proxy (forwarding to child)


// unique id for aria-controls in case multiple popovers are on the page
const panelId = `vol-panel-${Math.random().toString(36).slice(2, 9)}`;
</script>

<template>
  <div
      class="np-volpop"
      @mouseenter="hovering = true"
      @mouseleave="hovering = false"
      @focusin="hovering = true"
      @focusout="onBlurAll"
  >
    <!-- trigger -->
    <button
        class = "np-volpop__btn"
        type="button"
        :aria-expanded="isOpen"
        :aria-controls="panelId"
        :disabled="disabled"
        @click="toggle"
        :title="`${label}: ${proxy}`"
    >
      <span class="icon">🔊</span>
      <span class="value">{{ proxy }}</span>
    </button>

    <!-- invisible hover bridge that fills the gap between button and panel -->
    <div class="np-volpop__bridge" aria-hidden="true"></div>

    <!-- popover panel (below the button) -->
    <div
        class="np-volpop__panel"
        :id="panelId"
        role="dialog"
        aria-label="Volume"
        :data-open="isOpen"
    >
      <Volume
          v-model:current_volume="proxy"
          :min="min"
          :max="max"
          :step="step"
          :disabled="disabled"
          :label="label"
          @change_vol="val => emit('change_vol', val)"
      />
    </div>
  </div>
</template>

<style   scoped>
.np-volpop {
  position: relative;
  display: inline-flex;
  align-items: center;
}

/* trigger button */
.np-volpop__btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.9rem;
  cursor: pointer;
  transition: background .2s ease, transform .12s ease, border-color .2s ease;
}
.np-volpop__btn:hover { background: rgba(255,255,255,0.12); transform: translateY(-1px); }
.np-volpop__btn:disabled { opacity: .6; cursor: not-allowed; transform: none; }

.np-volpop__btn .icon { font-size: 1rem; line-height: 1; }
.np-volpop__btn .value { font-variant-numeric: tabular-nums; opacity: .9; }

/* hover bridge: spans the visual gap so the mouse never leaves the wrapper */
.np-volpop__bridge {
  position: absolute;
  right: 0;
  top: 100%;              /* starts right under the button */
  height: 10px;           /* same as the visual gap */
  width: 220px;           /* roughly width of panel; adjust as needed */
  pointer-events: auto;   /* must be hoverable */
  /* fully transparent, but still hoverable */
  background: transparent;
}

/* panel below the button */
.np-volpop__panel {
  position: absolute;
  right: 0;                 /* align panel’s right edge with button */
  top: calc(100% + 10px);   /* sits below, leaving a 10px visual gap */
  min-width: 220px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--border, rgba(255,255,255,0.07));
  background: linear-gradient(180deg, var(--panel, rgba(18,20,26,.75)), rgba(18,20,26,.55));
  color: var(--text, #e6e9ef);
  backdrop-filter: blur(14px);
  box-shadow: 0 10px 30px rgba(0,0,0,.35);
  opacity: 0;
  transform: translateY(-8px) scale(.98);
  pointer-events: none;
  transition: opacity .15s ease, transform .15s ease;
  z-index: 30;
}

/* show when open or hovered/focused */
.np-volpop__panel[data-open="true"] {
  opacity: 1;
  transform: translateY(0) scale(1);
  pointer-events: auto;
}

/* caret above the panel (pointing to the button) */
.np-volpop__panel::after {
  content: "";
  position: absolute;
  right: 16px;
  top: -6px;
  width: 10px; height: 10px;
  transform: rotate(45deg);
  background: inherit;
  border-left: 1px solid var(--border, rgba(255,255,255,0.07));
  border-top: 1px solid var(--border, rgba(255,255,255,0.07));
  filter: blur(.2px);
}
</style>