<template>
  <v-text-field
    v-model="search"
    label="Фильтр по Названию"
    placeholder="С третьего символа"
    variant="outlined"
    prepend-inner-icon="mdi-magnify"
    color="blue"
  ></v-text-field>

  <div class="eventList">
    <CurrentEvent v-for="ourEvent in filteredEvents" :key="ourEvent.id" :ourEvent="ourEvent" />
  </div>

  <v-container class="d-flex justify-center ga-4 mt-5">
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="surface-variant"
          text="Add Event"
          variant="flat"
          prepend-icon="mdi-plus-circle"
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
    <v-btn variant="outlined" class="px-20" @click="sortAsc" prepend-icon="mdi-sort-ascending">
      Sort ASC
    </v-btn>
    <v-btn variant="outlined" class="px-20" @click="sortDesc" prepend-icon="mdi-sort-descending">
      Sort DESC
    </v-btn>
    <v-btn class="px-20" @click="clearStore" prepend-icon="mdi-close-circle" color="red">
      Clear Storage
    </v-btn>

    <v-snackbar
      v-model="showErrorSnackbar"
      color="error"
      timeout="3000"
      location="bottom center"
      rounded="lg"
      elevation="24"
    >
      <div class="d-flex align-center">
        <!-- Иконка предупреждения -->
        <v-icon start icon="mdi-alert-circle-outline" class="mr-2"></v-icon>
        <span>Название события - обязательное поле!</span>
      </div>

      <!-- Кнопка закрытия внутри уведомления -->
      <template #actions>
        <v-btn variant="text" icon="mdi-close" @click="showErrorSnackbar = false"></v-btn>
      </template>
    </v-snackbar>
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
  showErrorSnackbar,
} = useOurEvent()
</script>

<style scoped>
.eventList {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
</style>
