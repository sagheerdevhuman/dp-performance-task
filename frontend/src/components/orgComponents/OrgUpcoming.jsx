import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";

const OrgUpcoming = ({ activeEvents ,activePrograms}) => {
  if (activeEvents && activePrograms) {
    const navigate = useNavigate();

    return (
      <div className="flex flex-col justify-evenly items-center gap-12 py-20 h-full">
        <div className="flex flex-col justify-center items-center gap-5 mx-5 pb-5 md:pb-10 xl:pb-0 md:w-3/5 lg:w-2/5 xl:w-1/3 xl:h-52 text-center">
          <h1 className="text-4xl xl:text-6xl font-bold">
            Upcoming Events and Programs
          </h1>
          <p className="mx-6 text-md md:text-xl text-tkh-grayscale-9">
            Here organizations can say a lil sumn about not missing out on their
            stuff. In 2 lines or less for good looks
          </p>
        </div>
        <div className="flex flex-col justify-evenly items-center lg:gap-5 lg:px-5 xl:px-20 text-center">
          {activeEvents.map((event, key) => {
            
            if (activeEvents.indexOf(event) % 2 == 0) {
              return (
                <div
                  className="flex flex-col lg:flex-row justify-evenly lg:justify-center items-center gap-3 xl:gap-10 px-7 sm:px-24 lg:px-5 lg:h-[57vh] lg:w-screen"
                  key={key}
                >
                  <img
                    src={event.banner_url ? event.banner_url : tempImg}
                    alt=""
                    className="object-fit h-60 sm:h-80 md:h-96 lg:h-80 xl:h-96 2xl:h-[45vh] w-96 sm:w-screen lg:w-5/12 xl:w-5/12 2xl:w-4/12 rounded-sm"
                    onClick={(e) =>
                      navigate(`/event_details/${event.event_id}`)
                    }
                  />
                  <div className="flex flex-col justify-center items-center gap-2 mx-2 w-full lg:w-1/2">
                    <h3
                      className="text-center text-2xl md:text-3xl tracking-tight font-bold leading-tight cursor-pointer"
                      onClick={(e) =>
                        navigate(`/event_details/${event.event_id}`)
                      }
                    >
                      {event.name}
                    </h3>
                    <p className="px-10 pb-10 lg:pb-0 text-lg md:text-xl 2xl:text-2xl text-tkh-grayscale-9">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="flex flex-col lg:flex-row-reverse justify-evenly lg:justify-center items-center gap-3 xl:gap-10 px-7 sm:px-24 lg:px-5 lg:h-[57vh] lg:w-screen"
                  key={key}
                >
                  <img
                    src={event.banner_url ? event.banner_url : tempImg}
                    alt=""
                    className="object-fit h-60 sm:h-80 md:h-96 lg:h-80 xl:h-96 2xl:h-[45vh] w-96 sm:w-screen lg:w-5/12 xl:w-5/12 2xl:w-4/12 rounded-sm"
                    onClick={(e) =>
                      navigate(`/event_details/${event.event_id}`)
                    }
                  />
                  <div className="flex flex-col justify-center items-center gap-2 mx-2 w-full lg:w-1/2">
                    <h3
                      className="text-center text-2xl md:text-3xl tracking-tight font-bold leading-tight cursor-pointer"
                      onClick={(e) =>
                        navigate(`/event_details/${event.event_id}`)
                      }
                    >
                      {event.name}
                    </h3>
                    <p className="px-10 pb-10 lg:pb-0 text-lg md:text-xl 2xl:text-2xl text-tkh-grayscale-9">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            }
          })}
          {activePrograms.map((program, key) => {
            
            if (activePrograms.indexOf(program) % 2 == 0) {
              return (
                <div
                  className="flex flex-col lg:flex-row justify-evenly lg:justify-center items-center gap-3 xl:gap-10 px-7 sm:px-24 lg:px-5 lg:h-[57vh] lg:w-screen"
                  key={key}
                >
                  <img
                    src={program.banner_url ? program.banner_url : tempImg}
                    alt=""
                    className="object-fit h-60 sm:h-80 md:h-96 lg:h-80 xl:h-96 2xl:h-[45vh] w-96 sm:w-screen lg:w-5/12 xl:w-5/12 2xl:w-4/12 rounded-sm"
                    onClick={(e) =>
                      navigate(`/event_details/${program.event_id}`)
                    }
                  />
                  <div className="flex flex-col justify-center items-center gap-2 mx-2 w-full lg:w-1/2">
                    <h3
                      className="text-center text-2xl md:text-3xl tracking-tight font-bold leading-tight cursor-pointer"
                      onClick={(e) =>
                        navigate(`/event_details/${program.event_id}`)
                      }
                    >
                      {program.name}
                    </h3>
                    <p className="px-10 pb-10 lg:pb-0 text-lg md:text-xl 2xl:text-2xl text-tkh-grayscale-9">
                      {program.description}
                    </p>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  className="flex flex-col lg:flex-row-reverse justify-evenly lg:justify-center items-center gap-3 xl:gap-10 px-7 sm:px-24 lg:px-5 lg:h-[57vh] lg:w-screen"
                  key={key}
                >
                  <img
                    src={event.banner_url ? event.banner_url : tempImg}
                    alt=""
                    className="object-fit h-60 sm:h-80 md:h-96 lg:h-80 xl:h-96 2xl:h-[45vh] w-96 sm:w-screen lg:w-5/12 xl:w-5/12 2xl:w-4/12 rounded-sm"
                    onClick={(e) =>
                      navigate(`/event_details/${event.event_id}`)
                    }
                  />
                  <div className="flex flex-col justify-center items-center gap-2 mx-2 w-full lg:w-1/2">
                    <h3
                      className="text-center text-2xl md:text-3xl tracking-tight font-bold leading-tight cursor-pointer"
                      onClick={(e) =>
                        navigate(`/event_details/${event.event_id}`)
                      }
                    >
                      {event.name}
                    </h3>
                    <p className="px-10 pb-10 lg:pb-0 text-lg md:text-xl 2xl:text-2xl text-tkh-grayscale-9">
                      {event.description}
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    );
  }
};

export default OrgUpcoming;
