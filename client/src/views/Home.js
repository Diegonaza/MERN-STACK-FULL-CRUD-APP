import { useEffect} from "react";
import { useCostumerContext } from "../hooks/useCostumersContext";

//components
import CostumerDetails from '../Components/CostumerDetails'
import CostumerForm from "../Components/CostumerForm";

const Home = () =>{
  const {costumers,dispatch} = useCostumerContext()

  useEffect(()=>{

    const fetchCostumers = async () =>{
      const response = await fetch('http://localhost:3000/api/costumers/')
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'Set_Costumers', payload: json})
      }
    }

    fetchCostumers()
  },[])

  return (
    
    <div className="home">
      <div className="costumers">
        {costumers && costumers.map((costumer)=>(
          <CostumerDetails key={costumer._id} costumer = {costumer}/>
        ))}
      </div>
      <CostumerForm />
    </div>
  )
}

export default Home;