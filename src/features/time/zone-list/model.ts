import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import { TimeZone, timeZoneModel } from '~/entities/time-zone'
import { useAppSelector } from '~/shared/lib/redux'

import { SLICE_NAME } from './constants'

type State = {
  timeZoneList: TimeZone[]
  displayedTimeZoneList: TimeZone[]
  modal: boolean
}

const initialState: State = {
  timeZoneList: [],
  displayedTimeZoneList: [],
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
      state.displayedTimeZoneList = state.timeZoneList.filter(
        (timeZone) =>
          timeZone.city.toLowerCase().includes(payload.toLowerCase()) ||
          timeZone.continent.toLowerCase().includes(payload.toLowerCase()),
      )
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getTimeZoneList.fulfilled, (state, { payload }) => {
      state.timeZoneList = payload
      state.displayedTimeZoneList = payload
    })
  },
})

export const getTimeZoneList = createAsyncThunk(
  `${SLICE_NAME}/getTimeZoneList`,
  async () => timeZoneModel.getTimeZoneList(),
)

export const selectTimeZone = createAsyncThunk(
  `${SLICE_NAME}/selectTimeZone`,
  (timeZone: TimeZone) => timeZone,
)

export const { openModal, closeModal, search } = slice.actions

export const useList = () =>
  useAppSelector((state) => state[SLICE_NAME].displayedTimeZoneList)
export const useIsOpenModal = () =>
  useAppSelector((state) => state[SLICE_NAME].modal)

export const reducer = { [SLICE_NAME]: slice.reducer }
