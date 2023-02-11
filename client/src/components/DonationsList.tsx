import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Card from './Card'
import { getDonations } from '../features/donation/donationSlice'
import { Donation } from '../features/donation/Donation'
import { Backdrop, CircularProgress } from '@mui/material'

const DonationsList: React.FC<{
    darkMode: boolean
}> = ({ darkMode }) => {

    document.title = 'E-Donation | Home'

    const { loading, donations } = useAppSelector(state => state.donation)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getDonations())
    }, [dispatch])

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
        <div className='mt-[70px] flex justify-center items-center '>
            {
                donations.length > 0 ?
                    <div className='w-[90%] md:w-[80%] p-[5px]'>
                        <div className={`${darkMode ? 'text-white' : 'text-[#121212]'} mb-6`}>
                            Donations ({donations.length})
                        </div>

                        <div className="grid gap-x-10 gap-y-4 md:grid-cols-3 sm:grid-cols-2 mb-16">
                            {
                                donations.map((e: Donation, index: number) => (
                                    <Card
                                        darkMode={darkMode}
                                        data={e}
                                        id={index + 1}
                                        key={index}
                                    />
                                ))
                            }
                        </div>

                    </div> :

                    <div className={`font-bold ${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                        No donation exists start one!
                    </div>
            }
        </div>
    )
}

export default DonationsList