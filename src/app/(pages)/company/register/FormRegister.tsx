/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import JustValidate from "just-validate";
import { useRouter } from "next/navigation";

export const FormRegister = () => {
  const router = useRouter();

  useEffect(() => {
    const validator = new JustValidate("#registerForm");

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
        const companyName = event.target.companyName.value;
        const email = event.target.email.value;
        const password = event.target.password.value;

        const dataFinal = {
          companyName: companyName,
          email: email,
          password: password
        };
  
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataFinal),
        })
          .then(res => res.json())
          .then(data => {
            if(data.code == "error") {
              alert(data.message);
            }
  
            if(data.code == "success") {
              router.push("/company/login");
            }
          })
      });
  }, []);

  return (
    <>
      <form id="registerForm" action="" className="grid grid-cols-1 gap-y-[15px]">
        <div className="">
          <label htmlFor="companyName" className="block font-[500] text-[14px] text-black mb-[5px]">
            Company name *
          </label>
          <input 
            type="text" 
            name="" 
            id="companyName" 
            className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
          />
        </div>
        <div className="">
          <label htmlFor="email" className="block font-[500] text-[14px] text-black mb-[5px]">
            Email *
          </label>
          <input 
            type="email" 
            name="" 
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
            name="" 
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