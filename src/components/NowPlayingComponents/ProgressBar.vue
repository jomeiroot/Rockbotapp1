<script setup>
import {computed} from "vue";

const props = defineProps({
  duration: Number,
  remaining: Number
})



const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
};

const elapsed = computed(() => {
  const d = Number(props.duration) || 0;
  const r = Number(props.remaining) || 0;
  const e = Math.max(0, d - r);
  return Math.min(e, d);
});
const progress = computed(() => {
  const d = Number(props.duration) || 0;
  if (!d) return 0;
  return Math.round((elapsed.value / d) * 100);
});

</script>

<template>
<div class="progress">
<span class="time">{{ formatTime(elapsed) }}</span>
<div class="bar">
  <div class="fill" :style="{ width: progress + '%' }">
    <div class="knob"></div>
  </div>
</div>
<span class="time">{{ formatTime(props.duration || 0) }}</span>
</div>


</template>

<style scoped>
.progress {
  display: grid;
  grid-template-columns: 44px 1fr 44px;
  align-items: center;
  gap: 10px;
}
.time {
  font-variant-numeric: tabular-nums;
  font-size: 0.9rem;
  color: var(--text-dim);
}
.bar {
  position: relative;
  height: 8px;
  border-radius: 999px;
  background: rgba(255,255,255,0.1);
  overflow: hidden;
}
.fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  border-radius: 999px;
  transition: width .35s ease;
  position: relative;
}
.knob {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 0 0 4px rgba(29,185,84,0.25);
}

</style>