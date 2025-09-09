const EditOrgForm = ({
  modalRendered,
  handleOrgFormRendering,
  setActiveButton,
  formData,
  setFormData,
  handleFormSubmit,
  selectedImage,
  handleImageChange,
}) => {
  if (modalRendered) {
    return (
      <div className="flex flex-col justify-center items-center absolute top-1.5 z-10 max-h-full h-full min-w-full bg-transparent">
        <div className="flex flex-col justify-center items-center mt-10  relative max-h-screen h-4/5 w-5/12 rounded-md bg-tkh-grayscale-1 border-2">
          <button
            className="absolute -top-3 -right-4 bg-tkh-grayscale-5 border rounded-full px-2.5 py-0.5 z-10"
            onClick={(e) => {
              handleOrgFormRendering(e);
              setActiveButton("requests");
            }}
          >
            X
          </button>

          <form
            className="text-3xl flex flex-col justify-evenly items-center 2xl:gap-2 pb-7 h-full w-full overflow-x-hidden"
            style={{ contain: "content" }}
            onSubmit={(e) => handleFormSubmit(e)}
          >
            <h1 className="text-4xl font-bold pt-7">
              Organization Information
            </h1>
            <label className="flex flex-col w-4/5 text-tkh-grayscale-9 text-xl">
              Name
              <input
                className="text-3xl rounded text-pink-500 text-tkh-grayscale-10"
                type="text"
                placeholder="Type here..."
                name="name"
                value={formData.orgName}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    orgName: e.target.value,
                  });
                }}
              ></input>
            </label>

            <label className="flex flex-col w-4/5 text-tkh-grayscale-9 text-xl">
              Description
              <input
                className="text-3xl rounded text-pink-500 text-tkh-grayscale-10"
                type="text"
                placeholder="Type here..."
                name="description"
                value={formData.orgDescription}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    orgDescription: e.target.value,
                  });
                }}
              />
            </label>

            <label className="flex flex-col w-4/5 text-tkh-grayscale-9 text-xl">
              Website
              <input
                type="url"
                pattern="(?!-)(https?:\/\/)((www.)?[a-zA-Z0-9?-]{3,63})+\.((com|org|net|co|us){1})/?"
                name="website"
                placeholder="Type here..."
                className="text-3xl rounded text-pink-500 text-tkh-grayscale-10"
                value={formData.orgWebsite}
                onChange={(e) => {
                  if (e.target.value.includes("https" || "http")) {
                    return setFormData({
                      ...formData,
                      orgWebsite: e.target.value.toLowerCase(),
                    });
                  } else {
                    return setFormData({
                      ...formData,
                      orgWebsite: "https://" + e.target.value.toLowerCase(),
                    });
                  }
                }}
              />
            </label>

            <label className="flex flex-col w-4/5 text-tkh-grayscale-9 text-xl">
              Address 1
              <input
                type="text"
                name="addressA"
                placeholder="Type here..."
                className="text-3xl rounded text-pink-500 text-tkh-grayscale-10"
                value={formData.orgAddressA}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    orgAddressA: e.target.value,
                  });
                }}
              />
            </label>

            <label className="flex flex-col w-4/5 text-tkh-grayscale-9 text-xl">
              Address 2
              <input
                type="text"
                name="addressB"
                placeholder="Type here..."
                className="text-3xl rounded text-pink-500 text-tkh-grayscale-10"
                value={formData.orgAddressB}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    orgAddressB: e.target.value,
                  });
                }}
              />
            </label>

            <label className="flex flex-col w-4/5 text-tkh-grayscale-9 text-xl">
              Zipcode
              <input
                type="text"
                name="zipcode"
                pattern="[0-9]{5,10}"
                placeholder="Type here..."
                className="text-3xl rounded text-pink-500 text-tkh-grayscale-10 mb-3"
                value={formData.orgZipCode}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    orgZipCode: e.target.value,
                  });
                }}
              />
            </label>
            <label className="flex flex-col text-tkh-grayscale-7 w-3/4 pt-2">
              <input
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                onChange={handleImageChange}
              />
            </label>

            <button
              className="inline-flex items-center justify-center h-10 w-28 px-5 py-2.5 border border-tkh-grayscale-7 rounded-md shadow-sm text-sm font-semibold text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:border-tkh-brand-tangerine-1 hover:text-tkh-grayscale-8 active:border-tkh-brand-tangerine-2  active:bg-tkh-brand-tangerine-2"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
};

export default EditOrgForm;
