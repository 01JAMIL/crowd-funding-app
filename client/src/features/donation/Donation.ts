export interface Donation {
    owner: string
    title: string
    story: string
    goal: number
    deadline: number
    collectedAmount: number
    image: string
    donators: string[]
    donations: number[]
}

export interface DonationInitialState {
    loading: boolean
    donations: Donation[]
    error: any
    success: boolean
}