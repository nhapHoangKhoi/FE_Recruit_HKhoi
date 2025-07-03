import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Add a new job",
  description: "Description...",
}

export default function CompanyManageJobCreatePage() {
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
              <h1 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black">
                Add a new job
              </h1>
              <Link href="#" className="font-[400] text-[14px] text-[#0088FF] underline">
                Back to job list
              </Link>
            </div>
            
            <form action="" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Job name *
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="title" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="salaryMin" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Min salary ($)
                </label>
                <input 
                  type="number" 
                  name="" 
                  id="salaryMin" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="salaryMax" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Max salary ($)
                </label>
                <input 
                  type="number" 
                  name="" 
                  id="salaryMax" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="">
                <label htmlFor="position" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Title *
                </label>
                <select 
                  name="" 
                  id="position" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                >
                  <option value="">Intern</option>
                  <option value="">Fresher</option>
                  <option value="">Junior</option>
                  <option value="">Middle</option>
                  <option value="">Senior</option>
                  <option value="">Manager</option>
                </select>
              </div>
              <div className="">
                <label htmlFor="workingForm" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Workspace type *
                </label>
                <select 
                  name="" 
                  id="workingForm" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                >
                  <option value="">Onsite</option>
                  <option value="">Remote</option>
                  <option value="">Hybrid</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="technologies" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Technologies
                </label>
                <input 
                  type="text" 
                  name="" 
                  id="technologies" 
                  className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="images" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Images *
                </label>
                <input 
                  type="file" 
                  name="" 
                  id="images" 
                  accept="image/*" 
                  multiple 
                  className=""
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
                  Description
                </label>
                <textarea 
                  name="" 
                  id="description" 
                  className="w-[100%] h-[350px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white cursor-pointer">
                  Create new
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}