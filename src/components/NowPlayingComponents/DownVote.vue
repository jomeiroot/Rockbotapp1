<script setup lang="js">

const props = defineProps({
  NumDownVotes: Number
})

let have_voted_down = false
function vote_down(){
  have_voted_down = !have_voted_down
  emit('vote')
}

const emit = defineEmits(["vote"])
</script>

<template>
  <button v-if= "have_voted_down" class="clicked" @click="vote_down">👎 {{ props.NumDownVotes }}</button>
  <button v-else class="chip" @click="vote_down">👎 {{ props.NumDownVotes }}</button>
</template>

<style src="@/components/NowPlayingComponents/UpDownVotesstyling.css" scoped>


</style>