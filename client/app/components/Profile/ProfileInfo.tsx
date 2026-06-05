import React, { FC, useEffect, useState } from "react";
import avatarDefault from "../../../public/assests/avatar.png";
import Image from "next/image";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "@/app/styles/style";
import { useUpdateAvatarMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { getAvatarSrc } from "@/app/utils/getAvatarSrc";

type Props = {
  avatar: string | null;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const imageHandler = async (e: any) => {
    const fielRead = new FileReader();

    fielRead.onload = () => {
      if (fielRead.readyState == 2) {
        const avatar = fielRead.result;
        updateAvatar(avatar);
      }
    };
    fielRead.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (isSuccess) {
      setLoadUser(true);
    }
    if (error) {
      console.log(error);
    }
  }, [isSuccess, error]);

  const handleSubmit = async (e: any) => {
    console.log("dsdd");
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          <Image
            src={getAvatarSrc(user?.avatar || avatar, avatarDefault)}
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full "
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/jpeg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer ">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 sm:mb-0">
        <form onSubmit={handleSubmit}>
          <div className="sm:w-[50%] m-auto block pb-4 ">
            <div className="w-full ">
              <label className="block pb-1">Full Name</label>
              <input
                type="text"
                className={`${styles.input} w-[95%]! mb-4 sm:mb-0 `}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full pt-2">
              <label className="block pb-1">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} w-[95%]! mb-4 sm:mb-0 `}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-full sm:w-[250px] h-10 border border-[#37a39a] text-center dark:text-white text-black rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default ProfileInfo;
