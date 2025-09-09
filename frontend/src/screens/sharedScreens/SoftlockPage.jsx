import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/Footer";
import { NavLink } from "react-router-dom";
function SoftlockPage() {
  return (
    <div className="flex flex-col justify-between min-h-screen h-screen">
      <Navbar />
      <div className="flex flex-col lg:flex-row justify-center items-center gap-5 2xl:gap-20 my-10 lg:mx-24 xl:mx-28 2xl:mx-36">
        <div className="flex flex-col justify-center items-center gap-5 2xl:gap-10 w-full md:w-9/12 lg:w-5/12 xl:w-6/12 2xl:w-4/12">
          <h1 className="mx-3 text-center lg:text-left text-xl md:text-3xl tracking-tight font-bold leading-tight">
            You need an account to have access to this feature
          </h1>
          <p className="mx-3 text-center lg:text-left text-lg md:text-2xl tracking-tight font-semibold leading-tight text-tkh-grayscale-7">
            The content you’re looking for requires an account to properly
            function. Log in or create a new account if you don’t have yours
            yet!
          </p>
          <div className="flex flex-row justify-center lg:justify-start items-center gap-3 md:gap-7 lg:gap-0 w-8/12 md:w-3/12 lg:w-full">
            <button
              href="#"
              className="whitespace-nowrap inline-flex items-center justify-center lg:ml-3 px-4 py-2 w-full lg:w-1/4 md:text-xl lg:text-lg bg-tkh-brand-tangerine-2 bg-origin-border rounded-md border-none shadow-sm text-base font-medium text-tkh-grayscale-0 hover:bg-tkh-brand-tangerine-3 active:bg-tkh-brand-tangerine-4"
            >
              <NavLink to="/sign_up">Sign up</NavLink>
            </button>
            <button
              href="#"
              className="w-full lg:w-1/5 md:text-xl lg:text-lg whitespace-nowrap text-base font-medium text-tkh-grayscale-10 hover:text-tkh-brand-tangerine-3 active:text-tkh-brand-tangerine-4"
            >
              <NavLink to="/login">Login</NavLink>
            </button>
          </div>
        </div>

        <img
          src="https://d1yh21d3dzz97r.cloudfront.net/pexels-mariannaole-3099337.jpg"
          alt=""
          className="mt-5 w-4/5 sm:w-3/5 md:w-4/5 lg:w-5/12 xl:w-6/12 2xl:w-4/12 cursor-pointer"
        />
      </div>
      <Footer />
    </div>
  );
}

export default SoftlockPage;
