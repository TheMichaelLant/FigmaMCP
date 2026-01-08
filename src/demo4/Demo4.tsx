import React, { useState } from "react";
import SocialButton from "./components/SocialButton";
import FormInput from "./components/FormInput";
import GenderSelector from "./components/GenderSelector";
import DateOfBirth from "./components/DateOfBirth";

const Demo4: React.FC = () => {
  const [profileName, setProfileName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [marketingConsent, setMarketingConsent] = useState(false);

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      profileName,
      email,
      password,
      gender,
      dateOfBirth: { month, date, year },
      marketingConsent,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-8">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-xl font-semibold text-gray-900 mb-8">
          Sign up for free to start live-streaming
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Social Login Buttons */}
          <div className="space-y-3 mb-6">
            <SocialButton
              provider="facebook"
              onClick={() => handleSocialLogin("facebook")}
            />
            <SocialButton
              provider="google"
              onClick={() => handleSocialLogin("google")}
            />
            <SocialButton
              provider="twitter"
              onClick={() => handleSocialLogin("twitter")}
            />
          </div>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Email Sign Up Section */}
          <h2 className="text-center text-sm font-medium text-gray-900 mb-6">
            Sign up with your email address
          </h2>

          <div className="space-y-5">
            <FormInput
              label="Profile name"
              type="text"
              placeholder="Enter your profile name"
              value={profileName}
              onChange={setProfileName}
            />

            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={setEmail}
            />

            <FormInput
              label="Password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={setPassword}
              showPasswordToggle
              helperText="Use 8 or more characters with a mix of letters, numbers & symbols"
            />

            <GenderSelector value={gender} onChange={setGender} />

            <DateOfBirth
              month={month}
              date={date}
              year={year}
              onMonthChange={setMonth}
              onDateChange={setDate}
              onYearChange={setYear}
            />

            {/* Marketing Consent */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="marketing"
                checked={marketingConsent}
                onChange={(e) => setMarketingConsent(e.target.checked)}
                className="w-4 h-4 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="marketing" className="ml-3 text-sm text-gray-600">
                Share my registration data with our content providers for
                marketing purposes.
              </label>
            </div>

            {/* Terms */}
            <p className="text-xs text-center text-gray-600">
              By creating an account, you agree to the{" "}
              <a href="#" className="text-blue-600 underline">
                Terms of use
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy Policy
              </a>
              .
            </p>

            {/* reCAPTCHA */}
            <div className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg bg-gray-50">
              <input
                type="checkbox"
                id="recaptcha"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="recaptcha" className="text-sm text-gray-700">
                I'm not a robot
              </label>
              <div className="ml-auto">
                <svg className="w-10 h-10" viewBox="0 0 256 256">
                  <rect width="256" height="256" fill="#4285F4" rx="8" />
                  <path
                    fill="#fff"
                    d="M128 40c-48.6 0-88 39.4-88 88s39.4 88 88 88 88-39.4 88-88-39.4-88-88-88zm0 160c-39.7 0-72-32.3-72-72s32.3-72 72-72 72 32.3 72 72-32.3 72-72 72z"
                  />
                  <circle cx="128" cy="128" r="36" fill="#fff" />
                </svg>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 px-6 bg-gray-400 text-white font-medium rounded-full hover:bg-gray-500 transition-colors"
            >
              Sign up
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="#" className="text-blue-600 underline">
                Log in
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Demo4;
