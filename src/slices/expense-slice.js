import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axios"

export const fetchExpense = createAsyncThunk("expense/fetchExpense", async(undefined,{rejectWithValue})=>{
    try{
        const response = await axios.get("/api/expense", {headers:{Authorization:localStorage.getItem('token')}} )
        console.log("expense", response.data)
        return response.data
    }
    catch(err){
        return rejectWithValue( err.message)
    }
})


export const createExpense  = createAsyncThunk("expense/createExpense",async({form, resetform}, {rejectWithValue})=>{
    console.log(form)
    try{
        const response = await axios.post("/api/expense", form,{headers:{Authorization:localStorage.getItem('token')}})
        console.log( response.data)
        resetform()
        return response.data
    } 
    catch(err){
      return rejectWithValue( err.message)  
    }
} )

export const removeExpense = createAsyncThunk("expense/removeExpense", async(id,  {rejectWithValue})=>{
    try{
        const response = await axios.delete(`/api/expense/${id}`, {headers:{Authorization:localStorage.getItem('token')}})
        console.log( "sam",response.data)
        return response.data

    }
    catch(err){
        return rejectWithValue( err.message)
    }

})


const expenseSlice = createSlice({
    name:"expense",
    initialState:{
        data:[],
        loading:false,
        errors:null
    },
    reducers:{
        resetExpense:(state) =>{
            state.data=[],
            state.loading = false,
            state.errors = null
            
        }
    },

    extraReducers:(builder) =>{
        builder
        .addCase(fetchExpense.pending,(state)=>{
            state.loading = true,
            state.errors = null,
            state.data = []
        })
        
        .addCase(fetchExpense.fulfilled, (state, action)=>{
            state.data = action.payload,
            state.errors=null,
            state.loading = false
        })
        .addCase(fetchExpense.rejected, (state, action)=>{
            state.loading = false,
            state.errors = action.payload
        })
        .addCase(createExpense.fulfilled,(state, action)=>{
            state.data.push(action.payload)
        })
        .addCase(createExpense.rejected,(state)=>{
            state.errors = action.payload
        })

    }
})

export const  {resetExpense} = expenseSlice.actions 
export default expenseSlice.reducer