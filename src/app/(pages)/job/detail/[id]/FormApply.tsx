/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import JustValidate from "just-validate";
import { useEffect, useState } from "react"
import { Toaster, toast } from 'sonner';

export const FormApply = (props: {
  jobId: string
}) => {
  const { jobId } = props;
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validator = new JustValidate("#applyForm");

    validator
      .addField('#fullName', [
        {
          rule: 'required',
          errorMessage: 'Please fill out this field!'
        },
        {
          rule: 'minLength',
          value: 5,
          errorMessage: 'Please fill out at least 5 characters!'
        },
        {
          rule: 'maxLength',
          value: 50,
          errorMessage: 'This field must not exceed 50 characters!'
        },
      ])
      .addField('#email', [
        {
          rule: 'required',
          errorMessage: 'Please fill out this field!'
        },
        {
          rule: 'email',
          errorMessage: 'Email format is invalid!'
        },
      ])
      .addField('#phone', [
        {
          rule: 'required',
          errorMessage: 'Please fill out this field!'
        },
        {
          rule: 'customRegexp',
          value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
          errorMessage: 'Phone number format is invalid in Vietnam!'
        },
      ])
      .addField('#fileCV', [
        {
          rule: 'minFilesCount',
          value: 1,
          errorMessage: 'Please fill out this field!'
        },
        {
          rule: 'files',
          value: {
            files: {
              extensions: ['pdf'],
              maxSize: 5 * 1024 * 1024,
              minSize: 0,
              types: ['application/pdf'],
            },
          },
          errorMessage: 'We accept .pdf files up to 5MB!'
        },
      ])
      .onFail(() => {
        setIsValid(false);
      })
      .onSuccess(() => {
        setIsValid(true);
      });
  }, []);

  const handleSubmit = (event: any) => {
    if(isValid) {
      const fullName = event.target.fullName.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const fileCV = event.target.fileCV.files[0];

      // FormData
      const formData = new FormData();
      formData.append("jobId", jobId);
      formData.append("fullName", fullName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("fileCV", fileCV);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/apply`, {
        method: "POST",
        body: formData
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            toast.error(data.message);
          }

          if(data.code == "success") {
            toast.success(data.message);
            event.target.reset();
          }
        })
    }
  }

  return (
    <>
      <Toaster richColors position="top-right" />

      <div id="formApply" onSubmit={handleSubmit} className="border border-[#DEDEDE] rounded-[8px] p-[20px] mt-[20px]">
        <h2 className="font-[700] text-[20px] text-black mb-[20px]">
          Apply For This Job
        </h2>
        <form id="applyForm" action="" className="">
          <div className="mb-[15px]">
            <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
              Full name *
            </label>
            <input 
              type="text" 
              name="fullName" 
              id="fullName" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" 
            />
          </div>
          <div className="mb-[15px]">
            <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
              Email *
            </label>
            <input 
              type="email" 
              name="email" 
              id="email" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" 
            />
          </div>
          <div className="mb-[15px]">
            <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
              Phone number *
            </label>
            <input 
              type="text" 
              name="phone" 
              id="phone" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" 
            />
          </div>
          <div className="mb-[15px]">
            <label htmlFor="fileCV" className="block font-[500] text-[14px] text-black mb-[5px]">
              Your resume as PDF *
            </label>
            <input 
              type="file" 
              name="fileCV" 
              id="fileCV" 
              accept="application/pdf" 
              className="" 
            />
          </div>
          <button className="w-[100%] h-[48px] rounded-[4px] bg-[#0088FF] font-[700] text-[16px] text-white cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </>
  )
}