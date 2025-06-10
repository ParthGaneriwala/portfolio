import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ReactTypingEffect from "react-typing-effect";
import Icon from "../components/Icon";
// Icons
import { FaJava } from "react-icons/fa";
import Html from "../components/icons/Html";
import Css from "../components/icons/Css";
import Javascript from "../components/icons/Javascript";
import Tailwind from "../components/icons/Tailwind";
import Bootstrap from "../components/icons/Bootstrap";
import Sass from "../components/icons/Sass";
import ReactJs from "../components/icons/ReactJs";
import NextJs from "../components/icons/NextJs";
import NodeJs from "../components/icons/NodeJs";
import Firebase from "../components/icons/Firebase";
import Photoshop from "../components/icons/Photoshop";
import Supabase from "../components/icons/Jupyter";
import MongoDb from "../components/icons/MongoDb";
import Express from "../components/icons/Express";
// Project Card
import ProjectCard from "../components/ProjectCard";
import GitHubProfile from "../components/icons/GitHubProfile";
import Gmail from "../components/icons/Gmail";
import LinkedInProfile from "../components/icons/LinkedInProfile";
import FeaturedProjectCard from "../components/FeaturedProjectCard";

// Dark Mode
import { useTheme } from "next-themes";

import NewIcon from "../components/NewIcon";
import Java from "../components/icons/Java";
import Python from "../components/icons/Python";
import Tensorflow from "../components/icons/Tensorflow";
import MySQL from "../components/icons/MySQL";
import Jupyter from "../components/icons/Jupyter";
import Numpy from "../components/icons/Numpy";
import Neo4j from "../components/icons/Neo4j";
import OpenCV from "../components/icons/OpenCV";
import Linux from "../components/icons/Linux";
import Scrum from "../components/icons/Scrum";
import Android from "../components/icons/Android";
import Git from "../components/icons/Git";
import {SiApache, SiPandas} from "react-icons/si";
import Pandas from "../components/icons/Pandas";
import Dask from "../components/icons/Dask";
import Cuda from "../components/icons/Cuda";
import GPT from "../components/icons/GPT";
import ROS from "../components/icons/ROS";
import C from "../components/icons/C";
import Pytorch from "../components/icons/Pytorch";
import Bash from "../components/icons/Bash";
import Gitlab from "../components/icons/Gitlab";

