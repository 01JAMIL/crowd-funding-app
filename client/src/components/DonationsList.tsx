import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import Card from './Card'
import { getDonations } from '../features/donation/donationSlice'

const DonationsList: React.FC<{
    darkMode: boolean
}> = ({ darkMode }) => {

    const { loading, donations } = useAppSelector(state => state.donation)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getDonations())
    }, [dispatch])

    return (
        <div className='mt-[70px] flex justify-center items-center '>
            {
                loading ? <div className={`${darkMode ? 'text-white' : 'text-[#121212]'}`}>Loading ...</div> : ''
            }
            {
                donations.length > 0 ?
                    <div className='w-[90%] md:w-[80%] p-[5px]'>
                        <div className={`${darkMode ? 'text-white' : 'text-[#121212]'} mb-6`}>
                            Donations (0)
                        </div>

                        <div className="grid gap-x-10 gap-y-4 md:grid-cols-3 sm:grid-cols-2 mb-16">
                            <Card
                                darkMode={darkMode}
                            />

                            <Card
                                darkMode={darkMode}
                            />

                            <Card
                                darkMode={darkMode}
                            />
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