import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TimeZone } from '~/entities/time-zone'
import { timeZoneListModel } from '~/features/time/zone-list'
import { useAppSelector } from '~/shared/lib/redux'

import { SLICE_NAME } from './constants'

type State = {
  timeZoneList: TimeZone[]
}

const initialState: State = {
  timeZoneList: [],
}

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    removeTimeZone: (state, { payload }: PayloadAction<TimeZone>) => {
      state.timeZoneList = state.timeZoneList.filter(
        (timeZone) => timeZone.tz !== payload.tz,
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      timeZoneListModel.selectTimeZone.fulfilled,
      (state, { payload }) => {
        if (state.timeZoneList.every((item) => item.tz !== payload.tz)) {
          state.timeZoneList.push(payload)
        }
      },
    )
  },
})

export const { removeTimeZone } = slice.actions

export const useTimeZoneList = () =>
  useAppSelector((state) => state[SLICE_NAME].timeZoneList)

export const reducer = { [SLICE_NAME]: slice.reducer }
