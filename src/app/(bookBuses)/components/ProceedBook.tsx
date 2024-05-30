'use client' ; 
import React , {useState  , useEffect} from 'react'
import proceedBookCss from "../css/proceedBook.module.css"
const ProceedBook : React.FC<any>= ({fromTime , toTime , setSleeperSeats, sleeperSeats , 
    sleeperPrice , seatingPrice , seatingSeats , setSeatingSeats, setDoPayment
}) => {
    const [ fromCity , setFromCity] = useState("") ; 
    const [ toCity , setTOCity] = useState("") ; 

    useEffect(()=>{
        
    } , [] ) ; 
    function getTotoalPrice(){
        let num1 : any = Number( sleeperPrice )*sleeperSeats.length ; 
        let num2 : any = Number( seatingPrice )*seatingSeats.length ;
        return num1  + num2 ;  
    }
    useEffect(()=>{
        let city : any = localStorage.getItem("fromCity") ; 
        if( !city ) city = "" ; 
        setFromCity( city ) ;

        
        city  = localStorage.getItem("toCity") ; 
        if( !city ) city = "" ; 
        setTOCity( city ) ;
    } , [] )
    if( ( sleeperSeats.length + seatingSeats.length)  === 0 ){
        return <></>
    }
  return (
    <div className={proceedBookCss.outer}>
        <div className={proceedBookCss.destination}>
             <div >
                <p className={proceedBookCss.leftSide}>Boarding & Dropping</p>
               
            </div>
            <div >
                <p className={proceedBookCss.leftSide}>From</p>
                <p className={proceedBookCss.rightSide}> {fromCity} , {fromTime} </p>
            </div>
            <div>
                <p className={proceedBookCss.leftSide} >To</p>
                <p className={proceedBookCss.rightSide}>{toCity}, {toTime}</p>
            </div>
        </div>
        <div className={proceedBookCss.seatNo} >
            <div >
                <p className={proceedBookCss.leftSide}>Seat Booked</p>
            
            </div>
           { sleeperSeats.length !== 0 && <div>
                <p className={proceedBookCss.leftSide} >Sleeeper</p>
                <p className={proceedBookCss.rightSide}>{
                    sleeperSeats.map( ( ele : any , ind : any ) => {
                        if( ind === 0 ){
                            return <label>{ele}</label>
                        }
                        return <label>, {ele}</label>
                    })
                }</p>
            </div>
            }
            {
                seatingSeats.length !== 0 && 
                <div>
                <p className={proceedBookCss.leftSide} >Seating</p>
                <p className={proceedBookCss.rightSide}>{
                     seatingSeats.map( ( ele : any , ind : any ) => {
                        if( ind === 0 ){
                            return <label>{ele}</label>
                        }
                        return <label>, {ele}</label>
                    })
                }
                </p>
            </div>
            }

        </div>
        <div  className={proceedBookCss.seatNo}>
             <div >
                <p className={proceedBookCss.leftSide}>Fare Details</p>
            
            </div>
            <div>
                <p className={proceedBookCss.leftSide} >Amount</p>
                <p className={proceedBookCss.rightSide}>{getTotoalPrice()}</p>
            </div>

        </div>
       
       <button onClick={()=>setDoPayment(true)}>PROCEED TO BOOK</button>

    </div>
  )
}

export default ProceedBook