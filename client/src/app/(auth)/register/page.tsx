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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import { useMutation } from "@tanstack/react-query";
import { authAPI } from "@/api/auth";
import { signupType } from "@/app/types";
import { useRouter } from "next/navigation";
import { useToast } from "@/hook";
import { SignupValidator } from "@/lib/validators/auth";

const Page = () => {
  const { toast } = useToast();
  const { push } = useRouter();

  // define my custom form with z
  const form = useForm<z.infer<typeof SignupValidator>>({
    resolver: zodResolver(SignupValidator),
  });

  const { handleSubmit, control } = form;

  // tanstack query signup
  const { mutate } = useMutation({
    mutationFn: (data: signupType) => authAPI.signup(data),
    onError: (error) => {
      // toast notification

      toast({
        title: "Failed to register",
        //  @ts-ignore
        description: `${error?.response?.data?.message}`,
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({
        title: "success",
        description: "successfully registered",
      });
      push("/login");
    },
  });

  // handleSocialLogin
  const handleSocialLogin = (type: string) => {
    try {
      window.location.href = `http://127.0.0.1:3333/api/v1/auth/${type}`;
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
  const onSubmit: SubmitHandler<z.infer<typeof SignupValidator>> = (
    data: signupType
  ) => {
    mutate(data);
  };

  return (
    <div className="flex mt-10 p-10 flex-col items-center justify-center ">
      <Form {...form}>
        {/* 1. local register */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* title */}
          <div className="text-4xl font-semibold text-center mb-10">
            Register
          </div>

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
            )}
          />

          {/* name */}
          <FormField
            control={control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="mb-5">
                  <FormLabel>username</FormLabel>
                  <FormControl className="mt-2">
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {/* role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => {
              return (
                <FormItem>
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormLabel>Role</FormLabel>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USER">USER</SelectItem>
                          <SelectItem value="ADMIN">ADMIN</SelectItem>
                        </SelectContent>
                        <FormMessage />
                      </Select>
                    </div>
                    {/* submit button */}
                    <Button className="ml-10 mt-5" type="submit">
                      Register User
                    </Button>
                  </div>
                </FormItem>
              );
            }}
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
          <div className="ml-4">signup</div>
        </div>
        {/* kakao  */}
        <div className="flex items-center mb-3 mr-5">
          <Button
            onClick={() => handleSocialLogin("kakao")}
            variant={"outline"}
          >
            <KakaoSvg width="30" height="30" />
          </Button>
          <div className="ml-4"> signup</div>
        </div>
        {/* naver */}
        <div className="flex items-center mb-3 mr-5">
          <Button
            onClick={() => handleSocialLogin("naver")}
            variant={"outline"}
          >
            <NaverSvg width="30" height="30" color="rgb(68, 190, 45)" />
          </Button>
          <div className="ml-4"> signup</div>
        </div>
      </div>
    </div>
  );
};

export default Page;
