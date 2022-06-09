import {Grid} from "@mui/material";
import dynamic from "next/dynamic";
import React, {useEffect, useState} from "react";
import {LoadingButton} from "@mui/lab";
import {useRouter} from "next/router";
import {NoteType} from "../../types";
import {refreshToken} from "../../redux/reducer/user_reducer";
import {getAllNotes, notesState} from "../../redux/reducer/note_reducer";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {fetchData} from "../../utils";

const MyEditor = dynamic(
    () => import('../../component/my_editor'),
    {ssr: false}
)

export default function Content() {
    const router = useRouter();
    const {id} = router.query;  // 使用Router Hooks获取动态的路由的id
    const [note, setNote] = useState<NoteType>({} as NoteType);  // 使用类型断言，建立默认空白内容的组件state
    const notes: NoteType[] = useAppSelector(notesState);  // 获取所有记事项的redux state
    useEffect(() => {  // 使用React Hooks使代码只在渲染时执行一次
        for (const note of notes) {  // 遍历查找记事项，因为数据都在本地所以效率很高
            if (note.id === Number(id)) {
                setNote(note);
                break;
            }
        }
    }, [id, notes])

    return <>
        <Grid container>
            <Grid container item xs={12} md={12}>
                <MyEditor note={note} isNew={false}/>
            </Grid>
        </Grid>
    </>
}
