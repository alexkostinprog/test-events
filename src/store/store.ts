import type { ourEventType } from "@/components/composables/useOurEvent"
import { STORAGE_KEY } from "@/settings"
import { useStorage } from "@vueuse/core"

const defaultEvents: ourEventType[] = []

export function useEventsStore() {
  const ourEventsStore = useStorage<ourEventType[]>(STORAGE_KEY, defaultEvents)

  return {
    ourEventsStore,
  }
}
