import TextField from '@mui/material/TextField'
import { ChangeEvent, useState } from 'react'
import { useDebounce } from 'react-use'

import { useAppDispatch } from '~/shared/lib/redux'

import { search } from '../model'

export function Search() {
  const [value, setValue] = useState<string>('')
  const dispatch = useAppDispatch()

  useDebounce(() => dispatch(search(value)), 500, [value])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return (
    <TextField value={value} onChange={handleChange} size='small' autoFocus />
  )
}
