/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
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
  const { infoUser } = useAuth();
  const [avatars, setAvatars] = useState<any>([]);

  useEffect(() => {
    if(infoUser) {
      if(infoUser.avatar) {
        setAvatars([
          {
            source: infoUser.avatar
          }
        ]);
      }

      const validator = new JustValidate("#profileForm");

      validator
        .addField('#fullName', [
          {
            rule: 'required',
            errorMessage: 'Full name is required!'
          },
          {
            rule: 'minLength',
            value: 5,
            errorMessage: 'Full name must be at least 5 characters long!',
          },
          {
            rule: 'maxLength',
            value: 50,
            errorMessage: 'Full name must not exceed 50 characters!',
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
    }
  }, [infoUser]);

  const handleSubmit = (event: any) => {
    const fullName = event.target.fullName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    let avatar = null;
    if(avatars.length > 0) {
      avatar = avatars[0].file;
    }

    // FormData
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("avatar", avatar);

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/profile`, {
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

  return (
    <>
      <Toaster richColors position="top-right" />

      {infoUser && (
        <form id="profileForm" onSubmit={handleSubmit} action="" className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
          <div className="sm:col-span-2">
            <label htmlFor="fullName" className="block font-[500] text-[14px] text-black mb-[5px]">
              Full name *
            </label>
            <input 
              type="text" 
              name="fullName" 
              defaultValue={infoUser.fullName}
              id="fullName" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="avatar" className="block font-[500] text-[14px] text-black mb-[5px]">
              Avatar
            </label>
            <FilePond
              name="avatar"
              allowMultiple={false}
              allowRemove={true}
              labelIdle="+"
              acceptedFileTypes={['image/*']} // needs to install FilePondPluginFileValidateType
              files={avatars} // show default images
              onupdatefiles={setAvatars}
            />
          </div>
          <div className="">
            <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
              Email *
            </label>
            <input 
              type="email" 
              name="email" 
              defaultValue={infoUser.email}
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
              defaultValue={infoUser.phone}
              id="phone" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <button className="bg-[#0088FF] rounded-[4px] h-[48px] px-[20px] font-[700] text-[16px] text-white cursor-pointer">
              Update profile
            </button>
          </div>
        </form>
      )}
    </>
  )
}