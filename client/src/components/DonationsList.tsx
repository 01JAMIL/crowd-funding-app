import React from 'react'

const DonationsList: React.FC<{
    darkMode: boolean
}> = ({ darkMode }) => {
    return (
        <div className='flex justify-center items-center '>
            <div className='w-[90%] md:w-[80%] p-[5px]'>
                <div className={`${darkMode ? 'text-white' : 'text-[#121212]'} mb-6`}>
                    Donations (0)
                </div>

                <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2 grid-rows-3">

                </div>

            </div>
        </div>
    )
}

export default DonationsList