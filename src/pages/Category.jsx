// import {useState, useEffect} from "react"
// import axios from "../config/axios"
// export default function Category(){

//     const[category, setCategory] = useState([])
    
//     useEffect(()=>{
//         const items = async () =>{
//             try{
//                 const response = await axios.get("/api/categories", {headers:{Authorization:localStorage.getItem("token")}})
//                 //console.log(response.data)
//                 setCategory(response.data)

//             }catch(err) {
//                 console.log(err.message)
//             }
//         }   
//         items()

//     },[])
//     return(
//         <div>
//             <h2> Category Items</h2>
//             {category.map((ele)=>{
//                 return(
//                     <li key={ele.id}>{ele.name} </li>
//                 )
//             })}
//         </div>
//     )
// }



import CategoriesForm from "../pages/CategoriesForm"
import CategoryList from "../pages/CategoryList"
import { useSelector } from "react-redux"
export default function Category(){

    const {data,  editId} = useSelector((state)=>{
        return state.category
    })

    return (
        <div>
            <h2> Listing Category - {data.length}</h2>
           <CategoryList/>
            <CategoriesForm/>
            
        </div>
    )
}