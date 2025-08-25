'use-clients'
import JobPostingData from '@/pages/sidebar/JobpostingDate';
import Location from '@/pages/sidebar/Location';
import Salary from '@/pages/sidebar/Salary';
import WorkExperience from '@/pages/sidebar/workExperince';
import Employments from '@/pages/sidebar/Employments';
import React from 'react';


const Sidebar = ({ handleChange, handleClick }) => {
    return (
        <div className='space-y-5 hidden md:block'>
            <h3 className='text-lg font-bold mb-2 ml-4'>Filters</h3>
            <Location handleChange={handleChange} />
            <Salary handleChange={handleChange} handleClick={handleClick} />
            <JobPostingData handleChange={handleChange} />
            <WorkExperience handleChange={handleChange} />
            <Employments handleChange={handleChange} />
        </div>
    )
}

export default Sidebar

