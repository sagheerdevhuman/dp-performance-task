export const AddSkillForm = ({
  handleClick,
  handleAddSkill,
  isModalRendered,
  selectedImage,
  handleImageChange,
}) => {
  return (
    <form
      className="text-3xl flex flex-col justify-center items-center gap-7 pt-20  w-full border-t bg-tkh-grayscale-1 overflow-auto"
      onSubmit={(e) => handleAddSkill(e)}
    >
      <label className="flex flex-col justify-center items-center  w-full text-tkh-grayscale-7">
        Skill Name
        <input
          className="text-3xl rounded text-pink-500 2xl:w-7/12 w-3/4 text-tkh-grayscale-10"
          type="text"
          placeholder="Type here..."
          name="name"
        />
      </label>

      <label className="flex flex-col justify-center items-center w-full text-tkh-grayscale-7">
        Skill Description
        <textarea
          type="text"
          name="description"
          placeholder="Type here..."
          className="text-3xl rounded text-pink-500 2xl:w-7/12 w-3/4 text-tkh-grayscale-10"
        />
      </label>

      <button
        className="inline-flex items-center justify-center h-10 w-28 px-5 py-2.5 border border-tkh-grayscale-7 rounded-md shadow-sm text-sm font-semibold text-tkh-grayscale-7 hover:bg-tkh-brand-tangerine-1 hover:border-tkh-brand-tangerine-1 hover:text-tkh-grayscale-8 active:border-tkh-brand-tangerine-2  active:bg-tkh-brand-tangerine-2"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
