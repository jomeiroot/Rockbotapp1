<script setup lang="js">
const props = defineProps({
  song_title: String,
  artist_title: String,
  album_title: String,
})

</script>
<template>
  <header class="titles">
  <h1 class="song" :title="song_title">{{ song_title }}</h1>
  <div class="sub">
    <span class="artist" :title="artist_title">{{ artist_title }}</span>
    <span class="dot">•</span>
    <span v-if="album_title" class="album" :title="album_title">{{ album_title}}</span>
  </div>
  </header>
</template>

<style scoped>
/* center content */
.titles {
  margin-bottom: 10px;
}
.song {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 0.2px;
  line-height: 1.2;
}
.sub {
  margin-top: 4px;
  color: var(--text-dim);
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.sub .artist,
.sub .album { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.sub .dot { opacity: .6; }
</style>
