'use client' ; 
import React from 'react'
import seatingSeatcss from "../css/seatingSeats.module.css"  ; 
import { Bed , Armchair  }  from "lucide-react" ; 

const SeatingSeats : React.FC<any> = ({ routeID, busID, isSeatvailable, seatingSeats, setSeatingSeats, canBookTheSeats}) => {
    function bookSeat( seatNumber : any){

        let ind  =  seatingSeats.findIndex(( ele: any ) => Number(ele) === Number(seatNumber) ) ;
        if( ind !== -1 ){
            let arr = seatingSeats.filter(  ( ele : any ) => Number(ele)  !== Number( seatNumber )) ;
            setSeatingSeats( arr) ;
            return ;  
        }
        let bookingSeatAllowed  : any = canBookTheSeats() ; 
        //  alert( bookingSeatAllowed)  ;
         if( !bookingSeatAllowed){
            // toast.error("")
            // toast.error("Maximum 6 seats can be booked") ; 
            alert("Maximum 6 seats can be booked ")  ; 
            return  ; 
         }
        setSeatingSeats( (prev:any) => [...prev ,  seatNumber])
    }

    function bookingTheSeat( seatNumber  : any ){
        let ind  =  seatingSeats.findIndex(( ele: any ) => Number(ele) === Number(seatNumber) ) ;
        if( ind === -1 ) return false ; 
        return true ;  
    }

  return (
    <div className={seatingSeatcss.sleeper} >
                
    <div>
     
    <div className={seatingSeatcss.sleeperRight}>

    {
        new Array(24).fill(0 ).map( ( ele :any , ind : any) => {
            if( ind%4 !== 3 ){
                return <></>
            }
            {
                return  isSeatvailable( "SEATING" , ind ) ? 
                   <Armchair   style={{color : bookingTheSeat(ind) ? 'black'   :''}} 
                  size={25} key={ind} onClick={()=>bookSeat(ind)} className={ seatingSeatcss.seatNotBooked} /> 
                  : 
                  <Armchair  
                  size={25} key={ind}  className={seatingSeatcss.seatBooked } />
      
              }  

           
        })
    }

    </div>
    <div className={seatingSeatcss.sleeperRight}>

    {
        new Array(24).fill(0 ).map( ( ele :any , ind : any) => {
            if( ind%4 !== 2 ){
                return <></>
            }
            {
                return  isSeatvailable( "SEATING" , ind ) ? 
                   <Armchair   style={{color : bookingTheSeat(ind) ? 'black'   :''}} 
                  size={25} key={ind} onClick={()=>bookSeat(ind)} className={ seatingSeatcss.seatNotBooked} /> 
                  : 
                  <Armchair  
                  size={25} key={ind}  className={seatingSeatcss.seatBooked } />
      
              } 
        })
    }

    </div>
    <div className={seatingSeatcss.sleeperRight}>

    {
        new Array(24).fill(0 ).map( ( ele :any , ind : any) => {
            if( ind%4 !== 1 ){
                return <></>
            }
            {
                return  isSeatvailable( "SEATING" , ind ) ? 
                   <Armchair   style={{color : bookingTheSeat(ind) ? 'black'   :''}} 
                  size={25} key={ind} onClick={()=>bookSeat(ind)} className={ seatingSeatcss.seatNotBooked} /> 
                  : 
                  <Armchair  
                  size={25} key={ind}  className={seatingSeatcss.seatBooked } />
      
              } 
        })
    }

    </div>

        <div className={seatingSeatcss.sleeperLeft}>

            {
                new Array(24).fill(0 ).map( ( ele :any , ind : any) => {
                    if( ind %4 !== 0 ){
                        return <></>
                    }
                    {
                        return  isSeatvailable( "SEATING" , ind ) ? 
                           <Armchair   style={{color : bookingTheSeat(ind) ? 'black'   :''}} 
                          size={25} key={ind} onClick={()=>bookSeat(ind)} className={ seatingSeatcss.seatNotBooked} /> 
                          : 
                          <Armchair  
                          size={25} key={ind}  className={seatingSeatcss.seatBooked } />
              
                      } 
                })
            }

        </div>
       
    

    </div>
    
</div>
  )
}

export default SeatingSeats