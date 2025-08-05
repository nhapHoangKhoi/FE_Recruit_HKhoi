import { useAuth } from "@/hooks/useAuth"
import Link from "next/link"
import { useRouter } from "next/navigation";

export const HeaderAccount = () => {
  const { isLogin, infoUser } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      credentials: "include" // send with cookie
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "success") {
          router.push("/user/login");
        }
      })
  }

  return (
    <>
      <div className="inline-flex items-center gap-x-[5px] text-white font-[600] sm:text-[16px] text-[12px] relative group/sub-1">
        {isLogin ? (
          <>
            {/* Login successfully */}
            <Link href="#" className="">
              {infoUser.fullName}
            </Link>
            <ul className="absolute top-[100%] right-[0px] w-[200px] bg-[#000065] hidden group-hover/sub-1:block">
              <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                <Link href="" className="text-white font-[600] text-[16px]">
                  Your profile
                </Link>
              </li>
              <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2">
                <Link href="" className="text-white font-[600] text-[16px]">
                  Your sent resume
                </Link>
              </li>
              <li className="py-[10px] px-[16px] rounded-[4px] flex items-center justify-between hover:bg-[#000096] relative group/sub-2 cursor-pointer" onClick={handleLogout}>
                Logout
              </li>
            </ul>
          </>
        ) : (
          <>
            {/* Not login yet */}
            <Link href="/user/login" className="">
              Login
            </Link>
            <span className="">/</span>
            <Link href="/user/register" className="">
              Register
            </Link>
          </>
        )}
      </div>
    </>
  )
}