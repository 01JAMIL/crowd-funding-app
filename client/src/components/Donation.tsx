import React from 'react'
import img from '../assets/robot.jpeg'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

const Donation: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    return (
        <div className='mt-[70px] flex justify-center items-center'>
            <div className='p-[5px] md:w-[80%] w-[90%]'>
                <div className={`${darkMode ? 'text-white' : 'text-[#121212]'} mb-6`}>
                    Donation 0x16159651965196519652196
                </div>

                <div className={`grid gap-4 md:grid-cols-2 sm:grid-cols-1 pb-4 mb-4 border-b border-[${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)'}`}>
                    <div className=''>
                        <img src={img} alt='logo'
                            className='object-fill rounded-[16px] md:h-96 h-76' />
                    </div>

                    <div className={darkMode ? 'text-white' : 'text-[#121212]'}>
                        <div className='font-bold mb-3'>
                            Building a robot
                        </div>

                        <div>
                            <div className='font-bold'>
                                Story
                            </div>
                            <div className='text-sm p-2 text-justify'>
                                Hey, This is my graduation project i need your help to create this robot
                                Hey, This is my graduation project i need your help to create this robot
                                Hey, This is my graduation project i need your help to create this robot
                                Hey, This is my graduation project i need your help to create this robot
                            </div>
                        </div>

                        <div>
                            <div className='font-bold'>
                                Goal
                            </div>
                            <div className='text-sm p-2 text-justify'>
                                0.1
                            </div>
                        </div>

                        <div>
                            <div className='font-bold'>
                                Collected amount
                            </div>
                            <div className='text-sm p-2 text-justify text-green-600'>
                                0.003
                            </div>
                        </div>
                    </div>
                </div>

                <div className='grid gap-4 md:grid-cols-2 sm:grid-cols-1 md:mb-0 sm:mb-0 mb-20 '>
                    <div className={`${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                        <div>
                            <div className='font-bold'>
                                Creator
                            </div>

                            <div className='p-2 flex items-center'>
                                <div className='mr-2'>
                                    <AccountCircleIcon
                                        fontSize='large'
                                    />
                                </div>
                                <div className='sm:truncate md:truncate'>
                                    0x12ez121z2ef1ze21fze8f4e5fe15ezf1z8f1e
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className='font-bold'>
                                Donators
                            </div>
                            <div className='p-2 flex flex-wrap justify-between items-center'>
                                {/* <div>
                                    No donators yet. Be the one!
                                </div> */}

                                <div className='sm:truncate md:truncate'>
                                    0x12ez121z2ef1ze21fze8f4e5fe15ezf1z8f1e
                                </div>
                                <div className='sm:truncate md:truncate'>
                                    0.0003
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-center'>
                        <div className={`md:w-96 w-full ${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                            <div className='font-bold mb-3'>
                                Fund
                            </div>

                            <div className={`p-2 shadow-xl rounded-lg ${darkMode ? 'bg-[#1c1c24]' : 'bg-white'}`}>
                                <div className='text-center mb-3'>
                                    Fund now !
                                </div>

                                <div className='p-3'>
                                    <div className='w-full'>
                                        <label
                                            className='block tracking-wide text-xs font-bold mb-2' htmlFor='amount'>
                                            Amount
                                        </label>
                                        <input
                                            className={`
                                            appearance-none block w-full
                                            border p-[8px] rounded-[8px] mb-3
                                            leading-tight focus:outline-none
                                            ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                                            `}
                                            id='amount'
                                            type='number'
                                            min={0.0001}
                                            step={0.001}
                                            placeholder='ETH 0.1' />
                                        {/*  <p className="text-red-500 text-xs">Please fill out this field.</p> */}
                                    </div>

                                    <button
                                        className='
                                        border border-purple-700 bg-purple-700 w-full p-[5px] 
                                        rounded-[8px] text-white hover:border-purple-500 hover:bg-purple-500'
                                    >
                                        Donate
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Donation