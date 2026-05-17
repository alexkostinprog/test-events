import { useEventsStore } from "@/store/store"
import { computed, ref, type Ref } from "vue"

export type ourEventBase = {
  name: string
  datetime: string
  coordX?: number
  coordY?: number
}

export type ourEventType = ourEventBase & {
  id: number
}

export const EventListHard = [
  {
    id: "1",
    name: "Ставрополь",
    datetime: "2026-05-25T12:00:00Z",
    coordX: 45,
    coordY: 41,
  },
  {
    id: "2",
    name: "Moscow",
    datetime: "2026-05-24T12:00:00Z",
    coordX: 55,
    coordY: 37,
  },
]

export function useOurEvent(): useOurEventType {
  const name = ref("")
  const selectedDate = ref<Date | null>(null)
  const timePicker = ref(null)
  const showMenu = ref(false)
  const coordX = ref(0)
  const coordY = ref(0)
  const search = ref("")
  const { ourEventsStore } = useEventsStore()

  const addEvent = () => {
    if (!name.value) {
      alert("Name required!") //
      return
    }
    const datetime = selectedDate.value
      ? selectedDate.value?.toISOString().substring(0, 11) + timePicker.value + ":00.000+03:00"
      : ""

    ourEventsStore.value.push({
      id: Date.now(),
      name: name.value,
      datetime,
      coordX: coordX.value,
      coordY: coordY.value,
    })

    name.value = ""
    selectedDate.value = null
    timePicker.value = null
    coordX.value = 0
    coordY.value = 0
  }

  const clearStore = () => {
    ourEventsStore.value = []
  }

  const formattedDate = computed((): string => {
    if (!selectedDate.value) return ""
    return new Date(selectedDate.value).toLocaleDateString("ru-RU")
  })

  const rules = [
    (value: string) => {
      if (value) return true
      return "Обязательное поле!"
    },
  ]

  const deleteEvent = (innerId: number): void => {
    console.log("Delete innerId = ", innerId)
    ourEventsStore.value = ourEventsStore.value.filter((ev) => ev.id !== innerId)
  }

  const sortAsc = (): void => {
    ourEventsStore.value.sort((a, b) => a.name.localeCompare(b.name))
  }

  const sortDesc = (): void => {
    ourEventsStore.value.sort((a, b) => b.name.localeCompare(a.name))
  }

  const filteredEvents = computed(() => {
    if (!search.value || search.value.length <= 2) return ourEventsStore.value
    return ourEventsStore.value.filter((ev) =>
      ev.name.toLocaleLowerCase().includes(search.value.toLocaleLowerCase()),
    )
  })

  return {
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
    deleteEvent,
    sortAsc,
    sortDesc,
    search,
    filteredEvents,
  }
}

type useOurEventType = {
  name: Ref<string>
  selectedDate: Ref<Date | null>
  timePicker: Ref<string | null>
  showMenu: Ref<boolean>
  coordX: Ref<number>
  coordY: Ref<number>
  addEvent: () => void
  clearStore: () => void
  formattedDate: Ref<string>
  rules: ((value: string) => string | boolean)[]
  deleteEvent: (innedId: number) => void
  sortAsc: () => void
  sortDesc: () => void
  search: Ref<string>
  filteredEvents: Ref<ourEventType[]>
}
