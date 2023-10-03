import dayjs from 'dayjs'

import { TimeZone } from './types'

export function getTimeZones(): TimeZone[] {
  return Intl.supportedValuesOf('timeZone').map((timeZone) => {
    const [continent, city] = timeZone.replaceAll('_', ' ').split('/')

    return {
      city,
      continent,
      tz: timeZone,
      gmt: dayjs.tz(undefined, timeZone).format('Z'),
    }
  })
}
