import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ClipLoader, FadeLoader } from 'react-spinners';

const RecruiterLogin = () => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(false);

    const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        if (state === "Sign Up" && !isTextDataSubmitted) {
            setIsTextDataSubmitted(true);
            return;
        }

        try {
            setIsLoading(true); // Start loading
            if (state === 'Login') {
                const { data } = await axios.post(backendUrl + '/api/company/login', {
                    email, password
                })

                if (data.success) {
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem('companyToken', data.token);
                    setShowRecruiterLogin(false);
                    navigate('/dashboard/manage-jobs');
                    toast.success("Logged In Successfully");
                } else {
                    toast.error(data.message);
                }

            } else {
                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData);

                if (data.success) {
                    // console.log(data);
                    setCompanyData(data.company);
                    setCompanyToken(data.token);
                    localStorage.setItem('companyToken', data.token);
                    setShowRecruiterLogin(false);
                    navigate('/dashboard/manage-jobs');
                } else {
                    setIsTextDataSubmitted(false);
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }

    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])


    return (
        <div className='absolute top-0 left-0 bottom-0 right-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-10 rounded-xl text-slate-500'>
                <h1 className='text-center text-2xl text-neutral-700 font-medium'>Recruiter {state}</h1>
                <p className='text-sm'>Welcome back! Please sign in to continue</p>

                {state === "Sign Up" && isTextDataSubmitted ?
                    <>
                        <div className='flex items-center gap-4 my-10'>
                            <label htmlFor="image">
                                <img className='w-16 rounded-full' src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
                                <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                            </label>
                            <p>Upload Company <br />Logo</p>
                        </div>
                    </>
                    : <>
                        {state !== 'Login' && (
                            <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                                <img src={assets.person_icon} alt="" />
                                <input className='outline-none tetx-sm' onChange={e => setName(e.target.value)} value={name} type="text" placeholder='Company Name' required />
                            </div>
                        )}
                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.email_icon} alt="" />
                            <input className='outline-none tetx-sm' onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email Id' required />
                        </div>
                        <div className='border px-4 py-2 flex items-center gap-2 rounded-full mt-5'>
                            <img src={assets.lock_icon} alt="" />
                            <input className='outline-none text-sm' onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' required />
                        </div>

                    </>
                }
                {state === "Login" && <p className='text-sm text-blue-600 mt-4 my-4 cursor-pointer'>Forgot Password ?</p>}
                <button type='submit' disabled={isLoading} className={`cursor-pointer hover:bg-blue-500 bg-blue-600 w-full text-white py-2 rounded-full mt-4 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''} `}>
                    {state === "Login"
                        ? (isLoading ? 'Logging in...' : 'Login')
                        : (isTextDataSubmitted ? 'Create Account' : "Next")
                    }
                </button>

                {
                    state === 'Login'
                        ? <p className='mt-5 text-center'>Dont't have an Account ? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Sign Up")}>Sign Up</span></p>
                        : <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={() => setState("Login")}>Login</span></p>
                }
                <img onClick={e => setShowRecruiterLogin(false)} className='absolute top-5 right-5 cursor-pointer' src={assets.cross_icon} alt="" />
            </form>
        </div>
    )
}

export default RecruiterLogin