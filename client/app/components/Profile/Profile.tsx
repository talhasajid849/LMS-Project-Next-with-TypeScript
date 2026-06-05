"use client";
import React, { FC, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import ProfileInfo from "./ProfileInfo";

type Props = {
  user: any;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 85) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    });
  }
  return (
    <div className="w-[85%] flex mx-auto">
      <div
        className={`w-[60%] sm:w-[310px] h-[450px]
           dark:bg-slate-900 bg-white bg-opacity-90 border 
           border-[#0000001b] dark:border-[#ffffff1d] rounded-[5px] 
           shadow-sm mt-20 mb-20 sticky ${
             scroll ? "top-[120px]" : "top-[30px] "
           } left-[30px]`}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logOutHandler={logOutHandler}
        />
      </div>

      {active === 1 && 
      <div className="w-full h-full bg-transparent mt-20 "><ProfileInfo 
      user={user}
      avatar={user?.avatar}
      /></div>
      }
    </div>
  );
};

export default Profile;
