"use client";
import { FileChangeInfo } from "fs/promises";
import React, { FC, useState } from "react";
import Heading from "./utils/Heading";

interface Props {}

const Page: FC<Props> = (prop) => {
  return (
    <div>
      <Heading
        title="IBTC E-Learning System App"
        description="Welcome to the IBTC Online Learning System Platform"
        keywords="film making, photography, graphics design, software development"
      />
    </div>
  );
};

export default Page;
