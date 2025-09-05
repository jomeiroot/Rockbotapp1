<!-- src/components/NowPlayingComponents/VolumeControl.vue -->
<script setup lang="js">
import { computed } from "vue";

const props = defineProps({
  current_volume: Number, // 0..10
  min: { type: Number, default: 0 },
  max: { type: Number, default: 10 },
  step: { type: Number, default: 1 },
  disabled: { type: Boolean, default: false },
  label: { type: String, default: "Volume" }
});

const emit = defineEmits(["update:current_volume", "change_vol"]);
function clamp(v){
  const n = Math.round(Number(v) || 0);
  return Math.max(props.min, Math.min(props.max, n));
}


const value = computed({
  get: () => props.current_volume,
  set: (v) => {
    const clamped = clamp(v);
    emit("update:current_volume", clamped);
    debouncedChange(clamped);
  }
});

// simple debounce to avoid spamming server calls
let t = null;
function debouncedChange(v) {
  if (t) clearTimeout(t);
  t = setTimeout(() => emit("change_vol", v), 250);
}
</script>

<template>
  <div class="np-vol">
    <label class="np-vol__label">
      {{ label }}
      <span class="np-vol__value">{{ value }}</span>
    </label>
    <input
        class="np-vol__slider"
        type="range"
        :min="min"
        :max="max"
        :step="step"
        v-model.number="value"
        :aria-label="label"
        :disabled="disabled"

    />
  </div>
</template>

<style scoped>
.np-vol {
  display: grid;
  gap: 6px;
  min-width: 180px;
}
.np-vol__label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text, #e6e9ef);
  font-size: 0.9rem;
}
.np-vol__value {
  font-variant-numeric: tabular-nums;
  opacity: 0.9;
}

.np-vol__slider {
  -webkit-appearance: none;
  width: 100%;
  height: 8px;
  border-radius: 999px;
  background: rgba(255,255,255,0.12);
  outline: none;
}

/* track */
.np-vol__slider::-webkit-slider-runnable-track {
  height: 8px; border-radius: 999px; background: rgba(255,255,255,0.12);
}
.np-vol__slider::-moz-range-track {
  height: 8px; border-radius: 999px; background: rgba(255,255,255,0.12);
}

/* thumb */
.np-vol__slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 16px; height: 16px; border-radius: 50%;
  background: linear-gradient(90deg, var(--accent, #1DB954), var(--accent-2, #3ae27f));
  border: none;
  margin-top: -4px; /* center over 8px track */
  box-shadow: 0 0 0 4px rgba(29,185,84,0.25);
  cursor: pointer;
}
.np-vol__slider::-moz-range-thumb {
  width: 16px; height: 16px; border-radius: 50%;
  background: linear-gradient(90deg, var(--accent, #1DB954), var(--accent-2, #3ae27f));
  border: none;
  box-shadow: 0 0 0 4px rgba(29,185,84,0.25);
  cursor: pointer;
}
</style>