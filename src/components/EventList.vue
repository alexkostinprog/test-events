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

  <div class="buttonLine">
    <v-dialog max-width="500">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          color="green"
          text="Добавить"
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
            <v-btn variant="flat" prepend-icon="mdi-plus-circle" color="green" @click="addEvent">
              Добавить
            </v-btn>
            <v-btn
              variant="flat"
              prepend-icon="mdi-close-circle"
              color="red"
              @click="isActive.value = false"
            >
              Закрыть
            </v-btn>
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
    <v-btn class="px-20" prepend-icon="mdi-close-circle" color="red" @click="clearStore">
      Очистить
    </v-btn>
  </div>

  <v-snackbar
    v-model="showErrorSnackbar"
    color="error"
    timeout="3000"
    location="bottom center"
    rounded="lg"
    elevation="24"
  >
    <div class="d-flex align-center">
      <v-icon start icon="mdi-alert-circle-outline" class="mr-2"></v-icon>
      <span>Название события - обязательное поле!</span>
    </div>

    <template #actions>
      <v-btn variant="text" icon="mdi-close" @click="showErrorSnackbar = false"></v-btn>
    </template>
  </v-snackbar>
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
  grid-template-columns: 1fr;
  gap: 20px;
}

.buttonLine {
  padding: 24px 0 12px 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
}

@media (min-width: 420px) {
  .eventList {
    grid-template-columns: repeat(2, 1fr);
  }
  .buttonLine {
    flex-direction: row;
    flex-wrap: wrap;
  }
}

@media (min-width: 622px) {
  .eventList {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1145px) {
  .eventList {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
