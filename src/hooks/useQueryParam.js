import { useLocation } from "react-router-dom";

const useQueryParam = (value)=>{
  const location = useLocation()
    const queryParams = location.search.split('?').pop().split('&')
    // const queryParams = location.search.split('&')
    const param = queryParams.find(el=>{
      return el.split('=')[0] === value
    }).split('=').pop()
    return param
}

export default useQueryParam;