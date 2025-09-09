import { Carousel, IconButton } from "@material-tailwind/react";

export function CarouselCustomNavigation() {
  return (
    <Carousel
      className="rounded-xl"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handlePrev}
          className="!absolute xl:top-[56px] top-[10%] xl:left-[80%] md:left-[65%] left-[55%] -translate-y-2/4"
        >
        <div className="drop-shadow bg-white rounded-full ">
          <div className="drop-shadow-card-2 rounded-full bg-white h-full w-full">
            <svg className="w-[35px] h-[35px]" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.0781 5.24414L6.32227 9.99997L11.0781 14.7558L12.2564 13.5775L8.67893 9.99997L12.2564 6.42247L11.0781 5.24414Z" fill="#3E4265"/>
            </svg>
          </div>
        </div>

        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="black"
          size="lg"
          onClick={handleNext}
          className="!absolute xl:top-[56px] top-[10%] !right-[56px] -translate-y-2/4"
        >
        <div className="drop-shadow bg-white rounded-full ">
          <div className="drop-shadow-card-2 rounded-full bg-white h-full w-full">
            <svg className="w-[35px] h-[35px]"  viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.92247 14.7558L13.6783 9.99997L8.92247 5.24414L7.74414 6.42247L11.3216 9.99997L7.74414 13.5775L8.92247 14.7558Z" fill="#3E4265"/>
            </svg>
          </div>
        </div>
        </IconButton>
      )}
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-tkh-brand-tangerine-5" : "w-4 bg-[#B4B7C9]"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}

    >
      <div className="h-full w-full object-cover flex flex-col p-[50px] justify-center items-center">
        <div className="xl:w-[80%] w-[100%] h-[100%]">
          <div className=" drop-shadow h-[52px] w-[52px]  mb-[32px] flex flex-col justify-center items-center bg-[#FF7000] rounded-xl text-[white] font-bold">
            <p className="text-2xl">
              1
            </p>
          </div>
          <p className="text-tkh-grayscale-8 mb-[12px]">
            Evidence of outcomes can be gathered through data 
            sharing about program completion and student performance 
            within programs within the DigitalPipline. These data can be helpful 
            for both internal improvement for DigitalPipline organizations as well 
            as for pointing to evidence for funders. Additionally, 
            stronger coordination across parts of the pipeline can help
             individual programs better align their offerings that 
             are more effective in leading to future youth opportunity.
          </p>
          <h2 className="text-2xl font-bold">Improved Program Design</h2>
        </div>
      </div>
      <div className="xl:h-full w-full object-cover flex flex-col p-[50px] justify-center items-center">
        <div className="xl:w-[80%] w-[100%] h-[100%]">
          <div className="h-[52px] drop-shadow w-[52px] mb-[32px] flex flex-col justify-center items-center bg-[#FF7000] rounded-xl text-[white] font-bold">
            <p className="text-2xl">
              2
            </p>
          </div>
          <p className="text-tkh-grayscale-8 mb-[12px]">
            Evidence of outcomes can be gathered through data 
            sharing about program completion and student performance 
            within programs within the DigitalPipline. These data can be helpful 
            for both internal improvement for DigitalPipline organizations as well 
            as for pointing to evidence for funders. Additionally, 
            stronger coordination across parts of the pipeline can help
             individual programs better align their offerings that 
             are more effective in leading to future youth opportunity.
          </p>
          <h2 className="text-2xl font-bold">Improved Program Design</h2>
        </div>
      </div>
      <div className="xl:h-full w-full object-cover flex flex-col p-[50px] justify-center items-center">
        <div className="xl:w-[80%] w-[100%] h-[100%]">
          <div className="h-[52px] drop-shadow w-[52px] mb-[32px] flex flex-col justify-center items-center bg-[#FF7000] rounded-xl text-[white] font-bold">
            <p className="text-2xl">
              3
            </p>
          </div>
          <p className="text-tkh-grayscale-8 mb-[12px]">
            Evidence of outcomes can be gathered through data 
            sharing about program completion and student performance 
            within programs within the DigitalPipline. These data can be helpful 
            for both internal improvement for DigitalPipline organizations as well 
            as for pointing to evidence for funders. Additionally, 
            stronger coordination across parts of the pipeline can help
             individual programs better align their offerings that 
             are more effective in leading to future youth opportunity.
          </p>
          <h2 className="text-2xl font-bold">Improved Program Design</h2>
        </div>
      </div>
    </Carousel>
  );
}