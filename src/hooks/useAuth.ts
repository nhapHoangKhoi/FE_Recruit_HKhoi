/* eslint-disable @typescript-eslint/no-explicit-any */
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useAuth = () => {
  console.log("Chay vao day")
  const [isLogin, setIsLogin] = useState(false);
  const [infoUser, setInfoUser] = useState<any>(null);
  
  const pathname = usePathname();
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/check`, {
      credentials: "include" // send with token
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == "error") {
          setIsLogin(false);
        }

        if(data.code == "success") {
          setIsLogin(true);
          setInfoUser(data.infoUser);
        }
      })
  }, [pathname]);

  return {
    isLogin: isLogin,
    infoUser: infoUser
  };
}