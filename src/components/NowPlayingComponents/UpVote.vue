<script setup lang="js">
const props = defineProps({
  NumUpVotes: Number
})
const emit = defineEmits(["vote"])


</script>

<template>
  <button class="chip" @click="emit('vote')">👍 {{ props.NumUpVotes }}</button>
</template>

<style src="@/components/NowPlayingComponents/UpDownVotesstyling.css" scoped>

</style>