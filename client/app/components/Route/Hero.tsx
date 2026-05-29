import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { BiSearch } from "react-icons/bi";

type Props = {};

const Hero: FC<Props> = (props) => {
  return (
    <div className="w-full h-min-screen md:flex items-center p-[50px]">
      <div className="xxxlg:h-[700px] xxxlg:w-[700px] lg:h-[600px] lg:w-[600px] h-screen w-[50%] hero_animation rounded-full flex justify-center items-center ">
        <div className=" flex h-full w-full items-center justify-center  z-10 ">
          <Image
            src={require("@/public/assests/banner_1.png")}
            alt=""
            className="rounded-full object-contain lg:max-w-[90%] w-[90%] xxxlg:max-w-[85%] h-full z-[10] "
          />
        </div>
      </div>

        <div className=" md:w-[60%] w-[50%] flex flex-col items-center lg:mt-0 text-center lg:text-left mt-[150px] ">
          <h1 className="px-[65px] dark:text-white text-[#000000c7] text-[30px] px-2 lg:text-[60px] font-[600] font-Josefin py-2 lg:leading-[70px]  ">
            Improve Your Online Learning Experience Better Instantly
          </h1>
          <br />
          <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] xxxlg:!w-[55%] lg:!w-[78%] ">
            We have 40k+ Online courses & 500K+ Online register student. Find
            Your desired Course from them.
          </p>
          <br />
          <br />
          <div className="xxxlg:w-[55%] lg:w-[78%] w-[90%] h-[50px] bg-transparent relative ">
            <input
              type="search"
              placeholder="Search Courses...."
              className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none "
            />
            <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] ">
              <BiSearch className="text-white" size={30} />
            </div>
          </div>
          <br />
          <br />

          <div className="xxxlg:w-[55%] lg:w-[78%] w-[90%] flex items-center ">
            <Image
              src={require("@/public/assests/client_1.jpg")}
              alt="Client 1"
              className="rounded-full h-[50px] w-[50px] dark:border-white border-black border-3 -mr-2.5"
            />
            <Image
              src={require("@/public/assests/client_2.jpg")}
              alt="Client 2"
              className="rounded-full h-[50px] w-[50px] dark:border-white border-black border-3 -mx-2.5"
            />
            <Image
              src={require("@/public/assests/client_3.jpg")}
              alt="Client 3"
              className="rounded-full h-[50px] w-[50px] dark:border-white border-black border-3 -ml-2.5"
            />

            <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] lg:pl-3 text-[18px] font-[600] ">
              500K+ People already trusted us.{" "}
              <Link
                href="/courses"
                className="dark:text-[#46e256] text-[crimson] "
              >
                View Courses
              </Link>{" "}
            </p>
          </div>
        </div>
        <br />
    </div>
  );
};

export default Hero;
