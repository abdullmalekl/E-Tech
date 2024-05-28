import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../app/api/apiSlice";
const initialState = {
    notifications: [],
    Nloading: false,
    error: null ,
    notification: null,
    };
// method get all Notifications
export const fetchNotifications = createAsyncThunk("Notifications/fetchNotifications", async (_, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;   
    try {
         const data = await  api.get(`/notifications`).then(response => {
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
// addNotifications/ POST method
 export const addNotification= createAsyncThunk("Notifications/insertNotification", async(item , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
       const info = JSON.stringify(item);
    //    console.log(info)
       const data = await  api.post("/notifications", info);
        // console.log(data)
        return data;
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
        
    }
 }
 );
 // getNotification / GET method
 export const fetchNotification = createAsyncThunk("Notifications/fetchNotification", async (id , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const res = await api.get(`/notifications/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
// updateNotification / PUT method
export const updateNotification = createAsyncThunk("Notifications/updateNotification", async(item , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
       const res = await api.put(`/notifications/${item.id}`,JSON.stringify(item));
        const data = res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
        
    }
 }
 );
const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: {
        // this method to clean record in edit notification before fullfiled again;
        cleanRecord: (state)=>{
            state.notification = null;
        }
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchNotifications.pending, (state) => {
          state.Nloading = true;
          state.error = null;
        })
        .addCase(fetchNotifications.fulfilled, (state, action) => {
          state.Nloading = false;
          state.notifications = action.payload;
        })
        .addCase(fetchNotifications.rejected, (state, action) => {
          state.Nloading = false;
          state.error = action.payload;
        })
        .addCase(fetchNotification.pending, (state) => {
          state.Nloading = true;
          state.error = null;
        })
        .addCase(fetchNotification.fulfilled, (state, action) => {
          state.Nloading = false;
          state.notification = action.payload;
        })
        .addCase(fetchNotification.rejected, (state, action) => {
          state.Nloading = false;
          state.error = action.payload;
        })
        .addCase(addNotification.pending, (state) => {
          state.Nloading = true;
          state.error = null;
        })
        .addCase(addNotification.fulfilled, (state, action) => {
          state.Nloading = false;
          state.notifications.push(action.payload);
        })
        .addCase(addNotification.rejected, (state, action) => {
          state.Nloading = false;
          state.error = action.payload;
        })
        .addCase(updateNotification.pending, (state) => {
          state.Nloading = true;
          state.error = null;
        })
        .addCase(updateNotification.fulfilled, (state, action) => {
          state.Nloading = false;
          state.notification = action.payload;
        })
        .addCase(updateNotification.rejected, (state, action) => {
          state.Nloading = false;
          state.error = action.payload;
        });
    }
});
export const {cleanRecord} = notificationsSlice.actions;
export default notificationsSlice.reducer;




// 

