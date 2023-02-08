import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { DonationInitialState } from './Donation'
import { ethers } from 'ethers'
declare var window: any

const connectSmartContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const DonationType = `(
        address owner, 
        string title, 
        string story, 
        uint256 goal, 
        uint256 deadline, 
        uint256 collectedAmount, 
        string image, 
        address[] donators,
        uint256[] donations
    )`

    const ABI = [
        `function createDonation(
            address _owner,
            string _title,
            string _story,
            uint256 _goal,
            uint256 _deadline,
            string _image
        ) public returns (uint256)`,

        'function donateToDonation(uint256 _id) public',
        'function getDonators(uint256 _id) returns (address[] , uint256[])',
        `function getAllDonations() public view returns (${DonationType}[])`
    ]
    const contract = new ethers.Contract(
        '0xA3b57f31060AfeB90FDCdB3cf98bF27CD927Ba8B',
        ABI,
        provider.getSigner(0)
    )


    return contract
}


export const getDonations = createAsyncThunk('donation/getAll', async () => {
    const contract: any = connectSmartContract()

    return await contract.getAllDonations()
})


const initialState: DonationInitialState = {
    loading: false,
    donations: [],
    error: {}
}

const donationSlice = createSlice({
    name: 'Donation',
    initialState,
    reducers: {
        resetState(state: DonationInitialState) {
            state.loading = false
            state.donations = []
            state.error = {}
        }
    },
    extraReducers(builder) {
        builder.addCase(getDonations.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getDonations.fulfilled, (state, action) => {
            state.loading = false
            state.donations = action.payload
            state.error = {}
        })

        builder.addCase(getDonations.rejected, (state, action) => {
            state.loading = false
            state.donations = []
            state.error = action.payload
        })
    }
})


export default donationSlice.reducer