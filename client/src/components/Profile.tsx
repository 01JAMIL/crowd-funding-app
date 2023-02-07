import React, { useEffect } from 'react'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { checkConnectedAccounts, walletConnection } from '../features/wallet/walletSlice'

const Profile: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {

    const { connected, address, balance } = useAppSelector(state => state.wallet)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(checkConnectedAccounts())
        if (connected) {
            dispatch(walletConnection())
        }
    }, [connected, dispatch])


    return (
        <div className='mt-[70px] flex justify-center items-center'>
            <div className='p-[5px] md:w-[80%] w-[90%]'>
                <div className={`${darkMode ? 'text-white' : 'text-[#121212]'} mb-2`}>
                    Profile
                </div>

                <div className='text-sm'>
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
            </div>
        </div>
    )
}

export default Profile