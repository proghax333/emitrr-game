import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { LoginFormType, useLoginMutation } from "@/state/auth";

export function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormType>();

  const loginMutation = useLoginMutation();

  async function onSubmit(data: LoginFormType) {
    await loginMutation.mutateAsync(data);
    window.location.href = "/game";
  }

  return (
    <main className="h-full">
      <div className="w-full h-full flex justify-center items-start">
        <div className="w-full max-w-sm mt-20 text-gray-50 bg-slate-800 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col p-8">
              <h1 className="font-bold text-2xl text-center mt-8 font-inter">
                Login |{" "}
                <span className="font-montserrat text-blue-300">CatGame</span>
              </h1>

              {loginMutation.isSuccess && (
                <h2 className="p-2 text-center bg-green-600 mt-4 text-white text-sm">
                  Logged in successfully!
                </h2>
              )}

              {loginMutation.isError && (
                <h2 className="p-2 text-center bg-red-900 mt-4 text-white text-sm">
                  Error: {(loginMutation.error as any).response.data.message}
                </h2>
              )}

              <input
                className="transition-all outline-none focus:ring-4 text-sm mt-8 bg-gray-700 rounded-lg p-2 px-4"
                placeholder="Enter username/email"
                {...register("login")}
              />

              <input
                className="transition-all outline-none focus:ring-4 text-sm mt-4 bg-gray-700 rounded-lg p-2 px-4"
                placeholder="Enter password"
                type="password"
                {...register("password")}
              />

              <button
                type="submit"
                className="text-center transition-all focus:ring-4 text-sm mt-6 bg-blue-900 rounded-lg p-2 px-4"
              >
                Login
              </button>

              <Link
                to="/signup"
                className="text-center transition-all focus:ring-4 text-sm mt-2  bg-gray-600 rounded-lg p-2 px-4"
              >
                Sign up
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
