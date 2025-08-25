'use client';

import React, { useEffect, useState } from "react";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Newsletter from "./components/Newsletter";
import Banner from "./components/Banner";
import Card from "./components/Cards";
import Arrow from "./components/Arrow";
import Sidebar from "./components/Sidear";
import Jobs from "@/pages/Jobs";
import Browse from "@/pages/Browse";
import { BASE_URL } from "@/utils/BASE_URL";

const HomePage = () => {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [query, setQuery] = useState("");



  useEffect(() => {
    setIsloading(true);
    fetch(`${BASE_URL}/all-jobs`)
      .then(res => res.json())
      .then(data => {
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setJobs(data);
        setIsloading(false);
      });
  }, []);

  const handleInputChange = (e) => setQuery(e.target.value);
  const handleLocationChange = (location) => setSelectedLocation(location);
  const handleCategories = (cat) => setSelectedCategory(cat);
  const handleChange = (e) => setSelectedCategory(e.target.value);
  const handleClick = (e) => setSelectedCategory(e.target.value);

  const filteredData = (jobs, selected, query, selectedLocation) => {
    let filtered = jobs;

    if (query) {
      filtered = filtered.filter(job =>
        job.jobTitle.toLowerCase().includes(query.toLowerCase()) ||
        job.companyName.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selected) {
      filtered = filtered.filter(job =>
        job.category?.toLowerCase() === selected.toLowerCase() ||
        job.jobLocation?.toLowerCase() === selected.toLowerCase() ||
        job.salaryType?.toLowerCase() === selected.toLowerCase() ||
        job.experiencedLevel?.toLowerCase() === selected.toLowerCase() ||
        job.employmentType?.toLowerCase() === selected.toLowerCase()
      );
    }

    if (selectedLocation) {
      filtered = filtered.filter(job =>
        job.jobLocation?.toLowerCase() === selectedLocation.toLowerCase()
      );
    }

    return filtered;
  };

  const filteredItems = filteredData(jobs, selectedCategory, query, selectedLocation);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedJobs = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Aidifys - UK Jobs in IT, Marketing, Healthcare & More</title>
        <meta name="description" content="Explore top jobs in the UK across tech, healthcare, and more." />
      </Helmet>
      <Banner
        query={query}
        handleInputChange={handleInputChange}
        handleLocationChange={handleLocationChange}
        handleCategories={handleCategories}
      />
      <div className="bg-[#FAFAFA] grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 px-4 py-8 lg:py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div className="bg-white p-4 rounded-sm md:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <img src="/loader.gif" alt="Loading..." style={{ height: "100px" }} />
            </div>
          ) : filteredItems.length ? (
            <>
              <Jobs Totaljobs={filteredItems.length} />
              {paginatedJobs.map((job, index) => (
                <Card key={index} data={job} />
              ))}
            </>
          ) : (
            <p className="text-center font-bold">No jobs found!</p>
          )}

          {filteredItems.length > itemsPerPage && (
            <div className="flex justify-end items-center space-x-4 mt-4">
              <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                <MdArrowBackIos size={20} />
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
                <MdArrowForwardIos size={20} />
              </button>
            </div>
          )}
        </div>
        <div className="bg-white p-4 rounded md:col-span-1">
          <Newsletter />
        </div>
      </div>
      <Browse />
      <Arrow />
    </HelmetProvider>
  );
};

export default HomePage;
