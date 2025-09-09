  import { useNavigate } from "react-router-dom";



const OrgProfile = ({ org }) => {
  console.log("org",org)
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/partners_page/partnerProfile/${org.org_id}`);
  }

  return (
    <div className="h-[55vh] w-full p-0 rounded-md shadow-lg  p-[30px]">
      <div className="flex flex-row justify-between px-4 py-4 mb-2">
        <div className="sm:flex-auto">
          <h1 className="h-9 justify-center text-2xl font-bold text-tkh-brand-tangerine-5">
            Org Profile
          </h1>
        </div>
        
      <div className="md:ml-2 flex  m-0 w-[53.36616px] h-[36px] bg-tkh-brand-tangerine-5 rounded-md justify-center items-center">
          <a className={
              "inline-flex font-[600] capitalize items-center p-4 text-sm md:rounded-t-lg m-0  text-white" 
            }
            onClick={handleClick}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M12.6484 16.4365C14.8544 16.4365 16.6484 14.6425 16.6484 12.4365C16.6484 10.2305 14.8544 8.43652 12.6484 8.43652C10.4424 8.43652 8.64844 10.2305 8.64844 12.4365C8.64844 14.6425 10.4424 16.4365 12.6484 16.4365ZM12.6484 10.4365C13.7324 10.4365 14.6484 11.3525 14.6484 12.4365C14.6484 13.5205 13.7324 14.4365 12.6484 14.4365C11.5644 14.4365 10.6484 13.5205 10.6484 12.4365C10.6484 11.3525 11.5644 10.4365 12.6484 10.4365Z" fill="white"/>
              <path d="M3.49366 16.5725L4.49366 18.3025C5.02466 19.2195 6.30266 19.5635 7.22366 19.0325L7.75266 18.7265C8.33466 19.1835 8.97366 19.5585 9.64866 19.8385V20.4365C9.64866 21.5395 10.5457 22.4365 11.6487 22.4365H13.6487C14.7517 22.4365 15.6487 21.5395 15.6487 20.4365V19.8385C16.3237 19.5585 16.9627 19.1835 17.5447 18.7275L18.0737 19.0335C18.9967 19.5635 20.2717 19.2215 20.8047 18.3025L21.8037 16.5735C22.3557 15.6185 22.0277 14.3925 21.0727 13.8415L20.5677 13.5495C20.6217 13.1785 20.6487 12.8075 20.6487 12.4365C20.6487 12.0655 20.6217 11.6935 20.5677 11.3255L21.0727 11.0335C22.0277 10.4815 22.3557 9.25652 21.8037 8.30152L20.8047 6.57252C20.2737 5.65252 18.9967 5.30752 18.0737 5.84052L17.5447 6.14652C16.9627 5.68952 16.3237 5.31452 15.6487 5.03452V4.43652C15.6487 3.33352 14.7517 2.43652 13.6487 2.43652H11.6487C10.5457 2.43652 9.64866 3.33352 9.64866 4.43652V5.03452C8.97366 5.31452 8.33466 5.68952 7.75266 6.14552L7.22366 5.83952C6.29966 5.30852 5.02366 5.65252 4.49266 6.57152L3.49366 8.30052C2.94166 9.25552 3.26966 10.4815 4.22466 11.0325L4.72966 11.3245C4.67566 11.6935 4.64866 12.0655 4.64866 12.4365C4.64866 12.8075 4.67566 13.1785 4.72966 13.5475L4.22466 13.8395C3.26966 14.3915 2.94166 15.6175 3.49366 16.5725ZM6.81966 13.8145C6.70666 13.3615 6.64866 12.8975 6.64866 12.4365C6.64866 11.9745 6.70666 11.5105 6.81866 11.0585C6.92666 10.6255 6.73566 10.1735 6.34866 9.95052L5.22566 9.30052L6.22366 7.57152L7.36866 8.23352C7.75266 8.45452 8.23566 8.39852 8.55666 8.09152C9.23966 7.44452 10.0637 6.96052 10.9407 6.69252C11.3617 6.56452 11.6487 6.17552 11.6487 5.73652V4.43652H13.6487V5.73652C13.6487 6.17552 13.9357 6.56452 14.3567 6.69252C15.2337 6.96152 16.0577 7.44452 16.7407 8.09152C17.0617 8.39852 17.5467 8.45352 17.9287 8.23352L19.0727 7.57252L20.0727 9.30152L18.9487 9.95052C18.5617 10.1745 18.3707 10.6265 18.4787 11.0585C18.5907 11.5105 18.6487 11.9745 18.6487 12.4365C18.6487 12.8975 18.5907 13.3615 18.4777 13.8145C18.3707 14.2475 18.5617 14.6995 18.9487 14.9225L20.0717 15.5715L19.0737 17.3005L17.9287 16.6395C17.5457 16.4185 17.0617 16.4735 16.7407 16.7815C16.0577 17.4285 15.2337 17.9125 14.3567 18.1805C13.9357 18.3085 13.6487 18.6975 13.6487 19.1365L13.6507 20.4365H11.6487V19.1365C11.6487 18.6975 11.3617 18.3085 10.9407 18.1805C10.0637 17.9115 9.23966 17.4285 8.55666 16.7815C8.36666 16.5995 8.11866 16.5065 7.86866 16.5065C7.69666 16.5065 7.52466 16.5505 7.36866 16.6405L6.22466 17.3025L5.22466 15.5735L6.34866 14.9225C6.73566 14.6995 6.92666 14.2475 6.81966 13.8145Z" fill="white"/>
            </svg>
          </a>
      </div> 
      </div>
      <div className="flex w-full flex-row justify-between h-[40vh] overflow-auto px-4 py-4">
        <div className="flex flex-col w-full"> 
          <p className="text-[#A0AEC0] text-sm">{org.description}</p>
          <svg className="w-full my-[10px]" xmlns="http://www.w3.org/2000/svg" height="2" viewBox="0 0 346 2" fill="none">
            <path d="M0.421631 1H345.713" stroke="#E2E8F0"/>
          </svg>
          <p className="text-[#A0AEC0] text-sm mb-[18.5px]"><span className="text-tkh-grayscale-7 font-bold">Full Name:</span> {org.name}</p>
          <p className="text-[#A0AEC0] text-sm mb-[18.5px]"><span className="text-tkh-grayscale-7 font-bold">Email:</span> {org.info_email}</p>
          <p className="text-[#A0AEC0] text-sm mb-[18.5px]"><span className="text-tkh-grayscale-7 font-bold">Phone:</span> {org.phone}</p>
          <p className="text-[#A0AEC0] text-sm mb-[18.5px]"><span className="text-tkh-grayscale-7 font-bold">Location:</span> {org.location}</p>
          <p className="text-[#A0AEC0] text-sm"><span className="text-tkh-grayscale-7 font-bold">Website:</span> {org.website}</p>
        
        </div>
      </div>

    </div>
  );
};

export default OrgProfile; 
