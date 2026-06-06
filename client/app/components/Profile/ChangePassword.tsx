import { styles } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

type Props = {};

const ChangePassword = (props: Props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword, {isSuccess, error}] = useUpdatePasswordMutation()


  useEffect(() => {
    if(isSuccess){
        toast.success("Psssword Changed successfully")
    }

    if(error){
        if("data" in error){
            const errorData = error as any;
            toast.error(errorData.data.message)
        }
    }
  }, [isSuccess, error])

  const handleChangePassword = (e:any) => {
    e.preventDefault();
    if(oldPassword === "" || newPassword === "" || confirmPassword === ""){
        toast.error("please fill all the fields")
    }
  }
  return (
    <div className="w-full pl-7 px-2 sm:px-5 sm:pl-0 ">
      <h1 className="block text-[25px] sm:text-[30px] font-Poppins text-center font-500 text-black dark:text-white pb-2 ">
        Change Password
      </h1>
      <div className="w-full">
        <form 
        aria-required
        onSubmit={handleChangePassword}
        className="flex flex-col items-center  text-black dark:text-white">
          <div className="w-full sm:w-[60%] mt-5 ">
            <label className="block pb-2">Enter your old passwordz</label>
            <input
              type="password"
              className={`${styles.input} w-[95%]! mb-4 sm:mb-0 `}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-[60%] mt-2 ">
            <label className="block pb-2">Enter your new passwordz</label>
            <input
              type="password"
              className={`${styles.input} w-[95%]! mb-4 sm:mb-0 `}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-full sm:w-[60%] mt-2 ">
            <label className="block pb-2">Enter your confirm passwordz</label>
            <input
              type="password"
              className={`${styles.input} w-[95%]! mb-4 sm:mb-0 `}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <input
            className={`w-[95%] h-10 border border-[#37a39a] text-center text-black dark:text-white rounded-[3px] mt-8 cursor-pointer `}
            required
            value="Update"
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
