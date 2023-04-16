import { configureStore } from '@reduxjs/toolkit'
import walletReducer from '../features/wallet/walletSlice'
import donationReducer from '../features/donation/donationSlice'
import notificationSlice from '../features/notification/notificationSlice'
export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        donation: donationReducer,
        notifications: notificationSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch