import { configureStore } from '@reduxjs/toolkit'
import adminReducer from '../Slice/AdminSlice'

// eslint-disable-next-line import/prefer-default-export

export const store = configureStore({
    reducer: {
        admin: adminReducer,
    },
})
