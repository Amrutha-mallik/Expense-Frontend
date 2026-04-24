import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "../config/axios"

export const fetchcategory = createAsyncThunk("category/fetchcategory", async(undefined,{createcategory}) =>{
    try{
        const response = await axios.get('/api/categories', {headers:{Authorization:localStorage.getItem('token')}})
        console.log( "store update", response.data)
        return response.data
    }
    catch(err){
        console.log(err)
    }
})

export const createcategory = createAsyncThunk("category/createcategory", async({formdata,handleReset}, {rejectWithValue})=>{
    try{

        const response = await axios.post('/api/categories',formdata,{headers:{Authorization:localStorage.getItem('token')}})
        console.log("create data", response.data)
        handleReset("")
        return response.data
    }
    catch(err){
        console.log(err)
    }
 })

export const removeCategory = createAsyncThunk("category/removeCategory", async(id, {rejectWithValue})=>{
    try{
        const response = await axios.delete(`/api/categories/${id}`, {headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        return response.data
    }
    catch(err){
        console.log(err)
    }
})

export const updateCtegory = createAsyncThunk("category/updateCtegory", async ({editId, formdata, handleReset },{rejectWithValue})=>{
    try{
        const response = await axios.put(`/api/categories/${editId}`, formdata,{headers:{Authorization:localStorage.getItem('token')}})
        console.log(response.data)
        handleReset("")
        return response.data
        
    } catch(err){
        console.log(err)
    }
})

const categorySlice = createSlice({
    name:"category",
    initialState:{
        data:[],
        loading:false,
        errors:null,
        editId:null
    },
    reducers:{
        resetCategory:(state)=>{
            state.data =[],
            state.errors = null,
            state.loading = false
        },
        assignEditId:(state, action) =>{
            state.editId = action.payload
        },
        resetEditId:(state, action)=>{
            state.editId = null
        }
    },

    extraReducers: (builder) =>{
        builder
        .addCase(fetchcategory.fulfilled, (state, action) =>{
            state.data = action.payload
        })

        .addCase(createcategory.fulfilled, (state, action)=>{
            state.data.push(action.payload)
        })

        .addCase(removeCategory.fulfilled,(state, action)=>{
            const idx = state.data.findIndex(ele => ele._id == action.payload._id)
            state.data.splice(idx, 1)
        })
        .addCase(updateCtegory.fulfilled,(state, action)=>{
            const idx = state.data.findIndex(ele => ele._id == action.payload._id)
            state.data[idx]= action.payload
            state.editId = null
        })
        .addCase(updateCtegory.rejected,(state, action)=>{
            state.data = []
            state.errors = action.payload

        })
    }

})
export const {resetCategory, assignEditId, resetEditId} = categorySlice.actions

export default categorySlice.reducer