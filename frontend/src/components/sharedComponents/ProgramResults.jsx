import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";
import ProgamCard from "./ProgamCard";

export const ProgramResults = ({ filteredPrograms }) => {
  const navigate = useNavigate();
  if (filteredPrograms) {
    return (
      <div className="flex flex-col justify-evenly items-center gap-10 xl:gap-0 py-20 min-h-0">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-5 mx-2 pb-5 md:pb-10 xl:pb-0 md:w-3/5 lg:w-full xl:h-52 text-center">
          <h1 className="mx-5 text-3xl sm:text-3xl md:text-3xl lg:text-3xl tracking-tight font-bold leading-tight">
            Available Programs
          </h1>
          <h2 className="mx-5 md:w-2/3 lg:w-2/5 xl:w-4/12 text-lg md:text-2xl tracking-tight font-semibold leading-tight text-center text-tkh-grayscale-7">
            Showing {filteredPrograms.length ? filteredPrograms.length : "0"}-
            {filteredPrograms.length} results from your search
          </h2>
          <div className="flex flex-row justify-center items-center gap-2 w-1/3 md:w-1/5 lg:w-1/5">
            <button className="mx-5 text-xl sm:text-2xl md:text-3xl lg:text-2xl tracking-tight font-bold leading-tight">
              Prev
            </button>
            <p className="mx-5 text-xl sm:text-2xl md:text-3xl lg:text-2xl tracking-tight font-bold leading-tight">
              1
            </p>
            <button className="mx-5 text-xl sm:text-2xl md:text-3xl lg:text-2xl tracking-tight font-bold leading-tight">
              Next
            </button>
          </div>
        </div>

        <div className=" grid grid-cols-1 md:grid-cols-3  w-[90vw] md:w-full max-w-[1296px]  gap-5 md:gap-[24px] pb-[104px] w-[80vw] pb-[104px] ">
          {filteredPrograms.map((program, key) => {
            return (

             <ProgamCard program={program} />
            );
          })}
        </div>
      </div>
    );
  }
};
