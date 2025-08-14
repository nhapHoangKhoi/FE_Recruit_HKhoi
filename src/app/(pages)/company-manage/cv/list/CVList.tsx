/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react"
import { CVItem } from "./CVItem"

export const CVList = () => {
  const [listCVs, setListCVs] = useState<any[]>([]);
  const [count, setCount] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/resume/list`, {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "success") {
          setListCVs(data.listResumes);
        }
      })
  }, []);

  // remove item on UI immediately
  const handleDeleteSuccess = (deleteId: string) => {
    // setListCVs(prev => prev.filter(cv => cv.id !== deleteId));
    setCount(!count);
  }

  return (
    <>
      <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[20px]">
        {listCVs.map(item => (
          <CVItem 
            key={item.id} 
            item={item}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ))}
      </div>

      <div className="mt-[30px]">
        <select name="" className="border border-[#DEDEDE] rounded-[8px] py-[12px] px-[18px] font-[400] text-[16px] text-[#414042]">
          <option value="">Not yet Page 1</option>
          <option value="">Not yet Page 2</option>
          <option value="">Not yet Page 3</option>
        </select>
      </div>
    </>
  )
}