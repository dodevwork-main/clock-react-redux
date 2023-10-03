import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Alarm, alarmModel } from '~/entities/alarm'
import { getTimeFromToday } from '~/shared/lib/getTimeFromToday'
import { useAppSelector } from '~/shared/lib/redux'

import { SLICE_NAME } from './constants'

const { isSameTwoAlarmsFromToday } = alarmModel

type State = {
  alarms: Alarm[]
  modal: boolean
}

const initialState: State = {
  alarms: [],
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
    setAlarm: (state, { payload }: PayloadAction<Alarm>) => {
      const { alarms } = state

      if (alarms.every((item) => !isSameTwoAlarmsFromToday(item, payload))) {
        alarms.push(payload)

        alarms.sort((a, b) => {
          const timeA = getTimeFromToday(a.time)
          const timeB = getTimeFromToday(b.time)

          if (timeA.isSame(timeB)) {
            return 0
          }

          if (timeA.isAfter(timeB)) {
            return 1
          }

          return -1
        })
      }
    },
    removeAlarm: (state, { payload }: PayloadAction<Alarm>) => {
      state.alarms = state.alarms.filter(
        (item) => !isSameTwoAlarmsFromToday(item, payload),
      )
    },
    switchAlarm: (state, { payload }: PayloadAction<Alarm>) => {
      state.alarms = state.alarms.map((item) => {
        if (isSameTwoAlarmsFromToday(item, payload)) {
          item.isOn = !item.isOn
        }

        return item
      })
    },
  },
})

export const { openModal, closeModal, setAlarm, removeAlarm, switchAlarm } =
  slice.actions

export const useAlarms = () =>
  useAppSelector((state) => state[SLICE_NAME].alarms)
export const useIsOpenModal = () =>
  useAppSelector((state) => state[SLICE_NAME].modal)

export const reducer = { [SLICE_NAME]: slice.reducer }
