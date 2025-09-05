<script setup lang="js">

const props = defineProps({
  NumDownVotes: Number
})

const emit = defineEmits(["vote"])
</script>

<template>
  <button class="chip" @click="emit('vote')">👎 {{ props.NumDownVotes }}</button>
</template>

<style src="@/components/NowPlayingComponents/UpDownVotesstyling.css" scoped>


</style>