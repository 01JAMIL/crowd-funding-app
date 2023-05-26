import React, { useEffect } from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { checkConnectedAccounts, walletConnection } from '../features/wallet/walletSlice'
import { getDonations } from '../features/donation/donationSlice'
import Card from './Card'
import { Donation } from '../features/donation/Donation'
import { Backdrop, CircularProgress } from '@mui/material'

const Profile: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {

    document.title = 'E-Donation | Profile'

    const { connected, address, balance } = useAppSelector(state => state.wallet)
    const { loading, donations } = useAppSelector(state => state.donation)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getDonations())
        dispatch(checkConnectedAccounts())
        if (connected) {
            dispatch(walletConnection())
        }
    }, [connected, dispatch])

    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center'>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme: any) => theme.zIndex.drawer + 1 }}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        )
    }


    return (
        <div className='mt-[70px] flex justify-center items-center'>
            <div className='p-[5px] md:w-[80%] w-[100%]'>
                <div className={`${darkMode ? 'text-white' : 'text-[#121212]'} mb-2`}>
                    Profile
                </div>

                <div className='text-sm mb-6'>
                    <div className={`flex flex-wrap items-center px-2 py-1 ${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                        <div className='flex mr-1'>
                            <div className='mr-1'>
                                <AlternateEmailIcon fontSize='small' />
                            </div>
                            <div>
                                Address :
                            </div>
                        </div>
                        <div>
                            {address ? address.slice(0, 6) + ' ... ' + address.slice(-6) : 'Not found'}
                        </div>
                    </div>
                    <div className={`flex flex-wrap items-center px-2 py-1 ${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                        <div className='flex  mr-1'>
                            <div className='mr-1'>
                                <AccountBalanceWalletIcon fontSize='small' />
                            </div>
                            <div>
                                Balance :
                            </div>
                        </div>
                        <div>
                            {balance ? balance + ' Eth' : ''}
                        </div>
                    </div>
                </div>

                <div className={`mb-6 px-3 text-sm py-1 ${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                    Your donations ({donations.filter(e => e.owner.toUpperCase() === address.toUpperCase()).length})
                </div>

                <div className="grid gap-x-10 gap-y-4 md:grid-cols-3 sm:grid-cols-2 mb-16">
                    {
                        donations.filter(e => e.owner.toUpperCase() === address.toUpperCase()).map((e: Donation, index: number) => (
                            <Card
                                darkMode={darkMode}
                                data={e}
                                id={index + 1}
                                key={index}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Profile