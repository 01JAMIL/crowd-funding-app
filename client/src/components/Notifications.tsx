import { ethers } from 'ethers'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { seenNotification } from '../features/notification/notificationSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { Notifications as Notif } from '../features/notification/Notification'
const Notifications: React.FC<{
    darkMode: boolean
}> = ({ darkMode }) => {

    const { notifications } = useAppSelector(store => store.notifications)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const hanldeNavigate = (e: Notif) => {
        dispatch(seenNotification(e._id))
        navigate(`/donation/${e.donationId}`)
    }

    return (
        <div className='min-h-screen flex justify-center' >
            {
                notifications.length === 0 ?
                    <div className={`text-center mt-[70px] ${darkMode ? 'text-white' : ''}`}>
                        No notification available
                    </div> :
                    <div className={`mt-[90px] w-full sm:w-[600px] md:w-[500px] h-max ${darkMode ? 'border border-[#1c1c24]' : 'border'}`}>
                        {
                            notifications.map((e: Notif, index) => (
                                <div
                                    onClick={() => hanldeNavigate(e)}
                                    key={index}
                                    className={`
                                    flex text-sm min-h-[100px] hover:cursor-pointer 
                                    ${darkMode ? 'bg-[#1c1c24] text-white hover:opacity-75' : 'bg-white hover:bg-gray-200'}`}
                                >
                                    <div className='flex items-center text-[5px] p-2 w-[50px]'>
                                        {
                                            !e.seen ?

                                                <span className='flex h-[10px] w-[10px] rounded-full bg-red-500'></span> :

                                                null
                                        }
                                    </div>

                                    <div className='p-1'>
                                        <img src={e.donationImage} alt='img' className='object-cover rounded-[8px] w-full h-full' />
                                    </div>

                                    <div className='text-justify p-1'>
                                        {`
                                          ${e.sender} donate to your
                                          `}
                                        <b className='text-purple-700'> {e.donationTitle} </b>
                                        {` donation with ${ethers.utils.formatEther(e.amount)} ETh`}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Notifications