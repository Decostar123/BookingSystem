'use client' ; 
import React  ,  {  useState , useEffect } from 'react'
import buscard from "../css/buscard.module.css" ; 
import AvailableSeats from './AvailableSeats';
interface UserDetail {

    [key: string]: any; // Allow any other dynamic properties
}
const BusCard : React.FC<any> = ({ routeID , busID , fromTime , toTime , sleeperPrice , seatingPrice}) => {
    const [ busDetailObj , setBusDetailObj ] = useState<UserDetail>({}) ; 
    const [ routeDetailObj , setRouteDetailObj ] = useState<UserDetail>({}) ; 
    const [showSeats , setShowSeats] = useState(false) ;
    function getTimeDuration(startTimeStr : any, endTimeStr : any ) {
        // Helper function to parse time string
        function parseTime(timeStr : any ) {
          const [hours, minutes] = timeStr.split(':').map(Number);
          return { hours, minutes };
        }
      
        // Parse the start and end times
        const startTime = parseTime(startTimeStr);
        const endTime = parseTime(endTimeStr);
      
        // Convert start and end times to total minutes
        const startTotalMinutes = startTime.hours * 60 + startTime.minutes;
        const endTotalMinutes = endTime.hours * 60 + endTime.minutes;
      
        // Calculate the difference in minutes
        let diffInMinutes = endTotalMinutes - startTotalMinutes;
      
        // Handle negative difference by assuming the end time is on the next day
        if (diffInMinutes < 0) {
          diffInMinutes += 24 * 60; // Add 24 hours worth of minutes
        }
      
        // Convert the difference back to hours and minutes
        const hours = Math.floor(diffInMinutes / 60);
        const minutes = diffInMinutes % 60;
        
        let timeStr : any = hours + "h " + minutes + "m"  ; 
        return timeStr ;   
      }
    useEffect(()=>{
        let busesInfo : any   = localStorage.getItem("busesInfo") ; 
        if( !busesInfo ){
            busesInfo = [] ; 
        }else{
            busesInfo = JSON.parse( busesInfo ) ; 
        }

        let ind = busesInfo.findIndex( ( ele :any )  => Number(ele.id) === Number( busID ) ) ;

        // console.log("busesInfo" , ind ) ; 
        if( ind !== -1 ){
            let obj = busesInfo[ind] ; 
            setBusDetailObj( {...obj} ) ; 
        } 

        let route : any = localStorage.getItem("route") ; 
        if( !route ){
            route = [] ; 
        }else{
            route = JSON.parse( route ) ; 
        }

        ind = route.findIndex(( ele : any ) => Number(ele.id) === Number( routeID)) ; 
        console.log("route" , ind ) ; 
        if( ind !== -1 ){
            let obj = route[ind] ; 
            setRouteDetailObj( {...obj }) ; 
        } 
        // console.log( busDetailObj , routeDetailObj ) ; 
    } , [] )  

    function countAvailableSeats(seatType : any ){
        let totalSeats : any = seatType === 'SLEPPER' ?  18 : 24 ; 
        let booking : any = localStorage.getItem("booking") ;
        if( !booking){
            booking = [] ; 
            localStorage.setItem("booking" , JSON.stringify(booking)) ; 
        }
        let journeyDate : any = localStorage.getItem("journeyDate")  ; 
        booking  = localStorage.getItem("booking") ;
        booking = JSON.parse( booking)  ; 
        let bookedSeats  : any  =booking.reduce( ( acc : any  , ele : any )=>{
            if( Number(ele.routeID) === Number(routeID) &&   Number(ele.busID) === Number(busID) && ele.seatType === seatType 
                && ele.date === journeyDate  ){
                        acc += 1 ; 
                }
                return acc ; 
        } , 0 ) ; 
        return totalSeats - bookedSeats   ;
    }

    function toggleShowSeats(){
        setShowSeats( prev => !prev ) ; 
    }
  return (
    <>
         <div className={buscard.box}>
            <p className={`${buscard.busname} ${buscard.highlight}`}>{busDetailObj.busName}</p>
            <p className={buscard.highlight}>{fromTime}</p>
            <p>{getTimeDuration(fromTime , toTime )}</p>
            <p>{toTime}</p>
            <p>3.4</p>
            <div className={buscard.highlight}    >
                 <label>Sleeper {sleeperPrice}</label>
                 <br></br>
                 <br></br>
                 <label>Seating {seatingPrice}</label>
                  </div>
            <div>
                <label className={buscard.seats}>Seating {countAvailableSeats("SEATING")} </label>
                <br></br>
                <br></br>
                <label>Sleeper {countAvailableSeats("SLEPPER")}</label>
            </div>
            {
                showSeats &&   <button className={buscard.viewSeats} onClick={toggleShowSeats}>VIEW SEATS</button>
            }
            
                <button className={buscard.viewSeats} style={{backgroundColor: showSeats ? 'gray' : 'rgb(233, 82, 82)' }} onClick={toggleShowSeats}>
                    {showSeats ? 'HIDE' : "VIEW"} SEATS</button>
        
           
          
        </div>
        {
            showSeats && 
            <AvailableSeats routeID={routeID}  busID={busID} fromTime={fromTime} toTime={toTime} 
            sleeperPrice={sleeperPrice}  seatingPrice={seatingPrice} />
        }


       
    </>
   
  )
}

export default BusCard