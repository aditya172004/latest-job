import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets.js'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';


const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user } = useUser()

    const navigate = useNavigate();

    const { setShowRecruiterLogin, companyToken, companyData } = useContext(AppContext);

    const onClickHandler = async () => {
        if (!companyData) {
            setShowRecruiterLogin(true);
        }
        else {
            navigate('/dashboard/manage-jobs');
        }
    }

    return (
        <div className='shadow py-4'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                {/* <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.JobNova12} style={{ height: '40px', width: '30px' }} alt="" /> */}
                <div className='flex items-center gap-0.5'>
                    <img
                        onClick={() => navigate('/')}
                        className='cursor-pointer'
                        src={assets.JobNova12}
                        style={{ height: '40px', width: '30px' }}
                        alt=""
                    />
                    {/* <span className='text-blue-900 px-2 py-1 rounded font-bold text-[24px] leading-[32px] tracking-wider w-[120px] h-[40px] inline-block text-center'>JobNova</span> */}
                    <span onClick={() => navigate("/")} className='cursor-pointer text-blue-900 px-1 py-1 rounded font-bold text-[30px] leading-[35px]  w-[150px] h-[40px] inline-block text-center'>JobNova</span>
                </div>
                {
                    user ?
                        <div className='flex items-center gap-3'>
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p></p>
                            <p className='max-sm:hidden'>Hi, {user.firstName}</p>
                            <UserButton />
                        </div> :
                        <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={onClickHandler} className='text-gray-600 cursor-pointer hover:text-gray-500'>Recruiter Login</button>
                            <button onClick={e => openSignIn()} className='cursor-pointer hover:bg-blue-500  bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                        </div>
                }

            </div>
        </div>
    )
}

export default Navbar
