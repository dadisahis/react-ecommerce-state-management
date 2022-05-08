import {useEffect,useState,useRef} from "react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url){
    const isMounted = useRef(false);
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(true);


    useEffect(()=>{
        isMounted.current = true;
        async  function init(){
            try {
                const respone = await fetch(baseUrl + url);
                if (respone.ok){
                    const json = await respone.json()
                    if (isMounted.current) setData(json)
                }else{
                    throw respone
                }
            }catch (e){
                if (isMounted.current) setError(e);
            }finally{
                if (isMounted.current) setLoading(false);
            }
        }
        init();

        return () =>{
            isMounted.current=false
        }
    },[url]);
    return {data, error, loading};
}

export function Fetch({url, render}){
    const {data, loading, error} = useFetch(url);
    return render(data,loading,error);
}