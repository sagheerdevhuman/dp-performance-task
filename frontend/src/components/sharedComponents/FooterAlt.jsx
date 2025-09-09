import React from "react";
import {ReportBug} from "./ReportBug"


const footerNavigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Programs", href: "/programs" },
    { name: "Events", href: "/events" },
    { name: "Videos", href: "/videos" },
    { name: "Resources", href: "/resources" },
    { name: "Partners", href: "/partners_page" },
    { name: "Terms", href:  "https://www.theknowledgehouse.org/terms_of_use/" },
    { name: "Privacy", href: "https://www.theknowledgehouse.org/privacy_policy/" },
  ],
  social: [
    {
      name: "Instagram",
      href: "https://www.instagram.com/theknowledgehouse/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/school/theknowledgehouse/people/",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};


function Footer() {
  return (
  
    <footer className="bg-tkh-brand-black-1 pb-8">
      <div className="flex flex-col justify-center items-center mt-8  pt-8 max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <img className="mb-8 h-16 w-auto" src="https://dz55dwgyhzv2a.cloudfront.net/DP%20Digital%20Pipeline%20white.png" />
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          {footerNavigation.main.map((item) => (
            <div key={item.name} className="px-5 py-6">
              <a
                href={item.href}
                className="text-base font-light text-tkh-grayscale-0 hover:text-tkh-brand-gold-4"
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <img className="mb-3 mt-8  w-auto" src="https://bxtp-static.s3.amazonaws.com/img/1A.Full.+1.svg" />
        <div className="mt-8 mb-8 flex justify-center space-x-6">
          {footerNavigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-tkh-grayscale-0 hover:text-tkh-brand-gold-4"
            >
              <span className="sr-only">{item.name}</span>
              <item.icon className="h-6 w-6" aria-hidden="true" />
            </a>
          ))}
        </div>
      
      </div>
      <ReportBug/>
    </footer>
  
  );
}

export default Footer;
