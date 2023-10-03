/* eslint-disable boundaries/element-types */
import { combineReducers } from '@reduxjs/toolkit'

import { timeZonesModel } from '~/features/time/zones'
import { clockTimeZoneModel } from '~/widgets/clock/time-zone'
import { clockStopwatchModel } from '~/widgets/clock/stopwatch'
import { clockTimerModel } from '~/widgets/clock/timer'
import { clockAlarmModel } from '~/widgets/clock/alarm'

export const rootReducer = combineReducers({
  ...timeZonesModel.reducer,
  ...clockAlarmModel.reducer,
  ...clockTimeZoneModel.reducer,
  ...clockStopwatchModel.reducer,
  ...clockTimerModel.reducer,
})
