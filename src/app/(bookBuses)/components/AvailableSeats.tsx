'use client'  ; 
import React , { useEffect , useState } from 'react'
import availaleBuses from "../css/availableBuses.module.css" ; 
import SleeperSeats from './SleeperSeats';
import SeatingSeats from './SeatingSeats';
import ProceedBook from './ProceedBook';
import Payment from './Payment';

const AvailableSeats : React.FC<any> = ({routeID , busID ,fromTime , toTime , 
  seatingPrice, sleeperPrice 
}) => {

  const [sleeperSeats , setSleeperSeats] = useState([]) ; 
  const [seatingSeats , setSeatingSeats] = useState([]) ; 

  const [ doPayment , setDoPayment ] = useState( false) ; 

  useEffect(()=>{
    // console.log( "routeID busID"  , routeID, busID )  ; 
    setBookings() 
    
  } , [] ) ; 
  function setBookings(){
      let booking  :any  = localStorage.getItem("booking") ; 
      if( !booking){
        booking = []   ;
        localStorage.setItem("booking"  , JSON.stringify( booking)) ; 
      }
  }
  function isSeatvailable(seatType:any , seatNo : any ){
    let booking  :any  = localStorage.getItem("booking") ; 
    if( !booking){
      booking = []   ;
      localStorage.setItem("booking"  , JSON.stringify( booking)) ; 
    }
    booking    = localStorage.getItem("booking") ; 
    booking = JSON.parse( booking) ; 

    let journeyDate : any = localStorage.getItem("journeyDate") ; 
    let ind : any= booking.findIndex(( ele : any ) =>  ( Number(ele.routeID)  === Number(routeID)  &&
    Number(ele.busID)  === Number(busID) && Number(ele.seatNo) === Number(seatNo) && ele.seatType === seatType  
    && ele.date === journeyDate )  ) ; 
    // console.log( "ind" , ind , routeID, busID, seatNo, seatType   ) ; 
    
    if( ind === -1 ){
      return true ; 
    } 

    
    // alert(  `Not availble ${seatNo}` )
    return false  ;
  }
  function canBookTheSeats(){
    let num  : any = sleeperSeats.length + seatingSeats.length ; 
    if( num >= 6 ) return false ; 
    return true ; 
  }
  return (
    <>
    <div className={availaleBuses.outer}>
    <div  className={availaleBuses.inner} >
    <div className={availaleBuses.transactionInfo} >
        <p className={availaleBuses.transaction} >Click on an Available seat to proceed with your transaction</p>
        <div className={availaleBuses.seatInfo} >
            <p className={availaleBuses.seatLegend}>SEAT LEGEND</p>
            <div className={availaleBuses.seatSymbols}>
            <div className={availaleBuses.seatAvialble}></div> <p>Available</p>
            <div className={availaleBuses.seatNotAvialble}></div> <p> Unavailable</p>
            </div>
        </div>
    </div>
    <p className={availaleBuses.sleeperName}>Sleeper Seats</p>
    <SleeperSeats  routeID={routeID} busID={busID} isSeatvailable={isSeatvailable} 
    setSleeperSeats={setSleeperSeats} sleeperSeats={sleeperSeats} canBookTheSeats={canBookTheSeats} />

    <p className={availaleBuses.seatingName}>Seating Seats</p>
    <SeatingSeats routeID={routeID} busID={busID} isSeatvailable={isSeatvailable}  
    seatingSeats={seatingSeats}  setSeatingSeats={setSeatingSeats} canBookTheSeats={canBookTheSeats}
    />

    </div>
    <div className={availaleBuses.proceedBooking}>
      <ProceedBook fromTime={fromTime} toTime={toTime} 
      setSleeperSeats={setSleeperSeats} sleeperSeats={sleeperSeats}  seatingSeats={seatingSeats}  setSeatingSeats={setSeatingSeats} 
      seatingPrice={seatingPrice} sleeperPrice={sleeperPrice} setDoPayment={setDoPayment}
      />
    </div>
    </div>

    {
      doPayment && 
      <Payment seatingPrice={seatingPrice} sleeperPrice={sleeperPrice} sleeperSeats={sleeperSeats} setDoPayment={setDoPayment} seatingSeats={seatingSeats} routeID={routeID}  busID={busID}  />
    }
</>
    
  )
}

export default AvailableSeats