import CostumerDetails from '../Components/CostumerDetails'
import SearchCostumerForm from "../Components/SearchCostumerForm";
import { useCostumerContext } from "../hooks/useCostumersContext";
import { useEffect} from "react";

const Homer = () => {
  const {costumerD} = useCostumerContext()
  useEffect(()=>{

  },[])

  return (
    
    <div className="x">
      
      <div className="y">
      <SearchCostumerForm />
          
          {costumerD && costumerD.map((costumer)=>(
          
         <CostumerDetails key={costumer._id} costumer = {costumer} />
        ))}
      </div>
    </div>
  )
}

export default Homer;
