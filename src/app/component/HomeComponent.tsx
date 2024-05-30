'use client'
import React , {useEffect, useState} from 'react'
import { BusFront , ArrowRightLeft  } from 'lucide-react';
import home from "../css/home.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const HomeComponent = () => {

  const [ fromCityList, setFromCityList] = useState([]) ; 
  const [ toCityList, setToCityList] = useState([]) ; 
  const [ originalCityList, setOriginalCityList] = useState([]) ; 
  const [ journeyDate, setJourneyDate] = useState("") ; 

  const [todayDate , setTodayDate] = useState("") ; 


  const [ fromCity , setFromCity] = useState(""); 
  const [ toCity , setToCity] = useState("");  
  const [ fromCityID , setFromCityID] = useState(-1); 
  const [ toCityID , setToCityID] = useState(-1);  

  useEffect(()=>{
    let city =getCityName() ; 
    setOriginalCityList( city ) ;  
    let day = getTodayDate() ; 
    setTodayDate( day ) ;
  }  , [] )

  function getCityName(){
      let city : any = localStorage.getItem("city")  ; 
      if( !city ){
        city = [{ id : 1 , name : 'Ahmedabad'} , { id : 2 , name : 'Bhuj'}  , 
        { id : 3 , name : 'Bhavnagar'} , { id : 4 , name : 'Surat'}  , { id : 5 , name : 'Rajkot'}     ] ; 

        localStorage.setItem("city" , JSON.stringify( city )) ; 
      }
      city = localStorage.getItem("city") ;
      city = JSON.parse( city ) ; 
      return city ; 
  }
  function filterFromCity( val : any){
    setFromCity( val ) ; 
        if( !val ){
          setFromCityList( []) ; 
          return  ; 
        }
        const arr = originalCityList.filter( ( ele : any) => ele.name.toLowerCase().includes(val.toLowerCase()) ) ; 
        setFromCityList( arr) ; 
  }
  function filterToCity( val : any){
    setToCity( val ) ; 
        if( !val ){
          setToCityList( []) ; 
          return  ; 
        }
        const arr = originalCityList.filter( ( ele : any) => ele.name.toLowerCase().includes(val.toLowerCase()) ) ; 
        setToCityList( arr) ; 
  }
 
  function confirmFromCity(ele:any){
    // alert("hi"); 
    console.log( ele ) ; 
      setFromCity( ele.name ) ;
      setFromCityID( ele.id )  ;
      setFromCityList([]) ; 

  }
  function confirmToCity(ele:any){
    // alert("hi"); 
    console.log( ele ) ; 
      setToCity( ele.name ) ;
      setToCityID( ele.id )  ;
      setToCityList([]) ; 

  }
  function exchangeCityName(){
    // alert("hi")
      let temp1 = fromCity ;
      let temp2 = toCity ; 
      if( !temp1 || !temp2 || fromCityID === -1 || toCityID === -1 || fromCityList.length !== 0 || toCityList.length !== 0   ){
          return ;
      }
      setFromCity( temp2) ;
      setToCity( temp1);  

  }
  function getTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

  function searchBus(){
    console.log( fromCityID , fromCity , toCityID  , toCity , journeyDate ) ; 

    let validEntries = validBusEntries()  ; 
    if( !validEntries){
        toast.error("InValid Bus Entries") ; 
        return ; 
    }
  
    localStorage.setItem("fromCity" , fromCity) ; 
    localStorage.setItem("fromCityID" , String(fromCityID) ) ; 
    localStorage.setItem("toCity" , toCity) ; 
    localStorage.setItem("toCityID" , String(toCityID)) ; 
    localStorage.setItem("journeyDate" , journeyDate) ; 
    
    window.open("/showBuses" , "_self") ; 
  }
  function validBusEntries(){
      if( !fromCity || !toCity || !journeyDate || fromCityID === -1 || toCityID === -1 ) return false ; 
      return true  ;
  }
  return (
    <div className={home.inner}>
       <ToastContainer/>
    <div className={home.innerDiv1}>
    <BusFront size={40} />
    <div className={home.innerDiv2} >
      <label>From</label>
      <input value={fromCity} onChange={e => filterFromCity(e.target.value)} onBlur={()=> {}}/>
    </div>
    { fromCityList.length !== 0 && <div className={home.cityName}>
      {
        fromCityList.map( ( ele : any ) => <p onClick={()=> confirmFromCity(ele)} >{ele.name}</p>)
      }
    
      

    </div>}
   
    </div>
    <div className={home.exchange} onClick={()=>exchangeCityName()}>
    <ArrowRightLeft />
    </div>
    <div className={home.innerDiv1} >
    <BusFront size={40} />
    <div className={home.innerDiv2} >
      <label>To</label>
      <input value={toCity} onChange={e => filterToCity(e.target.value)}  />
    </div>
    { toCityList.length !== 0 && <div className={home.cityName}>
      {
        toCityList.map( ( ele : any ) => <p onClick={()=> confirmToCity(ele)} >{ele.name}</p>)
      }
    
      

    </div>}
   
    
     
    </div>

    <div  className={home.dateInput} > 
    <label>Date</label>
    <input type="date" min={todayDate} value={journeyDate} onChange={(e)=> setJourneyDate( e.target.value)}/>
    </div>
    <button className={home.searchBus} onClick={searchBus}>SEARCH BUSES</button>

      
  </div>
  )
}

export default HomeComponent