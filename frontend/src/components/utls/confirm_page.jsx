

export const Confirm = ({ type, title, handleClick, message, button_text }) => {
    return (
      <div className="flex flex-col justify-center items-center z-10  h-screen w-full ">
        <div className="flex flex-col max-w-[500px] w-[80vw] p-[72px] drop-shadow-card rounded bg-tkh-grayscale-1 ">
          
          <h1 className="text-[40px] font-[700] mb-[16px] text-tkh-grayscale-10">{title}</h1>
          
          <div className="flex flex-col gap-[24px] text-tkh-grayscale-7">

          <p>{message}</p>
            <button
                type="submit"
                className=" inline-flex items-center w-full h-[44px] justify-center
                  transition ease-in-out transform  duration-900
                 py-2 px-4 border border-tkh-brand-tangerine-5 rounded text-sm bg-tkh-brand-tangerine-5 
                 drop-shadow-btn font-semibold text-tkh-grayscale-0 shadow-sm  hover:bg-tkh-brand-tangerine-5 
                 hover:bg-tkh-grayscale-0 hover:text-tkh-brand-tangerine-5"
                onClick={(e) => handleClick(e)}
              >
                {button_text}
              </button>
          </div>

        </div>
      </div>
    );
};




