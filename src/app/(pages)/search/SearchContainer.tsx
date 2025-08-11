/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { CardJobItem } from "@/app/components/card/CardJobItem"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export const SearchContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const language = searchParams.get("language") || "";
  const city = searchParams.get("city") || "";
  const company = searchParams.get("company") || "";
  const keyword = searchParams.get("keyword") || "";
  const level = searchParams.get("level") || "";
  const workingForm = searchParams.get("workingForm") || "";
  const [jobList, setJobList] = useState<any[]>([]);
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/search?language=${language}&city=${city}&company=${company}&keyword=${keyword}&level=${level}&workingForm=${workingForm}`)
      .then(res => res.json())
      .then(data => {
        if(data.code == "success") {
          setJobList(data.jobs);
        }
      })
  }, [language, city, company, keyword, level, workingForm]);

  const handleFilterLevel = (event: any) => {
    const value = event.target.value;
    const currentParams = new URLSearchParams(searchParams.toString());
    
    if(value) {
      currentParams.set("level", value);
    } 
    else {
      currentParams.delete("level");
    }

    router.push(`?${currentParams.toString()}`);
  }

  const handleFilterWorkingForm = (event: any) => {
    const value = event.target.value;
    const currentParams = new URLSearchParams(searchParams.toString());
    
    if(value) {
      currentParams.set("workingForm", value);
    } 
    else {
      currentParams.delete("workingForm");
    }

    router.push(`?${currentParams.toString()}`);
  }

  return (
    <>
      <div className="py-[60px]">
        <div className="container mx-auto px-[16px]">
          <h2 className="font-[700] text-[28px] text-[#121212] mb-[30px]">
            {jobList.length} Opening jobs for 
            <span className="text-[#0088FF]">
              {language} {city} {company} {keyword}
            </span>
          </h2>

          <div 
            className="bg-white rounded-[8px] py-[10px] px-[20px] mb-[30px] flex flex-wrap gap-[12px]"
            style={{
              boxShadow: "0px 4px 20px 0px #0000000F"
            }}
          >
            <select 
              onChange={handleFilterLevel}
              name="" 
              className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]"
              defaultValue={level}
            >
              <option value="">Job types</option>
              <option value="Intern">Intern</option>
              <option value="Fresher">Fresher</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="Manager">Manager</option>
            </select>
            <select 
              name="" 
              className="border border-[#DEDEDE] rounded-[20px] h-[36px] px-[18px] font-[400] text-[16px] text-[#414042]"
              onChange={handleFilterWorkingForm}
              defaultValue={workingForm}
            >
              <option value="">Workplace type</option>
              <option value="onsite">Onsite</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
            {jobList.map(item => (
              <CardJobItem key={item.id} item={item} />
            ))}
          </div>

          <div className="mt-[30px]">
            <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]">
              <option value="">Trang 1</option>
              <option value="">Trang 2</option>
              <option value="">Trang 3</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}