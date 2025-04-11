import React, { useEffect, useState } from "react";
import { FaShare } from "react-icons/fa6";
import { MdLocationPin } from "react-icons/md";
import { HiMiniBuildingOffice } from "react-icons/hi2";
import { IoBagRemove } from "react-icons/io5";
import { BsCurrencyDollar } from "react-icons/bs";
import { MdAccessTime } from "react-icons/md";
import axios from "axios";

const Job = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [locationFilter, setLocationFilter] = useState("");

  const fetchJobs = async () => {
    try {
      const query = locationFilter
        ? `?location=${encodeURIComponent(locationFilter)}`
        : "";
      const res = await axios.get(`/api/jobs${query}`);
      setJobs(res.data);
      setSelectedJob(res.data[0] || null);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [locationFilter]);

  const filteredJobs = jobs.filter((job) =>
    job.location.toLowerCase().includes(locationFilter.toLowerCase())
  );

  return (
    <div className="h-screen flex font-sans text-gray-800">
      {/* Left Panel */}
      <div className="w-1/3 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <input
          type="text"
          placeholder="Search by location..."
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
          className="w-full mb-4 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {filteredJobs.length === 0 && (
          <p className="text-gray-600 text-sm">
            No jobs found for this location.
          </p>
        )}
        {filteredJobs.map((job, index) => (
          <div
            key={job._id || index}
            className={`p-4 mb-4 border rounded-lg shadow-sm cursor-pointer transition-all duration-150 ${
              selectedJob && selectedJob._id === job._id
                ? "bg-gray-100 border-purple-400"
                : "hover:bg-gray-50"
            }`}
            onClick={() => setSelectedJob(job)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-md font-bold text-blue-900">{job.title}</h3>
              <span className="text-sm text-pink-700 font-medium">
                Quick Apply
              </span>
            </div>
            <p className="text-sm text-gray-700 mt-1">
              {job.source} — {job.location}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {job.description?.slice(0, 70) || "No description available"}...
            </p>
            <div className="flex justify-between text-sm text-gray-700 mt-2">
              <span>{job.salary || "From $19 an hour"}</span>
              <span className="text-xs text-gray-400">
                {job.postedDate || "10d ago"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Right Panel */}
      <div className="w-2/3 bg-white p-6 overflow-y-auto">
        {selectedJob ? (
          <div>
            <div className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white">
              <div className="flex flex-col gap-1">
                {/* Job Title */}
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedJob.title}
                </h1>

                {/* Source Text */}
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <HiMiniBuildingOffice />
                  {selectedJob.source}
                </p>

                {/* Location + Quick Apply */}
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <MdLocationPin />
                    {selectedJob.location}
                  </p>
                  <div className="flex items-center gap-6">
                    <FaShare className="text-gray-500 text-lg cursor-pointer" />
                    <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-full font-medium text-sm shadow-md">
                      ⚡ Quick Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white">
              <div className="mt-6">
                <h2 className="text-md font-bold text-black mb-2">
                  Job Details
                </h2>

                <div className="text-sm text-gray-700 space-y-2">
                  {/* Row 1: Employment type & Salary */}
                  <div className="flex items-center gap-20">
                    <span className="flex items-center gap-1">
                      <IoBagRemove />{" "}
                      {selectedJob.employment_type || "Not specified"}
                    </span>
                    <span className="flex items-center gap-1">
                      <BsCurrencyDollar />{" "}
                      {selectedJob.salary || "From $19 an hour"}
                    </span>
                  </div>

                  {/* Row 2: Posted date */}
                  <div>
                    <span className="flex items-center gap-1">
                      <MdAccessTime />{" "}
                      {selectedJob.postedDateTime || "13 days ago"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {selectedJob.qualifications &&
              selectedJob.qualifications.length > 0 && (
                <div className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white mt-4">
                  <div className="mt-2">
                    <h2 className="text-md font-bold text-black mb-2">
                      Qualifications
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {selectedJob.qualifications.map((q, i) => (
                        <span
                          key={i}
                          className="bg-gray-200 text-sm text-gray-700 px-3 py-1 rounded-full"
                        >
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

            <div className="border border-gray-300 rounded-xl p-4 shadow-sm bg-white mt-4">
              <div className="mt-2">
                <h2 className="text-lg font-bold text-black mb-2">
                  Full Job Description
                </h2>
                <h2 className="text-md font-semibold text-black mb-2">
                  Role Description
                </h2>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedJob.description || "No description available"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Select a job to see the details.</p>
        )}
      </div>
    </div>
  );
};

export default Job;
