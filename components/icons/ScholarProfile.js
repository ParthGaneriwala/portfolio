import React from "react";
import { SiGooglescholar } from "react-icons/si";

const ScholarProfile = ({ marginBottom }) => {
  return (
    <div className={`w-8 h-8 ${marginBottom}`}>
      <a
        href="https://scholar.google.com/citations?user=aG73xF8AAAAJ&hl=en&oi=ao"
        target="_blank"
        rel="noreferrer"
        aria-label="Google Scholar profile"
      >
        <SiGooglescholar
          aria-hidden="true"
          size={32}
          className="dark:text-white text-dark transition-all duration-300 ease-in-out transform translate-y-0 dark:opacity-50 fill-current hover:opacity-100 dark:hover:opacity-100 hover:-translate-y-1"
        />
      </a>
    </div>
  );
};

export default ScholarProfile;
