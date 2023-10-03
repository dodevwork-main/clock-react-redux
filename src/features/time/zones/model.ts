import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TimeZone, timeZoneModel } from '~/entities/time-zone'
import { useAppSelector } from '~/shared/lib/redux'

import { SLICE_NAME } from './constants'

type State = {
  timeZones: TimeZone[]
  displayedTimeZones: TimeZone[]
  modal: boolean
}

const initialState: State = {
  timeZones: [],
  displayedTimeZones: [],
  modal: false,
}

const slice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    openModal: (state) => {
      state.modal = true
    },
    closeModal: (state) => {
      state.modal = false
    },
    search: (state, { payload }: PayloadAction<string>) => {
      state.displayedTimeZones = state.timeZones.filter(
        (timeZone) =>
          timeZone.city.toLowerCase().includes(payload.toLowerCase()) ||
          timeZone.continent.toLowerCase().includes(payload.toLowerCase()),
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTimeZones.fulfilled, (state, { payload }) => {
      state.timeZones = payload
      state.displayedTimeZones = payload
    })
  },
})

export const getTimeZones = createAsyncThunk(
  `${SLICE_NAME}/getTimeZones`,
  async () => timeZoneModel.getTimeZones(),
)

export const selectTimeZone = createAsyncThunk(
  `${SLICE_NAME}/selectTimeZone`,
  (timeZone: TimeZone) => timeZone,
)

export const { openModal, closeModal, search } = slice.actions

export const useTimeZones = () =>
  useAppSelector((state) => state[SLICE_NAME].displayedTimeZones)
export const useIsOpenModal = () =>
  useAppSelector((state) => state[SLICE_NAME].modal)

export const reducer = { [SLICE_NAME]: slice.reducer }
