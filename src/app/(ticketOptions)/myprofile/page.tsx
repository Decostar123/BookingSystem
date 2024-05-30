'use client' ; 
import React , {useState , useEffect}from 'react'
import style from "./css/style.module.css" ; 
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  
interface UserDetail {
    phone?: string;
    email?: string;
    [key: string]: any; // Allow any other dynamic properties
}

const page = () => {
    
    const [disbleInput , setDisableInput]  = useState( true  ) ; 
    const [ todayDate , setTodayDate] = useState("") ;
    const [userDetailObj , setUserDeatilObj] = useState<UserDetail>({}) ; 
    useEffect(()=>{
        let date : any = getTodayDate() ; 
        setTodayDate( date ) ; 

        let loggedInUserID  : any = localStorage.getItem("loggedInUserID") ; 
        loggedInUserID = Number( loggedInUserID)  ;
        const obj = getUserDetail(loggedInUserID ) ; 
        setUserDeatilObj( obj ) ; 


    } , [] ) ;
    
    function getUserDetail( loggedInUserID : any ){
        
        let users : any = localStorage.getItem("users") ; 
      if( !users ){
        users = [] ; 
        localStorage.setItem("users"  , JSON.stringify( users ) ) ; 
      }
      users = localStorage.getItem("users") ; 
      users = JSON.parse( users ) ; 

      let ind : any = users.findIndex(  ( ele : any ) => Number(ele.id) === Number( loggedInUserID) ) ; 
      console.log( "ind" , ind ); 
      if( ind !== -1 ){
        const obj = {...users[ind]} ; 
        // console.log( obj) ; 
         return obj ;
       
      }
      return {}  ; 
    }

    function saveUserDetail(loggedInUserID : any){
        let users : any = localStorage.getItem("users") ; 
        if( !users ){
          users = [] ; 
          localStorage.setItem("users"  , JSON.stringify( users ) ) ; 
        }
        users = localStorage.getItem("users") ; 
        users = JSON.parse( users ) ; 
  
        let ind : any = users.findIndex(  ( ele : any ) => Number(ele.id) === Number( loggedInUserID) ) ; 
        console.log( "ind" , ind ); 
        if( ind !== -1 ){
          users[ind] = {...users[ind] , ...userDetailObj } ; 
          localStorage.setItem("users"  , JSON.stringify( users ) ) ; 
         
        }

        
    }
    function getTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function cancel(){
        let loggedInUserID  : any = localStorage.getItem("loggedInUserID") ; 
        loggedInUserID = Number( loggedInUserID)  ;
        const obj = getUserDetail(loggedInUserID ) ; 
        setUserDeatilObj( obj ) ; 
        disableInput( ) ; 
    }
    function formSubmitted(e: any ){

        e.preventDefault() ; 
        // alert( " form submitted") ;

        if( userDetailObj.phone?.length !== 10  ){
            toast.error("Phone number should be of 10 characets") ; 
            return ; 
        } 
        
         let loggedInUserID  : any = localStorage.getItem("loggedInUserID") ; 
        loggedInUserID = Number( loggedInUserID)  ;
        saveUserDetail(loggedInUserID ) ; 
        disableInput() ; 
        notify("Changes were saved")
        

    }

    function enableInput(){
        setDisableInput( false) ; 
    }

    function disableInput(){
        setDisableInput( true) ; 
    }
    function setDetails( key : any , value : any ){
        
        setUserDeatilObj(prev => ({
            ...prev,
            [key]: value
        }));
    }
    
    const notify = (msg: any ) =>{
        toast.success(msg,  {
            className: 'toast-success-container toast-success-container-after'
          });
    }

  return (
    <div className={style.outer}>
         <ToastContainer />
        <div className={style.inner}>
            <form onSubmit={(e)=> formSubmitted( e)}>
                <div className={style.btn}>
                   { disbleInput && <button className={style.edit} onClick={enableInput}> EDIT </button>}
                  {
                    !disbleInput && <>
                    <button className={style.save} type="submit" >SAVE</button>
                    <button className={style.cancel} onClick={cancel}>CANCEL</button>
                    </>
                  }
                  
                </div>
                <div className={style.userdet1}>
                <div className={style.userleft}>
                        <label>YOUR NAME</label>
                        <input value={userDetailObj.name || ''} onChange={(e:any) => setDetails("name" , e.target.value)}  className={style.inputStyle} type="text" placeholder='YOUR NAME' name="name" disabled={disbleInput} />
                    </div>
                    <div className={style.userright}>
                    <label> DATE OF BIRTH </label>
                        <input value={userDetailObj.DOB || ''} onChange={(e:any) => setDetails("DOB" , e.target.value)} className={style.dateStyle} type="date" max={todayDate} name="DOB" disabled={disbleInput} />
                    </div>
                </div>
                <div className={style.userdet2}>
                        <div className={style.genderDiv}>
                            <label className={style.gender}>GENDER</label>
                        </div>
                        <div>
                        <input type="radio" id="male" name="gender" value="male" disabled={disbleInput} onChange={()=> setDetails( "gender"  , "male")} checked={userDetailObj.gender==='male'}/>
            
                        <label className={ style.genderLabel } htmlFor="male">Male</label>

                        <input type="radio" id="female" name="gender" value="female" disabled={disbleInput}  onChange={()=> setDetails( "gender"  , "female")} checked={userDetailObj.gender==='female'}/>
                       
                        <label className={ style.genderLabel } htmlFor="female">Female</label>
            
                        
            
                        </div>

                </div>

                <div className={ ` ${style.userdet1} ${style.userdet3}`}>
                <div className={style.userleft }>
                        <label> EMAIL ID</label>
                        <input required  onChange={(e:any) => setDetails("mail" , e.target.value)}  value={userDetailObj.mail} className={style.inputStyle} type="email" placeholder='YOUR EMAIL' name="mail" disabled={disbleInput} />
                    </div>
                    <div className={style.userright}>
                    <label>MOBILE NUMBER, (+91)</label>
                    <input required  onChange={(e:any) => setDetails("phone" , e.target.value)} value={userDetailObj.phone} className={style.inputStyle} type="number" placeholder='YOUR PHONE' name="phone" disabled={disbleInput} />
                    </div>
                </div>
                    
            </form>

        </div>
    </div>
  )
}

export default page