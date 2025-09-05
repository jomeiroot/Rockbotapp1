<script setup lang="ts">
import { ref } from "vue";
import { requestTrack } from "@/api/rockbot";

const venueId = "YOUR_VENUE_ID";
const trackId = ref("");
const status = ref("");

async function submit() {
  status.value = "Requesting…";
  try {
    await requestTrack(venueId, trackId.value);
    status.value = "✅ Requested!";
    trackId.value = "";
  } catch (e: any) {
    status.value = "❌ " + (e?.message ?? "Failed");
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <input v-model="trackId" placeholder="Track ID" required />
    <button>Request</button>
    <span>{{ status }}</span>
  </form>
</template>