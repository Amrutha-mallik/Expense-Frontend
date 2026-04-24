import {useState, useEffect, useContext} from "react"
import UserContext from "../context/UserContext"
import axios from "../config/axios"
export default function UserList(){
    const[userlist, setUserList] = useState([])
    const {user} = useContext(UserContext)

    useEffect(()=>{
        const  listuser= async ()=> {
            try{
                const response = await axios.get('/users', {headers:{Authorization:localStorage.getItem("token")}})
                console.log(response.data)
                setUserList(response.data)

            }catch(err){
                console.log(err.message)
            }

        }
        listuser()
    },[])

    if(!user){
        return <p> loading...</p>
    }
    
    const handleRemove = async(email, id)=>{
        console.log("id", id)
        console.log("email", email)
        const userconform = window.confirm("are you sure")
        if(userconform){
            const conform = window.prompt("enter user email")
            if(conform === email){
                try{
                    const response = await axios.delete(`/users/${id}`, {headers:{Authorization:localStorage.getItem("token")}}) 
                    console.log(response.data)
                    const newArr = userlist.filter((ele) => ele._id!== response.data._id)
                    setUserList(newArr)
                }catch(err){
               //console.log(err)
               alert("envalid email")
            }
            }
        }
        
    }
    
    return(
        <div>
            <h1> Users List</h1>
            
            <table border ="1">
                <thead>
                    <tr>
                        <th> Username</th>
                        <th> Email</th>
                        <th>Role</th>
                      {user.role =="admin" && <th>Action</th>} 
                </tr>
                    </thead>

                    <tbody>
                    {userlist.map((ele)=>{
                        return(
                            <tr key = {ele._id}>
                            <td> {ele.username}</td>
                            <td> {ele.email}</td>
                            <td> {ele.role}</td>
                             { user.role == "admin" && user._id != ele._id && 
                             <td>
                             <button onClick={()=>handleRemove(ele.email, ele._id)}> remove</button> </td>}
                             
                            </tr>
                        )
                    })}
                    </tbody>
            </table>
            {/* <p>{userlist.username}</p> */}
        </div>
    )
}