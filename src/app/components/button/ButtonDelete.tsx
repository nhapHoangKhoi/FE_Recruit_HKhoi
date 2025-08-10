import { Toaster, toast } from 'sonner';

export const ButtonDelete = (props: {
  api: string,
  id: string,
  onDeleteSuccess: (id: string) => void
}) => {
  const { api, id, onDeleteSuccess } = props;

  const handleDelete = () => {
    const confirm = window.confirm("Remove this record? This action cannot be undone.");

    if(confirm) {
      fetch(api, {
        method: "DELETE",
        credentials: "include"
      })
        .then(res => res.json())
        .then(data => {
          if(data.code == "error") {
            toast.error(data.message);
          }

          if(data.code == "success") {
            toast.success(data.message);
            onDeleteSuccess(id);
          }
        })
    }
  }

  return (
    <>
      <Toaster richColors position="top-right" />

      <button onClick={handleDelete} className="bg-[#FF0000] rounded-[4px] font-[400] text-[14px] text-white inline-block py-[8px] px-[20px] cursor-pointer">
        Delete forever
      </button>
    </>
  )
}