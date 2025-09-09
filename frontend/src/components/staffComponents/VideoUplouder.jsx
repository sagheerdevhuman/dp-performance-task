// import AWS from "aws-sdk";
// import { Amplify, Auth, Storage } from 'aws-amplify';
import { useState, useEffect, useRef } from "react";
import axios from "axios";


const VideoUploader= ({setFile, errors, setErrors, type}) => {
  const fileInput = useRef(null)

  const apiDomain = import.meta.env.VITE_BXDP_DEV_SERVER;

  async function handleFileInput (e) {
    // Uploaded file
      let form = new FormData();
      const file = e.target.files[0];
      form.append("file",file)
      const result = await axios({
        method: "POST",
        data: form,
        url: `${apiDomain}/files`,
      }).then((res) => {
        return res;
        alert(res)
      });
      setFile(result.data);
      if (errors[type]) {
        setErrors({
          ...errors,
          [type]: false
        });
      }
      
    };
   
    return (
      <label className="flex flex-col text-tkh-grayscale-7 w-3/4 py-2">
          <input
            type="file"
            accept="video/*"
          className="block w-full text-sm text-late-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          onChange={handleFileInput}
        />
         <button className="btn btn-primary"/>
    </label>
  );
};

export default VideoUploader;
