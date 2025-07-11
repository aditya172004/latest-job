import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth, useUser } from "@clerk/clerk-react";
export const AppContext = createContext()

export const AppContextProvider = (props) => {
    const navigate = useNavigate()

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const { user } = useUser();
    const { getToken } = useAuth();

    const [searchFilter, setSearchFilter] = useState({
        title: '',
        location: ''
    });

    const [isLoading, setisLoading] = useState(false);
    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([]);

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null);

    const [companyData, setCompanyData] = useState(null);

    const [userData, setUserData] = useState(null);
    const [userApplications, setUserApplications] = useState([]);



    // Function to fetch Data
    const fetchJobs = async () => {
        // setJobs(jobsData)
        try {
            setisLoading(true);
            const { data } = await axios.get(backendUrl + '/api/jobs');

            if (data.success) {
                setJobs(data.jobs);
                // console.log(data.jobs);
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        } finally {
            setisLoading(false);
        } 
    }

    //Function to fetch company data
    const fetchCompanyData = async () => {
        // console.log("This function is also getting called");
        try {

            const { data } = await axios.get(backendUrl + '/api/company/company', {
                headers: { token: companyToken }
            })

            if (data.success) {
                setCompanyData(data.company);
                // console.log(data);
                // navigate('/dashboard/manage-jobs');
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // Function to fetch user data
    const fetchUserData = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(backendUrl + '/api/users/user', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            // console.log("data in fetchUserData : ",data);

            if (data.success) {
                setUserData(data.user)
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to fetch user's applied applications data
    const fetchUserApplications = async () => {
        try {
            const token = await getToken();

            const { data } = await axios.get(backendUrl + '/api/users/applications', {
                headers: { Authorization: `Bearer ${token}` }
            })
            // console.log("data inside AppContext.jsx 105", data);
            if (data.success) {
                setUserApplications(data.applications);
            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }


    useEffect(() => {
        fetchJobs()
        // console.log("useEffect 1 is running");
        const storedCompanyToken = localStorage.getItem('companyToken');
        // console.log("storedCompanyToken is : ", storedCompanyToken);
        if (storedCompanyToken) {
            setCompanyToken(storedCompanyToken);
        }
        // else{
        //     navigate('/');
        // }

    }, []);

    useEffect(() => {
        // console.log("useEffect 2 is running");
        if (companyToken) {
            // console.log("function getting called or not");
            fetchCompanyData();
            //if this useEffect runs fine , then it should be re directed to it's company's dashbroad
        }
    }, [companyToken])

    useEffect(() => {
        if (user) {
            fetchUserData()
            // fetchUserApplications()
        }
    }, [user])

    // Separate useEffect for applications
    useEffect(() => {
        if (userData) { // Only fetch applications if we have user data
            fetchUserApplications();
        }
    }, [userData]); // Depend on userData instead of user

    const value = {
        setSearchFilter, searchFilter,
        isSearched, setIsSearched,
        jobs, setJobs,
        showRecruiterLogin, setShowRecruiterLogin,
        companyToken, setCompanyToken,
        companyData, setCompanyData,
        backendUrl,
        userData, userApplications,
        setUserData, setUserApplications,
        fetchUserData,
        fetchUserApplications,
        isLoading,
        setisLoading
    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}
