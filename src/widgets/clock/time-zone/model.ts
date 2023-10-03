import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TimeZone } from '~/entities/time-zone'
import { timeZonesModel } from '~/features/time/zones'
import { useAppSelector } from '~/shared/lib/redux'

import { SLICE_NAME } from './constants'

type State = {
  timeZones: TimeZone[]
}

const initialState: State = {
  timeZones: [],
}

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    removeTimeZone: (state, { payload }: PayloadAction<TimeZone>) => {
      state.timeZones = state.timeZones.filter(
        (timeZone) => timeZone.tz !== payload.tz,
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      timeZonesModel.selectTimeZone.fulfilled,
      (state, { payload }) => {
        if (state.timeZones.every((item) => item.tz !== payload.tz)) {
          state.timeZones.push(payload)
        }
      },
    )
  },
})

export const { removeTimeZone } = slice.actions

export const useTimeZones = () =>
  useAppSelector((state) => state[SLICE_NAME].timeZones)

export const reducer = { [SLICE_NAME]: slice.reducer }
