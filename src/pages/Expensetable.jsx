import { useSelector } from "react-redux"
import {format} from "date-fns"
export default function Expensetable(){

    const {data} = useSelector((state)=>{
        return state.expense
    })

    const {data:categorydata} = useSelector((state)=>{
        return state.category
    })
    return(
        <div>
            <table border="1">
                <thead>
                <tr>
                    <th>#</th>
                    <th>title</th>
                    <th>ExpenseDate</th>
                    <th>category</th>
                    <th>amount</th>
                </tr>
                </thead>

                <tbody>
                    {data.map((ele,i)=>{
                        return(
                            <tr key={ele._id}>
                                <td> {i +1}</td>
                                <td>{ele.title}</td>
                                <td> {format(new Date(ele.expenseDate),"dd/mm/yyyy")}</td>
                                <td>{categorydata.find(cat => cat._id == ele.category)?.name} </td>
                                <td>{ele.amount}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            
        </div>
    )
}