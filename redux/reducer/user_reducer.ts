import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState, store} from '../store';
import {LoginBody, UserState} from "../../types";
import {fetchData} from "../../utils";
import {useAppSelector} from "../hooks";


const initialState: UserState = {
    token: "hello",
    username: '',
    nickname: '',
    avatar: '',
    lastRefresh: "2022-01-01T00:00:00.000Z", // 要预定一个早于最后修改时间的日期
    status: 'idle',
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.

async function FetchToken() {
    const last_refresh = store.getState().user.lastRefresh;
    const expiration = new Date(last_refresh).getTime() + (2 * 3600 * 1000)  // 两小时刷新周期
    if (new Date().getTime() > expiration) {  // 如果本地时间更早
        const jwt = await fetchData('post', "/user/jwt-refresh");  // 更新本地token
        return 'Bearer ' + jwt;
    }
    return null;
}


export const refreshToken = createAsyncThunk(
    'user/refreshToken',
    () => FetchToken()
);


export const userSlice = createSlice({
    name: 'user',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setUser(state, action: PayloadAction<LoginBody>) {
            state.token = action.payload.token;
            state.username = action.payload.username;
            state.nickname = action.payload.nickname;
            state.avatar = action.payload.avatar;
            state.lastRefresh = new Date().toLocaleString();
        },
        clearToken(state) {
            state.token = '';
        },
    },
    // 'extraReducers' 用于处理slice以外定义的actions,包括createAsyncThunk等异步操作
    extraReducers: (builder) => {
        builder
            .addCase(refreshToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.status = 'idle';
                if (action.payload !== null) {
                    state.token = action.payload;
                    state.lastRefresh = new Date().toLocaleString();
                }
            })
            .addCase(refreshToken.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const {setUser, clearToken} = userSlice.actions;


export const JWTToken = (state: RootState) => state.user.token;

export const Username = (state: RootState) => state.user.username;

export const AvatarHref = (state: RootState) => state.user.avatar;

export default userSlice.reducer;
