import {NoteState, NoteType} from "../../types";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState, store} from "../store";
import {fetchData} from "../../utils";

const initialState: NoteState = {
    notes: [],
    lastRefresh: "2022-01-01T00:00:00.000Z", // 要预定一个早于最后修改时间的日期
    status: 'idle'
}

async function fetchAllNotes() {
    console.log("fetchAllNotes");
    const last_refresh = store.getState().note.lastRefresh;
    const {last_modified} = await fetchData('get', '/note/lastModified');  // 获取远程最后更新时间
    if (new Date(last_modified) > new Date(last_refresh)) {  // 如果本地时间更早
        return await fetchData('get', "/note");  // 更新本地内容
    }
    return null;
}


export const getAllNotes = createAsyncThunk(
    'note/fetchAllNotes',
    fetchAllNotes
);


export const noteSlice = createSlice({
    name: 'note',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addNote(state, action: PayloadAction<NoteType>) {
            state.notes.push(action.payload)
        },
        forceRefreshNote(state){
            state.lastRefresh = "2022-01-01T00:00:00.000Z";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllNotes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAllNotes.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload !== null) {
                    state.notes = [];
                    state.notes = action.payload;  // 直接更新本地内容
                    state.lastRefresh = new Date().toLocaleString();  // 最后刷新时间更新为现在
                }
            })
            .addCase(getAllNotes.rejected, (state) => {
                state.status = 'failed';
            });
    },
})

export const {addNote,forceRefreshNote} = noteSlice.actions;

export const notesState = (state: RootState) => state.note.notes;

export const noteLastRefresh = (state: RootState) => state.note.lastRefresh;

export default noteSlice.reducer;