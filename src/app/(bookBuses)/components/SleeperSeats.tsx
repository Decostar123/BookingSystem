'use client' ; 
import React , {useEffect} from 'react'
import { Bed  }  from "lucide-react" ; 
import { ToastContainer, toast } from 'react-toastify';

import sleeperSeatcss from "../css/sleeperSeat.module.css"
const SleeperSeats  : React.FC<any> = ({routeID , busID , isSeatvailable ,     sleeperSeats  ,setSleeperSeats , canBookTheSeats
}) => {

    
    useEffect(()=>{

        let str = "sleepr " + routeID +  " " + busID ; 
        // console.log( SleeperSeats )  ; 

        // alert( str ); 
    } , [] )
    function bookSeat( seatNumber : any){

        let ind  =  sleeperSeats.findIndex(( ele: any ) => Number(ele) === Number(seatNumber) ) ;
        if( ind !== -1 ){
            let arr = sleeperSeats.filter(  ( ele : any ) => Number(ele)  !== Number( seatNumber )) ;
            setSleeperSeats( arr) ;
            return ;  
        }
         let bookingSeatAllowed  : any = canBookTheSeats() ; 
        //  alert( bookingSeatAllowed)  ;
         if( !bookingSeatAllowed){
            // toast.error("")
            // toast.error("Maximum 6 seats can be booked") ; 
            alert("Max 6 seats can be booked ")  ; 
            return  ; 
         }
            setSleeperSeats( (prev:any) => [...prev ,  seatNumber])
    }

    function bookingTheSeat( seatNumber  : any ){
        let ind  =  sleeperSeats.findIndex(( ele: any ) => Number(ele) === Number(seatNumber) ) ;
        if( ind === -1 ) return false ; 
        return true ;  
    }
  return (
    <div className={sleeperSeatcss.sleeper} >
     <ToastContainer />           
    <div>
     
    <div className={sleeperSeatcss.sleeperRight}>

    {
        new Array(18).fill(0 ).map( ( ele :any , ind : any) => {
            if( ind%3 !==2 ){
                return <></>
            }
            {
                
            }
            {
                return  isSeatvailable( "SLEPPER" , ind ) ? 
                   <Bed   style={{color : bookingTheSeat(ind) ? 'black'   :''}} 
                  size={40} key={ind} onClick={()=>bookSeat(ind)} className={ sleeperSeatcss.seatNotBooked} /> 
                  : 
                  <Bed  
                  size={40} key={ind}  className={sleeperSeatcss.seatBooked } />
      
              }  
        
        })
    }

    </div>


    <div className={sleeperSeatcss.sleeperRight}>

{
    new Array(18).fill(0 ).map( ( ele :any , ind : any) => {
        if( ind%3 !== 1 ){
            return <></>
        }
        {
          return  isSeatvailable( "SLEPPER" , ind ) ? 
             <Bed   style={{color : bookingTheSeat(ind) ? 'black'   :''}} 
            size={40} key={ind} onClick={()=>bookSeat(ind)} className={ sleeperSeatcss.seatNotBooked} /> 
            : 
            <Bed  
            size={40} key={ind}  className={sleeperSeatcss.seatBooked } />

        }
         })
}

</div>
    
        <div className={sleeperSeatcss.sleeperLeft}>

            {
                new Array(18).fill(0 ).map( ( ele :any , ind : any) => {
                    if( ind %3 !== 0 ){
                        return <></>
                    }
                    {
                        return  isSeatvailable( "SLEPPER" , ind ) ? 
                           <Bed   style={{color : bookingTheSeat(ind) ? 'black'   :''}} 
                          size={40} key={ind} onClick={()=>bookSeat(ind)} className={ sleeperSeatcss.seatNotBooked} /> 
                          : 
                          <Bed  
                          size={40} key={ind}  className={sleeperSeatcss.seatBooked } />
              
                      }
                })
            }

        </div>
       
    

    </div>
    
</div>
  )
}

export default SleeperSeats