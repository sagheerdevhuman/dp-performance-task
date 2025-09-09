import tempImg from "../../assets/login_image.png";
import { useNavigate } from "react-router-dom";

export const FeaturedPartners = ({ partners }) => {
  if (partners && partners.length !== 0) {
    const featuredList = partners.filter(partner => partner.is_featured===true).slice(
      partners.length !== 3 ? 0 : partners.length - 3
    ); 

    console.log(partners)
    const navigate = useNavigate();
    return (
      <>
        <style>
          {`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
        <div className="flex flex-col justify-center items-center px-0 pt-[80px] pb-0">
          <div className="flex flex-col w-[100vw] justify-center items-center mt-2 text-center">
            <h1 className="text-[40px] mb-[27px] font-[700] tracking-tight leading-tight text-[#000]">
              Featured Partners
            </h1>
            <p className="text-[18px] text-center text-[#000] font-[400]">
              These partners are joining forces to increase access to opportunities
            </p>
          </div>
        </div>
        <div className="flex flex-row w-[100vw] justify-center items-center mx-2 text-center overflow-x-auto no-scrollbar">
          <div className="flex flex-col justify-center items-center px-0 pt-0 pb-[104px]">
            <div className="mt-8 md:mt-[40px]  flex justify-center gap-4 w-fit overflow-x-auto no-scrollbar">
              {featuredList.map((partner) => (
                <div
                  key={partner.org_id}
                  className="flex justify-center h-[100px] w-[196px] items-center rounded border border-[#E2E5F1] border-solid border-2 transition ease-in-out transform scale-75 hover:scale-90 duration-300 hover:drop-shadow-card-2 cursor-pointer"
                  onClick={() => navigate(`/partners_page/partnerProfile/${partner.org_id}`)}
                >
                  <img
                    src={partner.logo_url}
                    alt="Logo"
                    className="flex flex-col m-4 max-h-[75px] max-w-[182px]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }
  return null;
};
