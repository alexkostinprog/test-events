<template>
  <v-container>
    <v-text-field
      v-model="search"
      label="Фильтр по Названию"
      placeholder="С третьего символа"
      variant="outlined"
    ></v-text-field>
  </v-container>

  <div class="eventList">
    <CurrentEvent v-for="ourEvent in filteredEvents" :key="ourEvent.id" :ourEvent="ourEvent" />
  </div>

  <v-container class="d-flex justify-center ga-4">
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Add Event"
          variant="flat"
        ></v-btn>
      </template>

      <template v-slot:default="{ isActive }">
        <v-card title="Добавляем Событие">
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

              <!-- Сам календарь внутри выпадающего меню -->
              <v-date-picker v-model="selectedDate" color="primary"></v-date-picker>
            </v-menu>
            <v-text-field :model-value="timePicker" label="Время события" readonly>
              <v-menu
                v-model="showMenu"
                :close-on-content-click="false"
                activator="parent"
                min-width="0"
              >
                <v-time-picker v-model="timePicker"></v-time-picker>
              </v-menu>
            </v-text-field>
            <v-number-input
              v-model="coordX"
              label="Координата Х"
              variant="outlined"
            ></v-number-input>
            <v-number-input
              v-model="coordY"
              label="Координата Y"
              variant="outlined"
            ></v-number-input>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn variant="outlined" @click="addEvent"> Add to Storage </v-btn>
            <v-btn variant="outlined" text="Close Dialog" @click="isActive.value = false"></v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
    <v-btn variant="outlined" class="px-20" @click="sortAsc"> Sort ASC </v-btn>
    <v-btn variant="outlined" class="px-20" @click="sortDesc"> Sort DESC </v-btn>
    <v-btn variant="outlined" class="px-20" @click="clearStore"> Clear Storage </v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import CurrentEvent from "./CurrentEvent.vue"
import { useOurEvent } from "./composables/useOurEvent"

const {
  name,
  selectedDate,
  timePicker,
  showMenu,
  coordX,
  coordY,
  addEvent,
  clearStore,
  formattedDate,
  rules,
  sortAsc,
  sortDesc,
  search,
  filteredEvents,
} = useOurEvent()
</script>

<style scoped>
.eventList {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>
