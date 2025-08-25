'use client';

import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Arrow from '@/app/components/Arrow';
import Login from '@/app/components/Login';
import SignUp from '@/app/components/Signup';
import Apply from '@/app/components/Apply';
import Swal from 'sweetalert2';
import { BASE_URL } from '@/utils/BASE_URL';
import { useParams } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';

const Page = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [SignupOpen, setSignupOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isApplyOpen, setIsApplyOpen] = useState(false);
    const [companyEmail, setCompanyEmail] = useState('')
    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const fetchJobDetails = async () => {
            try {
                const response = await fetch(`${BASE_URL}/job/${id}`);
                if (response.ok) {
                    const jobData = await response.json();
                    // console.log(jobData)
                    setJob(jobData);
                } else {
                    toast.error('Error fetching job details:', response.status);
                }
            } catch (error) {
                toast.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobDetails();
    }, [id]);

    useEffect(() => {
        const storedUserName = localStorage.getItem('userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);




    const relativeTime = moment(job?.postedDate).fromNow();

    const handleApply = (companyInfo) => {
        if (!userName) {
            Swal.fire({
                title: 'Please log in or Sign up',
                text: 'You need to log in or sign up to apply for this job',
                icon: 'warning',
                confirmButtonText: 'Login',
                showCancelButton: true,
                cancelButtonText: 'Sign Up',
            }).then((result) => {
                if (result.isConfirmed) {
                    setIsLoginOpen(true);
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    setSignupOpen(true);
                }
            });
        } else {
            setIsApplyOpen(true);
            setCompanyEmail(companyInfo);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-8">
                <img src="/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
        );
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>
                        Top {job?.jobTitle} Jobs in the UK | Software, Development, Data & More - Aidifys.com
                    </title>
                    <meta
                        name="description"
                        content={`Discover top UK jobs across ${job?.jobTitle}, healthcare, finance, engineering & more at Aidifys.com.`}
                    />
                </Helmet>
                <div className="container mx-auto py-8 flex flex-col md:flex-row justify-between items-start w-[80vw] min-h-[80vh]">
                    <div className="w-full md:w-3/4 mb-8 md:mb-0 md:pr-8 flex flex-col">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">{job?.jobTitle}</h1>
                        <div className="flex items-center mb-4">
                            <p className="text-gray-700 mr-4">
                                <b>Posted Date:</b> {relativeTime}
                            </p>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-bold">Job Details</h2>
                        <button className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900 self-end" onClick={() => handleApply(job)}>
                            Apply
                        </button>
                        <hr className="border-gray-300 my-4" />
                        <p className="text-gray-700 mb-4 mt-1">
                            <span className="text-xl font-bold">Required Skills</span><br />
                            <span className="font-semibold mt-2">{job?.skills.join(', ')}</span>
                        </p>
                        <p className="text-gray-700 mb-4 whitespace-pre-line">{job?.description}</p>
                    </div>

                    <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
                        <div className="text-center mt-5">
                            <h2 className="text-xl md:text-2xl font-bold mb-4">Company Information</h2>
                        </div>
                        <div className='flex justify-center'>
                            <img src={job?.image} alt={job?.companyName} className='w-44 h-44' />
                        </div>
                        <h3 className="text-lg md:text-xl font-semibold mb-2 mt-3 ">
                            <Link href={`/company/${job?.companyId}`}>{job?.companyName}</Link>
                        </h3>
                        <div className="flex flex-wrap items-center mb-2">
                            <p className="text-gray-700 mr-4 mb-2 md:mb-0 md:mr-0 md:pr-4">
                                <b>Location:</b>
                                <Link href={`/location/${job?.jobLocation}`}>  {job?.jobLocation}</Link>
                            </p><br />
                        </div>
                        <div className="flex items-center mb-2">
                            <p className="text-gray-700 mr-4"><b>Employment Type:</b> {job?.employmentType}</p>
                        </div>
                        <div className="flex items-center mb-2">
                            <p className="text-gray-700 mr-4"><b>Experience Level:</b> {job?.experienceLevel}</p>
                        </div>
                        <div className="flex items-center">
                            {job?.minPrice && job?.maxPrice && (
                                <p className="text-gray-700 mr-4">
                                    <b>Salary Range: </b> £ {job?.minPrice} - {job?.maxPrice}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center">
                            {job?.salaryType && (
                                <p className="text-gray-700 mr-4 ">
                                    <b>Salary Type:</b> {job?.salaryType}
                                </p>
                            )}
                        </div>
                        {/* <div className="flex items-center">
                    <p className="text-gray-700 mr-4"><b>Company Email:</b> {job?.postedBy}</p>
                </div> */}
                    </div>
                    <Arrow />
                    {isApplyOpen && <Apply setIsApplyOpen={setIsApplyOpen} companyInfo={companyEmail} />}
                    {isLoginOpen && (
                        <Login
                            setLoginOpen={setIsLoginOpen}
                            setsignupOpen={setSignupOpen}
                            setUserName={setUserName}
                        />
                    )}
                    {SignupOpen && (
                        <SignUp
                            setsignupOpen={setSignupOpen}
                            setLoginOpen={setIsLoginOpen}
                            setUserName={setUserName}
                        />
                    )}
                </div>
            </HelmetProvider>
        </>
    );
};

export default Page;
