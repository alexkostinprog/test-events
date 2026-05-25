import dayjs from "dayjs"

export const convertDate = (innerDate: string): string => {
  return dayjs(innerDate).format("DD.MM.YYYY в HH:mm")
}
