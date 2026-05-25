<template>
  <div class="currentEvent">
    <RouterLink :to="{ name: 'CurrentEvent', params: { id: ourEvent.id } }">
      <div class="caption">{{ ourEvent.name }}</div>
    </RouterLink>
    <div class="datetime">{{ convertDate(ourEvent.datetime) }}</div>
    <div class="coordX">Координата Х: {{ ourEvent.coordX }}</div>
    <div class="coordY">Координата Y: {{ ourEvent.coordY }}</div>
    <v-btn
      class="deleteButton"
      variant="outlined"
      color="red"
      prepend-icon="mdi-delete-outline"
      rounded="lg"
      @click="deleteEvent(ourEvent.id)"
    >
      Удалить
    </v-btn>
  </div>
</template>

<script lang="ts" setup>
import { type PropType } from "vue"
import { useOurEvent, type ourEventType } from "./composables/useOurEvent"
import { convertDate } from "./composables/shared"

defineOptions({
  name: "CurrentEvent",
})

defineProps({
  ourEvent: {
    type: Object as PropType<ourEventType>,
    required: true,
  },
})

const { deleteEvent } = useOurEvent()
</script>

<style scoped>
.currentEvent {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgb(66, 66, 236);
}

.caption {
  font: 500 22px/24px serif;
}

.deleteButton {
  margin-top: 12px;
}
</style>
