"use client";

import { GoogleSvg, KakaoSvg, NaverSvg } from "@/components/icon";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/api/auth";
import { loginType, tokenType } from "../../types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hook";
import { setCookie } from "cookies-next";
import { loginValidator } from "@/lib/validators/auth";

const Page = () => {
  const { toast } = useToast();
  const router = useRouter();

  // define my custom form with z
  const form = useForm<z.infer<typeof loginValidator>>({
    resolver: zodResolver(loginValidator),
  });

  const { handleSubmit, control } = form;

  // tanstack query
  const { mutate } = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authAPI.login(data),
    onError: (error) => {
      // toast notification
      toast({
        title: "Failed to login",
        //  @ts-ignore
        description: `${error?.response?.data?.message}`,
        variant: "destructive",
      });
    },
    onSuccess: (data: tokenType) => {
      setCookie("accessToken", data.access_token);
      setCookie("refreshToken", data.refresh_token);
      toast({
        title: "success",
        description: "successfully logined",
      });
      router.push("/");
    },
  });

  // handleSocialLogin
  const handleSocialLogin = (type: string) => {
    try {
      window.location.href = `http://localhost:3333/api/v1/auth/${type}`;
    } catch (error) {
      // toast notification
      toast({
        title: "There was a problem",
        description: `There was an error logging in with ${type}`,
        variant: "destructive",
      });
    }
  };

  // onSubmit
  const onSubmit: SubmitHandler<z.infer<typeof loginValidator>> = (
    data: loginType
  ) => {
    console.log(data, "submit value");
    mutate(data);
  };

  return (
    <div className="flex mt-10 p-10 flex-col items-center justify-center ">
      <Form {...form}>
        {/* 1. local register */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <div className="text-4xl font-semibold text-center mb-10">Login</div>

          {/* email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <div className="mb-5">
                  <FormLabel>Email</FormLabel>
                  <FormControl className="mt-2">
                    <Input placeholder="email@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* password */}
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <div className="flex items-center">
                <FormItem>
                  <div className="mb-5">
                    <FormLabel>Password</FormLabel>
                    <FormControl className="mt-2">
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                        minLength={8}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
                {/* submit button */}
                <Button className="ml-10 mt-5" type="submit">
                  Login User
                </Button>
              </div>
            )}
          />
        </form>
      </Form>

      {/* 2. social register */}
      <div className="flex mt-10 justify-center">
        {/* google  */}
        <div className="flex items-center mb-3 mr-5">
          <Button
            onClick={() => handleSocialLogin("google")}
            variant={"outline"}
          >
            <GoogleSvg width="30" height="30" />
          </Button>
          <div className="ml-4">login</div>
        </div>
        {/* kakao  */}
        <div className="flex items-center mb-3 mr-5">
          <Button
            onClick={() => handleSocialLogin("kakao")}
            variant={"outline"}
          >
            <KakaoSvg width="30" height="30" />
          </Button>
          <div className="ml-4">login</div>
        </div>
        {/* naver */}
        <div className="flex items-center mb-3 mr-5">
          <Button
            onClick={() => handleSocialLogin("naver")}
            variant={"outline"}
          >
            <NaverSvg width="30" height="30" color="rgb(68, 190, 45)" />
          </Button>
          <div className="ml-4">login</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
