import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { WalletInitialState } from './Wallet'
import { ethers } from 'ethers'

declare var window: any
const initialState: WalletInitialState = {
    address: '',
    balance: '',
    connected: false,
    error: {}
}

export const checkConnectedAccounts = createAsyncThunk('wallet/checkConnectedAccount', async () => {
    const data = await window.ethereum.request({ method: 'eth_accounts' })
    return data.length !== 0
})

export const walletConnection = createAsyncThunk('wallet/connect', async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    provider.getSigner(0)
    const accounts = await provider.send('eth_requestAccounts', [])
    const balance = await provider.getBalance(accounts[0])
    return {
        address: accounts[0],
        balance: balance.toString()
    }
})

const walletSlice = createSlice({
    name: 'Wallet',
    initialState,
    reducers: {
        resetState: (state: WalletInitialState) => {
            state.address = ''
            state.balance = ''
            state.connected = false
        }
    },
    extraReducers(builder) {
        builder.addCase(checkConnectedAccounts.fulfilled, (state, action) => {
            state.connected = action.payload
        })

        builder.addCase(walletConnection.fulfilled, (state, action) => {
            state.address = action.payload.address
            state.connected = true

            if (action.payload.balance !== '0') {
                state.balance = ethers.utils.formatEther(action.payload.balance)
            } else {
                state.balance = action.payload.balance
            }
        })
    },
})


export const { resetState } = walletSlice.actions
export default walletSlice.reducer