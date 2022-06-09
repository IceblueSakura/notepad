import {Action, combineReducers, configureStore, ThunkAction} from '@reduxjs/toolkit';
import storage from './storage'; // 为了解决Next.js的SSR影响，需要自定义redux-persist的存储方式
import {persistReducer} from 'redux-persist';
import UserReducer from './reducer/user_reducer';
import NoteReducer from './reducer/note_reducer';


const reducers = combineReducers({
    user: UserReducer,
    note: NoteReducer
})

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,  // 忽略可序列化检查
        }),
});


// 默认不需要redux-persist持久化的store创建方式
// export const store = configureStore({
//     reducer: {
//         user: UserReducer,
//         note: NoteReducer
//     }
// })


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    RootState,
    unknown,
    Action<string>>;
