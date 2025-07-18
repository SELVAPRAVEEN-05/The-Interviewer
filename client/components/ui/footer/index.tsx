import { FaFacebookF, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";

const pages = [
  "Home",
  "About",
  "Menu",
  "Pricing",
  "Blog",
  "Contact",
  "Delivery",
];

const utilityPages = [
  "Start Here",
  "Styleguide",
  "Password Protected",
  "404 Not Found",
  "Licenses",
  "Changelog",
  "View More",
];


const instagramImages = [
  "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
  "https://cdn.bhdw.net/im/stack-of-pancakes-top-with-fruits-and-maple-syrup-in-a-plate-wallpaper-60497_w635.webp",
  "https://upload.wikimedia.org/wikipedia/commons/2/2e/Ice_cream_with_whipped_cream%2C_chocolate_syrup%2C_and_a_wafer_%28cropped%29.jpg",
  "https://www.foodiesfeed.com/wp-content/uploads/2023/06/burger-with-melted-cheese.jpg",
];

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12 lg:px-[5rem] xl:px-[7.5rem]">
      <div className="flex flex-col md:flex-row justify-between">
        {/* Logo and Description */}
        <div className="mb-6 md:mb-0">
          <p className="text-sm text-gray-300 w-[250px] my-16">
            In the new era of technology, we look into the future with certainty
            and pride for our company.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-white hover:text-red-500 transition duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="text-white hover:text-blue-600 transition duration-300"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="#"
              className="text-white hover:text-pink-500 transition duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="text-white hover:text-gray-500 transition duration-300"
            >
              <FaGithub size={24} />
            </a>
          </div>
        </div>

        {/* Pages */}
        <div className="mb-6">
          <h3 className="font-bold mb-6">Pages</h3>
          <ul className="space-y-3">
            {pages.map((page) => (
              <li key={page}>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Utility Pages */}
        <div className="mb-6">
          <h3 className="font-bold mb-6">Utility Pages</h3>
          <ul className="space-y-3">
            {utilityPages.map((page) => (
              <li key={page}>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition duration-300"
                >
                  {page}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Instagram Feed */}
        <div className="xl:w-1/4 lg:w-[30%]">
          <h3 className="font-bold mb-4">Follow Us On Instagram</h3>
          <div className="grid grid-cols-2 gap-3">
            {instagramImages.map((src, index) => (
              <img
                key={index}
                src={src}
                className="w-full h-[8rem] object-cover rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center mt-16 pt-10 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          Copyright © 2023 Hashtag Developer. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};
