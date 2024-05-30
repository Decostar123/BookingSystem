'use client'
import React, {useState} from 'react' ; 

import { CircleX } from "lucide-react"; 
import errorMessage from "./css/errorMessage.module.css"


const ErrorMessage : React.FC<any> = ({ error , setShowError}) => {
 
  

  function hideShowError(){

    setShowError( false) ;
  }
 
  return (
    <p className={errorMessage.error}>{error}  <CircleX className={errorMessage.crossIcon} onClick={hideShowError}/> </p>
  )
}

export default ErrorMessage