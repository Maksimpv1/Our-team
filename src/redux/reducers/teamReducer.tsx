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
    page:number,
    perPage:number,

}

const initialState:IinitialState = {
    users:[],
    user:null,
    page:1,
    perPage:8,

}



export const getUsers = createAsyncThunk(
    "users/fetchUsers",
    async ( { page, perPage }: { page:number, perPage:number } , { dispatch } ) => {     
        try {
            console.log(page)
            const response = await axiosApiConfig.get(`/users?page=${page}&per_page=${perPage}`);   
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
            state.users = [...state.users, ...action.payload]
        },
        setUser:(state, action: PayloadAction<number>) =>{
            const user = state.users.find(obj => obj.id === action.payload)
            state.user = user || null;
        },
        setNextPage:(state)=> {
            state.page = state.page + 1
        }
    }
})

export const { setUsers, setUser, setNextPage } = teamSlice.actions

export default teamSlice.reducer