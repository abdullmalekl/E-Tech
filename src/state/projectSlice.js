import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../app/api/apiSlice";
const initialState = {
    projects: [],
    Ploading: false,
    Perror: null ,
    project: null,
    };
// method get all projects
export const fetchProjects = createAsyncThunk("projects/fetchProjects", async (_, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;   
    try {
         const data = await  api.get(`/projects`).then(response => {
          console.log(response.data);
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
// deleteProject / DELETE method
export const deleteProject = createAsyncThunk("projects/delete",
 async(id , thunkAPI )=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const res = await api.delete(`/projects/${id}`);
        if(res.status === 201){
          return;
        }
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
        
    }
 }
 );
// addProject / POST method
 export const AddProject = createAsyncThunk("projects/insertProject", async(item , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
       const info = JSON.stringify(item);
      //  console.log(info);
       const data = await  api.post("/projects", info);
        // console.log(data)
        return data;
    } catch (error) {
        console.log(error.message);
        return rejectWithValue(error.message);
        
    }
 }
 );
 // getProject / GET method
 export const fetchProject = createAsyncThunk("projects/fetchProject", async (id , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
        const data = await api.get(`/projects/${id}`);
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});
// updateProject / PUT method
export const updateProject = createAsyncThunk("posts/updatePost", async(item , thunkAPI)=>{
    const {rejectWithValue} = thunkAPI;
    try {
       const data = await api.put(`/projects/${item.id}`,JSON.stringify(item));
        return data;
    } catch (error) {
        return rejectWithValue(error.message);
    }
 }
 );
const ProjectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        // this method to clean record in edit project before fullfiled again;
        cleanRecord: (state)=>{
            state.project = null;
            state.Perror = null;
        }
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchProjects.pending, (state) => {
            state.Ploading = true;
            state.Perror = null;
          })
          .addCase(fetchProjects.fulfilled, (state, action) => {
            state.Ploading = false;
            state.projects = action.payload;
          })
          .addCase(fetchProjects.rejected, (state, action) => {
            state.Ploading = false;
            state.Perror = action.payload;
          })
          .addCase(fetchProject.pending, (state) => {
            state.Ploading = true;
            state.Perror = null;
          })
          .addCase(fetchProject.fulfilled, (state, action) => {
            state.Ploading = false;
            state.project = action.payload;
          })
          .addCase(fetchProject.rejected, (state, action) => {
            state.Ploading = false;
            state.Perror = action.payload;
          })
          .addCase(AddProject.pending, (state) => {
            state.Ploading = true;
            state.Perror = null;
          })
          .addCase(AddProject.fulfilled, (state, action) => {
            state.Ploading = false;
            if(state.projects === 'no'){
              state.projects = [];
            }
            state.projects.push(action.payload.data);
            fetchProjects();
          })
          .addCase(AddProject.rejected, (state, action) => {
            state.Ploading = false;
            state.Perror = action.payload;
          })
          .addCase(deleteProject.pending, (state) => {
            state.Ploading = true;
            state.Perror = null;
          })
          .addCase(deleteProject.fulfilled, (state, action) => {
            state.Ploading = false;
            state.projects = state.projects.filter((el) => el.id !== action.payload);
          })
          .addCase(deleteProject.rejected, (state, action) => {
            state.Ploading = false;
            state.Perror = action.payload;
          })
          .addCase(updateProject.pending, (state) => {
            state.Ploading = true;
            state.Perror = null;
          })
          .addCase(updateProject.fulfilled, (state, action) => {
            state.Ploading = false;
            // this to update the state without calling api
            const updatedProjects = state.projects.map(project => {
              if (project.id === action.payload.data.id){
                return action.payload.data;
              }
              return project;
            });
            state.projects = updatedProjects;
          })
          .addCase(updateProject.rejected, (state, action) => {
            state.Ploading = false;
            state.Perror = action.payload;
          });
      }
});
export const {cleanRecord} = ProjectSlice.actions;
export default ProjectSlice.reducer;