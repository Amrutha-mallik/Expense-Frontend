import { useReducer , useEffect} from "react"
import UserContext from "../context/UserContext"
import {useNavigate} from "react-router-dom"
import axios from "../config/axios"
import { useDispatch } from "react-redux"
import {fetchcategory} from "../slices/category-slice"
import {fetchExpense} from "../slices/expense-slice"

const userReducer=(state, action)=>{
   switch(action.type){
    case "LOG_IN":{
        return {...state, isLoggedIn:true, user: action.payload,serverError:"" }
    }
    case "LOG_OUT":{
        return {...state, isLoggedIn:false, user:null}
    }
    case "SET_SERVER_ERROR":{
        return {...state, serverError:action.payload }
    }
    default:{
        return {...state}
    }
   }
}
export default function AuthProvider(props){
    const dispatch= useDispatch()
    const navigate =useNavigate()
    //console.log(props)

    //state
    const[userState, userDispatch] = useReducer(userReducer,{
        user:null,
        isLoggedIn:false,
        serverError:""
    });
    //handle page reload
    useEffect(()=>{
        if(localStorage.getItem("token")){
            const fetchuser = async () =>{
                try{
                    const response = await axios.get('/users/account',{headers: {Authorization:localStorage.getItem("token")}} )
                    userDispatch({type:"LOG_IN", payload:response.data})
                } catch(err){
                    console.log(err.message)
                }
            }
            fetchuser()
        }

    },[])

    const handleRegister= async(formdata, resetForm)=>{
        try{
            const response = await axios.post('/users/register', formdata)
            console.log(response.data)
            alert("succesfully register")
            resetForm("")
            userDispatch({type:"SET_SERVER_ERROR", payload:"" })
            navigate("/login")
        }catch(err){
            //console.log(err.message)

            userDispatch({type:"SET_SERVER_ERROR", payload:err.response?.data?.error?.message})
        }

    }

    const handleLogin = async(values,resetForm ) =>{
        try{
            const response = await axios.post('/users/login', values)
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            const userResponse = await axios.get('/users/account', {headers:{Authorization:localStorage.getItem("token")}})
            resetForm();
            alert("successfully logged in")

            dispatch(fetchcategory())
            dispatch(fetchExpense())
            userDispatch({type:"LOG_IN", payload:userResponse.data})
            navigate("/dashboard")  
        }catch(err){
            //console.log(err.message)
            userDispatch({type:"SET_SERVER_ERROR", payload:err.response?.data?.error?.message})
        }

    }

    const handleLogout =()=>{
        localStorage.removeItem("token")
        userDispatch({type: "LOG_OUT"})
    }

    //functionality
    return(
        
           <UserContext.Provider value={{...userState, handleRegister, handleLogin, handleLogout}}>
            {props.children}
           </UserContext.Provider>     
       
    )
}