export interface Notifications {
    _id: string
    sender: string
    receiver: string
    amount: string
    donationId: string
    donationImage: string
    donationTitle: string
    seen: boolean
}

export interface NotificationsInitialState {
    loading: boolean
    notifications: Notifications[],
    error: any
}
