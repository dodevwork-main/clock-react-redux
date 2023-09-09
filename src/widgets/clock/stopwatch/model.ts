import { createSlice } from '@reduxjs/toolkit'
import { Dayjs } from 'dayjs'

import { ClockStatusEnum } from '~/shared/config/constants'
import { zeroTime } from '~/shared/lib/zeroTime'
import { useAppSelector } from '~/shared/lib/redux'

import { SLICE_NAME } from './constants'

type State = {
  status: ClockStatusEnum
  time: Dayjs
}

const initialState: State = {
  status: ClockStatusEnum.New,
  time: zeroTime,
}

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setStatusNew: (state) => {
      state.status = ClockStatusEnum.New
      state.time = zeroTime
    },
    setStatusInProgress: (state) => {
      state.status = ClockStatusEnum.InProgress
    },
    setStatusStopped: (state) => {
      state.status = ClockStatusEnum.Stopped
    },
    addOneSecond: (state) => {
      state.time = state.time.add(1, 'second')
    },
  },
})

export const {
  setStatusNew,
  setStatusInProgress,
  setStatusStopped,
  addOneSecond,
} = slice.actions

export const useStatus = () =>
  useAppSelector((state) => state[SLICE_NAME].status)
export const useTime = () => useAppSelector((state) => state[SLICE_NAME].time)

export const reducer = { [SLICE_NAME]: slice.reducer }
