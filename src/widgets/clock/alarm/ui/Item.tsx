import IconButton from '@mui/material/IconButton'
import Card from '@mui/material/Card'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import DeleteIcon from '@mui/icons-material/Delete'

import { Alarm } from '~/entities/alarm'
import { TIME_FORMAT_MAIN } from '~/shared/config/constants'
import { useAppDispatch } from '~/shared/lib/redux'

import { removeAlarm, switchAlarm } from '../model'

type Props = {
  alarm: Alarm
}

export function Item({ alarm }: Props) {
  const dispatch = useAppDispatch()

  return (
    <Card>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        p={2}
      >
        <Typography variant='h6'>
          {alarm.time.format(TIME_FORMAT_MAIN)}
        </Typography>

        <Stack direction='row' alignItems='center'>
          <IconButton onClick={() => dispatch(removeAlarm(alarm))}>
            <DeleteIcon />
          </IconButton>

          <Switch
            checked={alarm.isOn}
            onChange={() => dispatch(switchAlarm(alarm))}
          />
        </Stack>
      </Stack>
    </Card>
  )
}
