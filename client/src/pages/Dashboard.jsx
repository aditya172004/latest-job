import React, { useContext, useEffect } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
// import { assets } from '../assets/assets';

const Dashboard = () => {

    const navigate = useNavigate();
    const { companyData, setCompanyData, setCompanyToken } = useContext(AppContext);

    //function to logout for company
    const logout = () => {
        setCompanyToken(null);
        localStorage.removeItem('companyToken');
        setCompanyData(null);
        navigate('/');
        toast.success("Logged Out successfully");
    }

    useEffect(() => {
        console.log("useEffect in Dashboard.jsx running ");
        console.log("company data at that time useEffect ", companyData)
        if (companyData) {
            navigate('/dashboard/manage-jobs');
        }
    }, [companyData])

    return (
        <div className='min-h-screen'>
            {/* NavBar for recruiter panel */}
            <div className='shadow py-4'>
                <div className='px-5 flex justify-between items-center'>
                    {/* <img onClick={e => navigate('/')} className='max-sm:w-32 cursor-pointer' src={assets.JobNova12} alt="" /> */}
                    <div className='flex items-center gap-0.5'>
                        <img
                            onClick={() => navigate('/')}
                            className='cursor-pointer'
                            src={assets.JobNova12}
                            style={{ height: '40px', width: '30px' }}
                            alt=""
                        />
                        {/* <span className='text-blue-900 px-2 py-1 rounded font-bold text-[24px] leading-[32px] tracking-wider w-[120px] h-[40px] inline-block text-center'>JobNova</span> */}
                        <span className='text-blue-900 px-1 py-1 rounded font-bold text-[30px] leading-[35px]  w-[150px] h-[40px] inline-block text-center'>JobNova</span>
                    </div>
                    {
                        companyData &&
                        <div className='flex items-center gap-3'>
                            <p className='max-sm:hidden'>Welcome, {companyData.name}</p>
                            <div className='relative group'>
                                <img className='w-8 border rounded-full' src={companyData.image} alt="" />
                                <div className='cursor-pointer absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12'>
                                    <ul className='list-none m-0 p-2 bg-white rounded-md border text-sm'>
                                        <li onClick={logout} className='py-1 px-2 cursor-pointer'>Logout</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>

            <div className='flex items-start'>
                {/* Left Sidebar with option to add Job , Manage Job and view application */}
                <div className='inline-block min-h-screen border-r-2'>
                    <ul className='flex flex-col items-start pt-5 text-gray-800'>
                        <NavLink to={'/dashboard/add-job'} className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`} >
                            <img className='min-w-4' src={assets.add_icon} alt="" />
                            <p className='max-sm:hidden'>Add Job</p>
                        </NavLink>

                        <NavLink to={'/dashboard/manage-jobs'} className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img className='min-w-4' src={assets.home_icon} alt="" />
                            <p className='max-sm:hidden'>Manage Jobs</p>
                        </NavLink>

                        <NavLink to={'/dashboard/view-applications'} className={({ isActive }) => ` flex items-center p-3 sm:px-6 gap-2 w-full hover:bg-gray-100 ${isActive && 'bg-blue-100 border-r-4 border-blue-500'}`}>
                            <img className='min-w-4' src={assets.person_tick_icon} alt="" />
                            <p className='max-sm:hidden'>View Applications</p>
                        </NavLink>
                    </ul>
                </div>

                <div className='flex-1 h-full p-2 sm:p-5'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default Dashboard