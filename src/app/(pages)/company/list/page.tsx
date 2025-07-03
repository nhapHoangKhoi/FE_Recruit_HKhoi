import { CardCompanyItem } from "@/app/components/card/CardCompanyItem"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Companies list",
  description: "Descriptions...",
}

export default function CompanyListPage() {
  return (
    <>
      {/* Section 2 */}
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] sm:text-[28px] text-[24px] text-[#121212] text-center mb-[30px]">
            Companies list
          </h2>
          {/* Wrap */}
          <div className="grid lg:grid-cols-3 grid-cols-2 sm:gap-[20px] gap-x-[10px] gap-y-[20px]">
            {/* Item */}
            <CardCompanyItem />
          </div>

          <div className="mt-[30px]">
            <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042] outline-none">
              <option value="">Page 1</option>
              <option value="">Page 2</option>
              <option value="">Page 3</option>
            </select>
          </div>

        </div>
      </div>
      {/* End Section 2 */}
    </>
  )
}