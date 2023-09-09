import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import StopCircleIcon from '@mui/icons-material/StopCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import { useSnackbar } from 'notistack'

import { Clock } from '~/shared/ui/Clock'
import { ClockStatusEnum, TIME_FORMAT_CLOCK } from '~/shared/config/constants'
import { useAppDispatch } from '~/shared/lib/redux'
import { zeroTime } from '~/shared/lib/zeroTime'

import {
  setStatusInProgress,
  setStatusNew,
  setStatusStopped,
  subtractOneSecond,
  useStartTime,
  useStatus,
  useTime,
} from '../model'

export function Time() {
  const status = useStatus()
  const time = useTime()
  const startTime = useStartTime()

  const { enqueueSnackbar } = useSnackbar()
  const dispatch = useAppDispatch()

  const handleClockOneSecond = () => {
    if (time.isAfter(zeroTime)) {
      dispatch(subtractOneSecond())
    } else {
      enqueueSnackbar('Timer - ' + startTime?.format(TIME_FORMAT_CLOCK), {
        variant: 'info',
      })

      dispatch(setStatusNew())
    }
  }

  return (
    <Stack justifyContent='center' alignItems='center'>
      <Clock
        status={status}
        time={time}
        oneSecondHandler={handleClockOneSecond}
      />

      <Stack justifyContent='center' alignItems='center' direction='row'>
        {(status === ClockStatusEnum.InProgress ||
          status === ClockStatusEnum.Stopped) && (
          <IconButton onClick={() => dispatch(setStatusNew())}>
            <StopCircleIcon fontSize='large' />
          </IconButton>
        )}

        {status === ClockStatusEnum.Stopped && (
          <IconButton onClick={() => dispatch(setStatusInProgress())}>
            <PlayCircleIcon fontSize='large' />
          </IconButton>
        )}

        {status === ClockStatusEnum.InProgress && (
          <IconButton onClick={() => dispatch(setStatusStopped())}>
            <PauseCircleIcon fontSize='large' />
          </IconButton>
        )}
      </Stack>
    </Stack>
  )
}
