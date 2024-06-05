// import {
//   useEditLayoutMutation,
//   useGetHeroDataQuery,
// } from "@/redux/features/layout/layoutApi";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../../../app/styles/style";

type Props = {};

const EditHero: FC<Props> = (props: Props) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  // const { data, refetch } = useGetHeroDataQuery("Banner", {
  //   refetchOnMountOrArgChange: true,
  // });
  // const [editLayout, { isLoading, isSuccess, error }] =
  // useEditLayoutMutation();

  return <div>EditHero</div>;
};

export default EditHero;
