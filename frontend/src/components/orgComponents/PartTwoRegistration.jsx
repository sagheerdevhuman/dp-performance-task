import FileUploader from "./FileUploader";

export const PartTwoRegistration = ({
  formData,
  setFormData,
  page,
  setPage,
  sampleImg,
  selectedImage,
  setSelectedImage,
  selectedImage2,
  setSelectedImage2,
  errors,
  setErrors
}) => {

  
  const handleChangeBasic = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
    
  };
  const handleChangeName = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: 
        value.charAt(0).toUpperCase() +
        value.slice(1),
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
    
  };
  const handleChangeEmail = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toLowerCase(),
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
    
  };
  const handleChangeWebsite = (e) => {
    const { name, value } = e.target;
    if (value.includes("https" || "http")) {
      return setFormData({
        ...formData,
        website: value.toLowerCase(),
      });
    } else {
      return setFormData({
        ...formData,
        website: "https://" + value.toLowerCase(),
      });
    }
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: false
      });
    }
    
  };
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-3 w-full pt-10 2xl:py-20">
        <h1 className="lg:w-9/12 text-3xl sm:text-4xl font-bold text-center md:text-left">
          Organization Info:
        </h1>
       {/* <h2 className="lg:w-9/12 text-3xl text-center md:text-left">
          (Step 1 of 2)
        </h2>*/}

        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Organization's Name*
          <input
            type="text"
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            placeholder="Type here..."
            name="name"
            value={formData.name}
            onChange={handleChangeName}
          />
          { errors.name && <span style={{color: 'red'}}>Organization's Name is required</span>}
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Organization's Description*
          <input
            type="text"
            name="description"
            placeholder="Type here..."
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.description}
            onChange={handleChangeName}
          />
          { errors.description && <span style={{color: 'red'}}>Organization's Description is required</span>}
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Email*
          <input
            type="email"
            name="infoEmail"
            placeholder="Type here..."
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.infoEmail}
            onChange={handleChangeEmail}
          />
          { errors.infoEmail && <span style={{color: 'red'}}>Email is required</span>}
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Official Website*
          <input
            type="url"
            name="website"
            placeholder="Type here..."
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.website}
            onChange={handleChangeWebsite}
          />
          { errors.website && <span style={{color: 'red'}}>Official Website is required</span>}
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Address*
          <input
            type="text"
            name="addressA"
            placeholder="Type here..."
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.addressA}
            onChange={handleChangeBasic}
          />
          { errors.addressA && <span style={{color: 'red'}}>Logo Image is Address</span>}
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Apartment (optional, not required)
          <input
            type="text"
            name="addressB"
            placeholder="apartment number"
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.addressB}
            onChange={handleChangeBasic}
          />
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          City*
          <input
            type="text"
            name="city"
            placeholder="city"
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.city}
            onChange={handleChangeBasic}
          />
          { errors.city && <span style={{color: 'red'}}>City is required</span>}
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          State*
          <input
            type="text"
            name="state"
            placeholder="state"
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.state}
            onChange={handleChangeBasic}
          />
          { errors.state && <span style={{color: 'red'}}>State is required</span>}
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4">
          Zip Code*
          <input
            type="text"
            pattern="[0-9]{5,10}"
            name="zipcode"
            placeholder="Type here..."
            className="lg:w-4/5 rounded sm:text-xl xl:text-2xl text-pink-500 text-tkh-grayscale-10"
            value={formData.zipcode}
            onChange={handleChangeBasic}
          />
          { errors.zipcode && <span style={{color: 'red'}}>Zip Code is required</span>}
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4 pt-2">
          Logo*
          <FileUploader setFile={setSelectedImage} errors={errors}
          setErrors={setErrors} type={"logoUrl"}/>
          { errors.logoUrl && <span style={{color: 'red'}}>Logo Image is required</span>}
        </label>
        <label className="flex flex-col text-tkh-grayscale-7 w-3/4 pt-2">
          Banner Image*
          <FileUploader setFile={setSelectedImage2} errors={errors}
          setErrors={setErrors} type={"bannerUrl"} />
          {errors.bannerUrl && <span style={{color: 'red'}}>Banner Image is required</span>}
        </label>

        <div className="mt-3  w-3/4 ">
          <button
            className="h-10 w-full lg:mb-6 border-0 rounded-md bg-tkh-brand-tangerine-2 text-center text-tkh-grayscale-0 font-bold"
            type="submit"
          >
            Register Organization
          </button>
          {/*<button
            className="h-10 w-full lg:mb-6 lg:w-2/5 xl:w-2/5 2xl:w-1/3 border-0 rounded-md text-center text-tkh-grayscale-5 font-bold"
            disabled={page == 0}
            onClick={() => {
              setPage((currPage) => currPage - 1);
            }}
          >
            Previous Step
          </button>*/}
        </div>
      </div>
    </>
  );
};
