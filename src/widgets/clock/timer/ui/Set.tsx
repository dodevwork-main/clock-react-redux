import { SyntheticEvent, useState } from 'react'
import { Dayjs } from 'dayjs'
import Stack from '@mui/material/Stack'
import { MultiSectionDigitalClock } from '@mui/x-date-pickers/MultiSectionDigitalClock'
import Button from '@mui/material/Button'

import { zeroTime } from '~/shared/lib/zeroTime'
import { useAppDispatch } from '~/shared/lib/redux'

import { setTime } from '../model'

export function Set() {
  const [date, setDate] = useState<Dayjs | null>(zeroTime)

  const dispatch = useAppDispatch()

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (date) {
      dispatch(setTime(date))
    }
  }

  return (
    <Stack component='form' onSubmit={handleSubmit} spacing={2}>
      <MultiSectionDigitalClock
        timeSteps={{ hours: 1, minutes: 1, seconds: 1 }}
        views={['hours', 'minutes', 'seconds']}
        value={date}
        onChange={(newDate) => setDate(newDate)}
        ampm={false}
      />

      <Button type='submit' disabled={!date || date.isSame(zeroTime)}>
        Start
      </Button>
    </Stack>
  )
}
