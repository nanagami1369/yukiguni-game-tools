import { Temporal } from "temporal-polyfill";


export const formatZonedInternational = (dateTime: Temporal.ZonedDateTime): string => {
    return `${new String(dateTime.year).padStart(4, '0')}-${new String(dateTime.month).padStart(2, '0')}-${new String(dateTime.day).padStart(2, '0')} ${new String(dateTime.hour).padStart(2, '0')}:${new String(dateTime.minute).padStart(2, '0')}:${new String(dateTime.second).padStart(2, '0')}`
}

export const formatZoned = (dateTime: Temporal.ZonedDateTime): string => {
    return `${new String(dateTime.year).padStart(4, '0')}/${new String(dateTime.month).padStart(2, '0')}/${new String(dateTime.day).padStart(2, '0')} ${new String(dateTime.hour).padStart(2, '0')}:${new String(dateTime.minute).padStart(2, '0')}:${new String(dateTime.second).padStart(2, '0')}`
}
