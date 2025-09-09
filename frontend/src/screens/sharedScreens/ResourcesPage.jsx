import Navbar from "../../components/sharedComponents/Navbar";
import Footer from "../../components/sharedComponents/Footer";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Hero } from "../../components/sharedComponents/Hero";
import { getResourceList } from "../../redux/resources/fetchAllResourcesSlice";
import { fetchCategories } from "../../redux/categories/getCategoriesSlice";
import { getAllTags } from "../../redux/events/fetchAllTagsSlice";
import cookie from "js-cookie";
import { ResourcesHeader } from "../../components/sharedComponents/ResourcesHeader";
import { ResourcesSearch } from "../../components/sharedComponents/ResourcesSearch";
import axios from "axios";
import { handleApiError, retryWithBackoff, validateApiResponse } from "../../utilities/apiErrorHandler";


function ResourcesPage() {
  const dispatch = useDispatch();
  const resourceList = useSelector(
    (state) => state?.getAllResources?.resourceList
  );
  const categoriesList = useSelector(
    (state) => state?.getCategories?.categories
  );
  const tagsList = useSelector(
    (state) => state?.getAllTags?.tags
  );
  const categoriesStatus = useSelector(
    (state) => state?.getCategories?.status
  );
  const categoriesError = useSelector(
    (state) => state?.getCategories?.error
  );
  const tagsStatus = useSelector(
    (state) => state?.getAllTags?.status
  );
  const tagsError = useSelector(
    (state) => state?.getAllTags?.error
  );

  const userToken = cookie.get("userToken");
  const user_id = cookie.get("userId");
  const [currentSearchTerm, setCurrentSearchTerm] = useState("");
  const [isSearchSubmitted, setIsSearchSubmitted] = useState(false);
  const [filteredResources, setFilteredResources] = useState([]);
  const logged_in = cookie.get('isLoggedIn')  
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [filterdCategories, setFilterdCategories] = useState([]);
  const [filterdTags, setFilterdTags] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [filterError, setFilterError] = useState(null);
  

  useEffect(() => {
    dispatch(getResourceList({ user_id }));
    dispatch(fetchCategories());
    dispatch(getAllTags());
  }, []);

  useEffect(() => {
    setCategories(categoriesList?.categories);
    setTags(tagsList?.tags);
    
  }, [ categoriesList, tagsList]);
  

  console.log("categories",categoriesList)
  console.log("tags",tagsList) 
  
  const handleSubmit = async (resource) => {
    resource.preventDefault();
    setIsFiltering(true);
    setFilterError(null);
    
    try {
      if (currentSearchTerm !== ""|| (filterdCategories?.length == 0 || filterdCategories == null) && (filterdTags?.length == 0 || filterdTags == null) ) {
        setIsSearchSubmitted(true);
        filterResources(currentSearchTerm);
      }
      if (currentSearchTerm !== ""&& filterdCategories?.length > 0 && (filterdTags?.length == 0 || filterdTags == null)) {
        setIsSearchSubmitted(true);
        await categoryFilter();
      }
      if (currentSearchTerm !== ""&& filterdTags?.length > 0 && (filterdCategories?.length == 0 || filterdCategories == null)) {
        setIsSearchSubmitted(true);
        await tagFilter();
      }
      if (currentSearchTerm == "" && filterdCategories?.length > 0 && (filterdTags?.length == 0|| filterdTags == null)) {
        setIsSearchSubmitted(true);
        filterResourcesCategory(currentSearchTerm);
      }
      if (currentSearchTerm == "" && filterdTags?.length > 0 && (filterdCategories?.length == 0 || filterdCategories == null)) {
        setIsSearchSubmitted(true);
        filterResourcesTag(currentSearchTerm);
      }
      if (currentSearchTerm == "" && filterdCategories?.length > 0 && filterdTags?.length > 0) {
        setIsSearchSubmitted(true);
        filterResourcesAll(currentSearchTerm)
      }
      if (currentSearchTerm == "" && (filterdCategories?.length == 0 || filterdCategories == null) && (filterdTags?.length == 0 || filterdTags == null)) {
        setIsSearchSubmitted(true);
        setFilteredResources(resourceList)
      }
    } catch (error) {
      console.error("Filter error:", error);
      setFilterError("An error occurred while filtering resources. Please try again.");
    } finally {
      setIsFiltering(false);
    }
  };

  const retryFailedRequests = () => {
    setFilterError(null);
    dispatch(fetchCategories());
    dispatch(getAllTags());
  };




  const filterResources = (searchTerm) => {
    try {
      if (!resourceList || !Array.isArray(resourceList)) {
        setFilterError("No resources available to filter");
        setFilteredResources([]);
        return;
      }

      let tempArr = [];
      const resources = resourceList.filter((e) => {
        if (e && e.name && e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          tempArr.push(e);
        } else if (e && e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          tempArr.push(e);
        }
      });

      setFilteredResources(tempArr);
    } catch (error) {
      console.error("Error in filterResources:", error);
      setFilterError("Error filtering resources by search term");
      setFilteredResources([]);
    }
  };

  const filterResourcesCategory = (searchTerm) => {
    try {
      if (!resourceList || !Array.isArray(resourceList) || !filterdCategories || !Array.isArray(filterdCategories)) {
        setFilterError("Invalid data for category filtering");
        setFilteredResources([]);
        return;
      }

      let data = filterdCategories.map(e => e.label).toString();
      let tempArr = [];
      const resources = resourceList.filter((e) => {
        if (e && e.name && e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          tempArr.push(e);
        } else if (e && e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          tempArr.push(e);
        }
      });
      
      const resourceByCategory = tempArr.filter((resource) => 
        resource && resource.categories && Array.isArray(resource.categories) &&
        resource.categories.some(cat => cat && cat.name && data.includes(cat.name))
      );
      
      setFilteredResources(resourceByCategory);
    } catch (error) {
      console.error("Error in filterResourcesCategory:", error);
      setFilterError("Error filtering resources by category");
      setFilteredResources([]);
    }
  };

  const filterResourcesTag= (searchTerm) => {
    try {
      if (!resourceList || !Array.isArray(resourceList) || !filterdTags || !Array.isArray(filterdTags)) {
        setFilterError("Invalid data for tag filtering");
        setFilteredResources([]);
        return;
      }

      let data = filterdTags.map(e => e.label).toString();
      let tempArr = [];
      const resources = resourceList.filter((e) => {
        if (e && e.name && e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          tempArr.push(e);
        } else if (e && e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          tempArr.push(e);
        }
      });
      
      const resourceByTag = tempArr.filter((resource) => 
        resource && resource.tags && Array.isArray(resource.tags) &&
        resource.tags.some(tag => tag && tag.name && data.includes(tag.name))
      );

      setFilteredResources(resourceByTag);
    } catch (error) {
      console.error("Error in filterResourcesTag:", error);
      setFilterError("Error filtering resources by tag");
      setFilteredResources([]);
    }
  };

  const categoryFilter = async () => {
    try {
      if (!filterdCategories || !Array.isArray(filterdCategories) || filterdCategories.length === 0) {
        setFilterError("No categories selected for filtering");
        setFilteredResources([]);
        return;
      }

      let categories = filterdCategories.map(e => e.value).filter(Boolean);
      
      const filterFunction = async () => {
        const res = await axios({
          method: "POST",
          data: { categories },
          url: `${import.meta.env.VITE_BXDP_PROD_SERVER}/resources/by_category`,
        });
        
        if (!validateApiResponse(res.data, "array")) {
          throw new Error("Invalid response format from server");
        }
        
        return res.data;
      };

      const data = await retryWithBackoff(filterFunction);
      setFilteredResources(data);
    } catch (error) {
      console.error("Error in categoryFilter:", error);
      const errorMessage = handleApiError(error, "filtering resources by category");
      setFilterError(errorMessage);
      setFilteredResources([]);
      throw error;
    }
  };

  const tagFilter = async () => {
    try {
      if (!filterdTags || !Array.isArray(filterdTags) || filterdTags.length === 0) {
        setFilterError("No tags selected for filtering");
        setFilteredResources([]);
        return;
      }

      let tags = filterdTags.map(e => e.value).filter(Boolean);
      
      const filterFunction = async () => {
        const res = await axios({
          method: "POST",
          data: { tags },
          url: `${import.meta.env.VITE_BXDP_PROD_SERVER}/resources/by_tag`,
        });
        
        if (!validateApiResponse(res.data, "array")) {
          throw new Error("Invalid response format from server");
        }
        
        return res.data;
      };

      const data = await retryWithBackoff(filterFunction);
      setFilteredResources(data);
    } catch (error) {
      console.error("Error in tagFilter:", error);
      const errorMessage = handleApiError(error, "filtering resources by tag");
      setFilterError(errorMessage);
      setFilteredResources([]);
      throw error;
    }
  };

  const filterResourcesAll = (searchTerm) => {
    try {
      if (!resourceList || !Array.isArray(resourceList) || !filterdCategories || !Array.isArray(filterdCategories) || !filterdTags || !Array.isArray(filterdTags)) {
        setFilterError("Invalid data for combined filtering");
        setFilteredResources([]);
        return;
      }

      let data = filterdCategories.map(e => e.label).toString();
      let data2 = filterdTags.map(e => e.label).toString();
      let tempArr = [];
      
      const resources = resourceList.filter((e) => {
        if (e && e.name && e.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          tempArr.push(e);
        } else if (e && e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase())) {
          tempArr.push(e);
        }
      });
      
      const resourceByCategory = tempArr.filter((resource) => 
        resource && resource.categories && Array.isArray(resource.categories) &&
        resource.categories.some(cat => cat && cat.name && data.includes(cat.name))
      );
      
      const resourceByTag = resourceByCategory.filter((resource) => 
        resource && resource.tags && Array.isArray(resource.tags) &&
        resource.tags.some(tag => tag && tag.name && data2.includes(tag.name))
      );
      
      setFilteredResources(resourceByTag);
    } catch (error) {
      console.error("Error in filterResourcesAll:", error);
      setFilterError("Error filtering resources by multiple criteria");
      setFilteredResources([]);
    }
  };

  const backgraound = `flex-row  h-full bg-center bg-no-repeat bg-cover bg-[url('https://bxtp-static.s3.amazonaws.com/img/bg/bg_5.png')]`
  
  return (
    <div className="flex flex-col justify-between min-h-screen w-screen">
      <Hero 
        title="Resources" 
        text="Browse educational resources across our partnerships"
        img="https://as1.ftcdn.net/v2/jpg/03/01/24/58/1000_F_301245840_zwJpFB1MCmJkTg1tMDK9pFnCwce6dQ1T.jpg"
        page="/user_registration"
        page2="/org_user_registration"
        btn_text="Join as a Member"
        btn_text2="Join as a Organization"
        backgraound={backgraound}
        logged_in={logged_in}
      /> 
     {/* <FeaturedResources activeResources={recommendedResources} />  */}
      <ResourcesHeader
        currentSearchTerm={currentSearchTerm}
        setCurrentSearchTerm={setCurrentSearchTerm}
        handleSubmit={handleSubmit}
        categories={categories}
        setCategories={setCategories}
        filterdCategories={filterdCategories}
        setFilterdCategories={setFilterdCategories}
        tags={tags}
        setTags={setTags}
        filterdTags={filterdTags}
        setFilterdTags={setFilterdTags}
        isFiltering={isFiltering}
        categoriesStatus={categoriesStatus}
        categoriesError={categoriesError}
        tagsStatus={tagsStatus}
        tagsError={tagsError}
      />
      
      {/* Error Messages */}
      {filterError && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-800">{filterError}</p>
              </div>
              <div className="ml-auto pl-3">
                <div className="-mx-1.5 -my-1.5">
                  <button
                    onClick={() => setFilterError(null)}
                    className="inline-flex rounded-md bg-red-50 p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-red-50"
                  >
                    <span className="sr-only">Dismiss</span>
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Error Messages */}
      {(categoriesError || tagsError) && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-800">
                  {categoriesError && tagsError 
                    ? "Failed to load both categories and tags. Some filtering options may not be available."
                    : categoriesError 
                    ? "Failed to load categories. Category filtering may not work properly."
                    : "Failed to load tags. Tag filtering may not work properly."
                  }
                </p>
                <div className="mt-2">
                  <button
                    onClick={retryFailedRequests}
                    className="text-sm text-yellow-800 underline hover:text-yellow-900"
                  >
                    Retry loading data
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isFiltering && (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-4">
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="animate-spin h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-800">Filtering resources...</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <ResourcesSearch resources={ isSearchSubmitted ? filteredResources : resourceList}/>
      {/* {isSearchSubmitted ? renderSearchResults() : null}*/}
      
      <Footer />
    </div>
  );
}

export default ResourcesPage;
