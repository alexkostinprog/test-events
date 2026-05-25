/// <reference types="vite/client" />
interface ImportMetaEnv {
  // Описываем тип для нашего ключа погоды
  readonly VITE_WEATHER_API_KEY: string
  // Здесь можно описывать другие переменные, если они появятся
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
