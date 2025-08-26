"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import toast, { Toaster } from "react-hot-toast";
import { BASE_URL } from "@/utils/BASE_URL";

const UpdateJob = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id;

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [jobData, setJobData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`${BASE_URL}/job/${id}`);
        const data = await res.json();
        setJobData(data);
        setSelectedOptions(data.skills?.map((skill) => ({ value: skill, label: skill })));
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchJob();
  }, [id]);

  const onSubmit = async (data) => {
    // const userId = localStorage.getItem("UserId");
    const userId = typeof window !== 'undefined' ? localStorage.getItem('UserId') : null;
    data.skills = selectedOptions.map((option) => option.value);
    data._id = id;
    data.userId = userId;
    data.superAdminEmail = "usama.mang0901@gmail.com";

    try {
      const res = await fetch(`${BASE_URL}/update-job`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.status) {
        toast.success("Job updated successfully!!!");
        router.push("/my-job");
      } else {
        toast.error("Update job failed: " + (result.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      toast.error("Update job failed");
    }
  };

  const options = [
    { value: "JavaScript", label: "JavaScript" },
    { value: "C++", label: "C++" },
    { value: "React", label: "React" },
    { value: "MS Office", label: "MS Office" },
    { value: "Oracle", label: "Oracle" },
    { value: "Flutter", label: "Flutter" },
  ];

  if (!jobData) return <div className="mt-28 text-center">Loading...</div>;

  const {
    jobTitle,
    companyName,
    minPrice,
    maxPrice,
    salaryType,
    jobLocation,
    jobPosting,
    experienceLevel,
    image,
    employmentType,
    description,
    postedBy,
    category,
  } = jobData;

  return (
    <div className="max-w-screen-2xl container mx-auto px-4 mt-28 mb-5">
      <Toaster />
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Job Title & Company Name */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Title</label>
              <input type="text" defaultValue={jobTitle} {...register("jobTitle")} className="create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Name</label>
              <input type="text" defaultValue={companyName} {...register("companyName")} className="create-job-input" />
            </div>
          </div>

          {/* Salary */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Minimum Salary</label>
              <input type="text" defaultValue={minPrice} {...register("minPrice")} className="create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Maximum Salary</label>
              <input type="text" defaultValue={maxPrice} {...register("maxPrice")} className="create-job-input" />
            </div>
          </div>

          {/* Salary Type & Location */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Salary Type</label>
              <select {...register("salaryType")} defaultValue={salaryType} className="create-job-input">
                <option value="">Choose your salary</option>
                <option value="Hourly">Hourly</option>
                <option value="Monthly">Monthly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Location</label>
              <input type="text" defaultValue={jobLocation} {...register("jobLocation")} className="create-job-input" />
            </div>
          </div>

          {/* Posting Date & Experience */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Job Posting Date</label>
              <input type="date" defaultValue={jobPosting} {...register("jobPosting")} className="create-job-input" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Experience Level</label>
              <select defaultValue={experienceLevel} {...register("experienceLevel")} className="create-job-input">
                <option value="">Choose experience</option>
                <option value="Fresher">Fresher</option>
                <option value="1-Year">1 Year</option>
                <option value="2-Years">2 Years</option>
                <option value="3-Years">3 Years</option>
                <option value="5-Years">5 Years</option>
                <option value="Mid-Level">Mid-Level</option>
                <option value="Highly-Experienced">Highly Experienced</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Category</label>
              <select defaultValue={category} {...register("category", { required: true })} className="create-job-input">
                <option value="">Choose category</option>
                <option value="InformationTechnology">Information Technology</option>
                {/* Add remaining options here... */}
              </select>
              {errors.category && <p className="text-red-500">Category is required</p>}
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block mb-2 text-lg">Required Skill Sets</label>
            <CreatableSelect
              value={selectedOptions}
              onChange={setSelectedOptions}
              options={options}
              isMulti
              className="create-job-input py-4"
            />
          </div>

          {/* Company Logo & Employment */}
          <div className="create-job-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Company Logo</label>
              <img src={image} alt="Uploaded logo" className="mt-2 w-32 h-32 object-cover" />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Employment Type</label>
              <select defaultValue={employmentType} {...register("employmentType")} className="create-job-input">
                <option value="">Choose your employment type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Temporary">Temporary</option>
                <option value="Permanent">Permanent</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Description</label>
            <textarea className="w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-700" rows={6} defaultValue={description} {...register("description")} />
          </div>

          {/* Posted By */}
          <div className="w-full">
            <label className="block mb-2 text-lg">Job Posted By</label>
            <input type="email" defaultValue={postedBy} {...register("postedBy")} className="create-job-input" />
          </div>

          {/* Submit */}
          <input type="submit" value="Update Job" className="block mt-12 bg-blue text-white font-semibold px-10 py-2 rounded-sm cursor-pointer" />
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
