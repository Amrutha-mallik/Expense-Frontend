import {useFormik}from "formik"
import { useContext } from "react"
import UserContext from "../context/UserContext"

export default function Register(props){
    const { handleRegister, serverError} =useContext(UserContext)

    const formik = useFormik({
        initialValues:{
            username:"",
            email:"",
            password:""
        }, 
        onSubmit:(values,{resetForm})=>{
            console.log(values)
            handleRegister(values,resetForm )
        }
    })
    return(
        <div>
            <h2> Register with Us!</h2>
            {serverError && <p style={{color:"red"}}>{JSON.stringify(serverError)}</p>}
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <input  type="text" name="username" value={formik.values.username} onChange={formik.handleChange} placeholder="enter username"/>
                </div>

                <div>
                   <input  type="email" name="email" value={formik.values.email} onChange={formik.handleChange} placeholder="enter email"/> 
                </div>
                <div>
                    <input  type="password" name="password" value={formik.values.password} onChange={formik.handleChange} placeholder="enter password"/>
                </div>
                <div>
                    <input type="submit" value="register"/>
                </div>

            </form>
        </div>
    )
}