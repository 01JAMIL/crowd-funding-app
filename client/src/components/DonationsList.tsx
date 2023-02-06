import React from 'react'
import Card from './Card'

const DonationsList: React.FC<{
    darkMode: boolean
}> = ({ darkMode }) => {
    return (
        <div className='mt-[70px] flex justify-center items-center '>
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

            </div>
        </div>
    )
}

export default DonationsList