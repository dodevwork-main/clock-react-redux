import { Dayjs } from 'dayjs'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ClockStatusEnum } from '~/shared/config/constants'
import { zeroTime } from '~/shared/lib/zeroTime'
import { useAppSelector } from '~/shared/lib/redux'

import { SLICE_NAME } from './constants'

type State = {
  status: ClockStatusEnum
  time: Dayjs
  startTime: Dayjs | null
}

const initialState: State = {
  status: ClockStatusEnum.New,
  time: zeroTime,
  startTime: null,
}

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setStatusNew: (state) => {
      state.status = ClockStatusEnum.New
      state.time = zeroTime
      state.startTime = zeroTime
    },
    setStatusInProgress: (state) => {
      state.status = ClockStatusEnum.InProgress
    },
    setStatusStopped: (state) => {
      state.status = ClockStatusEnum.Stopped
    },
    subtractOneSecond: (state) => {
      state.time = state.time.subtract(1, 'seconds')
    },
    setTime: (state, { payload }: PayloadAction<Dayjs>) => {
      state.startTime = payload
      state.time = payload
      state.status = ClockStatusEnum.InProgress
    },
  },
})

export const {
  setStatusNew,
  setStatusInProgress,
  setStatusStopped,
  setTime,
  subtractOneSecond,
} = slice.actions

export const useStatus = () =>
  useAppSelector((state) => state[SLICE_NAME].status)
export const useTime = () => useAppSelector((state) => state[SLICE_NAME].time)
export const useStartTime = () =>
  useAppSelector((state) => state[SLICE_NAME].startTime)

export const reducer = { [SLICE_NAME]: slice.reducer }
