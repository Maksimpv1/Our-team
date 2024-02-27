import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { axiosApiConfig } from "../../api/axiosConfig";
import { dbFirebase } from "../../services/firebase";
import { doc, updateDoc, getDoc, arrayUnion, setDoc } from "@firebase/firestore";
import { storeType } from "../store/store";
import { IinitialState } from "./reduceTypes";

const initialState:IinitialState = {
    users:[],
    user:null,
    page:1,
    perPage:8,
    loginState:false,
    userToken:'',
    userFirebase: {
        email: '',
        password: '',
        token: '',
        uid: '', 
      },
    Liked:{ },

}



export const getUsers = createAsyncThunk(
    "users/fetchUsers",
    async ( { page, perPage, func }: { page:number, perPage:number, func: number } , { dispatch } ) => {     
        try {
            const response = await axiosApiConfig.get(`/users?page=${page}&per_page=${perPage}`);   
            const gotUsers = response.data
            dispatch(setUsers({data: gotUsers.data, func: func}))
        } catch (error: unknown) {
            console.log("Ошибка получения данных");
        }
    }
);

export const addLikedCards = createAsyncThunk(
    "Cards/addLike",
    async (user: { id: number }, { getState }) => {
        const state = getState() as storeType;
        const likedRef = doc(dbFirebase, 'profile', state.info.userFirebase.uid);
        try {
            const docSnap = await getDoc(likedRef);

            if (docSnap.exists()) {
             await updateDoc(likedRef, {
                    Liked: arrayUnion({ id: user.id })
             });
            }else{
                await updateDoc(likedRef, {
                    Liked:[{
                        id: user.id,
                    }],
                });                
            }

        } catch (error) {
            console.log("Ошибка добавления:" + error);
        }
    }
);

export const deleteLikedCards = createAsyncThunk(
    "Cards/delLike",
    async(user: {id: number } , { getState }) => {
        const state = getState() as storeType;
        const likedRef = doc(dbFirebase, 'profile', state.info.userFirebase.uid);
        console.log(state.info.userFirebase.uid)
        try{
            await setDoc(
                likedRef,
                { Liked: state.info.Liked.Liked?.filter((item:any) => item.id !== user.id) },
              );                 
        }catch(error: unknown){
            console.log("Ошибка Удаления")
        }
    }
)

export const teamSlice = createSlice({
    name:"team",
    initialState,
    reducers:{
        setUsers:(state, action)=>{
            switch(action.payload.func){
                case 1:                    
                    state.users = [...action.payload.data]
                    break;
                case 2:                 
                    state.users = [ ...state.users, ...action.payload.data]
            }
        },
        setUser:(state, action: PayloadAction<number>) =>{
            const user = state.users.find(obj => obj.id === action.payload)
            state.user = user || null;
        },
        setNextPage:(state) => {
            state.page = state.page + 1
        },
        setLoginState:(state, action) => {
            state.userToken = action.payload
        },
        createUser:(state,action)=> {
            state.userFirebase.email = action.payload.email
            state.userFirebase.password = action.payload.password
            state.userFirebase.token = action.payload.token
            state.userFirebase.uid = action.payload.uid
        },
        removeUser:(state)=>{
            state.userFirebase.email = ''
            state.userFirebase.password = ''
            state.userFirebase.token = ''
            state.userFirebase.uid = ''
        },
        addToLiked:(state, action)=> {
            state.Liked = action.payload
        }
    }
})

export const { setUsers, setUser, setNextPage, setLoginState, createUser, removeUser,addToLiked } = teamSlice.actions

export default teamSlice.reducer