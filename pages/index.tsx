import Head from "next/head";
import {Grid, List} from "@mui/material";
import IndexItem from "../component/index_item";
import {useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {getAllNotes, notesState} from "../redux/reducer/note_reducer";
import {NoteType} from "../types";
import {refreshToken} from "../redux/reducer/user_reducer";

export default function Index() {
    const notes: NoteType[] = useAppSelector(notesState);  // 获取redux state
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(refreshToken());  // redux action刷新登录token
        dispatch(getAllNotes()); //  redux action刷新所有记事项
    }, [dispatch]);  // 仅在第一次更新时刷新数据
    return <>
        <Head><title>记事本</title></Head>
        <Grid container>
            <Grid item xs={12} md={6} sx={{minWidth: 300}}>
                <List>
                    {notes.map((note) => (  // 遍历所有文章state,渲染组件
                        <IndexItem key={note.id} note={note}/>
                    ))}
                </List>
                <br/>
            </Grid>
        </Grid>
    </>
}
