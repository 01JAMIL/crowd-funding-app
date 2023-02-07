import React from 'react'


const CreateDonation: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {
    return (
        <div className='mt-[70px] flex justify-center items-center'>
            <div className='p-[5px] md:w-[80%] w-[90%]'>
                <div className={`mb-5 ${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                    Create donation
                </div>

                <div className={`mb-10 shadow-xl rounded-[16px] p-[20px] ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white text-[#121212]'}`}>
                    <form>
                        <div className='w-full mb-8'>
                            <label
                                className='block tracking-wide text-sm font-bold mb-2' htmlFor='title'>
                                Title *
                            </label>
                            <input
                                className={`
                                appearance-none block w-full
                                border p-[8px] rounded-[8px] mb-3
                                leading-tight focus:outline-none
                                ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                            `}
                                id='title'
                                name='title'
                                type='text'
                                placeholder='Title of your donation' />
                            {/*  <p className="text-red-500 text-xs">Please fill out this field.</p> */}
                        </div>

                        <div className='w-full mb-8'>
                            <label
                                className='block tracking-wide text-sm font-bold mb-2' htmlFor='story'>
                                Story *
                            </label>
                            <textarea
                                name='story'
                                id='story'
                                className={`
                                h-48 appearance-none resize-none block w-full
                                border p-[8px] rounded-[8px] mb-3
                                leading-tight focus:outline-none
                                ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                            `}>

                            </textarea>
                            {/*  <p className="text-red-500 text-xs">Please fill out this field.</p> */}
                        </div>

                        <div className='w-full flex mb-8'>
                            <div className='w-full pr-4'>
                                <label
                                    className='block tracking-wide text-sm font-bold mb-2' htmlFor='goal'>
                                    Goal *
                                </label>
                                <input
                                    className={`
                                appearance-none w-full
                                border p-[8px] rounded-[8px] mb-3
                                leading-tight focus:outline-none
                                ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                            `}
                                    id='goal'
                                    name='goal'
                                    type='number'
                                    placeholder='ETH 0.1' />
                                {/*  <p className="text-red-500 text-xs">Please fill out this field.</p> */}
                            </div>

                            <div className='w-full pl-4'>
                                <label
                                    className='block tracking-wide text-sm font-bold mb-2' htmlFor='endDate'>
                                    End date *
                                </label>
                                <input
                                    className={`
                                    appearance-none w-full
                                    border p-[8px] rounded-[8px] mb-3
                                    leading-tight focus:outline-none
                                    ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                                    `}
                                    id='endDate'
                                    name='endDate'
                                    type='date'
                                />
                                {/*  <p className="text-red-500 text-xs">Please fill out this field.</p> */}
                            </div>
                        </div>


                        <div className='w-full mb-8'>
                            <label
                                className='block tracking-wide text-sm font-bold mb-2' htmlFor='image'>
                                Image *
                            </label>
                            <input
                                className={`
                                file:rounded-full file:border-none file:bg-purple-100 file:text-purple-700
                                file:font-bold file:mr-4
                                appearance-none block w-full
                                border p-[8px] rounded-[8px] mb-3
                                leading-tight focus:outline-none
                                ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                            `}
                                id='image'
                                name='image'
                                type='file' />
                            {/*  <p className="text-red-500 text-xs">Please fill out this field.</p> */}
                        </div>


                        <div className='w-full flex justify-center'>
                            <button className='
                                border border-purple-700 rounded-[8px] p-[5px]
                                bg-purple-700 font-bold hover:border-purple-500 hover:bg-purple-500
                                text-white
                                '
                            >
                                Submit donation
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateDonation