'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiCalendar, FiClock, FiMapPin, FiType } from "react-icons/fi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from 'react-paginate';
import { GrNext, GrPrevious } from "react-icons/gr";
import { HiDotsHorizontal } from "react-icons/hi";
import { BASE_URL } from '@/utils/BASE_URL';
import Arrow from '../components/Arrow';

const SavedJobPage = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  const fetchUserInfo = async () => {
    // const loggedInUserEmail = localStorage.getItem('userEmail');
    const loggedInUserEmail = typeof window !== 'undefined' && localStorage.getItem('userEmail');
    if (!loggedInUserEmail) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/user-info/${loggedInUserEmail}`);
      if (!response.ok) throw new Error('Failed to fetch user info');

      const data = await response.json();
      setSavedJobs(data?.likedJobs || []);

      if (data?.likedJobs?.length > 0) {
        const jobResponses = await Promise.all(
          data.likedJobs.map(slug =>
            fetch(`${BASE_URL}/job/${slug}`)
              .then(res => res.ok ? res.json() : null)
          )
        );
        setJobDetails(jobResponses.filter(job => job));
      }
    } catch (error) {
      console.error('Error fetching user or job info:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleLike = async (slug) => {
    // const token = localStorage.getItem('userToken');
    const token = typeof window !== 'undefined' && localStorage.getItem('userToken');
    // const userId = localStorage.getItem('UserId');
    const userId = typeof window !== 'undefined' && localStorage.getItem('UserId');

    if (!userId || !token) {
      toast.error('Please log in to like/unlike this job.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/job/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          slug,
          userId,
          action: savedJobs.includes(slug) ? 'unlike' : 'like',
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        if (savedJobs.includes(slug)) {
          const updatedSavedJobs = savedJobs.filter(s => s !== slug);
          setSavedJobs(updatedSavedJobs);
          setJobDetails(prev => prev.filter(job => job.slug !== slug));
          localStorage.setItem('likedJobs', JSON.stringify(updatedSavedJobs));
          toast.success('Job removed from save history successfully!');
        } else {
          const updatedSavedJobs = [...savedJobs, slug];
          setSavedJobs(updatedSavedJobs);
          localStorage.setItem('likedJobs', JSON.stringify(updatedSavedJobs));
          const newJobDetails = await fetch(`${BASE_URL}/job/${slug}`).then(res => res.json());
          setJobDetails(prev => [...prev, newJobDetails]);
          toast.success('Job saved successfully!');
        }
      } else {
        toast.error(data.message || 'Failed to like/unlike the job.');
      }
    } catch (error) {
      toast.error('Error liking/unliking job:', error);
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * itemsPerPage;
  const pageCount = Math.ceil(savedJobs.length / itemsPerPage);
  const currentJobs = jobDetails.slice(offset, offset + itemsPerPage);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-8">
        <img src="/loader.gif" alt="Loading..." className="h-24" />
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
      <div className="flex justify-center mt-8">
        <div className="w-[80%]">
          {currentJobs.length > 0 ? (
            <>
              <h3 className="text-lg font-bold mb-4">{savedJobs.length} Saved Jobs</h3>
              {currentJobs.map((job) => (
                <section key={job._id} className="card border border-gray-300 rounded mb-4 hover:shadow-lg p-3">
                  <div className="text-gray-500 cursor-pointer flex justify-end" onClick={() => handleLike(job?.slug)}>
                    {savedJobs.includes(job?.slug) ? (
                      <FaHeart className="text-xl text-red-500" />
                    ) : (
                      <FaRegHeart className="text-xl" />
                    )}
                  </div>
                  <Link href={`/job/${job?.slug}`} className="flex flex-col sm:flex-row gap-4">
                    <div className="w-20 h-20 sm:w-32 sm:h-32">
                      <img src={job?.image} alt={job?.companyName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col w-full">
                      <h4 className="text-primary text-base font-semibold">{job?.companyName}</h4>
                      <h3 className="text-xl font-bold">{job?.jobTitle}</h3>
                      <p className="text-sm text-gray-600">{job?.skills?.join(', ')}</p>
                      <div className="text-primary/70 text-sm flex flex-wrap gap-2 font-bold">
                        <span className="flex items-center gap-1"><FiMapPin /> {job?.jobLocation}</span>
                        <span className="flex items-center gap-1"><FiClock /> {job?.employmentType}</span>
                        {job?.minPrice && job?.maxPrice && job?.salaryType ? (
                          <span className="flex items-center gap-1">
                            £ {job.minPrice}-{job.maxPrice} {job.salaryType}
                          </span>
                        ) : job?.salaryType && (
                          <span className="flex items-center gap-1"><FiType /> {job.salaryType}</span>
                        )}
                        <span className="flex items-center gap-1"><FiCalendar /> {job.jobPosting}</span>
                      </div>
                      <p className="text-sm sm:text-base text-primary/70 hidden sm:block">
                        {job.description?.slice(0, 100)}...
                      </p>
                    </div>
                  </Link>
                </section>
              ))}
            </>
          ) : (
            <h3 className="text-lg font-bold text-gray-600 text-center m-8">No saved jobs 😧</h3>
          )}

          {savedJobs.length > 0 && (
            <div className='flex justify-end'>
              <ReactPaginate
                previousLabel={<GrPrevious size={20} />}
                nextLabel={<GrNext size={20} />}
                breakLabel={<HiDotsHorizontal size={20} />}
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
                breakClassName={"pagination__break"}
                breakLinkClassName={"pagination__break"}
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

export default SavedJobPage;
