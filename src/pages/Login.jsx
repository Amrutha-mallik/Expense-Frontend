import {useFormik}from "formik"
import { useContext } from "react"
import UserContext from "../context/UserContext"

export default function Login(props){
    const { handleLogin,serverError} =useContext(UserContext)

    const formik = useFormik({
        initialValues:{  
            email:"",
            password:""
        }, 
        onSubmit:(values,{resetForm})=>{
            //console.log(values)
            handleLogin(values,resetForm )
        }
    })
    return(
        <div>
            <h2> Login with Us!</h2>
            {serverError && <p style={{color:"red"}}>{serverError}</p>}
            <form onSubmit={formik.handleSubmit}>
                <div>
                   <input  type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="enter email"/> 
                </div>
                <div>
                    <input  type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="enter password"/>
                </div>
                <div>
                    <input type="submit" value="Login"/>
                </div>

            </form>
        </div>
    )
}