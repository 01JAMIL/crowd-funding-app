import React, { useState } from 'react'
import logo from '../assets/donate-logo.png'
import { useAppDispatch } from '../store/hooks'
import { walletConnection } from '../features/wallet/walletSlice'
declare var window: any

const ConnectWallet = () => {

    document.title = 'E-Donation | Connect Wallet'

    const dispatch = useAppDispatch()
    const [error, setError] = useState<boolean>(false)

    const handleConnectWallet = async () => {
        if (window.ethereum) {
            dispatch(walletConnection())
        } else {
            setError(true)
        }
    }


    return (
        <div className='min-h-screen flex bg-white justify-center items-center'>
            <div className='relative'>
                {
                    error ?
                        <div className='absolute rounded-md h-20 flex items-center top-[-100px] left-[-50%] bg-red-500 w-96'>
                            <div className='w-full text-center text-white font-bold'>
                                Install MetaMask wallet to connect!
                            </div>
                        </div> :

                        null
                }
                <div className='flex justify-center'>
                    <img src={logo} alt='logo' className='w-40 object-cover' />
                </div>

                <div className='text-[#121212] text-xl mb-3 text-center'>
                    Hey, welcome back!
                </div>

                <div className='flex justify-center'>
                    <button
                        className='
                            border border-purple-700 text-white p-[5px] rounded-[8px]
                            bg-purple-700 hover:border-purple-500 hover:bg-purple-500'
                        onClick={handleConnectWallet}
                    >
                        Connect wallet
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ConnectWallet