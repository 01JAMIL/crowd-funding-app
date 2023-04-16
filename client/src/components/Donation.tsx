import React, { FormEvent, useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { useParams } from 'react-router-dom'
import { getDonations } from '../features/donation/donationSlice'
import { ethers } from 'ethers'
import { donate } from '../features/donation/donationSlice'
import { Backdrop, CircularProgress } from '@mui/material'
import { saveNotification } from '../features/notification/notificationSlice'
const Donation: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {

    document.title = 'E-Donation | Donation'

    const [error, setError] = useState<boolean>(false)
    const [form, setForm] = useState({
        id: 0,
        amount: '',
        address: ''
    })
    const { address } = useAppSelector(state => state.wallet)
    const { donations, loading, success } = useAppSelector(state => state.donation)
    const dispatch = useAppDispatch()
    const { id } = useParams()

    const donation = donations[parseInt(id) - 1]

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (form.amount === '') {
            setError(true)
        } else {
            setError(false)
            form.id = parseInt(id) - 1
            form.address = donation.owner



            dispatch(donate(form))


        }
    }

    const sendNotification = () => {
        const notificationData = {
            sender: address,
            receiver: donation.owner.toLowerCase(),
            amount: form.amount,
            donationId: parseInt(id),
            donationImage: donation.image,
            donationTitle: donation.title
        }
        console.log(notificationData)
        dispatch(saveNotification(notificationData))
    }

    useEffect(() => {
        dispatch(getDonations())

        if (success) {
            sendNotification()
        }
    }, [dispatch, success])


    if (loading) {
        return (
            <div className='min-h-screen flex justify-center items-center '>
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
            <div className='p-[5px] md:w-[80%] w-[90%] mb-[20px]'>
                {
                    donation ?

                        <>
                            <div className={`${darkMode ? 'text-white' : 'text-[#121212]'} mb-6`}>
                                Donation ({id})
                            </div>

                            <div className={`grid gap-4 md:grid-cols-2 sm:grid-cols-1 pb-4 mb-4 border-b border-[${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.3)'}`}>
                                <div className=''>
                                    <img src={donation.image} alt='logo'
                                        className='object-fill rounded-[16px] md:h-96 h-76' />
                                </div>

                                <div className={darkMode ? 'text-white' : 'text-[#121212]'}>
                                    <div className='font-bold mb-3'>
                                        {
                                            donation.title
                                        }
                                    </div>

                                    <div>
                                        <div className='font-bold'>
                                            Story
                                        </div>
                                        <div className='text-sm p-2 text-justify'>
                                            {
                                                donation.story
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <div className='font-bold'>
                                            Goal
                                        </div>
                                        <div className='text-sm p-2 text-justify'>
                                            {ethers.utils.formatEther(donation.goal)} Eth
                                        </div>
                                    </div>

                                    <div>
                                        <div className='font-bold'>
                                            Days left
                                        </div>
                                        <div className='text-sm p-2 text-justify'>
                                            {
                                                Math.ceil((new Date(parseInt(donation.deadline.toString(), 10)).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) >= 1 ?
                                                Math.ceil((new Date(parseInt(donation.deadline.toString(), 10)).getTime() - new Date().getTime()) / (1000 * 3600 * 24))  :
                                                <span className='text-red-400'>
                                                    No days left this donation is endned.
                                                </span>
                                            }
                                        </div>
                                    </div>

                                    <div>
                                        <div className='font-bold'>
                                            Collected amount
                                        </div>
                                        <div className='text-sm p-2 text-justify text-green-600'>
                                            {ethers.utils.formatEther(donation.collectedAmount)}
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

                                        <div className='p-2 flex truncate'>
                                            <div className='mr-2'>
                                                <AccountCircleIcon
                                                    fontSize='large'
                                                />
                                            </div>
                                            <div>
                                                <div className='text-sm sm:truncate md:truncate'>
                                                    {
                                                        donation.owner
                                                    }
                                                </div>
                                                <div className='text-[10px]'>
                                                    <span className='font-bold'>
                                                        {
                                                            donations.filter(d => d.owner === donation.owner).length
                                                        }
                                                    </span> Donation(s)
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <div className='font-bold'>
                                            Donators
                                        </div>
                                        <div className='p-2'>
                                            {
                                                donation.donators.length === 0 ?
                                                    <div className='text-center'>
                                                        No donators yet. Be the one!
                                                    </div> :
                                                    <>
                                                        {
                                                            donation.donators.map((address, index) => (
                                                                <div key={index} className='border-b border-b-1 mb-2 flex flex-wrap justify-between items-center'>
                                                                    <div className='text-xs sm:truncate md:truncate'>
                                                                        {address}
                                                                    </div>
                                                                    <div className='text-xs sm:truncate md:truncate'>
                                                                        {ethers.utils.formatEther(donation.donations[index])}
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                            }


                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-center'>
                                    {
                                        Math.ceil((new Date(parseInt(donation.deadline.toString(), 10)).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) >= 1 ?
                                            <div className={`md:w-96 w-full ${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                                                <div className='font-bold mb-3'>
                                                    Fund
                                                </div>

                                                <div className={`p-2 shadow-xl rounded-lg ${darkMode ? 'bg-[#1c1c24]' : 'bg-white'}`}>
                                                    <div className='text-center mb-3'>
                                                        Fund now !
                                                    </div>

                                                    <div className='p-3'>
                                                        <form className='w-full' onSubmit={handleSubmit}>
                                                            <label
                                                                className='block tracking-wide text-xs font-bold mb-2' htmlFor='amount'>
                                                                Amount
                                                            </label>
                                                            <input
                                                                className={`
                                                                appearance-none block w-full
                                                                border p-[8px] rounded-[8px] mb-2
                                                                leading-tight focus:outline-none
                                                                ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                                                                `}
                                                                id='amount'
                                                                type='number'
                                                                min={0}
                                                                step={0.000001}
                                                                placeholder='ETH 0.1'
                                                                onChange={(e) => setForm({
                                                                    ...form,
                                                                    amount: ethers.utils.parseEther(e.target.value).toString()
                                                                })}
                                                            />
                                                            <div className='h-[15px] px-2 mb-2'>
                                                                {
                                                                    (error && form.amount === '') && <p className="text-red-500 text-xs">Please fill out this field.</p>
                                                                }
                                                            </div>

                                                            <button
                                                                type='submit'
                                                                className='
                                                        border border-purple-700 bg-purple-700 w-full p-[5px] 
                                                        rounded-[8px] text-white hover:border-purple-500 
                                                        hover:bg-purple-500 disabled:bg-purple-500 disabled:border-purple-500
                                                        disabled:cursor-not-allowed
                                                        '
                                                                disabled={donation.owner.toUpperCase() === address.toUpperCase()}
                                                            >
                                                                {
                                                                    donation.owner.toUpperCase() === address.toUpperCase() ?
                                                                        'You are the owner' : 'Donate'
                                                                }
                                                            </button>
                                                        </form>


                                                    </div>

                                                </div>

                                            </div> :

                                            <div className={`font-bold w-full text-center ${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                                                This donation is ended!
                                            </div>
                                    }
                                </div>

                            </div>
                        </> : null
                }
            </div>
        </div>
    )
}

export default Donation