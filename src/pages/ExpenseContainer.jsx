import { useSelector } from "react-redux"
import Expenseform from "../pages/Expenseform"
import Expensetable from "../pages/Expensetable"
export default function ExpenseContainer(){

    const {data}  = useSelector((state)=>{
        return state.expense
    })
    return(
        <div>
            <h2> Expense list -  {data.length}</h2>
            <Expensetable/>
            <Expenseform/>
            
        </div>
    )
}