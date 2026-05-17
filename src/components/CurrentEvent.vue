<template>
  <div class="currentEvent">
    <RouterLink :to="{ name: 'CurrentEvent', params: { id: ourEvent.id } }">
      <div class="caption">{{ ourEvent.name }}</div>
    </RouterLink>
    <div class="datetime">{{ getDateTime(ourEvent.datetime) }}</div>
    <div class="coordX">Координата Х: {{ ourEvent.coordX }}</div>
    <div class="coordY">Координата Y: {{ ourEvent.coordY }}</div>
    <v-btn variant="outlined" @click="deleteEvent(ourEvent.id)">Delete</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from "vue"
import { useOurEvent, type ourEventType } from "./composables/useOurEvent"
import dayjs from "dayjs"

defineOptions({
  name: "CurrentEvent",
})

defineProps({
  ourEvent: {
    type: Object as PropType<ourEventType>,
    required: true,
  },
})

const getDateTime = (innerTime: string) => dayjs(innerTime).format("DD.MM.YYYY hh:mm")

const { deleteEvent } = useOurEvent()
</script>

<style scoped>
.currentEvent {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid red;
  width: 200px;
}

.caption {
  font: 500 22px/24px serif;
}
</style>
