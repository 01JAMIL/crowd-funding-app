import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { saveDonation } from '../features/donation/donationSlice'
import { Donation } from '../features/donation/Donation'

const CreateDonation: React.FC<{ darkMode: boolean }> = ({ darkMode }) => {

    document.title = 'E-Donation | Create Donation'

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
    const [error, setError] = useState<any>(false)


    const validateForm = (data: Donation) => {
        let error = false
        if (
            data.owner === '' ||
            data.title === '' ||
            data.story === '' ||
            data.goal === 0 ||
            data.deadline === 0 ||
            data.image === ''

        ) {
            error = true
        }

        return error
    }

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.name === 'deadline' ? new Date(e.target.value).getTime() : e.target.value
        })
    }

    const submitHandler = (e: FormEvent) => {
        e.preventDefault()
        form.owner = address
        const formError = validateForm(form)
        if (formError) {
            setError(formError)
        } else {
            setError(false)
            dispatch(saveDonation(form))
        }
    }


    useEffect(() => {
        if (success) {
            console.log('Success !')
            navigate('/', { replace: true })
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
                        <div className='w-full mb-2'>
                            <label
                                className='block tracking-wide text-sm font-bold mb-2' htmlFor='title'>
                                Title *
                            </label>
                            <input
                                className={`
                                appearance-none block w-full
                                border p-[8px] rounded-[8px] mb-2
                                leading-tight focus:outline-none
                                ${darkMode ? 'bg-[#1c1c24] text-white' : 'bg-white focus:bg-white text-gray-700'}
                            `}
                                id='title'
                                name='title'
                                type='text'
                                placeholder='Title of your donation'
                                onChange={changeHandler}
                            />
                            <div className='h-[15px] px-2'>
                                {
                                    (error && form.title === '') && <p className="text-red-500 text-xs">Please fill out this field.</p>
                                }
                            </div>
                        </div>

                        <div className='w-full mb-2'>
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
                            <div className='h-[15px] px-2'>
                                {
                                    (error && form.story === '') && <p className="text-red-500 text-xs">Please fill out this field.</p>
                                }
                            </div>
                        </div>

                        <div className='w-full flex mb-2'>
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
                                <div className='h-[15px] px-2'>
                                    {
                                        (error && form.goal === 0) && <p className="text-red-500 text-xs">Please fill out this field.</p>
                                    }
                                </div>
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
                                <div className='h-[15px] px-2'>
                                    {
                                        (error && form.deadline === 0) && <p className="text-red-500 text-xs">Please fill out this field.</p>
                                    }
                                </div>
                            </div>
                        </div>


                        <div className='w-full mb-2'>
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
                            <div className='h-[15px] px-2'>
                                {
                                    (error && form.image === '') && <p className="text-red-500 text-xs">Please fill out this field.</p>
                                }
                            </div>
                        </div>


                        <div className='w-full flex justify-center'>
                            <button className='
                                border border-purple-700 rounded-[8px] p-[5px]
                                bg-purple-700 font-bold hover:border-purple-500 hover:bg-purple-500
                                hover:border-purple-500
                                text-white disabled:bg-purple-500 disabled:border-purple-500
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