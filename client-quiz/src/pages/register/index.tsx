import { useAuth } from "../../hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Register() {
  const { onRegister } = useAuth(false, "/quizzes");
  const router = useRouter();
  const [registerForm, setRegisterForm] = useState({ mobilePhone: "", password: "", fullName: "" });
  const [otpCode, setOtpCode] = useState("");
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const handleGoBack = () => {
    router.push("/");
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await onRegister(registerForm.mobilePhone, registerForm.password, registerForm.fullName);
      alert('Register Successfully!')
      router.push("/login");
    } catch (error: any) {
      alert(error.response?.data?.message ?? 'Please double-check your information!');
    }
  };

  const handleOTPPopupCancelButton = () => {
    setShowOtpPopup(false);
  };

  const handleOTPPopupSubmitButton = (e: any) => {
    console.log(otpCode);
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
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="fullName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Full Name
          </label>
          <input
            type="tel"
            name="fullName"
            id="fullName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={registerForm.fullName}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="mobilePhone"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mobile Phone
          </label>
          <input
            type="tel"
            name="mobilePhone"
            id="mobilePhone"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={registerForm.mobilePhone}
            onChange={handleInputChange}
          />
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
            name="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={registerForm.password}
            onChange={handleInputChange}
          />
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
