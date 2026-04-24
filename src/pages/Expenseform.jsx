import { useState } from "react"
import { useSelector } from "react-redux"
import {createExpense} from "../slices/expense-slice"
import { useDispatch } from "react-redux"
export default function Expenseform(){
    const dispatch=useDispatch()

    const {data} = useSelector((state)=>{
        return state.category
    })
    const[form, setForm] = useState({
        title:"",
        expenseDate:"",
        amount:"",
        category:""
    })

    const handleChange =(e)=>{
        setForm({...form, [e.target.name]:e.target.value})
    }

    const handleSubmit =(e)=>{
        e.preventDefault()

        const resetform =()=>{
           setForm({
            title:"",
            expenseDate:"",
            amount:"",
            category:""
           }) 
        }
        dispatch(createExpense({form, resetform}))
        console.log(form)

    }
    return(
        <div>
            <h2> Add Expense</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type = "text" value={form.title} name="title" onChange={handleChange} />
                </div>

                <div>
                    <input type ="date" name="expenseDate" value={form.expenseDate} onChange={handleChange}/>
                </div>
                <div>
                    <input type = "number" name="amount" value = {form.amount} onChange={handleChange} placeholder="enter amount"/>
                </div>
                <div>
                    <select value={form.category} name="category" onChange={handleChange}>
                        <option value="">Select user</option>
                        {data.map((ele)=>{
                            return <option key={ele._id} value={ele._id}> {ele.name}</option>
                        })}
                    </select>
                </div>
                <div>
                    <input type="submit"/>
                </div>
            </form>
        </div>
    )
}