'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { FiCalendar, FiClock, FiMapPin, FiType } from "react-icons/fi";
// import { BASE_URL } from '../utils/BASE_URL';
import { motion } from 'framer-motion';
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import toast, { Toaster } from 'react-hot-toast';
import Arrow from '@/app/components/Arrow';
import { BASE_URL } from '@/utils/BASE_URL';

const Companyjobs = () => {
  const params = useParams();
  const companyId = params?.id;
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [jobCount, setJobCount] = useState(0);
  const [companyName, setCompanyName] = useState('');

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchCompanyJobs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${BASE_URL}/company-jobs/${companyId}?page=${currentPage + 1}&limit=${itemsPerPage}`);
        if (!response.ok) {
          toast.error(`Failed to fetch company jobs: ${response.status}`);
          return;
        }

        const { jobs: fetchedJobs, totalPages, totalJobs } = await response.json();
        setJobs(fetchedJobs);
        setCompanyName(fetchedJobs[0]?.companyName || '');
        setJobCount(totalJobs);
        setPageCount(totalPages);
      } catch (error) {
        toast.error('Error fetching job details');
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchCompanyJobs();
    }
  }, [companyId, currentPage]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center ">
        <img src="/loader.gif" alt="Loading..." style={{ height: '100px' }} />
      </div>
    );
  }

  return (
    <motion.div
      className="flex flex-col w-full cursor-pointer"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }}
    >
      <div className="flex justify-center mt-8 min-h-[80vh]">
        <div className="w-[80%]">
          <h3 className="text-lg font-bold mb-2 ml-6">
            {jobCount > 0
              ? `${jobCount} Jobs in ${companyName}`
              : `No jobs found for ${companyName}`}
          </h3>

          {jobCount > 0 ? (
            jobs.map((job) => (
              <section key={job._id} className="card border border-gray-300 rounded mb-4 hover:shadow-lg p-3">
                <Link href={`/job/${job?.slug}`} className="flex flex-row items-start gap-4 p-1 sm:p-2 lg:p-3">
                  <div className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-44 lg:h-44 flex-shrink-0">
                    <img
                      src={job?.image}
                      alt={job?.companyName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col justify-between w-full">
                    <div>
                      <h4 className="text-primary mb-1 text-base sm:text-sm lg:text-xl">{job?.companyName}</h4>
                      <h3 className="sm:text-sm lg:text-xl font-semibold">{job?.jobTitle}</h3>
                      <h6 className="sm:text-sm lg:text-xl font-semibold">
                        {job?.skills && job?.skills.join(', ')}
                      </h6>
                      <div className="text-primary/70 text-sm sm:text-base flex flex-wrap gap-1 font-bold">
                        <span className="flex items-center gap-1"><FiMapPin /> {job?.jobLocation}</span>
                        <span className="flex items-center gap-1"><FiClock /> {job?.employmentType}</span>
                        {job?.minPrice && job?.maxPrice && job?.salaryType ? (
                          <span className="flex items-center gap-1">
                            £ {job?.minPrice}-{job?.maxPrice} {job?.salaryType}
                          </span>
                        ) : job?.salaryType && (
                          <span className="flex items-center gap-1"><FiType /> {job?.salaryType}</span>
                        )}
                        <span className="flex items-center gap-1">
                          <FiCalendar />
                          {new Date(job?.jobPosting).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-primary/70 hidden sm:block">
                        {job?.description?.slice(0, 100)}
                      </p>
                    </div>
                  </div>
                </Link>
              </section>
            ))
          ) : (
            <div className="text-center text-xl font-semibold mt-8">
              <p>No jobs found for this company.</p>
            </div>
          )}

          {jobs.length > 0 && (
            <div className="flex justify-end">
              <ReactPaginate
                previousLabel={<GrPrevious size={20} />}
                nextLabel={<GrNext size={20} />}
                breakLabel={<HiDotsHorizontal size={20} />}
                pageCount={pageCount}
                onPageChange={handlePageChange}
                forcePage={currentPage}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                containerClassName="pagination"
                pageClassName="pagination__page"
                pageLinkClassName="pagination__link"
                previousClassName="pagination__previous"
                nextClassName="pagination__next"
                activeLinkClassName="pagination__link--active"
                disabledClassName="pagination__link--disabled"
                breakClassName="pagination__break"
                breakLinkClassName="pagination__break"
              />
            </div>
          )}
        </div>
        <Arrow />
        <Toaster />
      </div>
    </motion.div>
  );
};

export default Companyjobs;
