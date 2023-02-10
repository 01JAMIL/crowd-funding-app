import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Donation, DonationInitialState } from './Donation'
import { ethers } from 'ethers'

declare var window: any

const connectSmartContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)

    const DonationType = `(address owner, string title, string story, uint256 goal, uint256 deadline, uint256 collectedAmount, string image, address[] donators , uint256[] donations)`

    const ABI = [
        'function getNumberOfDonations() public view returns (uint256)',
        `function createDonation(
            address _owner,
            string _title,
            string _story,
            uint256 _goal,
            uint256 _deadline,
            string _image
        ) public returns (uint256)`,

        'function donateToDonation(uint256 _id) public payable',
        'function getDonators(uint256 _id) returns (address[] , uint256[])',
        `function getAllDonations() public view returns (${DonationType} [])`
    ]
    const contract = new ethers.Contract(
        '0x8ef3eFeaBFbf7d04a6C05EE884C002364f822Ddb',
        ABI,
        provider.getSigner(0)
    )


    return contract
}


export const getDonations = createAsyncThunk('donation/getAll', async () => {
    const contract: any = await connectSmartContract()
    const data = await contract.getAllDonations()
    return data
})

export const saveDonation = createAsyncThunk('donation/save', async (data: Donation) => {
    const { owner, title, story, goal, deadline, image } = data
    const contarct: any = await connectSmartContract()
    const goalFloat = parseFloat(goal.toString())
    const weiValue = ethers.utils.parseEther(goalFloat.toString()).toString()
    const transaction = await contarct.createDonation(owner, title, story, weiValue, deadline, image)
    const returnedValue = await transaction.wait()
    return returnedValue
})


export const donate = createAsyncThunk('donation/donate', async (data: any) => {
    const { id, amount } = data

    const contract: any = await connectSmartContract()

    const transaction = await contract.donateToDonation(id, { value: amount })
    await transaction.wait()

    return data
})

const initialState: DonationInitialState = {
    loading: false,
    donations: [],
    error: {},
    success: false
}

const donationSlice = createSlice({
    name: 'Donation',
    initialState,
    reducers: {
        resetState(state: DonationInitialState) {
            state.loading = false
            state.donations = []
            state.error = {}
            state.success = false
        }
    },
    extraReducers(builder) {
        builder.addCase(getDonations.pending, (state) => {
            state.loading = true
        })

        builder.addCase(getDonations.fulfilled, (state, action) => {
            state.loading = false
            state.success = false
            state.donations = action.payload
            state.error = {}
        })

        builder.addCase(getDonations.rejected, (state, action) => {
            state.loading = false
            state.donations = []
            state.error = action.payload
        })


        builder.addCase(saveDonation.pending, state => {
            state.loading = true
        })

        builder.addCase(saveDonation.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
        })

        builder.addCase(saveDonation.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            state.success = false
        })

        builder.addCase(donate.pending, state => {
            state.loading = true
        })

        builder.addCase(donate.fulfilled, (state, action) => {
            state.loading = false
            state.success = true
        })

        builder.addCase(donate.rejected, (state, action) => {
            state.loading = false
            state.success = false
        })
    }
})


export default donationSlice.reducer