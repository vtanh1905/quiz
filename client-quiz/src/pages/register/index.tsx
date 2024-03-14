import { useAuth } from "../../hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  fullName: string;
  mobilePhone: string;
  password: string;
}

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<IFormInput>();
  const { onRegister, onSendOtp } = useAuth(false, "/quizzes");
  const router = useRouter();
  const [otpCode, setOtpCode] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const handleGoBack = () => {
    router.push("/");
  };

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const { mobilePhone } = data;
      setShowOtpPopup(true);
      await onSendOtp(mobilePhone);
    } catch (error: any) {
      alert(
        error.response?.data?.message ?? "Please double-check your information!"
      );
    }
  };

  const handleOTPPopupCancelButton = () => {
    setShowOtpPopup(false);
  };

  const handleOTPPopupSubmitButton = async () => {
    try {
      const { fullName, mobilePhone, password } = getValues();
      await onRegister(mobilePhone, password, fullName, otpCode);
      alert("Register Successfully!");
      router.push("/login");
    } catch (error: any) {
      alert(
        error.response?.data?.message ?? "Please double-check your information!"
      );
    }
  };

  return (
    <>
      {/* Back Arrow */}
      <div className="flex items-center mb-4">
        {/* Back arrow */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleGoBack}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </div>

      {/* Form Register */}
      <div className="text-center font-semibold text-2xl mb-6">Register</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("fullName", {
              required: true,
              minLength: 6,
              maxLength: 15,
            })}
          />
          {errors.fullName && (
            <span className="text-red-500">
              Please enter your fullName between 6 and 15 characters.
            </span>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobilePhone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mobile Phone
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("mobilePhone", {
              required: true,
              pattern: /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
            })}
          />
          {errors.mobilePhone && (
            <span className="text-red-500">
              Please enter your valid mobile phone number.
            </span>
          )}
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            {...register("password", {
              required: true,
              minLength: 6,
              maxLength: 15,
            })}
          />
          {errors.password && (
            <span className="text-red-500">
              Please enter your password between 6 and 15 characters.
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Confirm
          </button>
          <Link
            href="/register"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </Link>
        </div>
      </form>

      {/* Notification Popup */}
      {showOtpPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Enter your OTP!</h2>
            <input
              type="tel"
              name="otp"
              id="otp"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={otpCode}
              onChange={(e: any) => setOtpCode(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded mt-4"
              onClick={handleOTPPopupSubmitButton}
            >
              Submit
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 ml-4 rounded mt-4"
              onClick={handleOTPPopupCancelButton}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}
