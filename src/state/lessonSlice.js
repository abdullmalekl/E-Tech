import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../app/api/apiSlice";
const initialState = {records: [], loading: false, error: null , record: null};
// method get all posts
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (_, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;   
    try {
         const data = await  api.get(`/posts`).then(response => {
            return response.data
         }).catch(error =>{
            console.error(error);
         });
        // console.log(data.data);
        return data;
        
    }catch (error) {
        return rejectWithValue(error.message);
    }
});
// deletepost / DELETE method
export const deletePost = createAsyncThunk("posts/fetchPosts/delete",
 async(id , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        await fetch(`http://localhost:5000/posts/${id}`, {
            method: "DELETE"
        });
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
        
    }
 }
 );
// addpost / POST method
 export const AddPost = createAsyncThunk("posts/insertItem", async(item , thunkAPI)=>{
    const {rejectWithValue } = thunkAPI;
    // console.log(auth.id);
    // item.UserId = auth.id;
    try {
       const info = JSON.stringify(item);
    //    console.log(info)
       const data = await  api.post("/posts", info);
        // console.log(data)
        return data;
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
        
    }
 }
 );
 // getpost / GET method
 export const fetchPost = createAsyncThunk("posts/fetchPost", async (id , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const res = await fetch(`http://localhost:5000/posts/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
// updatePose / PATCH method
export const UpdatePost = createAsyncThunk("posts/updatePost", async(item , thunkAPI)=>{
    const {rejectWithValue , getState} = thunkAPI;
    const {auth} = getState();
    console.log(auth.id);
    item.UserId = auth.id;
    try {
       const res = await fetch(`http://localhost:5000/posts/${item.id}`, {
            method: "PATCH",
            body: JSON.stringify(item),
            headers: {
                "Content-Type" :  "application/json; charset= UTF-8",
            }
        });
        const data = res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
        
    }
 }
 );
const PostSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // this method to clean record in edit post before fullfiled again look to /pages/Edit.jsx
        cleanRecord: (state)=>{
            state.record = null;
        }
    },
    

    
});
export const {cleanRecord} = PostSlice.actions;
export default PostSlice.reducer;