import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div className="text-black dark:text-white py-10 px-5">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        Platform Terms and Condition
      </h1>
      <div className="w-[85%] 800px:w-[75%] m-auto px-10">
        <p className="font-Poppins text-[16px] font-[100]">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere
          blanditiis architecto quasi impedit in dicta nisi, asperiores
          voluptatum eos alias facilis assumenda ex beatae, culpa dignissimos
          accusantium quod numquam dolores! Lorem ipsum dolor sit amet,
          consectetur adipisicing elit. Facere blanditiis architecto quasi
          impedit in dicta nisi, asperiores voluptatum eos alias facilis
          assumenda ex beatae, culpa dignissimos accusantium quod numquam
          dolores!
        </p>
        <br />
      </div>
    </div>
  );
};

export default Policy;
