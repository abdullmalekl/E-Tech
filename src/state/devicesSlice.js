import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../app/api/apiSlice";
const initialState = {
    devices: [],
    Dloading: false,
    Derror: null ,
    device: null,
    };
// method get all devices
export const fetchDevices = createAsyncThunk("devices/fetchDevices", async (_, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;   
    try {
         const data = await  api.get(`/devices`).then(response => {
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
// deleteDevice / DELETE method
export const deleteDevice = createAsyncThunk("devices/delete",
 async(id , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        await api.delete(`/devices/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
        
    }
 }
 );
// addDevice / POST method
 export const addDevice = createAsyncThunk("devices/insertDevice", async(item , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
       const res =  await api.post("/devices", item);
        return res;
    } catch (error) {
      // console.log(error);
        return rejectWithValue(error.message);
        
    }
 }
 );
 // getDevices / GET method
 export const fetchDevice = createAsyncThunk("devices/fetchDevice", async (id , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const res = await api.get(`/devices/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
// updateDevice / PUT method
export const updateDevice = createAsyncThunk("devices/updateDevice", async(item , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
      console.log(JSON.stringify(item));
       const res = await api.put(`/devices/${item.id}`,JSON.stringify(item));
      //  console.log(res);
        return res;
    } catch (error) {
        return rejectWithValue(error.message);
        
    }
 }
 );
const devicesSlice = createSlice({
    name: "devices",
    initialState,
    reducers: {
        // this method to clean record in edit device before fullfiled again;
        cleanRecord: (state)=>{
            state.device = null;
            state.Derror = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchDevices.pending, (state) => {
            state.Dloading = true;
            state.Derror = null;
          })
          .addCase(fetchDevices.fulfilled, (state, action) => {
            state.Dloading = false;
            state.devices = action.payload;
          })
          .addCase(fetchDevices.rejected, (state, action) => {
            state.Dloading = false;
            state.Derror = action.payload;
          })
          .addCase(fetchDevice.pending, (state) => {
            state.Dloading = true;
            state.Derror = null;
          })
          .addCase(fetchDevice.fulfilled, (state, action) => {
            state.Dloading = false;
            state.device = action.payload;
          })
          .addCase(fetchDevice.rejected, (state, action) => {
            state.Dloading = false;
            state.Derror = action.payload;
          })
          .addCase(addDevice.pending, (state) => {
            state.Dloading = true;
            state.Derror = null;
          })
          .addCase(addDevice.fulfilled, (state, action) => {
            state.Dloading = false;
            if(state.devices === 'no'){
              state.devices = [];
            }
            state.devices.push(action.payload.data);
          })
          .addCase(addDevice.rejected, (state, action) => {
            state.Dloading = false;
            state.Derror = action.payload;
          })
          .addCase(deleteDevice.pending, (state) => {
            state.Dloading = true;
            state.Derror = null;
          })
          .addCase(deleteDevice.fulfilled, (state, action) => {
            state.Dloading = false;
            const updatedDevices = state.devices.filter(device => device.id !== action.payload);
            state.devices = updatedDevices;
          })
          .addCase(deleteDevice.rejected, (state, action) => {
            state.Dloading = false;
            state.Derror = action.payload;
          })
          .addCase(updateDevice.pending, (state) => {
            state.Dloading = true;
            state.Derror = null;
          })
          .addCase(updateDevice.fulfilled, (state, action) => {
            state.Dloading = false;
            // console.log(state.devices)
            console.log(action.payload.data)
            const updatedDevice = action.payload.data;
            state.devices = state.devices.map(device => {
              if (device.id === parseInt(updatedDevice.id)) {
                return updatedDevice;
              } else {
                return device;
              }
            });
          })
          .addCase(updateDevice.rejected, (state, action) => {
            state.Dloading = false;
            state.Derror = action.payload;
          });
      }
});
export const {cleanRecord} = devicesSlice.actions;
export default devicesSlice.reducer;