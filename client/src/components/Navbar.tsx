import React, { useState, useRef, useEffect } from 'react'
import logo from '../assets/donate-logo.png'
import NotificationsIcon from '@mui/icons-material/Notifications'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'

const Navbar: React.FC<{
    setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
    darkMode: boolean
}> = ({ setDarkMode, darkMode }) => {

    const [openNavbar, setOpenNavbar] = useState<boolean>(false)
    const navRef = useRef<any>()
    const navigate = useNavigate()
    useEffect(() => {
        const handleClose = (e: any) => {
            if (navRef && !navRef.current.contains(e.target)) {
                setOpenNavbar(false)
            }
        }

        document.addEventListener('mousedown', handleClose)

        return () => {
            document.removeEventListener('mousedown', handleClose)
        }
    }, [])

    const handleNavigate = (to: string) => {
        navigate(to)
    }

    return (
        <div className={`fixed top-0 flex justify-center items-center w-full ${darkMode ? 'bg-[#121212]' : 'bg-white'} z-50`}>
            <div
                className={`
                    relative h-full flex md:items-center border-b-[1px] 
                    border-[${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)'}]
                    w-[90%] md:w-[80%]  md:flex-row flex-col`}
                ref={navRef}
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
                    <div className='flex gap-x-[5px] mr-6 md:mb-0 mb-[25px]'>

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

                    <div
                        className={`
                        flex items-center md:mb-0 mb-[10px] md:w-max w-[150px] 
                        cursor-pointer mr-2 p-[5px] rounded-[8px] 
                        ${darkMode ? 'bg-white' : 'border border-[#121212]'}
                        hover:bg-gray-200
                        `}
                        onClick={() => handleNavigate('/')}
                    >
                        <HomeIcon
                            className='mr-2 md:mr-0'
                        />

                        <span className='md:hidden'>
                            Home
                        </span>
                    </div>

                    <div className={`
                    flex items-center relative md:mb-0 mb-[10px] md:w-max w-[150px] 
                    cursor-pointer mr-2 p-[5px] rounded-[8px] 
                    ${darkMode ? 'bg-white' : 'border border-[#121212]'}
                    hover:bg-gray-200
                    `}>
                        <NotificationsIcon
                            className='mr-2 md:mr-0'
                        />

                        <span className='md:hidden '>
                            Notifications
                        </span>

                        <span className='flex z-50'>
                            <span className='
                        animate-ping absolute top-[-2px] right-[-2px] inline-flex 
                        h-[10px] w-[10px] rounded-full bg-red-400 opacity-75'></span>
                            <span className='
                        absolute top-[-2px] right-[-2px] inline-flex 
                        h-[10px] w-[10px] rounded-full bg-red-500'></span>
                        </span>
                    </div>


                    <div
                        className={`
                        relative flex items-center md:mb-0 mb-[10px] md:w-max w-[150px] 
                        cursor-pointer mr-2 p-[5px] rounded-[8px] 
                        ${darkMode ? 'bg-white' : 'border border-[#121212]'}
                        hover:bg-gray-200
                        `}
                        onClick={() => handleNavigate('/profile')}
                    >
                        <PersonIcon
                            className='mr-2 md:mr-0'
                        />

                        <span className='md:hidden'>
                            Profile
                        </span>
                    </div>

                    <button
                        className='
                        flex items-center justify-center 
                        md:w-max w-[150px] md:mb-0 mb-[10px] text-white 
                        bg-purple-700 p-[5px] border border-purple-700 
                        rounded-[8px] hover:bg-purple-500 hover:border-purple-500'
                        onClick={() => handleNavigate('/create')}
                    >
                        Create donation
                    </button>

                </div>

            </div>
        </div >
    )
}

export default Navbar