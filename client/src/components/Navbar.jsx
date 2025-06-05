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
                <img onClick={() => navigate('/')} className='cursor-pointer' src={assets.logo} alt="" />
                {
                    user ?
                        <div className='flex items-center gap-3'>
                            <Link to={'/applications'}>Applied Jobs</Link>
                            <p></p>
                            <p className='max-sm:hidden'>Hi, {user.firstName}</p>
                            <UserButton />
                        </div> :
                        <div className='flex gap-4 max-sm:text-xs'>
                            <button onClick={onClickHandler} className='text-gray-600'>Recruiter Login</button>
                            <button onClick={e => openSignIn()} className='bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full'>Login</button>
                        </div>
                }

            </div>
        </div>
    )
}

export default Navbar