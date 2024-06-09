"use client";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";
import Loader from "../../../app/components/Loader/Loader";
import CourseContent from "../../../app/components/Course/CourseContent";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";

type Props = {
  params: any;
};

const Page = ({ params }: Props) => {
  const id = params.id;
  const { isLoading, error, data, refetch } = useLoadUserQuery(undefined, {});

  useEffect(() => {
    if (data) {
      const isPurchased = data.user.courses.find(
        (item: any) => item._id === id
      );
      if (!isPurchased) {
        redirect("/");
      }
    }
    if (error) {
      redirect("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <CourseContent id={id} user={data.user} />
        </div>
      )}
    </>
  );
};

export default Page;
