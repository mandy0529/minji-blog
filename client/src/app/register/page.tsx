"use client";

import { useState } from "react";

const Page = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3333/api/v1/auth/google";
  };
  const handleKaKaoLogin = () => {
    window.location.href = "http://localhost:3333/api/v1/auth/kakao";
  };
  const handleNaverLogin = () => {
    window.location.href = "http://localhost:3333/api/v1/auth/naver";
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        {/* Left column container with background*/}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          {/* Right column container */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form>
              {/*Sign in section*/}
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg">Sign in with</p>
                {/* Facebook */}
                <button
                  onClick={handleGoogleLogin}
                  type="button"
                  data-te-ripple-init=""
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  {/* Facebook */}
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327"
                    alt=""
                  />
                </button>
                {/* Naver */}
                <button
                  onClick={handleNaverLogin}
                  type="button"
                  data-te-ripple-init=""
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  {/* Naver */}
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGuCr_nQJdTDqCJffzDnSH2q_vu0jbw7jmKg&usqp=CAU"
                    alt=""
                  />
                </button>
                {/* kakao */}
                <button
                  onClick={handleKaKaoLogin}
                  type="button"
                  data-te-ripple-init=""
                  data-te-ripple-color="light"
                  className="mx-1 h-9 w-9 rounded-full bg-primary uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                >
                  {/* kakao */}
                  <img
                    src="data:image/png;base64,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"
                    alt=""
                  />
                </button>
              </div>
              {/* Separator between social media sign in and email/password sign in */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">
                  Or
                </p>
              </div>
              {/* Email input */}
              <div className="relative mb-6" data-te-input-wrapper-init="">
                <input
                  type="text"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                />
                <label
                  htmlFor="exampleFormControlInput2"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Email address
                </label>
              </div>
              {/* Password input */}
              <div className="relative mb-6" data-te-input-wrapper-init="">
                <input
                  type="password"
                  className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[2.15] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                  id="exampleFormControlInput22"
                  placeholder="Password"
                />
                <label
                  htmlFor="exampleFormControlInput22"
                  className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[2.15] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[1.15rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                >
                  Password
                </label>
              </div>
              <div className="mb-6 flex items-center justify-between">
                {/* Remember me checkbox */}
                <div className="mb-[0.125rem] block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="checkbox"
                    defaultValue=""
                    id="exampleCheck2"
                  />
                  <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div>
                {/*Forgot password link*/}
                <a href="#!">Forgot password?</a>
              </div>
              {/* Login button */}
              <div className="text-center lg:text-left">
                <button
                  type="button"
                  className="inline-block rounded bg-primary px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  data-te-ripple-init=""
                  data-te-ripple-color="light"
                >
                  Login
                </button>
                {/* Register link */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Don't have an account?
                  <a
                    href="#!"
                    className="text-danger transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
