/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { EditorMCE } from "@/app/components/editor/EditorMCE"
import JustValidate from "just-validate";
import { useEffect, useRef, useState } from "react"

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
import { workingFormList } from "@/config/workingForm";

// Register plugin
registerPlugin(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export const FormEdit = (props: {
  id: string
}) => {
  const { id } = props;
  const editorRef = useRef<any>(null);
  const [isValid, setIsValid] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const [jobDetail, setJobDetail] = useState<any>();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/edit/${id}`, {
      credentials: "include", // send with cookie
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error") {
          toast.error(data.message);
        }

        if(data.code == "success") {
          setJobDetail(data.jobDetail);
        }
      })
  }, [])

  useEffect(() => {
    if(jobDetail) {
      if(jobDetail.images && jobDetail.images.length > 0) {
        const listImages = jobDetail.images.map((image: string) => {
          return {
            source: image
          };
        });

        setImages(listImages);
      }

      const validator = new JustValidate("#editForm");

      validator
        .addField('#title', [
          {
            rule: 'required',
            errorMessage: 'Job name is required!'
          },
        ])
        .addField('#salaryMin', [
          {
            rule: 'minNumber',
            value: 0,
            errorMessage: 'Salary must be >= 0'
          },
        ])
        .addField('#salaryMax', [
          {
            rule: 'minNumber',
            value: 0,
            errorMessage: 'Salary must be >= 0'
          },
        ])
        .onFail(() => {
          setIsValid(false);
        })
        .onSuccess(() => {
          setIsValid(true);
        });
    }
  }, [jobDetail]);

  const handleSubmit = (event: any) => {
    if(isValid) {
      const title = event.target.title.value;
      const salaryMin = event.target.salaryMin.value;
      const salaryMax = event.target.salaryMax.value;
      const level = event.target.level.value;
      const workingForm = event.target.workingForm.value;
      const technologies = event.target.technologies.value;

      let description = "";
      if (editorRef.current) {
        description = (editorRef.current as any).getContent();
      }

      // FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("salaryMin", salaryMin);
      formData.append("salaryMax", salaryMax);
      formData.append("level", level);
      formData.append("workingForm", workingForm);
      formData.append("technologies", technologies);
      formData.append("description", description);

      if(images.length > 0) {
        for(const image of images) {
          formData.append("images", image.file);
        }
      }

      fetch(`${process.env.NEXT_PUBLIC_API_URL}/company/job/edit/${id}`, {
        method: "PATCH",
        body: formData,
        credentials: "include", // send with cookie
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
      {jobDetail && (
        <form id="editForm" action="" onSubmit={handleSubmit} className="grid sm:grid-cols-2 grid-cols-1 gap-x-[20px] gap-y-[15px]">
          <div className="sm:col-span-2">
            <label htmlFor="title" className="block font-[500] text-[14px] text-black mb-[5px]">
              Job name *
            </label>
            <input 
              type="text" 
              name="title"
              defaultValue={jobDetail.title}
              id="title" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="salaryMin" className="block font-[500] text-[14px] text-black mb-[5px]">
              Min salary ($)
            </label>
            <input 
              type="number" 
              name="salaryMin" 
              defaultValue={jobDetail.salaryMin}
              id="salaryMin" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="salaryMax" className="block font-[500] text-[14px] text-black mb-[5px]">
              Max salary ($)
            </label>
            <input 
              type="number" 
              name="salaryMax" 
              defaultValue={jobDetail.salaryMax}
              id="salaryMax" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="">
            <label htmlFor="level" className="block font-[500] text-[14px] text-black mb-[5px]">
              Level *
            </label>
            <select 
              name="level" 
              defaultValue={jobDetail.level}
              id="level" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            >
              <option value="Intern">Intern</option>
              <option value="Fresher">Fresher</option>
              <option value="Junior">Junior</option>
              <option value="Middle">Middle</option>
              <option value="Senior">Senior</option>
              <option value="Manager">Manager</option>
            </select>
          </div>
          <div className="">
            <label htmlFor="workingForm" className="block font-[500] text-[14px] text-black mb-[5px]">
              Workspace type *
            </label>
            <select 
              name="workingForm" 
              defaultValue={jobDetail.workingForm}
              id="workingForm" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            >
              {workingFormList.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="technologies" className="block font-[500] text-[14px] text-black mb-[5px]">
              Technologies
            </label>
            <input 
              type="text" 
              name="technologies" 
              defaultValue={jobDetail.technologies.join(", ")}
              id="technologies" 
              className="w-[100%] h-[46px] border border-[#DEDEDE] rounded-[4px] py-[14px] px-[20px] font-[500] text-[14px] text-black"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="images" className="block font-[500] text-[14px] text-black mb-[5px]">
              Images
            </label>
            <FilePond
              name="images"
              allowMultiple={true}
              allowRemove={true}
              labelIdle="+"
              acceptedFileTypes={['image/*']} // needs to install FilePondPluginFileValidateType
              files={images} // show default images in this variable
              onupdatefiles={setImages}
              maxFiles={8}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block font-[500] text-[14px] text-black mb-[5px]">
              Description
            </label>
            <EditorMCE editorRef={editorRef} id="description" value={jobDetail.description} />
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