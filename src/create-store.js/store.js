import {configureStore} from "@reduxjs/toolkit"
import categoryReducer from "../slices/category-slice"
import expenseSliceReducer from "../slices/expense-slice"
const createStore=()=>{
    return configureStore({
        reducer: {
           category: categoryReducer,
           expense:expenseSliceReducer
        }
    })
}
export default createStore;