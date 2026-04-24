import {Link, Route, Routes} from "react-router-dom"
import { useContext, useEffect } from "react"
import PrivateRoute from "./component/PrivateRoute"
import UserContext from "./context/UserContext"
import Home from "./pages/Home"
import Register  from "./pages/Register"
import Login from "./pages/Login"
import Account from "./pages/Account"
import Dashboard from "./pages/Dashboard"
import UserList from "./pages/UserList"
import Category from "./pages/Category"
import { useDispatch } from "react-redux"
import {resetCategory} from "./slices/category-slice"
import {resetExpense} from "./slices/expense-slice"
import ExpenseContainer from "./pages/ExpenseContainer"
import {fetchcategory} from "./slices/category-slice"
import {fetchExpense} from "./slices/expense-slice"



export default function App(props){

const dispatch = useDispatch()
    useEffect(()=>{
        if(localStorage.getItem("token")){
             dispatch(fetchcategory())
             dispatch(fetchExpense())
         }
        
     },[dispatch])

    

    // const [category, setCategory] = useState([])

    const {isLoggedIn, handleLogout, user} = useContext(UserContext)
    return(
        <div> 
            <h1> Expensifly</h1>

            <ul>
                <li> <Link to="/"> Home</Link></li>
                { (isLoggedIn || localStorage.getItem('token')) ?  (
                    <>
                     <li><Link to ="/account"> Account</Link></li>
                    <li> <Link to="/dashboard"> Dashboard</Link></li>
                    {(user?.role=="admin" || user?.role =="moderator") && <li> <Link to="/user-list">List User</Link></li>}
                    <li> <Link to ="/" onClick={()=>{
                        handleLogout()
                        dispatch(resetCategory())
                        dispatch(resetExpense())
                    }} > logout</Link></li>
                    <li> <Link to ="/category"> Category</Link></li>
                    <li> <Link to ="/expense"> Expense</Link></li>
                    </>
                ):(
                    <>
                     <li> <Link to ="/register"> Register</Link></li>
                        <li> <Link to="/login">Login</Link></li>
                    </>
                ) }
            </ul>

            <Routes>
            <Route  path ="/" element={<Home/>}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/account" element={<PrivateRoute allowRoles ={['admin', 'user', 'moderator']}> <Account /></PrivateRoute>}/>
            <Route path="/dashboard" element={<PrivateRoute allowRoles={['admin', 'moderator', 'user']}> <Dashboard /></PrivateRoute>}/>
            <Route  path ="/user-list" element={<PrivateRoute allowRoles={['admin', 'moderator']}> <UserList/></PrivateRoute>}/>
            <Route path ="/category" element ={ <PrivateRoute allowRoles={['user']}> <Category/></PrivateRoute>}/>
            <Route path = "/expense" element = {<PrivateRoute allowRoles={['user']}> <ExpenseContainer/></PrivateRoute>} />
            
            
            </Routes>
        </div>
    )
}