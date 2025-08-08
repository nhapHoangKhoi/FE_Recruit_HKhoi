/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useAuth } from "@/hooks/useAuth"
import JustValidate from "just-validate";
import { useEffect, useState } from "react";

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
// --- accepted file type
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
// --- End accepted file type
// --- image preview with filepond
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// --- End image preview with filepond
import { Toaster, toast } from 'sonner';

// Register plugin
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export const FormProfile = () => {
  const { infoCompany } = useAuth();
  const [logos, setLogos] = useState<any[]>([]);
  const [cityList, setCityList] = useState<any[]>([]);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/city/list`)
      .then(res => res.json())
      .then(data => {
        setCityList(data.cityList);
      })
  }, []);

  useEffect(() => {
    if(infoCompany) {
      if(infoCompany.logo) {
        setLogos([
          {
            source: infoCompany.logo
          }
        ]);
      }

      const validator = new JustValidate("#profileForm");

      validator
        .addField('#companyName', [
          {
            rule: 'required',
            errorMessage: 'Company name is required!'
          },
          {
            rule: 'maxLength',
            value: 200,
            errorMessage: 'Company name must not exceed 200 characters!',
          },
        ])
        .addField('#email', [
          {
            rule: 'required',
            errorMessage: 'Email is required!',
          },
          {
            rule: 'email',
            errorMessage: 'Invalid email format!',
          },
        ])
        .onFail(() => {
          setIsValid(false);
        })
        .onSuccess(() => {
          setIsValid(true);
        });
    }
  }, [infoCompany]);

  const handleSubmit = (event: any) => {
    if(isValid) {
      const companyName = event.target.companyName.value;
      const city = event.target.city.value;
      const address = event.target.address.value;
      const companyModel = event.target.companyModel.value;
      const companyEmployees = event.target.companyEmployees.value;
      const workingTime = event.target.workingTime.value;
      const workOvertime = event.target.workOvertime.value;
      const email = event.target.email.value;
      const phone = event.target.phone.value;
      const description = event.target.description.value;

      let logo = null;
      if(logos.length > 0) {
        logo = logos[0].file;
      }

      // FormData
      const formData = new FormData();
      formData.append("companyName", companyName);
      formData.append("city", city);
      formData.append("address", address);
      formData.append("companyModel", companyModel);
      formData.append("companyEmployees", companyEmployees);
      formData.append("workingTime", workingTime);
      formData.append("workOvertime", workOvertime);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("description", description);
      formData.append("logo", logo);

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/profile`, {
        method: "PATCH",
        body: formData,
        credentials: "include" // send with cookie
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            toast.error(data.message);
          }

          if(data.code == "success") {
            toast.success(data.message);
          }
        })
    }
  }

  return (
    <>
      <Toaster richColors position="top-right" />

      {infoCompany && (
        <form id="profileForm" action="" onSubmit={handleSubmit} className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
          <div className="sm:col-span-2">
            <label htmlFor="companyName" className="block font-[500] text-[14px] text-black mb-[5px]">
              Company name *
            </label>
            <input 
              type="text" 
              name="companyName" 
              defaultValue={infoCompany.companyName}
              id="companyName" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black" 
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="logo" className="block font-[500] text-[14px] text-black mb-[5px]">
              Logo
            </label>
            <FilePond
              name="logo"
              allowMultiple={false}
              allowRemove={true}
              labelIdle="+"
              acceptedFileTypes={['image/*']} // needs to install FilePondPluginFileValidateType
              files={logos} // show default images in this variable
              onupdatefiles={setLogos}
            />
          </div>
          <div className="">
            <label htmlFor="city" className="block font-[500] text-[14px] text-black mb-[5px]">
              Locations
            </label>
            <select 
              name="city" 
              defaultValue={infoCompany.city}
              id="city" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            >
              {cityList.map(item => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="">
            <label htmlFor="address" className="block font-[500] text-[14px] text-black mb-[5px]">
              Address
            </label>
            <input 
              type="text" 
              name="address" 
              defaultValue={infoCompany.address}
              id="address" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="companyModel" className="block font-[500] text-[14px] text-black mb-[5px]">
              Company model
            </label>
            <input 
              type="text" 
              name="companyModel" 
              defaultValue={infoCompany.companyModel}
              id="companyModel" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="companyEmployees" className="block font-[500] text-[14px] text-black mb-[5px]">
              Employees
            </label>
            <input 
              type="text" 
              name="companyEmployees" 
              defaultValue={infoCompany.companyEmployees}
              id="companyEmployees" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="workingTime" className="block font-[500] text-[14px] text-black mb-[5px]">
              Working hour
            </label>
            <input 
              type="text" 
              name="workingTime" 
              defaultValue={infoCompany.workingTime}
              id="workingTime" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="workOvertime" className="block font-[500] text-[14px] text-black mb-[5px]">
              Overtime
            </label>
            <input 
              type="text" 
              name="workOvertime" 
              defaultValue={infoCompany.workOvertime}
              id="workOvertime" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
              Email *
            </label>
            <input 
              type="email" 
              name="email" 
              defaultValue={infoCompany.email}
              id="email" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="phone" className="block font-[500] text-[14px] text-black mb-[5px]">
              Phone number
            </label>
            <input 
              type="text" 
              name="phone" 
              defaultValue={infoCompany.phone}
              id="phone" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
              Description
            </label>
            <textarea 
              name="description" 
              defaultValue={infoCompany.description}
              id="description" 
              className="w-[100%] h-[350px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            ></textarea>
          </div>
          <div className="sm:col-span-2">
            <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white cursor-pointer">
              Update information
            </button>
          </div>
        </form>
      )}
    </>
  )
}