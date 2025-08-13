/* eslint-disable @next/next/no-img-element */
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { Metadata } from "next"
import { FaLocationDot } from "react-icons/fa6"

export const metadata: Metadata = {
  title: "Company detail",
  description: "Descriptions...",
}

export default async function CompanyDetailPage({ params }: {
  params: {
    id: string
  }
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/detail/${id}`);
  const data = await res.json();

  let companyDetail: any = null;
  let jobList: any = null;

  if(data.code == "success") {
    companyDetail = data.companyDetail;
    jobList = data.jobs;
  }

  return (
    <>
      {companyDetail && (
        <div className="pt-[30px] pb-[60px]">
          <div className="container mx-auto px-[16px]">

            {/* Detail company */}
            <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
              <div className="flex flex-wrap items-center gap-[16px] mb-[20px]">
                <div className="w-[100px]">
                  <img 
                    src={companyDetail.logo}
                    alt={companyDetail.companyName} 
                    className="w-[100%] aspect-square object-cover rounded-[4px]"
                  />
                </div>
                <div className="sm:flex-1">
                  <h1 className="font-[700] text-[28px] text-[#121212] mb-[10px]">
                    {companyDetail.companyName}
                  </h1>
                  <div className="flex items-center gap-[8px] font-[400] text-[14px] text-[#121212]">
                    <FaLocationDot className="text-[16px]" /> {companyDetail.address}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[10px]">
                <div className="font-[400] text-[16px] text-[#A6A6A6]">
                  Company model:
                  <span className="text-[#121212] ml-[5px]">
                    {companyDetail.companyModel}
                  </span>
                </div>
                <div className="font-[400] text-[16px] text-[#A6A6A6]">
                  Employees:
                  <span className="text-[#121212] ml-[5px]">
                    {companyDetail.companyEmployees} employees
                  </span>
                </div>
                <div className="font-[400] text-[16px] text-[#A6A6A6]">
                  Working hours:
                  <span className="text-[#121212] ml-[5px]">
                    {companyDetail.workingTime}
                  </span>
                </div>
                <div className="font-[400] text-[16px] text-[#A6A6A6]">
                  Overtime:
                  <span className="text-[#121212] ml-[5px]">
                    {companyDetail.workOvertime}
                  </span>
                </div>
              </div>
            </div>
            {/* End detail company */}

            {/* Description */}
            <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
              <div dangerouslySetInnerHTML={{ __html: companyDetail.description }} />
            </div>
            {/* End description */}

            {/* Opening jobs */}
            <div className="mt-[30px]">
              <h2 className="font-[700] text-[28px] text-[#121212] mb-[20px]">
                {jobList.length} jobs available
              </h2>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
                {jobList.map((item: any) => (
                  <CardJobItem key={item.id} item={item} />
                ))}
              </div>
            </div>
            {/* End Opening jobs */}

          </div>
        </div>
      )}
    </>
  )
}