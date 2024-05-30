'use client'  ;
import React , {useState , useEffect} from 'react'
import style from "./css/page.module.css" ; 
import BusCard from '../components/BusCard';
import ErrorMessage from '@/app/(ticketOptions)/components/ErrorMessage';
const page = () => {
        const [fromCity , setFromCity ] = useState("") ; 
        const [toCity , setToCity ] = useState("") ; 
        const [journeyDate , setJourneyDate ] = useState("") ; 
        const [ availableBuses , setAvailableBuses ] = useState( []) ; 

        const [ showError , setShowError] = useState( false ) ; 

        function properDate(dateInput:any){
            const date = new Date(dateInput);
            if (isNaN(date.getTime())) {
                
                return "";
            }
            const day = date.getDate();
            const month = date.toLocaleString('default', { month: 'short' });
            const weekday = date.toLocaleString('default', { weekday: 'short' });

            const formattedDate = `${day} ${month} ${weekday}`;
            return formattedDate ;
        }
        useEffect(()=>{

         let city : any = localStorage.getItem("fromCity") ; 
         setFromCity( city )  ;
         city  = localStorage.getItem("toCity") ; 
         setToCity( city )  ;

         let date : any  = localStorage.getItem("journeyDate") ; 
         setJourneyDate( date ) ; 
         getCityList() ; 
         routeIDSetting()  ; 
        } ,[] )
        function getCityList(){
            
            localStorage.removeItem("route") ;
            let route: any = localStorage.getItem("route") ; 
            if( !route ){
                route = [{ "fromCityID" : 2 , "toCityID" : 1 , "distance" : 500, id : 1}  ] ; 

                let busesInfo : any = [ { id : 1 , "busName": "HK Travels" , "rating": 3.4 , "type" : "AC" } , 
                                    { id : 2 , "busName": "BS Travels" , "rating": 3.4 , "type" : "NonAC" } 
                                 ]

                let availableBuses : any = [{ id : 1 , routeID : 1 , busID : 1 , "fromTime" : "15:00", "toTime" : "06:00" , sleeperPrice :"400" , 
                seatingPrice : "850" } , 
                { id : 2 , routeID : 1 , busID : 2 , "fromTime" : "16:30" , toTime :"06:30" , sleeperPrice :"900" , 
                    seatingPrice : "500"
                }  ] ; 
                localStorage.setItem("route" ,JSON.stringify( route )) ; 
                localStorage.setItem("busesInfo" ,JSON.stringify( busesInfo )) ; 
                localStorage.setItem("availableBuses" ,JSON.stringify( availableBuses )) ; 
                
            } 


        }

        function routeIDSetting(){
            let route: any = localStorage.getItem("route") ; 
            route = JSON.parse( route) ; 
            let fromCityID : any = localStorage.getItem("fromCityID") ; 
            let toCityID : any = localStorage.getItem("toCityID") ; 
            let ind = route.findIndex(( ele : any ) => Number(ele.fromCityID) === Number(fromCityID) && Number( ele.toCityID) === Number(toCityID) ) ; 
            
            let routeID = ind === -1 ? -1 : route[ind].id ;

            // console.log(routeID)
            setAllBuses( routeID ) 


            

            

        }

        function setAllBuses( routeID: any  ){
            let availableBuses:any = localStorage.getItem("availableBuses") ; 
            if( !availableBuses){
                availableBuses = []  ;
            } else{
                availableBuses = JSON.parse( availableBuses )  ; 
            }
            let busArr = availableBuses.filter( ( ele : any ) => Number(ele.routeID) === Number(routeID) ) ; 
            setAvailableBuses( busArr ) ;
            if( !busArr || busArr.length === 0 ){
                setShowError( true) ; 
            } 
            console.log(busArr ) ; 
        }
  return (
    <div className={style.outer}>
        <div className={style.travelDetail}>
            <p><label className={style.cityName}>{fromCity}</label> {"->"} <label className={style.cityName}>{toCity}</label>
            {" -> "} <label className={style.cityName} >{ properDate(journeyDate) }</label></p>
        </div>
        <div>
            <div className={style.options}>
                <p className={style.busName}>Bus Name</p>
                <p>Departure</p>
                <p>Duration</p>
                <p>Arrival</p>
                <p>Rating</p>
                <p>Fare</p>
                <p>Seats Available</p>
            </div>
            {
                availableBuses.map( ( ele : any )=>  {
                    console.log( ele.fromTime , ele.toTime )
                    return <BusCard routeID={ele.routeID} busID={ele.busID} fromTime={ele.fromTime} toTime={ele.toTime} sleeperPrice={ele.sleeperPrice} 
                     seatingPrice={ele.seatingPrice} 
                     />
                })
            }
          {
            showError &&  <ErrorMessage error={"No buses found"} setShowError={setShowError}/>
          }
        </div>
    </div>
  )
}

export default page