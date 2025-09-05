<script setup>
import UpVote from "@/components/NowPlayingComponents/UpVote.vue";
import DownVote from "@/components/NowPlayingComponents/DownVote.vue";
import VolumePopOver from "@/components/NowPlayingComponents/VolumePopOver.vue";
import { computed } from "vue";

const emit = defineEmits(["vote_up", "vote_down", "change_vol", "update:current_volume"]);const props = defineProps({
  numDownVotes: Number,
  numUpVotes: Number,
  current_volume: Number
})

const model = computed({
  get: () => props.current_volume,
  set: v => emit("update:current_volume", v)
});

</script>
<template>
  <ul class = "stats">
    <li class="chip"><UpVote :NumUpVotes="props.numUpVotes" @vote="emit('vote_up')"></UpVote></li>
    <li class="chip"><DownVote :NumDownVotes="props.numDownVotes" @vote="emit('vote_down')"></DownVote></li>
    <li class ="chip"><VolumePopOver
        v-model:current_volume="model"
        :min="0"
        :max="10"
        :step="1"
        label="Volume"
        @change_vol="val => emit('change_vol', val)"
        />
    </li>
  </ul>
</template>
<style src="@/components/NowPlayingComponents/UpDownVotesstyling.css" scoped>
.stats {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>