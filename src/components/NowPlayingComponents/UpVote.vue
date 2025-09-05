<script setup lang="js">
const props = defineProps({
  NumUpVotes: Number
})
const emit = defineEmits(["vote"])

let have_voted_up = false
function vote_up(){
  have_voted_up = !have_voted_up
  emit('vote')
}

</script>

<template>
  <button v-if="!have_voted_up" class="chip" @click="vote_up">👍 {{ props.NumUpVotes }}</button>
  <button v-else class="clicked" @click="vote_up">👍 {{ props.NumUpVotes }}</button>
</template>

<style src="@/components/NowPlayingComponents/UpDownVotesstyling.css" scoped>


</style>