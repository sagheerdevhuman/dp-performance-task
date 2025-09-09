import tempImg from "../../assets/login_image.png";
import dateSvg from "../../assets/noun-date-2080644.svg";
import timeSvg from "../../assets/noun-time-1015020.svg";
import locationSvg from "../../assets/noun-location-5676857.svg";
import moment from "moment";
import ft from "format-time";


export const ProgramDetailBody = ({ program }) => {
  console.log(program);
  if (program) {
    return (
      <div className="flex flex-col lg:flex-row justify-evenly lg:justify-center items-center gap-20 lg:gap-0 my-20 xl:min-h-96 w-full text-center">
        <div className="flex justify-center items-center px-7 sm:px-24 lg:px-7 lg:h-[50vh] lg:w-6/12 2xl:h-[62vh]">
          <img
            className="object-fit h-60 w-96 sm:w-screen sm:h-80 md:h-96 lg:h-full rounded-sm"
            src={program.banner_url ? program.banner_url : tempImg}
            alt=""
          />
        </div>

        <div className="flex flex-col justify-center lg:justify-evenly items-center gap-12 lg:gap-0 lg:px-0 lg:h-[50vh] lg:w-2/5 2xl:h-[62vh] w-full">
          <div className="flex flex-row justify-start md:justify-center items-center xl:gap-3 2xl:gap-10 w-10/12 lg:w-full xl:w-4/5 border-tkh-grayscale-4">
            <img
              className="h-16 w-16 md:h-20 md:w-20 lg:h-16 lg:w-16 xl:h-20 xl:w-20 rounded-full"
              src={dateSvg}
              alt=""
            />

            <div className="flex flex-col justify-center items-center lg:items-start md:gap-2 xl:gap-2 lg:text-start mx-5 xl:h-36 md:w-2/3 xl:w-2/3 w-full">
              <h3 className="text-2xl xl:text-3xl font-semibold">Date(s)</h3>
              <p className="text-md md:text-xl pb-3">
               {moment(program.start_date).format("MMM Do YYYY")}{""} - {moment(program.end_date).format("MMM Do YYYY")}{""}
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-start md:justify-center items-center xl:gap-3 2xl:gap-10 w-10/12 lg:w-full xl:w-4/5 border-tkh-grayscale-4">
            <img
              className="h-16 w-16 md:h-20 md:w-20 lg:h-16 lg:w-16 xl:h-20 xl:w-20 rounded-full"
              src={timeSvg}
              alt=""
            />

            <div className="flex flex-col justify-center items-center lg:items-start md:gap-2 xl:gap-2 lg:text-start mx-5 xl:h-36 md:w-2/3 xl:w-2/3 w-full">
              <h3 className="text-2xl xl:text-3xl font-semibold">Time(s)</h3>
              <p className="text-md md:text-xl pb-3">
                {program.start_time} - {program.end_time} (all days)
              </p>
            </div>
          </div>

          <div className="flex flex-row justify-start md:justify-center items-center xl:gap-3 2xl:gap-10 w-10/12 lg:w-full xl:w-4/5 border-tkh-grayscale-4">
            <img
              className="h-16 w-16 md:h-20 md:w-20 lg:h-16 lg:w-16 xl:h-20 xl:w-20 rounded-full"
              src={locationSvg}
              alt=""
            />

            <div className="flex flex-col justify-center items-center lg:items-start md:gap-2 xl:gap-2 lg:text-start mx-5 xl:h-36 md:w-2/3 xl:w-2/3 w-full">
              <h3 className="text-2xl xl:text-3xl font-semibold">Location</h3>
              <p className="text-md md:text-xl pb-3">{program.location}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
