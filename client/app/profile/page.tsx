"use client"
import React, { useEffect, useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile"
import { useSelector } from "react-redux";

type Props = {};

const page = (props: Props) => {
  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(5);
  const [route, setRoute] = useState("Login");
  const { user } = useSelector((state:any) => state.auth)

  useEffect(() => {
  document.title = user?.name ? `${user.name} Profile` : "Profile";
}, [user]);
  
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} Profile`}
          description="ELearning is a platform for students to learn and get help from the Teachers"
          keywords="Programming,MERN,Redux,Machine Learning"
        />
        <Header
          open={open}
          setOpen={setOpen}
          activeItem={activeItem}
          setRoute={setRoute}
          route={route}
        />

        <Profile user={user}></Profile>
      </Protected>
    </div>
  );
};

export default page;
