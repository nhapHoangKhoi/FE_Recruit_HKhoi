/* eslint-disable @next/next/no-img-element */
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { Metadata } from "next"
import { FaLocationDot } from "react-icons/fa6"

export const metadata: Metadata = {
  title: "Company detail",
  description: "Descriptions...",
}

export default function CompanyDetailPage() {
  return (
    <>
      <div className="pt-[30px] pb-[60px]">
        <div className="container mx-auto px-[16px]">

          {/* Detail company */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <div className="flex flex-wrap items-center gap-[16px] mb-[20px]">
              <div className="w-[100px]">
                <img 
                  src="/assets/images/demo-cong-ty-2.jpg" 
                  alt="LG CNS Việt Nam" 
                  className="w-[100%] aspect-square object-cover rounded-[4px]"
                />
              </div>
              <div className="sm:flex-1">
                <h1 className="font-[700] text-[28px] text-[#121212] mb-[10px]">
                  LG CNS Việt Nam
                </h1>
                <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                  <FaLocationDot className="text-[16px]" /> Tầng 15, tòa Keangnam Landmark 72, Mễ Trì, Nam Tu Liem, Ha Noi
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Company model:
                <span className="text-[#121212]">
                  Product
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Employees:
                <span className="text-[#121212]">
                  151 - 300 employees
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Working hours:
                <span className="text-[#121212]">
                  Mon - Fri
                </span>
              </div>
              <div className="font-[400] text-[16px] text-[#A6A6A6]">
                Overtime:
                <span className="text-[#121212]">
                  No overtime
                </span>
              </div>
            </div>
          </div>
          {/* End detail company */}

          {/* Description */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
            Description
          </div>
          {/* End description */}

          {/* Opening jobs */}
          <div className="mt-[30px]">
            <h2 className="font-[700] text-[28px] text-[#121212] mb-[20px]">
              6 jobs available
            </h2>
      
            <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
              <CardJobItem />
            </div>
          </div>
          {/* End Opening jobs */}

        </div>
      </div>
    </>
  )
}