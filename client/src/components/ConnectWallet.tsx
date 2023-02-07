import React from 'react'
import logo from '../assets/donate-logo.png'


const ConnectWallet = () => {
    return (
        <div className='min-h-screen flex bg-white justify-center items-center'>
            <div className='relative'>
                {/* <div className='absolute rounded-md h-20 flex items-center top-[-100px] left-[-50%] bg-red-500 w-96'>
                    <div className='w-full text-center text-white font-bold'>
                        Install MetaMask wallet to connect!
                    </div>
                </div> */}
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
                    >
                        Connect wallet
                    </button>
                </div>

            </div>
        </div>
    )
}

export default ConnectWallet