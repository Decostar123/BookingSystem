'use client'
import React ,{useState} from 'react'
import style from "./css/style.module.css" ; 
import ErrorMessage from '../components/ErrorMessage';
import PassengeList from './components/PassengeList';
const page = () => {

    const [ deleteUsers , setDeleteUsers ] = useState([]) ; 
    function formSubmitted(e : any){
        e.preventDefault() ; 
        // alert("form submitted") ;
        let id : any = e.target.id.value ; 
        let phone : any =  e.target.phone.value  ;  
        console.log( id , phone ); 
        id = id.trim() ; 
        phone = phone.trim() ; 
        
        if( phone.length != 10 ){
            setErrorMsg("Phone Number Should be of 10 digits ") ; 
            setShowError( true ) ; 
            return ; 
        }
        getPassengerDetail(id , phone) ;


    }
    function getPassengerDetail(ticketID : any , phone : any){
        

        let booking : any = localStorage.getItem("booking") ; 
        if( !booking ){
            booking = [] ; 
            localStorage.setItem("booking" , JSON.stringify( booking)) ; 
        }
        // console.log( "getTicketDetils" ,  phone , ticketID ) ; 
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
        setDeleteUsers( userArr ) ; 
        console.log( "userArr" , userArr )
        
        





    }
    const [ showError , setShowError] = useState( false   ) ;
    const [errorMsg  , setErrorMsg] = useState("") ;  
    // if( deleteUsers.length === 0 ) return <></>
  return (
    <div>
        <div style={{visibility : showError ? 'visible'  : 'hidden' }}>
        <ErrorMessage  error={errorMsg} setShowError={setShowError}/>
        </div> 
        <p className={style.cancel}>Cancel Your Ticket</p>
        <form onSubmit={(e)=> formSubmitted(e)} className={style.cancelForm}>
            
        <div className={style.options}>
            <div className={style.optionsDiv}>
                <label>TICKET NUMBER </label>
                <input name="id" className={style.divinput} placeholder='Enter your Ticket Nummber' required />

            </div>
            
            <div className={ style.secondOptionsDiv }>
                <label>MOBILE NUMBER, (+91) </label>
                

                
                <input name="phone" className={style.divinput} placeholder='Enter your Phone Nummber' type='number' required />
               

            </div>
           
            
        </div>
        
        <button type="submit" className={style.selectPassenger}> SELECT PASSENGER</button>
        </form>
        {
            deleteUsers.length !== 0 &&  <PassengeList deleteUsers={deleteUsers} />
        }
       
    </div>
  )
}

export default page