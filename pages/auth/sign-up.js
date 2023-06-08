// This uses react-hook-form and makes it really easy to setup forms, manage
// form fields and manage errors https://react-hook-form.com/
// This also uses Yup for validation of the form fields, which is the same
// for the backend, which is why the schema is in a seperate file, so it's not
// not repeated in both the API and this front end.
import ErrorAlert from "@/components/alerts/error";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { userSignupForm } from "@/validators/user";

export default function SignUp() {
  // We need to tell react-hook-form which validtor to use
  const formOptions = { resolver: yupResolver(userSignupForm), mode: "onBlur" };
  // Then we use the useForm hook and it provides us with a handful
  // of useful objects that we can use.
  const { register, setError, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState; // Extract the errors from the formState
  const [serverErrors, setServerErrors] = useState([]); // This can store our server errors (just strings)

  // This is the function react-hook-form will call when the form successfully
  // submits. We can name the function anything we want, all we have to do is tell
  // react-hook-form what the name is.
  async function formSubmit(data) {
    const response = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // If the response is okay, then we are doing something good, probably
    // logging them in or redirecting, who knows!
    if (response.ok) {
      // do something good!
    } else if (response.status === 400) {
      // if the response is an http code that is an not "ok", we check what it is.
      // I use an http code of 400 here, but you can use whatever you want
      // based on how you set up your API

      // We set up the error messages to just be an array of messages (strings),
      // so we'll toss them into state and pass them to the alert component we set up.
      // This will just display them in a big red block on top of the form.
      const data = await response.json();
      setServerErrors(data.errorMessages);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 max-w-md w-full">
        <div className="">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign up for a new account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto w-full">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {serverErrors.length > 0 && <ErrorAlert messages={serverErrors} />}
            <form className="space-y-6" onSubmit={handleSubmit(formSubmit)}>
              <div>
                <label htmlFor="name" className="label">
                  <span className="label-text">Email address</span>
                </label>
                <input
                  className={`input input-bordered w-full max-w-xs ${errors.email && "input-error"}`}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  {...register("email")}
                />
                <div className="text-error sm:text-sm">{errors.email?.message}</div>
              </div>

              <div>
                <label htmlFor="name" className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  className={`input input-bordered w-full max-w-xs ${errors.name && "input-error"}`}
                  id="name"
                  name="name"
                  autoComplete="name"
                  {...register("name")}
                />
                <div className="text-error sm:text-sm">{errors.name?.message}</div>
              </div>

              <div>
                <label htmlFor="password" className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  className={`input input-bordered w-full max-w-xs ${errors.password && "input-error"}`}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                />
                <div className="text-error sm:text-sm">{errors.password?.message}</div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text">Confirm your Password</span>
                </label>
                <input
                  className={`input input-bordered w-full max-w-xs ${errors.confirmPassword && "input-error"}`}
                  id="confirm_password"
                  name="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                <div className="mt-1 text-error sm:text-sm">{errors.confirmPassword?.message}</div>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Sign up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
