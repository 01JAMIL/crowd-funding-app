import { configureStore } from '@reduxjs/toolkit'
import walletReducer from '../features/wallet/walletSlice'
import donationReducer from '../features/donation/donationSlice'
export const store = configureStore({
    reducer: {
        wallet: walletReducer,
        donation: donationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch