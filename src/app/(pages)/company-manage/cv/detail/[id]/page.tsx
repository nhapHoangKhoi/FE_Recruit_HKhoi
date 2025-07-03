import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Detail CV",
  description: "Description Detail CV...",
}

export default function CompanyManageCVDetailPage() {
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          {/* Detail CV */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px]">
            <div className="flex flex-wrap gap-[20px] items-center justify-between mb-[20px]">
              <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black">
                Detail CV
              </h2>
              <Link href="#" className="font-[400] text-[14px] text-[#0088FF] underline">
                Back to CV list
              </Link>
            </div>
            
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              Full name:
              <span className="font-[700]">
                Lê Văn A
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              Email:
              <span className="font-[700]">
                levana@gmail.com
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              Phone number:
              <span className="font-[700]">
                0123456789
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              File CV:
            </div>
            <div className="bg-[#D9D9D9] h-[736px]">
              {/* Preview File CV as PDF */}
            </div>
          </div>
          {/* End detail CV */}
          
          {/* Job Info */}
          <div className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
            <h2 className="sm:w-auto w-[100%] font-[700] text-[20px] text-black mb-[20px]">
              Job Information
            </h2>

            <div className="font-[400] text-[16px] text-black mb-[10px]">
              Job name:
              <span className="font-[700]">
                Frontend Engineer (ReactJS)
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              Salary range:
              <span className="font-[700]">
                1.000$ - 1.500$
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              Title:
              <span className="font-[700]">
                Fresher
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              Workspace type:
              <span className="font-[700]">
                Onsite
              </span>
            </div>
            <div className="font-[400] text-[16px] text-black mb-[10px]">
              Technologies:
              <span className="font-[700]">
                HTML5, CSS3, Javascript, ReactJS
              </span>
            </div>
            <Link href="#" className="font-[400] text-[14px] text-[#0088FF] underline">
              View job detail
            </Link>
          </div>
          {/* End Job Info */}
        </div>
      </div>
    </>
  )
}