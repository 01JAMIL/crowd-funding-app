import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { NotificationsInitialState } from './Notification'

const initialState: NotificationsInitialState = {
    loading: false,
    notifications: [],
    error: {}
}

export const getReceiverNotifications = createAsyncThunk('notifications/get', async (receiver: string) => {
    return await axios.get(`http://localhost:3700/api/notification/get/${receiver}`)
        .then(response => response.data
        )
        .catch(err => err.response.message)

})


export const saveNotification = createAsyncThunk('notifications/save', async (data: any) => {
    return await axios.post('http://localhost:3700/api/notification/save', data)
        .then(response => data)
        .catch(err => err.response.message)
})


export const seenNotification = createAsyncThunk('notifications/seen', async (id: string) => {
    return await axios.put(`http://localhost:3700/api/notification/seen/${id}`)
        .then(response => response.data._id)
        .catch(err => err.response.message)

})

const notificationsSlice = createSlice({
    name: 'Notifications',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false
            state.notifications = []
            state.error = {}
        }
    },
    extraReducers(builder) {
        builder.addCase(getReceiverNotifications.pending, state => {
            state.loading = true
        })

        builder.addCase(getReceiverNotifications.fulfilled, (state, action) => {
            state.loading = false
            state.notifications = action.payload
        })

        builder.addCase(getReceiverNotifications.rejected, (state, action) => {
            state.loading = false
            state.notifications = []
            state.error = action.payload
        })


        builder.addCase(saveNotification.pending, state => {
            state.loading = true
        })

        builder.addCase(saveNotification.fulfilled, (state, action) => {
            state.loading = false
        })

        builder.addCase(seenNotification.pending, state => {
            state.loading = true
        })

        builder.addCase(seenNotification.fulfilled, (state, action) => {
            state.loading = false
            state.notifications.map(e => {
                if (e._id === action.payload) {
                    e.seen = true
                }

                return e
            })
        })

        builder.addCase(seenNotification.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    },
})


export default notificationsSlice.reducer
export const { resetState } = notificationsSlice.actions