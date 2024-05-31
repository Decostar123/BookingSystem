'use client' ; 
import React  , { useState , useEffect} from 'react'
import personDelete from "../css/personDelete.module.css" ; 
interface Detail {
    [key: string]: any;
}
const PersonDetail : React.FC<any> = ({deleteTicketID , getTicketDetils , updateDeleteUsers}) => {
    const [ userArr , setUserArray]  = useState<Detail[]>([]) ; 

    useEffect(()=>{
        let arr : any = updateDeleteUsers() ; 

        setUserArray( arr )  ;; 

       
    }  , 
     [] ) ; 

    
    

     function formSubmitted(e:any){

        e.preventDefault() ; 

        // console.log( e.target[deleteTicketID] ) ; 

        

        let deleteIDObj : any = {}  ; 

        let anyUser : any = false ; 
        for( let ele of userArr ){
            if( e.target[ele.id].checked )  {
                deleteIDObj[ele.id] = true ;
                anyUser = true ; 
            }

        }



        if( !anyUser){
            alert("Please select tickets to delete ") ; 
            return ; 
        }

        const ans : any = confirm("Are you sure you want to delete the tickets ?") ; 

        if( !ans ) return ;

        deleteAllTheUsers(deleteIDObj) ; 
      
        

     }

     function deleteAllTheUsers(deleteIDObj : any ){

        let arr : any = userArr.filter(( ele : any , ind : any  )=> {

            if(deleteIDObj[ele.id]) return false ; 
            userArr[ind].checked = false ; 
            return true ; 
        } ) ;

        // setUserArray( [...arr]) ; 

        let booking : any = localStorage.getItem("booking") ; 
        if( !booking ){
            booking = [] ; 
            localStorage.setItem("booking" , JSON.stringify( booking)) ; 
        }
        booking = localStorage.getItem("booking") ; 
        booking = JSON.parse( booking )  ; 

        booking = booking.filter(( ele : any , ind : any  )=> {

            if(deleteIDObj[ele.id]) return false ; 
           return true  ; 
        } ) ;


        localStorage.setItem("booking" , JSON.stringify(booking)) ; 

        let updateDeleteUsers : any = getTicketDetils() ; 
        setUserArray( updateDeleteUsers )  ; 




     }

    if( deleteTicketID === -1 ) return <></>
  return (
    
    <form onSubmit={(e:any) =>formSubmitted(e) } >
        {
            userArr.map(( ele : any , ind : any  )=>{
                return <div className={personDelete.outer} onSubmit={(e:any)=>formSubmitted(e)}>
                    <input type="checkbox" checked={ele.checked} onChange={(e:any)=> { 
                        userArr[ind].checked = e.checked  ;
                        setUserArray( [...userArr] ) 
                      } } value={ele.id} name={ele.id}/>
                    <div className={personDelete.inner}>
                    <p>Name : {ele.name}</p>
                    <p>Age : {ele.age}</p>
                    </div>                  

        </div>
            })
        }

       { userArr.length !== 0 && 
        <button className={personDelete.delete}>Delete Users</button>
       }
   
    </form>
    
  )
}

export default PersonDetail