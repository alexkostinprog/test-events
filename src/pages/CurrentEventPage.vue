<template>
  <router-link to="/">
    <div class="goToMain">⇐ На Главную</div>
  </router-link>
  <div class="caption">Конкретное событие</div>
  <v-card v-if="curr && !editMode" variant="elevated" width="312" color="indigo-darken-3">
    <v-card-item>
      <v-card-title>
        Название: <b>{{ curr.name }}</b>
      </v-card-title>
      <v-card-subtitle>
        Дата и время: <b>{{ formatedDate(curr.datetime) }}</b>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <div class="name">Долгота: {{ curr.coordX }}</div>
      <div class="name">Широта: {{ curr.coordY }}</div>
    </v-card-text>
  </v-card>

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

  <div v-if="!editMode" class="buttonsLine">
    <v-btn class="px-20" color="red" variant="elevated" @click="editEvent">Редактировать</v-btn>
    <v-btn class="saveBtn" color="indigo" variant="elevated" @click="loadWeather">
      Запросить погоду!
    </v-btn>
    <div v-if="temperature">Температура: {{ temperature }}</div>
  </div>

  <div v-if="editMode">
    <v-btn @click="cancelEditEvent">Отмена Редактирования</v-btn>
    <v-btn
      class="saveBtn"
      @click="
        saveEvent(curr?.id || 0, name, selectedDate || null, timePicker || null, coordX, coordY)
      "
      >Сохранить</v-btn
    >
  </div>
</template>

<script lang="ts" setup>
import { useEventsStore } from "@/store/store"
import { useRoute } from "vue-router"
import dayjs from "dayjs"
import { computed } from "vue"
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

const {
  name,
  rules,
  formattedDate,
  timePicker,
  coordX,
  coordY,
  showMenu,
  selectedDate,
  editMode,
  editEvent,
  cancelEditEvent,
  saveEvent,
} = useOurEvent(curr)

const { temperature, loadWeather } = useWeather(curr)
</script>

<style scoped>
.caption {
  font:
    700 24px/28px Verdana,
    serif;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
  background-color: blueviolet;
  width: max-content;
}

.saveBtn {
  margin-left: 24px;
}

.buttonsLine {
  margin-top: 24px;
}

.goToMain {
  padding: 12px 0 24px 0;
}
</style>
