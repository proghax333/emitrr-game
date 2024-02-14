import { SignupFormType, useSignupMutation } from "@/state/auth";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function SignupPage() {
  const { register, handleSubmit } = useForm<SignupFormType>();

  const signupMutation = useSignupMutation();

  async function onSubmit(data: SignupFormType) {
    await signupMutation.mutateAsync(data);
    window.location.href = "/login";
  }

  return (
    <main className="h-full">
      <div className="w-full h-full flex justify-center items-start">
        <div className="w-full max-w-sm mt-20 text-gray-50 bg-slate-800 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col p-8">
              <h1 className="font-bold text-2xl text-center mt-8 font-inter">
                Sign up |{" "}
                <span className="font-montserrat text-blue-300">CatGame</span>
              </h1>

              {signupMutation.isSuccess && (
                <h2 className="p-2 text-center bg-green-700 mt-4">
                  Signed up successfully!
                </h2>
              )}

              {signupMutation.isError && (
                <h2 className="p-2 text-center bg-red-900 mt-4 text-white text-sm">
                  Error: {(signupMutation.error as any).response.data.message}
                </h2>
              )}

              <input
                className="transition-all outline-none focus:ring-4 text-sm mt-8 bg-gray-700 rounded-lg p-2 px-4"
                placeholder="Enter a name"
                {...register("name")}
              />

              <input
                className="transition-all outline-none focus:ring-4 text-sm mt-4 bg-gray-700 rounded-lg p-2 px-4"
                placeholder="Enter a username"
                {...register("username")}
              />

              <input
                className="transition-all outline-none focus:ring-4 text-sm mt-4 bg-gray-700 rounded-lg p-2 px-4"
                type="text"
                placeholder="Enter a email"
                {...register("email")}
              />

              <input
                className="transition-all outline-none focus:ring-4 text-sm mt-4 bg-gray-700 rounded-lg p-2 px-4"
                placeholder="Enter a password"
                type="password"
                {...register("password")}
              />

              <input
                className="transition-all outline-none focus:ring-4 text-sm mt-4 bg-gray-700 rounded-lg p-2 px-4"
                placeholder="Confirm password"
                type="password"
                {...register("confirmPassword")}
              />

              <button
                type="submit"
                className="text-center transition-all focus:ring-4 text-sm mt-6 bg-blue-900 rounded-lg p-2 px-4"
              >
                Sign up
              </button>

              <Link
                to="/login"
                className="text-center transition-all focus:ring-4 text-sm mt-2 bg-gray-600 rounded-lg p-2 px-4"
              >
                Login
              </Link>

              <a
                href="/forgot-password"
                className="text-xs text-blue-400 underline mt-6 px-1 mb-4"
              >
                Forgot Password
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
