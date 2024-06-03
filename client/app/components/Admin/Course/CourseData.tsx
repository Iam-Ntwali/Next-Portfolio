import React, { FC } from "react";
import { styles } from "../../../../app/styles/style";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast } from "react-hot-toast";

type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  prerequisites,
  setPrerequisites,
  active,
  setActive,
}) => {
  // Handle benefits
  const handleBenefitChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };

  // Add benefit
  const handleAddBenefit = () => {
    setBenefits([...benefits, { title: "" }]);
  };

  // Handle requirements
  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };

  // Add prerequisites
  const handleAddPrerequisites = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  // Prev page nav button
  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill in fields to continue!");
    }
  };
  return (
    <div className="w-[80%] m-auto mt-24 block">
      {/* Benefits */}
      <div>
        <label className={`${styles.label} text-[18px]`} htmlFor="Benefit">
          What will the student gets from this course (benefits) ?:
        </label>
        <br />
        {benefits.map((benefit: any, index: number) => (
          <input
            type="text"
            key={index}
            name="Benefit"
            id="Benefit"
            placeholder="Write something cool here 😇 ..."
            required
            className={`${styles.input} my-2`}
            value={benefit.title}
            onChange={(e) => handleBenefitChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          size={20}
          className="text-black dark:text-white"
          onClick={handleAddBenefit}
        />
      </div>

      {/* Prerequisites */}
      <div>
        <label className={`${styles.label} text-[18px]`} htmlFor="email">
          What are the prerequisites for starting this course?:
        </label>
        <br />
        {prerequisites.map((prerequisites: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisites"
            placeholder="Write the requirements for the course here..."
            required
            className={`${styles.input} my-2`}
            value={prerequisites.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
          />
        ))}
        <AiOutlinePlusCircle
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          size={20}
          className="text-black dark:text-white"
          onClick={handleAddPrerequisites}
        />
      </div>

      {/* Navigation buttons */}
      <div className="w-full flex items-center justify-between font-Poppins font-600">
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#f47400] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => prevButton()}
        >
          Prev.
        </div>
        <div
          className="w-full 800px:w-[180px] flex items-center justify-center h-[40px] bg-[#f47400] text-center text-[#fff] rounded mt-8 cursor-pointer"
          onClick={() => handleOptions()}
        >
          Next.
        </div>
      </div>
    </div>
  );
};
0;
export default CourseData;
