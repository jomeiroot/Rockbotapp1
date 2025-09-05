<script setup lang="js">
import { reactive, computed, onMounted } from "vue";
import now_playing_temp_Json from "@/assets/remote_api_examples/now_playing.json";
import Controls from "@/components/NowPlayingComponents/Controls.vue";
import SongTitles from "@/components/NowPlayingComponents/SongTitles.vue";
import ProgressBar from "@/components/NowPlayingComponents/ProgressBar.vue";
import UpVote from "@/components/NowPlayingComponents/UpVote.vue";
import DownVote from "@/components/NowPlayingComponents/DownVote.vue";
import UpDownVote from "@/components/NowPlayingComponents/UpDownVote.vue";


const track = reactive({
  song_id: 0,
  song: "",
  artist_id: 0,
  artist: "",
  album: "",
  artwork_small: "",
  artwork_large: "",
  duration: 0,
  remaining: 0,
  votes_up: 0,
  votes_down: 0,
  volume: 0,
  platform: ""
});
function set_volume(v){
  const n = Math.round(Number(v) || 0);
  track.volume = Math.max(0, Math.min(10, n));
}

// --- NEW: derive elapsed/progress from payload only (no timer) ---
const elapsed = computed(() => {
  const d = Number(track.duration) || 0;
  const r = Number(track.remaining) || 0;
  const e = Math.max(0, d - r);
  return Math.min(e, d);
});
const progress = computed(() => {
  const d = Number(track.duration) || 0;
  if (!d) return 0;
  return Math.round((elapsed.value / d) * 100);
});
const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${String(sec).padStart(2, "0")}`;
};
const artworkSrc = computed(() => track.artwork_large || track.artwork_small || "");
//post: switches img to small img if problem w/ big img
const onImgError = (e) => {
  const img = e.target;
  if (img && track.artwork_small && img.src !== track.artwork_small) {
    img.src = track.artwork_small;
  }
};

let have_voted_up = false;
function fake_up_vote(){
  if (have_voted_up) {
    track.votes_up--;

  }else {
    track.votes_up++;
  }
  have_voted_up = !have_voted_up;
}
let have_voted_down = false;
function fake_down_vote(){
  if (have_voted_down) {
    track.votes_down--;

  }else {
    track.votes_down++;
  }
  have_voted_down = !have_voted_down;
}

//post: sets up data -- when mounted...
onMounted(async () => {
  let data;
  try {
    const res = await fetch("https://api.rockbot.com/v3/remote/now_playing", {
      // headers: { Authorization: `Bearer ${import.meta.env.VITE_ROCKBOT_API_KEY}` }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    data = await res.json();
  } catch (err) {
    console.error("Fetch failed, using fallback JSON:", err);
    data = now_playing_temp_Json;
  }

  if (!data) {
    console.error("data = null in NowPlayingComponent");
    return;
  }
  Object.assign(track, data);
});
</script>

<template>
  <section class="player-wrap" v-if="track.song">
    <!-- blurred background from artwork -->
    <div class="bg" :style="{ '--art': `url('${artworkSrc}')` }"></div>

    <div class="player">
      <div class="left">
        <div class="artwork shadow">
          <img
              :src="artworkSrc"
              :alt="`${track.album || 'Album'} cover`"
              @error="onImgError"
              loading="lazy"
          />
        </div>
      </div>

      <div class="center">
        <SongTitles
            :song_title="track.song"
            :album_title="track.album"
            :artist_title="track.artist"></SongTitles>
        <!-- controls row (visual only — hook up later if you like) -->
        <Controls class="controls"></Controls>
        <!-- progress -->
        <progress-bar
            :duration="track.duration"
            :remaining="track.remaining">
        </progress-bar>
      </div>

      <aside class="right">
        <UpDownVote :numUpVotes="track.votes_up" :numDownVotes="track.votes_down" v-model:current_volume="track.volume" @vote_down="fake_down_vote" @vote_up="fake_up_vote" @change_vol="val => set_volume(val)"></UpDownVote>

<!--        <VolumePopOver-->
<!--            v-model="track.volume"-->
<!--            :min="0"-->
<!--            :max="10"-->
<!--            :step="1"-->
<!--            label="Volume"-->
<!--            @change_vol=" val => set_volume(val)"-->
<!--        />-->
      </aside>
    </div>
  </section>

  <div v-else class="placeholder">
    Loading now playing…
  </div>
</template>

<style scoped>
:root { /* local custom props are OK in scoped styles */
  --bg: #0f1116;
  --panel: rgba(18, 20, 26, 0.75);
  --text: #e6e9ef;
  --text-dim: #a6adbb;
  --accent: #1DB954; /* Spotify green */
  --accent-2: #3ae27f;
  --border: rgba(255,255,255,0.07);
}

.player-wrap {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  isolation: isolate;
  box-shadow: 0 20px 60px rgba(0,0,0,0.35);
}

/* blurred artwork backdrop */
.player-wrap .bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--bg);
  z-index: -2;
}
.player-wrap .bg::after {
  content: "";
  position: absolute;
  inset: -20px;
  z-index: -1;
  background-image: var(--art);
  background-size: cover;
  background-position: center;
  filter: blur(36px) saturate(130%) brightness(65%);
  opacity: 0.45;
  transform: scale(1.1);
}

.player {
  display: grid;
  grid-template-columns: 140px 1fr auto;
  gap: 22px;
  padding: 22px;
  background: linear-gradient(180deg, var(--panel), rgba(18,20,26,0.55));
  backdrop-filter: blur(18px);
  color: var(--text);
  border: 1px solid var(--border);
  border-radius: 20px;
}

/* left / artwork */
.artwork {
  width: 140px;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
}
.artwork img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform .35s ease;
}
.artwork:hover img { transform: scale(1.05); }
.shadow { box-shadow: 0 10px 30px rgba(0,0,0,0.35); }

/* center content */

.sub .artist,
.sub .album { white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
.sub .dot { opacity: .6; }

/* controls */
.controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 6px 0 8px;
}

/* right / stats */
.right {
  display: flex;
  align-items: start;
}
.stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}
.chip {
  border-radius: 999px;
  padding: 6px 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid var(--border);
  color: var(--text);
  font-size: 0.9rem;
}

/* placeholder */
.placeholder {
  padding: 22px;
  text-align: center;
  color: var(--text-dim);
  background: #111319;
  border: 1px dashed var(--border);
  border-radius: 20px;
}

/* responsive */
@media (max-width: 760px) {
  .player { grid-template-columns: 96px 1fr; gap: 16px; }
  .right { grid-column: 1 / -1; }
  .artwork { width: 96px; height: 96px; }
  .song { font-size: 1.15rem; }
}
</style>