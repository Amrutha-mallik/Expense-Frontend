import { useContext, useEffect } from "react"
import UserContext from "../context/UserContext"
import {fetchcategory} from "../slices/category-slice"
import {fetchExpense} from "../slices/expense-slice"

import { useDispatch, useSelector } from "react-redux"

export default function Dashboard(props){

    const dispatch = useDispatch()

    const {data} = useSelector((state)=>{
        return state.category
        
    })

    const {data:expensedata} = useSelector((state) =>{
        return state.expense
    })

    console.log("expense", expensedata)
    // useEffect(()=>{
    //     if(localStorage.getItem("token")){
    //         dispatch(fetchcategory())
    //         dispatch(fetchExpense())
    //     }
        
    // },[dispatch])

   

    const {user} =useContext(UserContext)
    if(!user){
        return <p> loading...</p>
    }
    return(
        <div>
            <h2>welcome {user.username} </h2>
            <h3> total category - {data.length}</h3>
            <h3> total expense - {expensedata.length}</h3>
        </div>
    )
}