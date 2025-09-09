import { SearchIcon } from "@heroicons/react/outline";
import {  Filter} from "./Filter"

export const EventsHeader = ({
  currentSearchTerm,
  setCurrentSearchTerm,
  handleSubmit,
  tags,
  setTags,
  filterdTags,
  setFilterdTags
}) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-start md:items-center lg:p-[72px] p-[20px] ">
      <div className="flex flex-col justify-start items-center  w-1/2  ">
        <h1 className="text-[40px] max-w-[550px] tracking-tight text-[900] leading-tight ">
        Events
        </h1>
      </div>
      <div className="flex flex-col justify-end items-center w-1/2 ">
      <form
        className="flex flex-col md:flex-row  md:justify-center md:items-center gap-3 md:mx-5 mt-3"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Filter data={tags} data2={filterdTags} setData={setFilterdTags} type="tag" />
        <input
          type="search"
          value={currentSearchTerm}
          placeholder="I'm looking for..."
          className="h-[44px] rounded-md"
          onChange={(e) => {
            setCurrentSearchTerm(e.target.value);
          }}
        />
        
        <button className="inline-flex transition ease-in-in duration-300 items-center justify-center h-[44px] w-full md:w-28 px-[26] py-2.5 rounded drop-shadow-btn text-sm font-semibold hover:text-tkh-grayscale-7 border-2 bg-tkh-brand-tangerine-5  hover:bg-tkh-grayscale-0 border-tkh-brand-tangerine-5 text-tkh-grayscale-0">
          Search
        </button>
      </form>
      </div>
    </div>
  );
};
