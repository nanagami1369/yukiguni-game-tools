import { Temporal } from "temporal-polyfill";

/**
 * @function
 * @name formatZonedInternational
 * @description 日時データをYYYY-MM-DD hh:mm:ss形式に変換する
 * @param dateTime 日時データ
 * @returns YYYY-MM-DD hh:mm:ss
 */
export const formatZonedInternational = (dateTime: Temporal.ZonedDateTime): string => {
    return `${new String(dateTime.year).padStart(4, '0')}-${new String(dateTime.month).padStart(2, '0')}-${new String(dateTime.day).padStart(2, '0')} ${new String(dateTime.hour).padStart(2, '0')}:${new String(dateTime.minute).padStart(2, '0')}:${new String(dateTime.second).padStart(2, '0')}`
}

/**
 * @function
 * @name formatZoned
 * @description 日時データをYYYY/MM/DD (曜日) hh:mm:ss形式に変換する
 * @param dateTime 日時データ
 * @returns YYYY/MM/DD (曜日) hh:mm:ss
 */
export const formatZoned = (dateTime: Temporal.ZonedDateTime): string => {
    const dayOfWeekFormat = ['月', '火', '水', '木', '金', '土', '日']
    return `${new String(dateTime.year).padStart(4, '0')}/${new String(dateTime.month).padStart(2, '0')}/${new String(dateTime.day).padStart(2, '0')} (${dayOfWeekFormat[dateTime.dayOfWeek - 1]}) ${new String(dateTime.hour).padStart(2, '0')}:${new String(dateTime.minute).padStart(2, '0')}:${new String(dateTime.second).padStart(2, '0')}`
}
/**
 * @function
 * @name formatGoogleCalenderUrl
 * @description 指定した日付をGoogleヵレンダーに予定を追加するURLに変換する
 * @param dateTime 日時データ
 * @returns Googleヵレンダーに予定を追加するURL
 */
export const formatGoogleCalenderUrl = (dateTime: Temporal.ZonedDateTime): string => {
    const start = dateTime
    const end = dateTime.add({ hours: 1 })
    return `https://www.google.com/calendar/render?action=TEMPLATE&dates=${new String(start.year).padStart(4, '0')}${new String(start.month).padStart(2, '0')}${new String(start.day).padStart(2, '0')}T${new String(start.hour).padStart(2, '0')}${new String(start.minute).padStart(2, '0')}${new String(start.second).padStart(2, '0')}/${new String(end.year).padStart(4, '0')}${new String(end.month).padStart(2, '0')}${new String(end.day).padStart(2, '0')}T${new String(end.hour).padStart(2, '0')}${new String(end.minute).padStart(2, '0')}${new String(end.second).padStart(2, '0')}`
}
