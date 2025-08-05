import { Metadata } from "next"
import { FormRegister } from "./FormRegister"

export const metadata: Metadata = {
  title: "Register (For recruiters)",
  description: "Description...",
}

export default function CompanyRegisterPage() {
  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <div className="border border-[#DEDEDE] rounded-[8px] py-[50px] px-[20px] max-w-[602px] mx-auto">
            <h1 className="font-[700] text-[20px] text-black text-center mb-[20px]">
              Register (For recruiters)
            </h1>
            <FormRegister />
          </div>
        </div>
      </div>
    </>
  )
}