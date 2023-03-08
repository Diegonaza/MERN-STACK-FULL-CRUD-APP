import { CustomerContext } from "../context/CustomerContext";
import { useContext } from "react";

export const useCustomerContext = ()=>{
  const context = useContext(CustomerContext)

  if(!context){
    throw Error('usecustomerContext must be used inside an customerContextProvider')
  }

  return context
}