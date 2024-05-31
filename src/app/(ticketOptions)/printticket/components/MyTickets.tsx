'use client' ; 
import React , {useState , useEffect} from 'react'
import myticket from "../css/myticket.module.css"

const MyTickets :React.FC<any> = ({ticketID, showButton}) => {

  
  const [fromCity , setFromCity] = useState("") ; 
  const [toCity , setToCity] = useState("") ; 

   const [ travelDate , setTravelDate ] =useState("") ; 

  useEffect(()=>{

    setCities() ; 
  } , [] )

  function setCities(){
        let booking : any = localStorage.getItem("booking") ; 
        if( !booking ) return  ; 
        booking = JSON.parse(booking) ; 
        let ind : any = booking.findIndex((ele : any ) => ele.ticketID === ticketID) ; 
        if( ind === -1  ) return ; 
        let routeID : any = booking[ind].routeID  ; 

        let city  : any = getRouteCity( routeID , true ) ; 
        setFromCity( city ) ; 

        city = getRouteCity( routeID  ,false )   ; 
        setToCity( city ) ; 

        let date : any = booking[ind].date ; 
        setTravelDate( date )  ; 
  }

  function getRouteCity( routeID : any ,  fromBoolean : any ){

    let route : any = localStorage.getItem( "route" ) ; 
    if( !route ) return "" ; 
    route = JSON.parse( route ) ; 
    let ind : any  = route.findIndex( ( ele : any ) => Number(ele.id) === Number(routeID)) ;
    // console.log( " getRouteCity" , ind , routeID   )

    if( ind === -1 ) return "" ; 
    
    let cityID  = fromBoolean ? route[ind].fromCityID : route[ind].toCityID  ; 

    return getCityName( cityID )  ;
  }
    function getCityName( cityID : any ){
        let city : any = localStorage.getItem("city") ; 
        if( !city ){
            city = []   ; 
            localStorage.setItem("city" , JSON.stringify(city )) ; 
        }
        city = localStorage.getItem("city") ; 
        city  = JSON.parse( city ) ; 
        let ind  : any = city.findIndex(( ele : any ) => ("" +ele.id) === ("" + cityID)  ) ; 

        // console.log( " getCityName" , ind  )
        if( ind === -1 ) return "" ; 
        return city[ind].name ; 
    }

    function viewTheTicket( ){

      let usersBooked : any = []  ; 
      let booking : any = localStorage.getItem("booking") ; 
      if( !booking ) return ; 
      booking = JSON.parse( booking) ; 
      // console.log( ticketID) ;  

      usersBooked = booking.reduce( ( acc : any , ele : any ) =>{
        // console.log( ticketID , ele.ticketID ) ; 
        if( ele.ticketID === ticketID ){
          acc.push( ele ) ; 
        }
        return acc ; 
      } , []  )  ; 
      // console.log( usersBooked ) ; 
      localStorage.setItem("usersBooked" , JSON.stringify( usersBooked)  ) ; 
      window.open("/paymentdone" , "_self")
    }

  return (
    <div className={myticket.outer}>
      <div className={myticket.inner}>
      <div>
        <p>Date :  {travelDate}</p>
      </div>
      <div>
        <p>From :  {fromCity} </p> 
        <p>To :  {toCity}</p>
      </div>
      </div>
      <button  style={{ visibility : showButton ? 'visible' : 'hidden' }}onClick={viewTheTicket}>VIEW TICKET</button>
      
    </div>
  )
}

export default MyTickets