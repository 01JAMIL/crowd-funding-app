import React, { useState } from 'react'
import logo from '../assets/donate-logo.png'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

const Navbar: React.FC<{
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    darkMode: boolean
}> = ({ setDarkMode, darkMode }) => {

    const [openNavbar, setOpenNavbar] = useState<boolean>(false)

    return (
        <div className={`fixed top-0 flex justify-center items-center w-full md:h-[60px] ${darkMode ? 'bg-[#121212]' : 'bg-white'}`}>
            <div
                className={`
                    relative h-full flex md:items-center border-b-[1px] 
                    border-[${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)'}]
                    w-[90%] md:w-[80%]  md:flex-row flex-col`}
            >
                <div className='flex items-center'>
                    <div className='w-16 h-16 flex justify-center items-center cursor-pointer'>
                        <img
                            src={logo}
                            alt="logo"
                            className='object-cover'
                        />
                    </div>

                    <div
                        className='flex justify-center items-center md:hidden p-[5px] absolute right-0'
                        onClick={() => setOpenNavbar(!openNavbar)}
                    >
                        {
                            !openNavbar ?
                                <MenuIcon
                                    className={`${darkMode ? 'text-white' : 'text-[#121212]'} cursor-pointer`}
                                />
                                :

                                <CloseIcon
                                    className={`${darkMode ? 'text-white' : 'text-[#121212]'} cursor-pointer`}
                                />
                        }
                    </div>
                </div>
                <div className={`md:ml-auto p-[5px] h-full md:flex md:flex-row flex-col justify-center items-center ${!openNavbar ? 'hidden' : 'block'}`}>
                    <div className='flex gap-x-[5px] mr-4 md:mb-0 mb-[10px]'>

                        <button
                            className={`p-[5px] rounded-[8px] disabled:opacity-50 ${darkMode ? 'bg-white' : 'border border-[#121212]'}`}
                            disabled={!darkMode}
                            onClick={() => {
                                setDarkMode(false)
                                localStorage.setItem('mode', 'light')
                            }}
                        >
                            <LightModeIcon
                                className="text-amber-300"
                            />
                        </button>

                        <button
                            className={`p-[5px] rounded-[8px] disabled:opacity-50 ${darkMode ? 'bg-white' : 'border border-[#121212]'}`}
                            disabled={darkMode}
                            onClick={() => {
                                setDarkMode(true)
                                localStorage.setItem('mode', 'dark')
                            }}
                        >
                            <DarkModeIcon
                                className="text-[#121212]"
                            />
                        </button>


                    </div>

                    <div className='md:mb-0 mb-[10px]'>
                        <NotificationsIcon
                            className={`mr-4 notif ${darkMode ? 'text-white ' : 'text-amber-300'}`}
                        />
                    </div>
                    <button
                        className='md:mb-0 mb-[10px] text-white bg-purple-700 p-[5px] rounded-[8px] hover:bg-purple-500'>
                        Create donation
                    </button>
                </div>

            </div>
        </div >
    )
}

export default Navbar