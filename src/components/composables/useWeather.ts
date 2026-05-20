import axios from "axios"
import { ref, toValue, type ComputedRef, type Ref } from "vue"
import type { ourEventType } from "./useOurEvent"
import dayjs from "dayjs"
import { API_KEY_WEATHER } from "@/settings"

export function useWeather(innerEvent: ComputedRef<ourEventType>): useWeatherType {
  // console.log("useWeather innerEvent = ", JSON.stringify(toValue(innerEvent)))
  const toValueEvent = toValue(innerEvent)
  const temperature = ref(0)

  const loadWeather = async (): Promise<void> => {
    try {
      const lat = toValueEvent.coordX
      const lon = toValueEvent.coordY
      const formattedDate = dayjs(toValueEvent.datetime).format("YYYY-MM-DD")
      const apiKey = API_KEY_WEATHER
      const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${lat},${lon}/${formattedDate}?key=${apiKey}&unitGroup=metric&lang=ru&contentType=json&elements=datetime,tempmax,tempmin`
      const response = await axios(url)

      // console.log("response = ", JSON.stringify(response.data))

      if (response.status === 200) {
        temperature.value = response.data.days[0].tempmax
      }
    } catch (e) {
      console.error(e)
    }
  }
  return { temperature, loadWeather }
}

type useWeatherType = {
  temperature: Ref<number>
  loadWeather: () => Promise<void>
}
