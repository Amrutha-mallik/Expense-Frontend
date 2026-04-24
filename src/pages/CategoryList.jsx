import {useEffect} from "react"
import {fetchcategory} from "../slices/category-slice"
import {  useDispatch, useSelector } from "react-redux"
import {removeCategory, assignEditId, resetEditId} from "../slices/category-slice"

export default function CategoryList(){

    const {data,  editId} = useSelector((state)=>{
        return state.category
    })

const dispatch = useDispatch()

     useEffect(()=>{
        dispatch(fetchcategory())
    },[])

     const handlCancel =() =>{
            dispatch(resetEditId())
        }
        const handleRemove = (id) =>{
            const userconfirm = window.confirm("are you sure")
            if(userconfirm){
                console.log("remove user")
                dispatch(removeCategory(id))
            }
        }
        useEffect(()=>{
                return () =>{
                    // dispatch(assignEditId(null)) using assignEditId 
                    dispatch(resetEditId()) // define another resetEditId id then dispatch it 
                }
        
            },[])

    return(
        <div>
            <ul>
                  {data.map((ele)=>{
                return(
                    <li key = {ele._id}> {ele.name}
                    <button onClick={()=>{
                       dispatch(assignEditId(ele._id)) 
                    }}> edit</button>
                    <button onClick = {()=>{
                        handleRemove(ele._id)
                    }}> remove</button>
                    {ele._id == editId && <button onClick={handlCancel}> cancel</button>}
                    </li>
                )
            })}
            </ul>

        </div>
    )
}