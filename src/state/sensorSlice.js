import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../app/api/apiSlice";
const initialState = {
    sensors: [],
    Sloading: false,
    error: null ,
    sensor: null,
    };
// method get all sensors
export const fetchSensors = createAsyncThunk("Sensors/fetchSensors", async (_, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;   
    try {
         const data = await  api.get('/sensors').then(response => {
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
// deleteSensor / DELETE method
export const deleteSensor = createAsyncThunk("Sensors/delete",async(item, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
      console.log(JSON.stringify(item));  
       var res = await api.delete(`/sensors/${item.id}`,item);
       console.log(res);
        return item.id;
    } catch (error) {
        return rejectWithValue(error.message);
        
    }
 }
 );
// addSensor / POST method
 export const addSensor = createAsyncThunk("Sensors/insertSensor", async(item , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
      // item must has a sensorType to test where will store it
      var req = JSON.stringify(item)
       console.log(req);
        await  api.post("/sensors", req);
        // console.log(data)
        return item;
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
        
    }
 }
 );
 // getSensor / GET method
 export const fetchSensor = createAsyncThunk("Sensors/fetchSensor", async (id , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const res = await api.get(`/sensors/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
// updateSensor / PUT method
export const updateSensor = createAsyncThunk("Sensors/updateSensor", async(item , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
      // item must has a sensorClass to test where will update it
      console.log(item);
       const res = await api.put(`/sensors/${item.id}`,JSON.stringify(item));
        return res;
    } catch (error) {
        return rejectWithValue(error.message);
        
    }
 }
 );
const sensorSlice = createSlice({
    name: "sensors",
    initialState,
    reducers: {
        // this method to clean record in edit sensor before fullfiled again;
        cleanRecord: (state)=>{
            state.sensors = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchSensors.pending, (state) => {
            state.Sloading = true;
            state.error = null;
          })
          .addCase(fetchSensors.fulfilled, (state, action) => {
            state.Sloading = false;
            state.sensors = action.payload;
          })
          .addCase(fetchSensors.rejected, (state, action) => {
            state.Sloading = false;
            state.error = action.payload;
          })
          .addCase(fetchSensor.pending, (state) => {
            state.Sloading = true;
            state.error = null;
          })
          .addCase(fetchSensor.fulfilled, (state, action) => {
            state.Sloading = false;
            state.sensor = action.payload;
          })
          .addCase(fetchSensor.rejected, (state, action) => {
            state.Sloading = false;
            state.error = action.payload;
          })
          .addCase(addSensor.pending, (state) => {
            state.Sloading = true;
            state.error = null;
          })
          .addCase(addSensor.fulfilled, (state, action) => {
            state.Sloading = false;
            console.log(action.payload.itemx);
            state.sensors.push(action.payload.item);
          })
          .addCase(addSensor.rejected, (state, action) => {
            state.Sloading = false;
            state.error = action.payload;
          })
          .addCase(deleteSensor.pending, (state) => {
            state.Sloading = true;
            state.error = null;
          })
          .addCase(deleteSensor.fulfilled, (state, action) => {
            state.Sloading = false;
            state.sensors = state.sensors.filter((el) => el.id !== action.payload);
          })
          .addCase(deleteSensor.rejected, (state, action) => {
            state.Sloading = false;
            state.error = action.payload;
          })
          .addCase(updateSensor.pending, (state) => {
            state.Sloading = true;
            state.error = null;
          })
          .addCase(updateSensor.fulfilled, (state, action) => {
            state.Sloading = false;
            console.log(action.payload.data);
            const updatedSensor = action.payload.data;
            state.sensors = state.sensors.map(sensor => {
              if (sensor.id === parseInt(updatedSensor.id)) {
                return updatedSensor;
              } else {
                return sensor;
              }
            });

          })
          .addCase(updateSensor.rejected, (state, action) => {
            state.Sloading = false;
            state.error = action.payload;
          });
      }
});
export const {cleanRecord} = sensorSlice.actions;
export default sensorSlice.reducer;