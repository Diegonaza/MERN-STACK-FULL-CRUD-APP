import { CostumerContext } from "../context/CostumerContext";
import { useContext } from "react";

export const useCostumerContext = ()=>{
  const context = useContext(CostumerContext)

  if(!context){
    throw Error('useCostumerContext must be used inside an CostumerContextProvider')
  }

  return context
}