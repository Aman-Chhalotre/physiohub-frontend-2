"use client";
import React, { useEffect, useRef, useState } from "react";
import Header from "../components/header&footer/Header";
import Image from "next/image";
import { Card, CardContent } from "../components/ui/card";
import { Activity, BadgeCheck, Check, LineChart } from "lucide-react";
import { FaChartLine, FaFileAlt, FaHeadset, FaStar } from "react-icons/fa";

import LottiePlayer from "../components/animations/LottiePlayer";
import run from "../components/animations/data/Happy.json"
import Link from "next/link";


function Home() {
  const [animated, setAnimated] = useState(false);
  const [percent, setPercent] = useState(0);
  const directionRef = useRef(1);

  const data = [
    { label: "Jan", value: 40 },
    { label: "Feb", value: 80 },
    { label: "Mar", value: 60 },
    { label: "Apr", value: 30 },
    { label: "May", value: 45 },
    { label: "Jun", value: 70 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((prev) => {
        let next = prev + directionRef.current;
        if (next >= 70) directionRef.current = -1;
        else if (next <= 0) directionRef.current = 1;
        return next;
      });
    }, 55); // Slower animation speed (30ms per step)

    return () => clearInterval(interval);
  }, []);

  const radius = 40;
  const stroke = 8;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(true), 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Header />
      <div className="h-full w-full mt-10 relative overflow-hidden">
        <section className="relative bg-gradient-to-r from-gray-100 to-purple-100 py-16 px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center">
          {/* Left Content */}
          <div className="md:w-1/2 text-center md:text-left z-10">
            <p className="text-sm text-purple-600 font-semibold">
              OVER 200+ RESOURCES
            </p>
            <h1 className="text-6xl font-bold text-gray-900 leading-tight mt-2">
              Master Your <br />{" "}
              <span className="text-purple-600">Physiotherapy</span> <br />{" "}
              Skills Now!
            </h1>
            <p className="text-gray-600 mt-4 max-w-md">
              Maximize your physiotherapy skills with our expert-led courses and
              tailored resources.
            </p>
            <div className="mt-6 flex gap-4 justify-center md:justify-start">
              <Link href={"/auth/login"} className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700">
                Get Started
              </Link>
              <button className="border border-gray-400 px-6 py-3 rounded-lg font-medium text-gray-800 hover:bg-gray-200">
                Complete Quiz
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex justify-end md:w-[50%] w-full md:mt-0 mt-10">
            {/* First Column (takes max space) */}
            <div className="flex-1 flex flex-col justify-between items-end">
              <Card className="w-full max-w-[14rem] rounded-[20px] shadow-md overflow-hidden mb-5 self-end">
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col items-start gap-2">
                      <p className="text-sm font-medium text-black">
                        Over time
                      </p>
                      <h2 className="text-2xl font-bold text-black">$40K</h2>
                      <p className="text-xs text-gray-500">Last 7 days</p>
                    </div>
                    <div className="flex flex-col items-end gap-4">
                      <LineChart className="h-5 w-5 text-purple-500" />

                      <div className="text-xs px-2 py-[2px] rounded-full bg-purple-100 text-purple-700 font-medium flex items-center gap-1">
                        <Activity className="w-3 h-3" />
                        25%
                      </div>
                    </div>
                  </div>

                  <div className="w-full h-full relative rounded-lg overflow-hidden mt-10">
                    <img
                      src="/auth-activity.png"
                      alt="Muscle Stats"
                      // fill
                      className="object-cover"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="w-[18rem] rounded-[20px] bg-white shadow-md">
                <CardContent className="flex flex-col justify-between">
                  <h3 className="text-[#1F1F1F] text-[16px] font-semibold mb-6">
                    Performance over time
                  </h3>
                  <div className="flex justify-between items-end">
                    {data.map((item, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div className="w-[20px] h-[100px] bg-gray-200 rounded-sm overflow-hidden relative">
                          <div
                            className={`absolute bottom-0 w-full bg-[#F593D5] rounded-sm animate-bar`}
                            style={{
                              height: `${item.value}%`,
                              animationDelay: `${index * 0.2}s`,
                            }}
                          />
                        </div>
                        <span className="text-[12px] text-[#333]">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Second Column (fits content) */}
            <div className="flex-none flex mt-38 justify-center text-center w-1/2">
              {/* Your content here */}
              <Card className="w-[11rem] rounded-[20px] shadow-md relative overflow-visible h-fit">

                <div className="absolute -top-17 -right-10 -translate-x-1/2 z-10">
                  {/* <img

                    src="/bird-ping.png" // Replace with your penguin image path
                    alt="Penguin"
                    width={100}
                    height={100}
                    // fill

                  /> */}
                  <LottiePlayer animationFile={run} width="100px" height="100px" />

                </div>

                <CardContent className="flex flex-col items-center justify-center mt-4">
                  <h3 className="text-[22px] font-semibold text-gray-800 mb-4 w-full">
                    Quiz Score
                  </h3>

                  <svg
                    height={radius * 2}
                    width={radius * 2}
                    className="transform -rotate-90"
                  >
                    <circle
                      stroke="#E5E7EB"
                      fill="transparent"
                      strokeWidth={stroke}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                    <circle
                      stroke="#34D1C4"
                      fill="transparent"
                      strokeWidth={stroke}
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      r={normalizedRadius}
                      cx={radius}
                      cy={radius}
                    />
                  </svg>

                  <span className="absolute text-xl font-bold text-[#111] mt-11 ml-2">
                    {Math.round(percent)}%
                  </span>
                </CardContent>
              </Card>
            </div>
          </div>
          <svg
            width="836"
            height="860"
            viewBox="0 0 836 860"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-0 bottom-0 "
          >
            <path
              opacity="0.5"
              d="M35 908.5C751.677 97.5972 1097 643 892 866C616 1067.5 266.141 417.608 494.316 120.471C676.856 -117.24 929.408 -146.123 1032.87 -130.839"
              stroke="url(#paint0_linear_206_776)"
              stroke-width="70"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <defs>
              <linearGradient
                id="paint0_linear_206_776"
                x1="99.5879"
                y1="803.053"
                x2="625.361"
                y2="96.8963"
                gradientUnits="userSpaceOnUse"
              >
                <stop
                  offset="0.708099"
                  stop-color="#7240FD"
                  stop-opacity="0.16"
                />
                <stop offset="1" stop-color="#7240FD" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </section>

        <section className="py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-12">
          <div className="text-center">
            <p className="text-sm text-purple-600 font-semibold">
              OVER 200+ RESOURCES
            </p>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mt-2">
              Transform Your <br />
              Physiotherapy Learning
            </h1>
            <p className="text-gray-600 mt-4 max-w-md justify-self-center">
              Physiohub is a learning platform designed to help budding
              physiotherapists perfect their craft and become industry experts.
            </p>
          </div>
          <div className=" grid md:grid-cols-2 grid-cols-1 items-center gap-20">
            {/* Left Image Card */}
            <div className="bg-purple-100 p-6 rounded-xl shadow-lg flex justify-center items-center">
              <div className="bg-white p-4 rounded-xl shadow-md w-72">
                <Image
                  src="/lungs.png"
                  alt="Flashcard"
                  width={250}
                  height={180}
                  className="rounded-lg"
                />
                <p className=" text-orange-500 mt-2 flex items-center gap-2">
                  <BadgeCheck className="text-[10px]" />
                  Admin Verified
                </p>
                <h3 className="text-lg font-semibold">
                  Musculoskeletal Physiology
                </h3>
                <div className="flex gap-1">
                  <p className="text-gray-700 px-2 py-1 rounded text-xs border-2 border-gray-200">
                    Muscle
                  </p>
                  <p className="text-gray-700 px-2 py-1 rounded text-xs border-2 border-gray-200">
                    Cardiovascular
                  </p>
                  <p className="text-gray-700 px-2 py-1 rounded text-xs border-2 border-gray-200">
                    Ribs
                  </p>
                </div>
              </div>
            </div>

            {/* Right Text Section */}
            <div className=" text-center md:text-left">
              <p className="text-xs font-semibold text-purple-600">
                NO SIGN UP REQUIRED
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Learn with Flash Cards
              </h2>
              <p className="text-gray-600 mt-4">
                Master key concepts and terms with our interactive flashcards. A
                perfect tool for quick revisions and reinforcing your learning,
                making complex information easy to remember.
              </p>
              <div className="mt-6 mb-10 space-y-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  1000+ pre-made flashcards
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  Effortless Memorization with spaced repetition
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  Spaced repetition
                </p>
              </div>
              <Link href={"/auth/login"} className="mt-10 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700">
                Get Started
              </Link>
            </div>
          </div>

          <div className=" grid md:grid-cols-2 grid-cols-1 items-center gap-20 mt-38">
            {/* Right Text Section */}
            <div className=" text-center md:text-left">
              <p className="text-xs font-semibold text-purple-600">
                NO SIGN UP REQUIRED
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Learn with Flash Cards
              </h2>
              <p className="text-gray-600 mt-4">
                Master key concepts and terms with our interactive flashcards. A
                perfect tool for quick revisions and reinforcing your learning,
                making complex information easy to remember.
              </p>
              <div className="mt-6 mb-10 space-y-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  1000+ pre-made flashcards
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  Effortless Memorization with spaced repetition
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  Spaced repetition
                </p>
              </div>
              <Link href={"/auth/login"} className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700">
                Get Started
              </Link>
            </div>

            {/* Left Image Card */}
            <div className="bg-purple-100 p-6 rounded-xl shadow-lg flex justify-center items-center">
              <div className="bg-gradient-to-b from-[#7240fd88] to-[#7240fd2a] p-6 rounded-2xl shadow-lg w-80 mx-auto">
                {/* User Info */}
                <div className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold">Jennifer</h3>
                    <p className="text-sm text-gray-500">Time remaining</p>
                  </div>
                  <div className="flex items-center gap-1 bg-orange-100 px-3 py-1 rounded-full">
                    <FaStar className="text-orange-500" />
                    <span className="text-sm font-medium">24 Points</span>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-white mt-6 p-4 rounded-xl shadow-md flex items-center gap-1 w-[360px] ms-[-45px]">
                  <p className="text-gray-600 font-medium text-sm">A.</p>
                  <div className="w-full bg-gray-200 h-3 rounded-full mt-2 mb-2"></div>
                  <div className="w-2/3 bg-gray-200 h-3 rounded-full"></div>
                  <div className="mt-3 flex justify-end">
                    <div className="w-5 h-5 bg-[#F3A2D9] rounded-full flex items-center justify-center font-bold text-xs">
                      <Check className="text-white text-sm " />
                    </div>
                  </div>
                </div>

                {/* Question Card */}
                <div className="bg-[#7240fd4c] mt-2 p-3 rounded-xl shadow-md flex items-center gap-1">
                  <p className="text-[#7240fd8d] font-medium text-sm">B.</p>
                  <div className="w-full bg-[#7240fd8d] h-3 rounded-full mt-2 mb-2"></div>
                  <div className="w-2/3 bg-[#7240fd8d] h-3 rounded-full"></div>
                </div>

                {/* Other Options */}
                <div className="bg-purple-200 mt-3 p-3 rounded-xl opacity-75"></div>
                <div className="bg-purple-200 mt-2 p-3 rounded-xl opacity-50"></div>
              </div>
            </div>
          </div>
          <div className=" grid md:grid-cols-2 grid-cols-1 items-center gap-20 mt-38">
            <div className="bg-purple-100 h-[350px] p-6 rounded-xl shadow-lg flex justify-center items-center">
              {/* User Info */}
              <svg
                width="400"
                height="223"
                viewBox="0 0 580 323"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_206_1074)">
                  <rect
                    x="80"
                    y="67"
                    width="420"
                    height="164"
                    rx="16"
                    fill="white"
                    shape-rendering="crispEdges"
                  />
                  <rect
                    x="92"
                    y="79"
                    width="160"
                    height="140"
                    rx="8"
                    fill="#D9D9D9"
                  />
                  <rect x="92" y="79" width="160" height="140" rx="8" />
                  <rect
                    x="272"
                    y="85"
                    width="83"
                    height="12"
                    rx="6"
                    fill="#4CDBC8"
                  />
                  <rect
                    x="272"
                    y="113"
                    width="52"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="329"
                    y="113"
                    width="159"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="272"
                    y="131"
                    width="136"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="413"
                    y="131"
                    width="75"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="272"
                    y="149"
                    width="52"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <rect
                    x="329"
                    y="149"
                    width="106"
                    height="10"
                    rx="5"
                    fill="#DEE6ED"
                  />
                  <g clip-path="url(#clip0_206_1074)">
                    <rect x="272" y="189" width="27" height="40" />
                  </g>
                  <path
                    d="M303.072 207V195.56H307.216C310.368 195.56 312.304 197.608 312.304 201.288C312.304 204.968 310.368 207 307.216 207H303.072ZM304.512 196.84V205.72H307.216C310.128 205.72 310.864 203.528 310.864 201.288C310.864 199.048 310.128 196.84 307.216 196.84H304.512ZM317.546 198.616C317.85 198.616 318.074 198.632 318.298 198.664V199.944H318.266C316.49 199.656 315.257 200.904 315.257 202.648V207H313.977V198.84H315.257V200.456H315.289C315.721 199.384 316.378 198.616 317.546 198.616ZM319.373 207.112C318.877 207.112 318.493 206.776 318.493 206.232C318.493 205.704 318.877 205.352 319.373 205.352C319.869 205.352 320.253 205.704 320.253 206.232C320.253 206.776 319.869 207.112 319.373 207.112ZM332.18 204.136H327.14L326.132 207H324.644L328.868 195.56H330.468L334.676 207H333.188L332.18 204.136ZM327.62 202.856H331.716L329.684 196.888H329.652L327.62 202.856ZM335.931 195.56H337.211V207H335.931V195.56ZM342.656 206.104C344.288 206.104 344.896 205.048 345.04 204.488H346.32C345.904 206.008 344.736 207.224 342.704 207.224C340.224 207.224 338.72 205.48 338.72 202.92C338.72 200.2 340.256 198.616 342.64 198.616C345.2 198.616 346.448 200.36 346.448 203.256H340C340 204.728 340.88 206.104 342.656 206.104ZM342.64 199.736C341.104 199.736 340 200.824 340 202.136H345.168C345.168 200.824 344.176 199.736 342.64 199.736ZM346.957 198.84H348.477L350.589 201.96H350.621L352.733 198.84H354.253L351.373 202.824L354.541 207H353.021L350.621 203.672H350.589L348.205 207H346.685L349.837 202.824L346.957 198.84ZM360.433 200.92C360.433 200.28 360.081 199.736 358.769 199.736C357.217 199.736 356.705 200.184 356.625 201.368H355.345C355.425 199.8 356.401 198.616 358.769 198.616C360.321 198.616 361.713 199.224 361.713 201.192V205.16C361.713 205.8 361.825 206.152 362.641 206.056V206.952C362.305 207.064 362.129 207.08 361.889 207.08C361.121 207.08 360.657 206.872 360.433 205.976H360.401C359.889 206.744 358.977 207.224 357.633 207.224C355.985 207.224 354.945 206.28 354.945 204.904C354.945 203.048 356.321 202.568 358.433 202.168C359.809 201.912 360.433 201.736 360.433 200.92ZM357.761 206.104C359.281 206.104 360.433 205.416 360.433 203.848V202.488C360.193 202.728 359.409 202.952 358.545 203.128C356.961 203.464 356.225 203.864 356.225 204.84C356.225 205.64 356.705 206.104 357.761 206.104ZM367.757 198.616C369.245 198.616 370.493 199.432 370.493 201.304V207H369.213V201.624C369.213 200.568 368.717 199.736 367.437 199.736C365.997 199.736 365.037 200.648 365.037 201.912V207H363.757V198.84H365.037V199.816H365.069C365.501 199.24 366.365 198.616 367.757 198.616ZM378.179 195.56H379.459V207H378.179V205.992H378.147C377.667 206.616 376.899 207.224 375.587 207.224C373.539 207.224 371.907 205.608 371.907 202.92C371.907 200.232 373.539 198.616 375.587 198.616C376.899 198.616 377.667 199.192 378.147 199.896H378.179V195.56ZM375.715 206.104C377.235 206.104 378.179 204.84 378.179 202.92C378.179 201 377.235 199.736 375.715 199.736C374.035 199.736 373.187 201.32 373.187 202.92C373.187 204.52 374.035 206.104 375.715 206.104ZM384.846 206.104C386.478 206.104 387.086 205.048 387.23 204.488H388.51C388.094 206.008 386.926 207.224 384.894 207.224C382.414 207.224 380.91 205.48 380.91 202.92C380.91 200.2 382.446 198.616 384.83 198.616C387.39 198.616 388.638 200.36 388.638 203.256H382.19C382.19 204.728 383.07 206.104 384.846 206.104ZM384.83 199.736C383.294 199.736 382.19 200.824 382.19 202.136H387.358C387.358 200.824 386.366 199.736 384.83 199.736ZM393.634 198.616C393.938 198.616 394.162 198.632 394.386 198.664V199.944H394.354C392.578 199.656 391.346 200.904 391.346 202.648V207H390.066V198.84H391.346V200.456H391.378C391.81 199.384 392.466 198.616 393.634 198.616Z"
                    fill="black"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_206_1074"
                    x="0.802592"
                    y="0.307446"
                    width="578.395"
                    height="322.395"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feMorphology
                      radius="4.16828"
                      operator="erode"
                      in="SourceAlpha"
                      result="effect1_dropShadow_206_1074"
                    />
                    <feOffset dy="12.5049" />
                    <feGaussianBlur stdDeviation="41.6828" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0.16875 0 0 0 0 0.27 0 0 0 0 0.37125 0 0 0 0.12 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_206_1074"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_206_1074"
                      result="shape"
                    />
                  </filter>
                  <clipPath id="clip0_206_1074">
                    <rect
                      x="272"
                      y="189"
                      width="24"
                      height="24"
                      rx="12"
                      fill="white"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>

            {/* Right Text Section */}
            <div className=" text-center md:text-left">
              <p className="text-xs font-semibold text-purple-600">
                NO SIGN UP REQUIRED
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mt-2">
                Learn with Flash Cards
              </h2>
              <p className="text-gray-600 mt-4">
                Master key concepts and terms with our interactive flashcards. A
                perfect tool for quick revisions and reinforcing your learning,
                making complex information easy to remember.
              </p>
              <div className="mt-6 mb-10 space-y-2">
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  1000+ pre-made flashcards
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  Effortless Memorization with spaced repetition
                </p>
                <p className="flex items-center gap-2 text-gray-700">
                  <span className="w-3 h-3 bg-purple-600 rounded-full"></span>{" "}
                  Spaced repetition
                </p>
              </div>
              <Link href={"/auth/login"} className="mt-6 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700">
                Get Started
              </Link>
            </div>

            {/* Left Image Card */}
          </div>
        </section>

        <section className="py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-12 bg-[#F6F9FC]">
          <div className="text-center">
            <p className="text-sm text-purple-600 font-semibold">
              OVER 200+ RESOURCES
            </p>
            <h1 className="text-4xl font-bold text-gray-900 leading-tight mt-2">
              Transform Your <br />
              Physiotherapy Learning
            </h1>
            <p className="text-gray-600 mt-4 max-w-md justify-self-center">
              Physiohub is a learning platform designed to help budding
              physiotherapists perfect their craft and become industry experts.
            </p>
          </div>

         
        </section>
      </div>
    </>
  );
}

export default Home;
