/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import JustValidate from "just-validate";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const FormRegister = () => {
  const router = useRouter();

  useEffect(() => {
    const validator = new JustValidate("#registerForm");

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
      .addField('#password', [
        {
          rule: 'required',
          errorMessage: 'Password is required!',
        },
        {
          validator: (value: string) => value.length >= 8,
          errorMessage: 'Password must be at least 8 characters long!',
        },
        {
          validator: (value: string) => /[A-Z]/.test(value),
          errorMessage: 'Password must contain at least one uppercase letter!',
        },
        {
          validator: (value: string) => /[a-z]/.test(value),
          errorMessage: 'Password must contain at least one lowercase letter!',
        },
        {
          validator: (value: string) => /\d/.test(value),
          errorMessage: 'Password must contain at least one number!',
        },
        {
          validator: (value: string) => /[@$!%*?&]/.test(value),
          errorMessage: 'Password must contain at least one special character!',
        },
      ])
      .onSuccess((event: any) => {
        const fullName = event.target.fullName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        const dataFinal = {
          fullName: fullName,
          email: email,
          password: password
        };

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dataFinal)
        })
          .then(res => res.json())
          .then((data: any) => {
            if(data.code == "error") {
              alert(data.message);
            }

            if(data.code == "success") {
              // console.log(data);
              router.push("/user/login");
            }
          })
      });
  }, []);

  return (
    <>
      <form id="registerForm" action="" className="grid grid-cols-1 gap-y-[15px]">
        <div className="">
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
        <div className="">
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
        <div className="">
          <label htmlFor="password" className="block font-[500] text-[14px] text-black mb-[5px]">
            Password *
          </label>
          <input 
            type="password" 
            name="password" 
            id="password" 
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <button className="bg-[#0088FF] rounded-[4px] w-[100%] h-[48px] px-[20px] font-[700] text-[16px] text-white cursor-pointer">
            Sign up
          </button>
        </div>
      </form>
    </>
  )
}
