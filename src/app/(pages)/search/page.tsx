import { Section1 } from "@/app/components/section1/Section1";
import { CardJobItem } from "@/app/components/card/CardJobItem";

export default function SearchPage() {
  return (
    <>
      {/* Section 1 */}
      <Section1 />
      {/* End Section 1 */}

      {/* Search results */}
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">

          <h2 className="font-[700] text-[28px] text-[#121212] mb-[30px]">
            76 Opening jobs for <span className="text-[#0088FF]">reactjs</span>
          </h2>

          <div 
            className="bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]"
            style={{
              boxShadow: "0px 4px 20px 0px #0000000F"
            }}
          >
            <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">Job types</option>
              <option value="">Intern</option>
              <option value="">Fresher</option>
              <option value="">Junior</option>
              <option value="">Middle</option>
              <option value="">Senior</option>
              <option value="">Manager</option>
            </select>
            <select name="" className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">Workplace type</option>
              <option value="">Onsite</option>
              <option value="">Remote</option>
              <option value="">Hybrid</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            <CardJobItem />
          </div>

          <div className="mt-[30px]">
            <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">Page 1</option>
              <option value="">Page 2</option>
              <option value="">Page 3</option>
            </select>
          </div>

        </div>
      </div>
      {/* End Search results */}
    </>
  )
}