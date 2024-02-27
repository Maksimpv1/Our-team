export interface Iuser{
    avatar:string,
    first_name:string,
    last_name:string,
    id:number,
    email:string,
}
export interface ILiked {
    Liked?:number[]
}

export interface IinitialState {
    users:Iuser[],
    user:Iuser | null,
    page:number,
    perPage:number,
    loginState:boolean,
    userToken:string,
    userFirebase:{
        email:string | null,
        password:string | null,
        token:string | null,
        uid: string,
    },
    Liked:ILiked,

}