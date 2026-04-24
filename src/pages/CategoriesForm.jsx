import {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import {createcategory,updateCtegory} from "../slices/category-slice"
export default function CategoriesForm(){
    const dispatch = useDispatch()
    const[category, setCategory] = useState('')

    const {editId, data}  = useSelector((state)=>{
        return state.category
    })

    const handleSubmit = (e) =>{
        e.preventDefault()
        const formdata ={
            name:category
        }
        const handleReset =() =>{
            setCategory("")
        }
        if(editId){
            dispatch(updateCtegory({editId, formdata, handleReset}))
        } else {
            dispatch(createcategory({formdata, handleReset}))
        }
        
       
    }

    useEffect(()=>{
        if(editId){
            const category = data.find(ele => ele._id == editId)
            console.log('category', category)
            setCategory(category.name)
        } else{
            setCategory("")
        }
    },[editId])

    return(
        <div>
            <h2>{editId ? 'Edit' : 'Add'} categoty</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <input type="text" value={category} placeholder="enter a category" onChange={e =>setCategory(e.target.value)} name="title" />
                </div>
                <input  type = "submit" value = "add"/>
            </form>
        </div>
    )
}