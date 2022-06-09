import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';


export const useAppDispatch = () => useDispatch<AppDispatch>();  // 调用dispatch执行action
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;  // 调用设置state生效
