/* eslint-disable boundaries/element-types */
import { combineReducers } from '@reduxjs/toolkit'

import { timeZoneListModel } from '~/features/time/zone-list'
import { clockTimeZoneModel } from '~/widgets/clock/time-zone'
import { clockStopwatchModel } from '~/widgets/clock/stopwatch'
import { clockTimerModel } from '~/widgets/clock/timer'
import { clockAlarmModel } from '~/widgets/clock/alarm'

export const rootReducer = combineReducers({
  ...timeZoneListModel.reducer,
  ...clockAlarmModel.reducer,
  ...clockTimeZoneModel.reducer,
  ...clockStopwatchModel.reducer,
  ...clockTimerModel.reducer,
})
