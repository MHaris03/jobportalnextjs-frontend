import React, { useState } from 'react';
import Lottie from 'react-lottie';
import Arrowdown from "../app/components/data/Arrowanimation.json";
import Arrowup from "../app/components/data/Uparrow.json";
import Link from 'next/link';
import { AnimatePresence, motion } from "framer-motion";

const Browse = () => {
    const [isOpen, setIsOpen] = useState(false);
    const locations = [
        { name: 'London', jobLocation: 'London' },
        { name: 'Manchester', jobLocation: 'Manchester' },
        { name: 'Birmingham', jobLocation: 'Birmingham' },
        { name: 'Liverpool', jobLocation: 'Liverpool' },
        { name: 'City of Westminster', jobLocation: 'CityofWestminster' },
        { name: 'Glasgow', jobLocation: 'Glasgow' },
        { name: 'Edinburgh', jobLocation: 'Edinburgh' },
        { name: 'Sheffield', jobLocation: 'Sheffield' },
        { name: 'Oxford', jobLocation: 'Oxford' },
        { name: 'Bristol', jobLocation: 'Bristol' },
    ];
    const categories = [
        { name: 'Hospitality Jobs', category: 'Hospitality' },
        { name: 'Engineering Jobs', category: 'Engineering' },
        { name: 'Oil & Gas', category: 'OilGas' },
        { name: 'Administration', category: 'Administration' },
        { name: 'IT & Software', category: 'ITSoftware' },
        { name: 'Technology', category: 'Technology' },
        { name: 'Government', category: 'Government' },
        { name: 'Accounting / Finance', category: 'AccountingFinance' },
        { name: 'Web Developer', category: 'WebDeveloper' },
        { name: 'Human Resource', category: 'HumanResource' },
    ];
    const jobs = [
        { name: 'Full-Time', Job: 'Fulltime' },
        { name: 'Part-Time', Job: 'Parttime' },
        { name: 'Internship', Job: 'Internship' },
        { name: 'Temporary', Job: 'Temporary' },
        { name: 'Permanent', Job: 'Permanent' },
        { name: 'Hourly', Job: 'Hourly' },
        { name: 'Monthly', Job: 'Monthly' },
        { name: 'Yearly', Job: 'Yearly' },
        { name: 'Remotely', Job: 'Remotely' },
        { name: 'No Experinence', Job: 'Noexperinence' },
    ];
    const DefaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Arrowdown,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const DefaultOptions1 = {
        loop: true,
        autoplay: true,
        animationData: Arrowup,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };
    const toggleOpen = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <div className='flex flex-col justify-center items-center p-5 '>
            <h1 className='items-center text-lg md:text-xl font-bold mb-2 flex gap-2'>
                Browse <span className="text-sky-500">AidiyfsHired</span>
            </h1>
            <p className='text-primary/75 text-base md:text-lg text-center mb-4'>
                Browse AidiyfsHired for Jobs, We Can Help You Succeed, discover <br />
                Browse Thousands Of Jobs From Top Companies.
            </p>
            <div onClick={toggleOpen} className='cursor-pointer'>
                {isOpen ? (
                    <Lottie
                        options={DefaultOptions1}
                        height={50}
                        width={30}
                    />
                ) : (
                    <Lottie
                        options={DefaultOptions}
                        height={60}
                        width={70}
                    />
                )}
            </div>


            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="jobReveal"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="flex overflow-hidden w-full text-center"
                    >
                        <div className='flex-1 my-4'>
                            <h2 className='text-lg md:text-xl font-semibold'>Jobs</h2>
                            <ul className='list-disc list-inside mt-2'>
                                {jobs.map((jobObj, index) => (
                                    <li key={index} className="py-1">
                                        <Link href="/">
                                            <span className="relative inline-block group">
                                                {jobObj.name}
                                                <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Locations Section */}
                        <div className='flex-1 my-4'>
                            <h2 className='text-lg md:text-xl font-semibold'>Locations</h2>
                            <ul className='list-disc list-inside mt-2'>
                                {locations.map((locationObj, index) => (
                                    <li key={index} className='py-1'>
                                        <Link
                                            href={`/location/${locationObj?.jobLocation}`}
                                            className="relative inline-block group"
                                        >
                                            {locationObj.name}
                                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories Section */}
                        <div className='flex-1 my-4'>
                            <h2 className='text-lg md:text-xl font-semibold'>Categories</h2>
                            <ul className='list-disc list-inside mt-2'>
                                {categories.map((categoryObj, index) => (
                                    <li key={index} className='py-1'>
                                        <Link href={`/categories/${categoryObj?.category}`}
                                            className="relative inline-block group"
                                        >
                                            {categoryObj.name}
                                            <span className="absolute left-0 bottom-0 w-full h-[2px] bg-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
                {/* <div className="my-4">
                    <Link href="/browsejobs">
                        <button className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900">
                            Browse All Jobs
                        </button>
                    </Link>
                </div> */}
                {isOpen && (
                    <div className='my-4'>
                        <button className="py-2 px-5 border rounded bg-sky-500 text-white hover:bg-white hover:text-gray-900">
                            <Link href="/browsejobs">
                                Browse All Jobs
                            </Link>
                        </button>
                    </div>
                )}
            </AnimatePresence>
        </div>

    );
};

export default Browse;
