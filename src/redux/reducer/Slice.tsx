import { createSlice } from "@reduxjs/toolkit";
import {jsonData} from "../../utilities/utils/jsondata"
const initialState = {
  jsonData
  
};


const homeslice = createSlice({
  name: "homeslice",
  initialState: initialState ,
  reducers: { 
    update: (state, action) => {

    },
    deleteItem: (state, action) => {
      const newData=state.jsonData.filter((item)=>item.id!==action.payload)
      state.jsonData=newData
    },
    addItem: (state, action) => {
      const newData=[...state.jsonData,action.payload]
      state.jsonData=newData
    },
    handleOptions:(state,action)=>{
      const newData=state.jsonData.map((item)=>{
        if(item.id===action.payload){
          item.active=!item.active
          return item
        }
       else {
        item.active=false
        return item
       }
      })
      state.jsonData=newData
    }
  },

});


export const slicereducer = homeslice.reducer;
export const { update,deleteItem,handleOptions,addItem } = homeslice.actions;
