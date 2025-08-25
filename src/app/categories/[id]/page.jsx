'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FiMapPin, FiClock, FiType, FiCalendar } from 'react-icons/fi';
import { motion } from "framer-motion";
import ReactPaginate from 'react-paginate';
import { HiDotsHorizontal } from "react-icons/hi";
import { GrNext, GrPrevious } from "react-icons/gr";
import toast, { Toaster } from 'react-hot-toast';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BASE_URL } from '@/utils/BASE_URL';
import Arrow from '@/app/components/Arrow';

const Categories = () => {
    const params = useParams();
    const category = params?.id;
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [jobCount, setJobCount] = useState(0);
    const jobsPerPage = 10;

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_URL}/categories/${category}?page=${currentPage + 1}&limit=${jobsPerPage}`);
                if (response.ok) {
                    const { jobs: fetchedJobs, totalPages, totalJobs } = await response.json();
                    setJobs(fetchedJobs);
                    setJobCount(totalJobs);
                    setPageCount(totalPages);
                } else {
                    toast.error('Error fetching job details:', response.status);
                }
            } catch (error) {
                toast.error('Error fetching job details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [category, currentPage]);

    if (loading) {
        return (
            <div className="flex justify-center items-center mt-8">
                <img src="/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
        );
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>
                        Top {category || "Job"} Jobs in the UK | Software, Development, Data & More - Aidifys.com
                    </title>
                    <meta
                        name="description"
                        content={`Find high-paying ${category || "various industries"},  including roles in software
                         development, data analysis, network administration, and more. Browse full-time, part-time & 
                         remote opportunities at Aidifys.com.`}
                    />
                </Helmet>
                <motion.div
                    className="flex flex-col w-full cursor-pointer"
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false }}
                >
                    <div className="flex justify-center mt-8">
                        <div className="w-[80vw] min-h-[80vh]">
                            <div>
                                <h3 className="text-lg font-bold mb-2 ml-6">{jobCount} Jobs in {category} </h3>
                            </div>
                            {jobs.map(job => (
                                <section key={job._id} className='card border border-gray-300 rounded p-3 mb-4 hover:shadow-lg'>
                                    <Link href={`/job/${job?.slug}`} className='flex flex-row sm:flex-row items-start gap-4 p-1 sm:p-2 lg:p-3'>
                                        <div className='w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex-shrink-0'>
                                            <img src={job?.image} alt={job?.companyName} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className='text-primary mb-1 text-base sm:text-sm lg:text-xl'>{job?.category}</h4>
                                            <h4 className='sm:text-sm lg:text-xl font-semibold'>{job?.companyName}</h4>
                                            <h3 className='sm:text-sm lg:text-xl font-semibold'>{job?.jobTitle}</h3>
                                            <h6 className='sm:text-sm lg:text-xl font-semibold'>{job?.skills && job?.skills.join(', ')}</h6>
                                            <div className='text-primary/70 text-sm sm:text-base flex flex-wrap sm:flex-row flex-row gap-1 font-bold'>
                                                <span className='flex items-center gap-1'><FiMapPin /> {job?.jobLocation}</span>
                                                <span className='flex items-center gap-1'><FiClock /> {job?.employmentType}</span>
                                                {job?.minPrice && job?.maxPrice && job?.salaryType ? (
                                                    <span className="flex items-center gap-1">
                                                        £ {job?.minPrice}-{job?.maxPrice} {job?.salaryType}
                                                    </span>
                                                ) : job?.salaryType && (
                                                    <span className="flex items-center gap-1">
                                                        <FiType /> {job?.salaryType}
                                                    </span>
                                                )}
                                                <span className='flex items-center gap-1'><FiCalendar /> {job?.jobPosting}</span>
                                            </div>
                                            <p className='text-sm sm:text-base text-primary/70 hidden sm:block'>
                                                {job.description?.slice(0, 100)}
                                            </p>
                                        </div>
                                    </Link>
                                </section>
                            ))}
                            {jobs && jobs.length > 0 ? (
                                <div className='flex justify-end'>
                                    <ReactPaginate
                                        previousLabel={<GrPrevious size={20} />}
                                        nextLabel={<GrNext size={20} />}
                                        breakLabel={<HiDotsHorizontal size={20} />}
                                        breakClassName={"pagination__break"}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={2}
                                        onPageChange={handlePageChange}
                                        containerClassName={"pagination"}
                                        pageClassName={"pagination__page"}
                                        pageLinkClassName={"pagination__link"}
                                        previousClassName={"pagination__previous"}
                                        nextClassName={"pagination__next"}
                                        activeLinkClassName={"pagination__link--active"}
                                        disabledClassName={"pagination__link--disabled"}
                                        breakLinkClassName={"pagination__break"}
                                        forcePage={currentPage}
                                    />
                                </div>
                            ) : (null)}
                        </div>
                        <Arrow />
                        <Toaster />
                    </div>
                </motion.div>
            </HelmetProvider>
        </>
    );
};

export default Categories;
