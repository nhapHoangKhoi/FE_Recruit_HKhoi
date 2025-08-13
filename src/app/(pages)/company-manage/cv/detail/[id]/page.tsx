import { workingFormList } from "@/config/workingForm"
import { Metadata } from "next"
import { headers } from "next/headers"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Detail CV",
  description: "Description Detail CV...",
}

export default async function CompanyManageCVDetailPage({ params }: {
  params: {
    id: string
  }
}) {
  const { id } = await params;
  const headerList = await headers();
  const cookie = headerList.get("cookie");
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/resume/detail/${id}`, {
    method: "GET",
    headers: {
      cookie: cookie || ""
    },
    cache: "no-store"
  });
  const data = await response.json();

  let infoCV: any = null;
  let infoJob: any = null;
  if(data.code == "success") {
    infoCV = data.infoCV;
    infoJob = data.infoJob;
    infoJob.workingForm = workingFormList.find(item => item.value == infoJob.workingForm)?.label;
  }

  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          {/* Detail CV */}
          {infoCV && (
            <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
              <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
                <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black">
                  Detail CV
                </h2>
                <Link href={`/company-manage/cv/list`} className="font-[400] text-[14px] text-[#0088FF] underline">
                  Back to CV list
                </Link>
              </div>
              
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Full name:
                <span className="font-[700] ml-[5px]">
                  {infoCV.fullName}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Email:
                <span className="font-[700] ml-[5px]">
                  {infoCV.email}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Phone number:
                <span className="font-[700] ml-[5px]">
                  {infoCV.phone}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                File CV:
              </div>
              <div className="bg-[#D9D9D9] h-[736px]">
                <iframe
                  src={infoCV.fileCV}
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          )}
          {/* End detail CV */}
          
          {/* Job Info */}
          {infoJob && (
            <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
              <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black mb-[20px]">
                Job Information
              </h2>

              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Job name:
                <span className="font-[700] ml-[5px]">
                  {infoJob.title}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Salary range:
                <span className="font-[700] ml-[5px]">
                  {infoJob.salaryMin.toLocaleString("vi-VN")}$ - {infoJob.salaryMax.toLocaleString("vi-VN")}$
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Level:
                <span className="font-[700] ml-[5px]">
                  {infoJob.level}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Workspace type:
                <span className="font-[700] ml-[5px]">
                  {infoJob.workingForm}
                </span>
              </div>
              <div className="font-[400] text-[16px] text-black mb-[10px]">
                Technologies:
                <span className="font-[700] ml-[5px]">
                  {infoJob.technologies.join(", ")}
                </span>
              </div>
              <Link href={`/company-manage/job/edit/${infoJob.id}`} className="font-[400] text-[14px] text-[#0088FF] underline">
                View job detail
              </Link>
            </div>
          )}
          {/* End Job Info */}
        </div>
      </div>
    </>
  )
}