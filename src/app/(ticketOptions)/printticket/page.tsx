'use client' ; 
import React , {useState} from 'react' ; 
import style from "./css/style.module.css" ; 
import { CircleX } from "lucide-react"; 
import ErrorMessage from '../components/ErrorMessage';

const page = () => {

    const [ showError , setShowError] = useState( false   ) ;
    const [errorMsg  , setErrorMsg] = useState("") ;  

    function removeError(){
        setErrorMsg("") ;
        setShowError( false )  ; 
    }

    function formSubmitted(e:any){
        e.preventDefault() ; 
        // alert("from submitted")  ; 
        const id : any = e.target.id.value ; 
        const phone : any =  e.target.phone.value  ;  
        console.log( id , phone ) ; 
        if( phone.length != 10 ){
            setErrorMsg("Phone Number Should be of 10 digits ") ; 
            setShowError( true ) ; 
            return ; 
        }

        getTicketDetils(id, phone ) ; 
        
    }

    function getTicketDetils(ticketID : any , phone : any ){

        let booking : any = localStorage.getItem("booking") ; 
        if( !booking ){
            booking = [] ; 
            localStorage.setItem("booking" , JSON.stringify( booking)) ; 
        }
        console.log( "getTicketDetils" ,  phone , ticketID ) ; 
        booking = localStorage.getItem("booking") ; 
        booking = JSON.parse( booking )  ; 

        let userArr : any  = booking.reduce(( acc : any  , ele : any  ) =>{
            if( ele.ticketID ===ticketID && ele.phoneNo === phone ){
                acc.push({...ele}) ; 
            }
            return acc ; 
        } , [] )



        if( userArr.length === 0  ){
            setErrorMsg("No Bus ticket found  ") ; 
            setShowError( true ) ; 
            return ; 
        }
        
        console.log( userArr) ; 

        setRoutingParameters(userArr) ; 

        // window.open("/paymentdone" , "_self") ; 
    }

    function setRoutingParameters(userArr: any ){
        localStorage.setItem("usersBooked" , JSON.stringify( userArr)) ; 
        let busID : any  = userArr[0].busID ,  routeID  = userArr[0].routeID ; 

       
        window.open("/paymentdone" , "_self") ; 

        
    }
    
   
  return (
    <div className={style.mainContainer}>
       
        <div style={{visibility : showError ? 'visible'  : 'hidden' }}>
        <ErrorMessage  error={errorMsg} setShowError={setShowError}/>
        </div> 
        
       
      
            
       
        <p className={style.firstp}>PRINT TICKET </p>
        <p className={style.secondp}>Verify your details, and <label style={{color : "red" }}>Print</label> your tickets</p>
        <form onSubmit={(e)=> formSubmitted(e)}>
        <div className={style.options}>
            <div className={style.optionsDiv}>
                <label>TICKET NUMBER </label>
                <input name="id" className={style.divinput} placeholder='Enter your Ticket Nummber' required />

            </div>
            <div className={ style.secondOptionsDiv }>
                <label>MOBILE NUMBER, (+91) </label>
                

                
                <input name="phone" className={style.divinput} placeholder='Enter your Phone Nummber' type='number' required />
               

            </div>
            <button className={style.showtickteButton} type='submit'> SUBMIT </button>
        </div>
        </form>
        
    </div>
    
  )
}

export default page