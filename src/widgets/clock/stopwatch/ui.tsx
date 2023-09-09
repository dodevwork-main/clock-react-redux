import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import PlayCircleIcon from '@mui/icons-material/PlayCircle'
import PauseCircleIcon from '@mui/icons-material/PauseCircle'
import StopCircleIcon from '@mui/icons-material/StopCircle'

import { Clock } from '~/shared/ui/Clock'
import { ClockStatusEnum } from '~/shared/config/constants'
import { useAppDispatch } from '~/shared/lib/redux'

import {
  addOneSecond,
  setStatusInProgress,
  setStatusNew,
  setStatusStopped,
  useStatus,
  useTime,
} from './model'

export function Stopwatch() {
  const status = useStatus()
  const time = useTime()

  const dispatch = useAppDispatch()

  const handleClockOneSecond = () => {
    dispatch(addOneSecond())
  }

  return (
    <Stack flex={1} minHeight={0} justifyContent='center' alignItems='center'>
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

          {(status === ClockStatusEnum.New ||
            status === ClockStatusEnum.Stopped) && (
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
    </Stack>
  )
}
