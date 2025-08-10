/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next"
import Link from "next/link"
import { FaBriefcase, FaLocationDot, FaUserTie } from "react-icons/fa6"
import { JobList } from "./JobList"

export const metadata: Metadata = {
  title: "Manage Jobs",
  description: "Description Manage Jobs page...",
}

export default function CompanyManageJobListPage() {
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          
        <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] sm:w-auto w-[100%] text-[#121212]">
            Jobs Management
          </h2>
          <Link href="/company-manage/job/create" className="bg-[#0088FF] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px]">
            Add new jobs
          </Link>
        </div>

        <JobList />
        </div>
      </div>
    </>
  )
}