import React from "react";

const Gmail = ({ marginBottom }) => {
  return (
    <div className={`w-8 h-8 ${marginBottom}`}>
        <a
            href="https://parthganeriwala.com/parth_resume.pdf"
            target="_blank"
            rel="noreferrer"
        >
            <svg
              className="dark:text-white text-dark transition-all duration-300 ease-in-out transform translate-y-0 dark:opacity-50 fill-current dark:hover:opacity-100 hover:-translate-y-1"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
            >

              <path d="M 13.4 10.1 V 5 H 5.9 C 5.4013 5 5 5.4013 5 5.9 v 17.4 c 0 0.4988 0.4012 0.9 0.9 0.9 h 12.6 c 0.4988 0 0.9 -0.4012 0.9 -0.9 V 11 H 14.3 c -0.495 0 -0.9 -0.405 -0.9 -0.9 Z m 2.8669 7.926 l -3.6158 3.5888 c -0.2494 0.2479 -0.6521 0.2479 -0.9015 0 l -3.6158 -3.5888 C 7.7533 17.6484 8.0203 17 8.5557 17 H 11 v -3 c 0 -0.3315 0.2685 -0.6 0.6 -0.6 h 1.2 c 0.3315 0 0.6 0.2685 0.6 0.6 v 3 h 2.4443 c 0.5355 0 0.8025 0.6484 0.4226 1.026 Z M 19.1375 8.9375 L 15.4663 5.2625 c -0.1688 -0.1688 -0.3975 -0.2625 -0.6375 -0.2625 H 14.6 v 4.8 h 4.8 v -0.2288 c 0 -0.2363 -0.0938 -0.465 -0.2625 -0.6338 Z" />
            </svg>

        </a>
    </div>
  );
};



export default Gmail;
