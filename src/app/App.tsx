import { RouterProvider } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { Provider as ReduxProvider } from 'react-redux'
import ThemeProvider from '@mui/material/styles/ThemeProvider'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { SnackbarProvider } from 'notistack'

import { theme } from '~/shared/config/theme'
import { router } from '~/processes/router'
import { store } from '~/shared/lib/redux'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(isSameOrBefore)
dayjs.extend(customParseFormat)

export function App() {
  return (
    <HelmetProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ReduxProvider store={store}>
          <ThemeProvider theme={theme}>
            <SnackbarProvider>
              <RouterProvider router={router} />
            </SnackbarProvider>
          </ThemeProvider>
        </ReduxProvider>
      </LocalizationProvider>
    </HelmetProvider>
  )
}
