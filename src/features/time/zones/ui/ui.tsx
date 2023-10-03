import Stack from '@mui/material/Stack'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { styled } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import { useMount } from 'react-use'

import { useAppDispatch } from '~/shared/lib/redux'

import {
  closeModal,
  getTimeZones,
  useIsOpenModal,
  useTimeZones,
} from '../model'

import { Search } from './Search'
import { Item } from './Item'

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': { height: 'calc(100% - 64px)' },
})

export function Zones() {
  const isOpen = useIsOpenModal()
  const timeZones = useTimeZones()
  const dispatch = useAppDispatch()

  useMount(() => dispatch(getTimeZones()))

  return (
    <StyledDialog
      open={isOpen}
      onClose={() => dispatch(closeModal())}
      scroll='paper'
      fullWidth
    >
      <Stack flex={1} minHeight={0} spacing={2} p={2}>
        <Search />

        <Stack height='100%'>
          <AutoSizer>
            {({ height, width }) => (
              <FixedSizeList
                height={height}
                width={width}
                itemCount={timeZones.length}
                itemSize={72}
                itemData={timeZones}
              >
                {Item}
              </FixedSizeList>
            )}
          </AutoSizer>
        </Stack>
      </Stack>
    </StyledDialog>
  )
}
