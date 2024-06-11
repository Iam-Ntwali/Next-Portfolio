import React from "react";
import { styles } from "../styles/style";

const About = () => {
  return (
    <div className="text-black dark:text-white py-10 px-5">
      <br />
      <h1 className={`${styles.title} 800px:!text-[45px]`}>
        Welcome to <span className="text-gradient">IBTC Film School</span>
      </h1>

      <br />
      <div className="w-[85%] 800px:w-[75%] m-auto px-10">
        <p className="font-Poppins text-[16px] font-[100]">
          Are you passionate about filmmaking? Look no further than IBTC Film
          School, the premier film community dedicated to helping aspiring
          filmmakers achieve their dreams and reach their full potential.
          <br />
          <br />
          As the founder and CEO of IBTC Film School, I know firsthand the
          challenges that come with learning and growing in the film industry.
          That &apos;s why I created IBTC Film School &apos;to provide aspiring
          filmmakers with the resources and support they need to succeed.
          <br />
          <br />
          Our YouTube channel is a treasure trove of informative videos on
          everything from film basics to advanced techniques. But that&apos;s
          just the beginning. Our comprehensive courses are designed to give you
          the high-quality education you need to succeed in the industry,
          without breaking the bank.
          <br />
          <br />
          At IBTC Film School, we believe that price should never be a barrier
          to achieving your dreams. That&apos;s why our courses are priced
          affordably – so that anyone, regardless of their financial situation,
          can access the tools and knowledge they need to succeed.
          <br />
          <br />
          But IBTC Film School is more than just a community – we&apos;re a
          family. Our supportive community of like-minded individuals is here to
          help you every step of the way, whether you&apos;re just starting out
          or looking to take your skills to the next level.
          <br />
          <br />
          With IBTC Film School by your side, there&apos;s nothing standing
          between you and your dream career in filmmaking. Our courses and
          community will provide you with the guidance, support, and motivation
          you need to unleash your full potential and become a skilled
          filmmaker.
          <br />
          <br />
          So what are you waiting for? Join the IBTC Film School family today
          and let&apos;s conquer the film industry together! With our affordable
          courses, informative videos, and supportive community, the sky&apos;s
          the limit.
        </p>
        <br />
        <span className="text-[22px]">Manager Claude</span>
        <h5 className="text-[18px] font-Poppins">
          Founder and CEO of IBTC Film School
        </h5>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default About;
