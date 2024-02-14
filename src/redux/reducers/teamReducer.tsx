import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosApiConfig } from "../../api/axiosConfig";

interface Iuser{
    avatar:string,
    first_name:string,
    last_name:string,
    id:number,
    email:string,
}

interface IinitialState {
    users:Iuser[],
    user:Iuser | null,

}

const initialState:IinitialState = {
    users:[],
    user:null,

}



export const getUsers = createAsyncThunk(
    "users",
    async ( _ , { dispatch } ) => {     
        try {
            const response = await axiosApiConfig.get(`/users?page=1&per_page=8`);   
            const gotUsers = response.data
            dispatch(setUsers(gotUsers.data))
        } catch (error: unknown) {
            console.log("Ошибка получения данных");
        }
    }
);


export const teamSlice = createSlice({
    name:"team",
    initialState,
    reducers:{
        setUsers:(state, action)=>{
            state.users = action.payload
        },
        setUser:(state, action: PayloadAction<number>) =>{
            const user = state.users.find(obj => obj.id === action.payload)
            state.user = user || null;
        }
    }
})

export const { setUsers, setUser } = teamSlice.actions

export default teamSlice.reducer