const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Home({ publications }) {
  const [visibleSection, setVisibleSection] = useState();
  const [scrolling, setScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const handleResize = () => {
    if (window.innerWidth < 1024) {
    } else {
      setNavbarOpen(false);
    }
  };

  const headerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const myWorkRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      { section: "home", ref: homeRef, id: 1 },
      { section: "about", ref: aboutRef, id: 2 },
      { section: "skills", ref: skillsRef, id: 3 },
      { section: "my-work", ref: myWorkRef, id: 4 },
      { section: "contact", ref: contactRef, id: 5 },
    ];

    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
        // console.log(visibleSection);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  // Handle Header Scroll Away
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    let timeoutId;

    const handleScrollBack = () => {
      const currentScrollPos = window.pageYOffset;

      // Delay before the header scrolls back into view
      if (currentScrollPos < scrollPosition - 50 && scrolling) {
        timeoutId = setTimeout(() => {
          setShowHeader(true);
        }, 250);
      }

      // Add an easing effect when the header scrolls into and out of view
      if (currentScrollPos > prevScrollPos + 10 && !scrolling && showHeader) {
        setScrolling(true);
      } else if (currentScrollPos < prevScrollPos - 10 && scrolling) {
        clearTimeout(timeoutId);
        setScrolling(false);
        setTimeout(() => {
          setShowHeader(false);
        }, 250);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScrollBack);
    return () => window.removeEventListener("scroll", handleScrollBack);
  }, [scrollPosition, scrolling, showHeader]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setScrolling(window.pageYOffset > 110)
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
  }, [currentTheme]);

  const renderThemeChanger = () => {
    if (!mounted) return null;
    console.log(currentTheme);
    if (currentTheme === "dark") {
      return (
        <svg
          className="w-6 h-6 transition-all duration-150 ease-in-out dark:flex dark:opacity-50 dark:group-hover:opacity-100 dark:text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-6 h-6 transition-all duration-150 ease-in-out flex opacity-50 group-hover:opacity-100 text-dark"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-darker transition-all duration-150 ease-in-out">
      <div
        className={`relative w-full dark:bg-darker bg-light bg-opacity-10 overflow-auto min-h-screen transition-all duration-150 ease-in-out ${
          navbarOpen ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        <Head>
          <title>Parth Ganeriwala | PhD Research Professional</title>
          <meta
            name="description"
            content="The portfolio of PhD researcher, Parth Ganeriwala"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Full-screen Menu */}
        <div
          className={`fixed w-full z-50 h-screen pt-24 bg-white dark:bg-darker bg-opacity-100 transform delay-100 transition-all duration-150 ${
            navbarOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="container relative mx-auto">
            <nav className="block ml-auto">
              <ul className="z-50 flex flex-col items-start">
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "home"
                        ? "selected delay-200"
                        : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(homeRef.current);
                    }}
                  >
                    Home
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "about"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(aboutRef.current);
                    }}
                  >
                    About
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "skills"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(skillsRef.current);
                    }}
                  >
                    Skills
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "my-work"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid  hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    My Work
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "contact"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(contactRef.current);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li className="z-40 block py-2 mt-6 list-none lg:inline-block">
                  <a
                    href={`mailto:ganeriwalaparth@gmail.com`}
                    className="text-lg btn-brand btn-lg group"
                  >
                    Get in touch
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Header and Nav */}
        <header
          ref={headerRef}
          className={`header top-0 mx-auto flex items-center z-50 fixed w-full transition-all duration-150 h-20 ease-in-out ${
            scrolling ? "-translate-y-full" : ""
          } ${scrolling && !navbarOpen ? "dark:bg-darker" : "dark:bg-darker"}`}
        >
          {/* Logo and Nav container */}
          <div className="container relative flex items-center mx-auto">
            {/* Logo */}
            <div className="z-50 sm:w-10 sm:h-10 w-11 h-11 flex items-center">
              <NewIcon />
            </div>
            {/* Text */}
            <div className="flex items-center ml-4">
              <p className="text-lg font-semibold font-display tracking-tight dark:text-white text-darker mb-0 transition-all duration-150 ease-in-out">
                Parth Ganeriwala
              </p>
            </div>
            {/* Nav */}
            <nav className="block ml-auto h-full">
              <ul className="z-50 flex items-center">
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "home" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(homeRef.current);
                    }}
                  >
                    Home
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "about" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(aboutRef.current);
                    }}
                  >
                    About
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "skills" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(skillsRef.current);
                    }}
                  >
                    Skills
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "my-work" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    My Work
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "contact" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(contactRef.current);
                    }}
                  >
                    Contact
                  </button>
                </li>
                <li className="z-50 hidden ml-5 list-none lg:inline-block">
                  <a
                    href={`mailto:ganeriwalaparth@gmail.com`}
                    className="btn-brand btn-md group"
                  >
                    Hire me
                  </a>
                </li>
                <li className="z-50 inline-block list-none lg:hidden group">
                  <button
                    className={`relative w-10 h-10 ${
                      navbarOpen
                        ? "dark:text-white text-dark"
                        : "text-mid group-hover:text-dark dark:opacity-50 dark:group-hover:opacity-100 dark:text-white dark:group-hover:text-white"
                    } focus:outline-none`}
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                          navbarOpen ? "rotate-45" : "-translate-y-1.5"
                        }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                          navbarOpen ? "opacity-0" : "opacity-100"
                        }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                          navbarOpen ? "-rotate-45" : "translate-y-1.5"
                        }`}
                      ></span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
            <div className="flex mt-auto ml-0 lg:ml-5">
              {/* Dark mode */}
              <button
                className="flex items-center justify-center w-7 h-12 transition-all duration-150 ease-in rounded-sm focus:outline-none group bg-transparent outline-none"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              >
                {renderThemeChanger()}
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="container relative z-30 mx-auto">
          {/* Hero Content */}
          <main className={`flex-col flex h-screen`} id="home" ref={homeRef}>
            {/* Main */}
            <div className="container relative flex flex-col items-start justify-center flex-grow px-0 mx-auto md:px-20 lg:px-24 section">
              <div className="w-full">
                {/* <span className="text-2xl font-semibold text-brand">
                  Hello! 👋 My name is
                </span> */}

                <h1 className="mb-2 text-5xl md:text-7xl dark:text-white text-dark">
                  Parth Ganeriwala
                </h1>
                <h2 className="mb-4 text-3xl md:text-4xl dark:text-light text-mid">
                  <ReactTypingEffect
                    typingDelay={200}
                    speed={50}
                    eraseSpeed={50}
                    eraseDelay={1500}
                    text={[
                      "Research Professional",
                      "Ph.D. Candidate",
                      "Avid Amine Watcher",
                      "Writer",
                    ]}
                  />
                </h2>
                <p className="w-4/5 text-xl md:w-full">
                  I design and build systems that are safe, and work well.
                </p>
                <button
                  className="mt-4 btn-brand btn-lg group"
                  onClick={() => {
                    scrollTo(myWorkRef.current);
                  }}
                >
                  See my Work
                </button>
              </div>
            </div>
          </main>

          {/* About */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="about"
            ref={aboutRef}
          >
            <div className="flex flex-col">
              <h2 className="text-5xl">About</h2>
              <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

              <div className="flex flex-col-reverse items-start w-full md:flex-row">
                <div className="flex flex-col w-full md:pr-8 md:w-3/5">
                  <p className="text-lg">
                    Hi! I&apos;m Parth and I&apos;m a Graduate Research Assistant,
                    and a doctoral student in Computer Science at {""}
                  <a
                      class="underline-link"
                      href="https://fit.edu"
                      target="_blank"
                      rel="noreferrer"
                  >
                    Florida Institute of Technology
                    </a>
                  .</p>

                    <p className="text-lg">
                      I was always curious about the "behind-the-scenes" of literally
                      anything and everything, and with the introduction of the television
                      show, ’Mr.Robot’, I knew computer science piqued my interest.
                    </p>

                    <p className="text-lg">
                      Take a look at my work below to see what I&apos;m working
                      on, and get in touch if you&apos;d like to work together!
                    </p>
                </div>
                <div className="flex w-full h-full mb-4 md:pl-8 md:w-2/5 md:mb-0">
                  <Image
                    src="/headshot-2023.jpg"
                    className="overflow-hidden rounded-md"
                    width={880}
                    height={880}
                    alt={"Parth Ganeriwala headshot"}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="skills"
            ref={skillsRef}
          >
            <h2 className="text-5xl">Skills</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            {/* Skills icons */}
            <div className="w-full mr-auto grid gap-4 grid-cols-4 sm:grid-cols-4 md:grid-cols-8 mt-4">
                            {/* Java*/}


                <Icon
                IconType={Java}
                title="Java"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                IconType={Python}
                title="Python"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                  IconType={Pytorch}
                  title="Pytorch"
                  width={"w-16"}
                  height={"h-16"}
                  padding={"p-0"}
                  flexDirection={"flex-col"}
                  titleMargins={"mt-4"}
                  titleSize={"text-sm sm:text-sm"}
                  marginBottom={"mb-4"}
                  marginRight={"mr-0"}
                  textTransform={"normal-case"}
                  fixedHeight={"h-28"}
              />
              <Icon
                IconType={Tensorflow}
                title="Tensorflow"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                IconType={MySQL}
                title="MySQL"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                  IconType={Pandas}
                  title="Pandas"
                  width={"w-16"}
                  height={"h-16"}
                  padding={"p-0"}
                  flexDirection={"flex-col"}
                  titleMargins={"mt-4"}
                  titleSize={"text-sm sm:text-sm"}
                  marginBottom={"mb-4"}
                  marginRight={"mr-0"}
                  textTransform={"normal-case"}
                  fixedHeight={"h-28"}
              />
              {/* HTML */}
              <Icon
                IconType={Html}
                title="HTML"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* CSS */}
              <Icon
                IconType={Css}
                title="CSS"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Javascript */}
              <Icon
                IconType={Javascript}
                title="Javascript"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* React */}
              <Icon
                IconType={ReactJs}
                title="React"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Next */}
              <Icon
                IconType={NextJs}
                title="Next"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Node */}
              <Icon
                IconType={NodeJs}
                title="Node"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Express */}
              <Icon
                IconType={Express}
                title="Express"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* MongoDb */}
              <Icon
                IconType={MongoDb}
                title="MongoDb"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/*/!* Sass *!/*/}
              <Icon
                IconType={Sass}
                title="Sass"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Bootstrap */}
              <Icon
                IconType={Bootstrap}
                title="Bootstrap"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Firebase */}
              <Icon
                IconType={Firebase}
                title="Firebase"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Photoshop */}
              <Icon
                IconType={Photoshop}
                title="Photoshop"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                IconType={Jupyter}
                title="Jupyter"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                IconType={Numpy}
                title="Numpy"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                IconType={Neo4j}
                title="Neo4j"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                IconType={OpenCV}
                title="OpenCV"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                IconType={Linux}
                title="Linux"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                  IconType={Bash}
                  title="Bash"
                  width={"w-16"}
                  height={"h-16"}
                  padding={"p-0"}
                  flexDirection={"flex-col"}
                  titleMargins={"mt-4"}
                  titleSize={"text-sm sm:text-sm"}
                  marginBottom={"mb-4"}
                  marginRight={"mr-0"}
                  textTransform={"normal-case"}
                  fixedHeight={"h-28"}
              />
              <Icon
                IconType={Scrum}
                title="Scrum"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                IconType={Dask}
                title="Dask"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                IconType={Git}
                title="Git"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
              <Icon
                  IconType={Gitlab}
                  title="Gitlab"
                  width={"w-16"}
                  height={"h-16"}
                  padding={"p-0"}
                  flexDirection={"flex-col"}
                  titleMargins={"mt-4"}
                  titleSize={"text-sm sm:text-sm"}
                  marginBottom={"mb-4"}
                  marginRight={"mr-0"}
                  textTransform={"normal-case"}
                  fixedHeight={"h-28"}
              />
              <Icon
                  IconType={Android}
                  title="Android"
                  width={"w-16"}
                  height={"h-16"}
                  padding={"p-0"}
                  flexDirection={"flex-col"}
                  titleMargins={"mt-4"}
                  titleSize={"text-sm sm:text-sm"}
                  marginBottom={"mb-4"}
                  marginRight={"mr-0"}
                  textTransform={"normal-case"}
                  fixedHeight={"h-28"}
              />
              <Icon
                  IconType={Cuda}
                  title="Cuda"
                  width={"w-16"}
                  height={"h-16"}
                  padding={"p-0"}
                  flexDirection={"flex-col"}
                  titleMargins={"mt-4"}
                  titleSize={"text-sm sm:text-sm"}
                  marginBottom={"mb-4"}
                  marginRight={"mr-0"}
                  textTransform={"normal-case"}
                  fixedHeight={"h-28"}
              />
              <Icon
                  IconType={GPT}
                  title="GPT"
                  width={"w-16"}
                  height={"h-16"}
                  padding={"p-0"}
                  flexDirection={"flex-col"}
                  titleMargins={"mt-4"}
                  titleSize={"text-sm sm:text-sm"}
                  marginBottom={"mb-4"}
                  marginRight={"mr-0"}
                  textTransform={"normal-case"}
                  fixedHeight={"h-28"}
              />
              <Icon
                  IconType={ROS}
                  title="ROS"
                  width={"w-16"}
                  height={"h-16"}
                  padding={"p-0"}
                  flexDirection={"flex-col"}
                  titleMargins={"mt-4"}
                  titleSize={"text-sm sm:text-sm"}
                  marginBottom={"mb-4"}
                  marginRight={"mr-0"}
                  textTransform={"normal-case"}
                  fixedHeight={"h-28"}
              />



            </div>
          </section>

          {/*/!* My Work *!/*/}
          {/*<section*/}
          {/*  className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"*/}
          {/*  id="my-work"*/}
          {/*  ref={myWorkRef}*/}
          {/*>*/}
          {/*  /!* My Work header *!/*/}
          {/*  <h2 className="text-5xl">My Work</h2>*/}
          {/*  <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>*/}

          {/*  /!* Featured Projects Container *!/*/}
          {/*  <div className="flex flex-col w-full mb-12">*/}
          {/*    /!* Project One *!/*/}
          {/*    <FeaturedProjectCard*/}
          {/*      title={"Soar to nuXmv Translator"}*/}
          {/*    status={"Check it out!"}*/}
          {/*      description={`A tool converting SOAR (State, Operator, And Result) specifications into NuXmv-compatible models for formal verification and analysis of reactive systems.`}*/}
          {/*      float={`right-0`}*/}
          {/*      flexDirection={`flex-col lg:flex-row`}*/}
          {/*      imgWidth={"1366"}*/}
          {/*      imgHeight={"666"}*/}
          {/*      imgSrc={"/nuxmvSoar.png"}*/}
          {/*      liveLink={"https://assistresearchlab.fit.edu/"}*/}
          {/*      repoLink={null}*/}
          {/*      stack={*/}
          {/*        <>*/}
          {/*          <Icon*/}
          {/*            IconType={Html}*/}
          {/*            title="HTML"*/}
          {/*            columnSizing={"w-auto"}*/}
          {/*            width={"w-6"}*/}
          {/*            height={"h-6"}*/}
          {/*            flexDirection={"flex-row"}*/}
          {/*            padding={"p-0"}*/}
          {/*            titleMargins={"my-0 ml-1"}*/}
          {/*            titleSize={"text-sm"}*/}
          {/*            marginBottom={"mb-4"}*/}
          {/*            marginRight={"mr-3"}*/}
          {/*            textTransform={"uppercase"}*/}
          {/*            fixedHeight={"h-auto"}*/}
          {/*          />*/}

          {/*          <Icon*/}
          {/*            IconType={Css}*/}
          {/*            title="Css"*/}
          {/*            columnSizing={"w-auto"}*/}
          {/*            width={"w-6"}*/}
          {/*            height={"h-6"}*/}
          {/*            flexDirection={"flex-row"}*/}
          {/*            padding={"p-0"}*/}
          {/*            titleMargins={"my-0 ml-1"}*/}
          {/*            titleSize={"text-sm"}*/}
          {/*            marginBottom={"mb-4"}*/}
          {/*            marginRight={"mr-3"}*/}
          {/*            textTransform={"uppercase"}*/}
          {/*            fixedHeight={"h-auto"}*/}
          {/*          />*/}

          {/*          <Icon*/}
          {/*            IconType={ReactJs}*/}
          {/*            title="React"*/}
          {/*            columnSizing={"w-auto"}*/}
          {/*            width={"w-6"}*/}
          {/*            height={"h-6"}*/}
          {/*            flexDirection={"flex-row"}*/}
          {/*            padding={"p-0"}*/}
          {/*            titleMargins={"my-0 ml-1"}*/}
          {/*            titleSize={"text-sm"}*/}
          {/*            marginBottom={"mb-4"}*/}
          {/*            marginRight={"mr-3"}*/}
          {/*            textTransform={"uppercase"}*/}
          {/*            fixedHeight={"h-auto"}*/}
          {/*          />*/}

          {/*          <Icon*/}
          {/*            IconType={NodeJs}*/}
          {/*            title="NodeJs"*/}
          {/*            columnSizing={"w-auto"}*/}
          {/*            width={"w-6"}*/}
          {/*            height={"h-6"}*/}
          {/*            flexDirection={"flex-row"}*/}
          {/*            padding={"p-0"}*/}
          {/*            titleMargins={"my-0 ml-1"}*/}
          {/*            titleSize={"text-sm"}*/}
          {/*            marginBottom={"mb-4"}*/}
          {/*            marginRight={"mr-3"}*/}
          {/*            textTransform={"uppercase"}*/}
          {/*            fixedHeight={"h-auto"}*/}
          {/*          />*/}
          {/*        </>*/}
          {/*      }*/}
          {/*    />*/}

          {/*  /!* Other Projects header *!/*/}
          {/*  <h2 className="text-4xl text-center">Other Projects</h2>*/}
          {/*  <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 mx-auto border-0"></hr>*/}
          {/*  <p className="mb-16 text-lg text-center">*/}
          {/*    Coming Soon...*/}
          {/*  </p>*/}

          {/*  /!*Other Projects Container *!/*/}
          {/*  /!*<div className="grid grid-flow-row grid-rows-2 gap-4 grid-col-1 lg:grid-cols-3">*!/*/}
          {/*  /!*  {projects.map(function (project, i) {*!/*/}
          {/*  /!*    return <ProjectCard project={project} key={i} />;*!/*/}
          {/*  /!*  })}*!/*/}
          {/*  </div>*/}
          {/*</section>*/}
          {/* My Work */}
          <section
              className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
              id="my-work"
              ref={myWorkRef}
          >
            {/* My Work header */}
            <h2 className="text-5xl">My Work</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            {/* Featured Projects Container */}
            <div className="flex flex-col w-full mb-12">
              {/* Project One */}
              <FeaturedProjectCard
                  title={"Soar to nuXmv Translator"}
                  status={"Check it out!"}
                  description={`A tool converting SOAR (State, Operator, And Result) specifications into NuXmv-compatible models for formal verification and analysis of reactive systems.`}
                  float={`right-0`}
                  flexDirection={`flex-col lg:flex-row`}
                  imgWidth={"1366"}
                  imgHeight={"666"}
                  imgSrc={"/nuxmvSoar.png"}
                  liveLink={"https://assistresearchlab.fit.edu/"}
                  repoLink={null}
                  stack={
                    <>
                      <Icon IconType={Html} title="HTML" columnSizing={"w-auto"} width={"w-6"} height={"h-6"} flexDirection={"flex-row"} padding={"p-0"} titleMargins={"my-0 ml-1"} titleSize={"text-sm"} marginBottom={"mb-4"} marginRight={"mr-3"} textTransform={"uppercase"} fixedHeight={"h-auto"} />
                      <Icon IconType={Css} title="Css" columnSizing={"w-auto"} width={"w-6"} height={"h-6"} flexDirection={"flex-row"} padding={"p-0"} titleMargins={"my-0 ml-1"} titleSize={"text-sm"} marginBottom={"mb-4"} marginRight={"mr-3"} textTransform={"uppercase"} fixedHeight={"h-auto"} />
                      <Icon IconType={ReactJs} title="React" columnSizing={"w-auto"} width={"w-6"} height={"h-6"} flexDirection={"flex-row"} padding={"p-0"} titleMargins={"my-0 ml-1"} titleSize={"text-sm"} marginBottom={"mb-4"} marginRight={"mr-3"} textTransform={"uppercase"} fixedHeight={"h-auto"} />
                      <Icon IconType={NodeJs} title="NodeJs" columnSizing={"w-auto"} width={"w-6"} height={"h-6"} flexDirection={"flex-row"} padding={"p-0"} titleMargins={"my-0 ml-1"} titleSize={"text-sm"} marginBottom={"mb-4"} marginRight={"mr-3"} textTransform={"uppercase"} fixedHeight={"h-auto"} />
                    </>
                  }
              />



              {/* Project Three */}
              <FeaturedProjectCard
                  title={"ALINA + AssistTaxi Dataset"}
                  status={"Published @ CVPR'24"}
                  description={`Line marking identification system using the AssistTaxi dataset for autonomous taxiway navigation.`}
                  float={`right-0`}
                  flexDirection={`flex-col lg:flex-row-reverse`}
                  imgWidth={"1366"}
                  imgHeight={"666"}
                  imgSrc={"/assist.png"}
                  liveLink={"https://openaccess.thecvf.com/content/CVPR2024W/VDU/html/Khan_ALINA_Advanced_Line_Identification_and_Notation_Algorithm_CVPRW_2024_paper.html"}
                  repoLink={null}
                  stack={<><Icon
                      IconType={OpenCV}
                      title="OpenCV"
                      width={"w-16"}
                      height={"h-16"}
                      padding={"p-0"}
                      flexDirection={"flex-col"}
                      titleMargins={"mt-4"}
                      titleSize={"text-sm sm:text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-0"}
                      textTransform={"normal-case"}
                      fixedHeight={"h-28"}
                  /></>}
              />

              {/* Project Two */}
              <FeaturedProjectCard
                  title={"Automated Framework to Extract Software Requirements from Source Code"}
                  status={"Published @ NLPIR'23"}
                  description={`A framework using AI language models to automatically extract software requirements from source code `}
                  float={`left-0`}
                  flexDirection={`flex-col lg:flex-row`}
                  imgWidth={"1366"}
                  imgHeight={"666"}
                  imgSrc={"/auto.png"}
                  liveLink={"https://dl.acm.org/doi/abs/10.1145/3639233.3639242"}
                  repoLink={null}
                  stack={<><Icon
                      IconType={Java}
                      title="Java"
                      width={"w-16"}
                      height={"h-16"}
                      padding={"p-0"}
                      flexDirection={"flex-col"}
                      titleMargins={"mt-4"}
                      titleSize={"text-sm sm:text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-0"}
                      textTransform={"normal-case"}
                      fixedHeight={"h-28"}
                  /></>}
              />
              {/* Project Four */}
              <FeaturedProjectCard
                  title={"Auto SysML Activity Diagrams"}
                  status={"SysCon '25 Accepted"}
                  description={`Functional reasoning tool to automatically generate SysML activity diagrams from structured natural language.`}
                  float={`left-0`}
                  flexDirection={`flex-col lg:flex-row-reverse`}
                  imgWidth={"1366"}
                  imgHeight={"666"}
                  imgSrc={"/sysml.png"}
                  liveLink={"https://arxiv.org/abs/2501.18514"}
                  repoLink={null}
                  stack={<><Icon
                      IconType={Java}
                      title="Java"
                      width={"w-16"}
                      height={"h-16"}
                      padding={"p-0"}
                      flexDirection={"flex-col"}
                      titleMargins={"mt-4"}
                      titleSize={"text-sm sm:text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-0"}
                      textTransform={"normal-case"}
                      fixedHeight={"h-28"}
                  /></>}
              />
            </div>

            {/*/!* Expertise / Research Interests *!/*/}
            {/*<div className="flex flex-wrap gap-2 mb-12">*/}
            {/*  <Badge text="Transfer Learning" />*/}
            {/*  <Badge text="Formal Methods" />*/}
            {/*  <Badge text="Cognitive Architectures" />*/}
            {/*  <Badge text="SysML" />*/}
            {/*  <Badge text="NuXmv" />*/}
            {/*  <Badge text="Autonomous Systems" />*/}
            {/*</div>*/}

            {/*/!* Collaborators / Partners *!/*/}
            {/*<div className="mb-20">*/}
            {/*  <h3 className="text-3xl mb-4 text-center">Collaborators</h3>*/}
            {/*  <div className="flex flex-wrap justify-center items-center gap-6">*/}
            {/*    <img src="/logos/nasa.png" alt="NASA" className="h-12" />*/}
            {/*    <img src="/logos/darpa.png" alt="DARPA" className="h-12" />*/}
            {/*    <img src="/logos/collins.png" alt="Collins" className="h-12" />*/}
            {/*    <img src="/logos/fit.png" alt="FIT" className="h-12" />*/}
            {/*    <img src="/logos/raytheon.png" alt="Raytheon" className="h-12" />*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* Other Projects header */}
            <h2 className="text-4xl text-center">Other Projects</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 mx-auto border-0"></hr>
            <p className="mb-16 text-lg text-center">
              Coming Soon...
            </p>

            {/* Other Projects Container */}
            {/*<div className="grid grid-flow-row grid-rows-2 gap-4 grid-col-1 lg:grid-cols-3">*/}
            {/*  {projects.map(function (project, i) {*/}
            {/*    return <ProjectCard project={project} key={i} />;*/}
            {/*  })}*/}
            {/*</div>*/}
          </section>


          {/* Contact */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="contact"
            ref={contactRef}
          >
            <h2 className="text-5xl">Contact</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            <div className="flex flex-col-reverse w-full md:flex-row">
              <div className="w-full mb-4 md:pl-0 md:mb-0">
                <p className="text-lg">
                  I&apos;m currently available to get involved in new projects,
                  so get in touch if you&apos;d like to work together.
                </p>
                <p className="text-lg">
                  Email me at{" "}
                  <Link
                    href="mailto:ganeriwalaparth@gmail.com"
                    className="underline-link"
                  >
                    ganeriwalaparth@gmail.com
                  </Link>{" "}
                  and let&apos;s talk about your project!
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col w-full px-0 py-16 md:px-20 lg:px-24 section">
            <hr className="w-full h-1 mb-16 dark:bg-white bg-dark border-0 opacity-10"></hr>
            <div className="w-8 mb-4">
              <svg
                id="abbe8588-8b21-44fd-a605-eb7de7f82941"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 93.13 75.2"
              >
                <path
                  className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
                  d="M24.05,38.51,7.5,55.06a4.39,4.39,0,1,1-6.21-6.21L14.74,35.41,1.29,22A4.39,4.39,0,0,1,7.5,15.75L24.05,32.3A4.4,4.4,0,0,1,24.05,38.51Z"
                />
                <path
                  className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
                  d="M91.85,55.06a4.38,4.38,0,0,1-6.21,0L69.09,38.51a4.4,4.4,0,0,1,0-6.21L85.64,15.75A4.39,4.39,0,0,1,91.85,22L78.41,35.41,91.85,48.85A4.4,4.4,0,0,1,91.85,55.06Z"
                />
                <rect
                  className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
                  x="41.93"
                  y="-1.17"
                  width="8.78"
                  height="77.54"
                  rx="4.39"
                  transform="translate(11.31 -10.71) rotate(15)"
                />
              </svg>
            </div>

            <div className="flex flex-col items-start md:flex-row">
              <p className="w-auto mb-4 md:mb-0">
                &copy; {new Date().getFullYear()}
                {/*- Designed and built by Parth. Inspired by Daniel Cranney.*/}
              </p>

              <div className="flex md:hidden">
                <span className="mr-2">
                  <GitHubProfile marginBottom={"mb-0"}/>
                </span>
                <span className="mr-2">
                  <LinkedInProfile marginBottom={"mb-0"}/>
                </span>
                <span className="mr-2">
                  <Gmail marginBottom={"mb-0"}/>
                </span>
              </div>
            </div>
          </footer>
        </div>

        {/* Fixed Container */}
        <div className="fixed bottom-0 z-30 w-full">
          <div className="container relative flex h-full mx-auto">
            {/* Profile Icons */}
            <div className="absolute bottom-0 items-center hidden mt-auto mr-auto text-white left-8 md:flex md:flex-col">
              <GitHubProfile marginBottom={"mb-4"} />
              <LinkedInProfile marginBottom={"mb-4"} />
              <Gmail marginBottom={"mb-4"} />
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2"></div>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-0 items-center hidden mt-auto ml-auto text-white right-8 md:flex md:flex-col">
              {/* Hero - Diamond 1 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(homeRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "home"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "home"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "home"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* About - Diamond 2 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(aboutRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "about"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "about"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "about"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Skills - Diamond 3 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(skillsRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "skills"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "skills"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "skills"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* My Work - Diamond 4 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(myWorkRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "my-work"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "my-work"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "my-work"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Contact - Diamond 5 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(contactRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "contact"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "contact"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "contact"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>

              {/* Line */}
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2 z-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
