import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { saveDonation } from '../features/donation/donationSlice'
import { Donation } from '../features/donation/Donation'

const CreateDonation: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {

    const { address } = useAppSelector(state => state.wallet)
    const { loading, success } = useAppSelector(state => state.donation)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [form, setForm] = useState<Donation>({
        owner: '',
        title: '',
        story: '',
        goal: 0,
        collectedAmount: 0,
        deadline: 0,
        image: '',
        donators: [],
        donations: []
    })

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.name === 'deadline' ? new Date(e.target.value).getTime() : e.target.value
        })
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        form.owner = address

        dispatch(saveDonation(form))
    }


    useEffect(() => {
        if (success) {
            navigate('/')
        }
    }, [success, navigate])

    return (
        <div className='mt-[70px] flex justify-center items-center'>
            <div className='p-[5px] md:w-[80%] w-[90%]'>
                <div className={`mb-5 ${darkMode ? 'text-white' : 'text-[#121212]'}`}>
                    Create donation
                </div>

                <div className={`mb-10 shadow-xl rounded-[16px] p-[20px] ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white text-[#121212]'}`}>
                    <form onSubmit={submitHandler}>
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
                                placeholder='Title of your donation'
                                onChange={changeHandler}
                            />
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
                                onChange={changeHandler}
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
                                    min={0}
                                    step={0.001}
                                    type='number'
                                    placeholder='ETH 0.1'
                                    onChange={changeHandler}
                                />
                                {/*  <p className="text-red-500 text-xs">Please fill out this field.</p> */}
                            </div>

                            <div className='w-full pl-4'>
                                <label
                                    className='block tracking-wide text-sm font-bold mb-2' htmlFor='deadline'>
                                    End date *
                                </label>
                                <input
                                    className={`
                                    appearance-none w-full
                                    border p-[8px] rounded-[8px] mb-3
                                    leading-tight focus:outline-none
                                    ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                                    `}
                                    id='deadline'
                                    name='deadline'
                                    type='date'
                                    onChange={changeHandler}
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
                                appearance-none block w-full
                                border p-[8px] rounded-[8px] mb-3
                                leading-tight focus:outline-none
                                ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                            `}
                                id='image'
                                name='image'
                                type='text'
                                onChange={changeHandler}
                                placeholder="Place your image URl here."
                            />
                            {/*  <p className="text-red-500 text-xs">Please fill out this field.</p> */}
                        </div>


                        <div className='w-full flex justify-center'>
                            <button className='
                                border border-purple-700 rounded-[8px] p-[5px]
                                bg-purple-700 font-bold hover:border-purple-500 hover:bg-purple-500
                                text-white disabled:bg-purple-500
                                '
                                disabled={loading}
                                type='submit'
                            >
                                {
                                    loading ? 'Loading ...' : 'Submit donation'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateDonation