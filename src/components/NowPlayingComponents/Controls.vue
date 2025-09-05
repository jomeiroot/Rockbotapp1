<script setup lang="js">


const emit = defineEmits(["skip", "previous", 'play_pause'])

</script>

<template>


  <div class="controls">
    <button class="btn ghost" aria-label="Previous" title="Previous" @click="emit('previous')">⏮</button>
    <button class="btn primary" aria-label="Play/Pause" title="Play/Pause" @click="emit('play_pause')">▶</button>
    <button class="btn ghost" aria-label="Next" title="Next" @click="emit('skip')">⏭</button>
  </div>
</template>

<style scoped>
.btn {
  border: 1px solid var(--border);
  background: rgba(255,255,255,0.03);
  color: var(--text);
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 0.95rem;
  line-height: 1;
  cursor: pointer;
  transition: transform .12s ease, background .2s ease, border-color .2s ease;
}
.btn:hover { background: rgba(255,255,255,0.06); transform: translateY(-1px); }
.btn.primary {
  background: linear-gradient(90deg, var(--accent), var(--accent-2));
  color: #0a0d0f;
  border: none;
  font-weight: 700;
}
.btn.primary:hover { filter: brightness(1.05); }


</style>