import useSWR, { SWRConfiguration } from "swr";
import { setCookie } from "cookies-next";
import { axiosPost } from "../utils";
import { useEffect } from "react";
import { useRouter } from "next/router";

export const useAuth = (isAuth: any = null, redirectTo: string = '/') => {
  const router = useRouter();
  const { data, isLoading, mutate } = useSWR("/api/auth/profile", axiosPost, {
    errorRetryCount: 0,
    revalidateOnFocus: false,
  });

  const onLogin = async (mobilePhone: string, password: string, otp: string) => {
    const response = await axiosPost("/api/auth/login", {
      mobilePhone,
      password,
      otp,
    });
    // Save Cookie
    setCookie("access-token", response.data?.accessToken);

    await mutate();
    return response;
  };

  const onLogout = async () => {
    await axiosPost("/api/auth/logout");
    await mutate(undefined, { revalidate: false });
  };

  const onRegister = async (
    mobilePhone: string,
    password: string,
    fullName: string,
    otp: string,
  ) => {
    const response = await axiosPost("/api/auth/register", {
      mobilePhone,
      password,
      fullName,
      otp,
    });
    return response;
  };

  const onSendOtp = async (
    mobilePhone: string
  ) => {
    const response = await axiosPost("/api/auth/send-otp", {
      mobilePhone,
    });
    return response;
  };

  const onValidate = async (
    mobilePhone: string,
    password: string,
  ) => {
    const response = await axiosPost("/api/auth/validate", {
      mobilePhone,
      password,
    });
    return response;
  };

  useEffect(() => {
    if (isAuth === true && !data) {
      router.push(redirectTo);
    }

    if (isAuth === false && data) {
      router.push(redirectTo);
    }
  }, [data]);

  return { user: data, isLoading, mutate, onLogin, onLogout, onRegister, onSendOtp, onValidate };
};
