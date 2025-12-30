import { TbBrandReact } from "react-icons/tb";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#2b2b2b] ">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          {/* Logo */}
          <a
            href=""
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <img
              src={assets.brand.logo1}
              className="w-12 h-auto rounded-xl "
              alt={assets.alt.text}
            />
            <span className="text-[#f7f6f2] self-center text-xl font-semibold whitespace-nowrap">
              Klein Tours
            </span>
          </a>

          {/* Links */}
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-[#f7f6f2]/88 sm:mb-0">
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-[#e4e2dc] sm:mx-auto lg:my-8" />

        <span className="block text-sm text-[#e4e2dc] sm:text-center">
          &copy;{new Date().getFullYear()}
          <a href="/" className="hover:underline">
            {""} Klein Transports & Tours™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
