import {useEffect,useState} from "react";

export default function useFetchAll(urls){
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
        const promises = urls.map((url) => 
            fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
                if (response.ok) return response.json();
                throw response;
            })
        );
        Promise.all(promises)
            .then((json) => setData(json))
            .catch((e) => {
                console.error(e);
                setError(e);
            })
            .finally(() => setLoading(false));
    },[]);
    return {data, error, loading};
}