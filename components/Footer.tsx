import { BsCloudLightningRainFill } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-7xl lg:mx-auto p-5 md:px-10 xl:px-0 w-full flex flex-col sm:flex-row justify-between items-center">
        <BsCloudLightningRainFill size={40} />
        <p>2024. All rights reserved. &#169;</p>
      </div>
    </footer>
  );
};

export default Footer;
