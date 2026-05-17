<template>
  <div class="caption">Конкретное событие</div>
  <div v-if="curr && !editMode">
    <div class="name">Название: {{ curr.name }}</div>
    <div class="name">Дата и время: {{ formatedDate(curr.datetime) }}</div>
    <div class="name">X: {{ curr.coordX }}</div>
    <div class="name">Y: {{ curr.coordY }}</div>
  </div>

  <div v-if="curr && editMode">
    <v-container>
      <v-text-field
        v-model="name"
        :rules="rules"
        label="Название"
        variant="outlined"
      ></v-text-field>
      <v-menu :close-on-content-click="true" location="bottom">
        <!-- Активатор: поле ввода, по клику на которое откроется меню -->
        <template #activator="{ props }">
          <v-text-field
            v-bind="props"
            :model-value="formattedDate"
            label="Дата события"
            variant="outlined"
          ></v-text-field>
        </template>
        <v-date-picker v-model="selectedDate" color="primary"></v-date-picker>
      </v-menu>
      <v-text-field :model-value="timePicker" label="Время события" readonly>
        <v-menu v-model="showMenu" :close-on-content-click="false" activator="parent" min-width="0">
          <v-time-picker v-model="timePicker"></v-time-picker>
        </v-menu>
      </v-text-field>
      <v-number-input v-model="coordX" label="Координата Х" variant="outlined"></v-number-input>
      <v-number-input v-model="coordY" label="Координата Y" variant="outlined"></v-number-input>
    </v-container>
  </div>

  <div v-if="!editMode">
    <v-btn class="px-20" @click="editEvent">Edit Event</v-btn>
    <v-btn class="saveBtn" @click="loadWeather">Get Weather</v-btn>
    <div v-if="temperature">Temp: {{ temperature }}</div>
  </div>

  <div v-if="editMode">
    <v-btn @click="cancelEditEvent">Cancel Edit Event</v-btn>
    <v-btn
      class="saveBtn"
      @click="
        saveEvent(curr?.id || 0, name, selectedDate || null, timePicker || null, coordX, coordY)
      "
      >Save Event</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import { useEventsStore } from "@/store/store"
import { useRoute } from "vue-router"
import dayjs from "dayjs"
import { computed, ref } from "vue"
import { useOurEvent, type ourEventType } from "@/components/composables/useOurEvent"
import { useWeather } from "@/components/composables/useWeather"

defineOptions({
  name: "CurrentEvent",
})

const route = useRoute()

const innerId = Number(route.params.id)
const { ourEventsStore } = useEventsStore()
const curr = computed((): ourEventType => {
  const event = ourEventsStore.value?.find((ev) => ev.id === innerId)

  return (
    event || {
      id: 0,
      datetime: "",
      name: "No events",
    }
  )
})

const formatedDate = (innerDate: string): string => {
  return dayjs(innerDate).format("DD.MM.YYYY в HH:mm")
}

const editMode = ref(false)

const editEvent = () => {
  editMode.value = true
  name.value = curr?.value?.name || ""
  selectedDate.value = curr?.value?.datetime ? dayjs(curr.value?.datetime).toDate() : null
  timePicker.value = curr?.value?.datetime ? dayjs(curr.value?.datetime).format("HH:mm") : ""
  coordX.value = curr?.value?.coordX || 0
  coordY.value = curr?.value?.coordY || 0
}

const cancelEditEvent = (): void => {
  editMode.value = false
}

const { name, rules, formattedDate, timePicker, coordX, coordY, showMenu, selectedDate } =
  useOurEvent()

const saveEvent = (
  iId: number,
  innerName: string,
  iSelectedDate: Date | null,
  iTimePicker: string | null,
  innerCoordX: number,
  innerCoordY: number,
): void => {
  const datePart = iSelectedDate ? dayjs(iSelectedDate).format("YYYY-MM-DD") : ""
  const timePart = iTimePicker || "00:00"
  let tzOffset = dayjs().format("Z")
  if (tzOffset === "Z") tzOffset = "+00:00"
  const innerDatetime = iSelectedDate ? `${datePart}T${timePart}:00.000${tzOffset}` : ""

  const innerEvent: ourEventType = {
    id: iId,
    name: innerName,
    datetime: innerDatetime,
    coordX: innerCoordX,
    coordY: innerCoordY,
  }
  console.log("innerEvent = ", JSON.stringify(innerEvent))
  const tempIndex = ourEventsStore.value.findIndex((ev) => ev.id === iId)
  if (tempIndex !== -1) {
    ourEventsStore.value.splice(tempIndex, 1, innerEvent)
  }

  // curr.value = ourEventsStore.value.find((ev) => ev.id === innerId)
  cancelEditEvent()
}

const { temperature, loadWeather } = useWeather(curr)
</script>

<style scoped>
.caption {
  font:
    700 24px/28px Verdana,
    serif;
  padding: 24px 0;
}

.saveBtn {
  margin-left: 36px;
}
</style>
