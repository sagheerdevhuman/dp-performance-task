
import { Carousel, IconButton } from "@material-tailwind/react";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export function Description({description}) {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);

console.log("description",description)
  const sliceAtLastWord = (str) => {
    if (!str || str.trim() === "") {
    return "";
    }

    const lastSpaceIndex = str.lastIndexOf(" ");

    if (lastSpaceIndex === -1) {
    return str;
    }

    return str.slice(0, lastSpaceIndex);
}

const shorten = (str,num) => {

    if (str.length<=num){
        return str.replace(/<[^>]+>/g, '')
    }
    return str.replace(/<[>]+>/g, '').slice(3,num) 
}

 
    const prev = sliceAtLastWord(shorten( description,300))+ '...';
    const markup = { __html: prev };
  

  
  return (
    <>
     <div className="mb-4 text-sm  line-clamp-4 break-word" dangerouslySetInnerHTML={markup}/> 
    </>
  );
}