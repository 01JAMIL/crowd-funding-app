import React from 'react'
import img from '../assets/robot.jpeg'
import { useNavigate } from 'react-router-dom'

const Card: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {

    const navigate = useNavigate()

    const hanldeNavigate = () => {
        navigate('/donation')
    }

    return (
        <div
            className={`flex min-h-[250px] bg-[${darkMode ? '#1c1c24' : '#FFF'}] rounded-[16px] shadow-xl cursor-pointer`}
            onClick={hanldeNavigate}
        >
            <div className='w-full'>
                <div className='mb-4'>
                    <img
                        src={img}
                        alt='img'
                        className='rounded-tl-[16px] rounded-tr-[16px] object-cover w-full h-48 hover:opacity-75'
                    />
                </div>

                <div className='p-[5px]'>
                    <div className={`sm:truncate md:truncate  mb-5 font-bold ${darkMode ? 'text-white ' : 'text-[#121212]'}`}>
                        Building a robot
                    </div>

                    <div className={`sm:truncate md:truncate mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        Hey, This is my graduation project i need your help to create this robot
                    </div>

                    <div className='flex justify-between items-center mb-4'>
                        <div>
                            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                                0.01
                            </div>
                            <div className='text-xs text-gray-500'>
                                Goal 0.3
                            </div>
                        </div>

                        <div>
                            <div className={`${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>41</div>
                            <div className='text-xs text-gray-500'>days left</div>
                        </div>
                    </div>

                    <div className='sm:truncate md:truncate text-center text-purple-700'>
                        <span className={`font-bold mr-1 ${darkMode ? 'text-white' : 'text-[#121212]'}`}>By</span>
                        <span>0x123456789987654321</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card