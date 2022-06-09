import {Grid} from "@mui/material";
import dynamic from "next/dynamic";
import React, {useEffect, useState} from "react";
import {LoadingButton} from "@mui/lab";
import {useRouter} from "next/router";
import {NoteType} from "../../types";
import {refreshToken} from "../../redux/reducer/user_reducer";
import {getAllNotes} from "../../redux/reducer/note_reducer";
import {useAppDispatch} from "../../redux/hooks";
import {fetchData} from "../../utils";

const MyEditor = dynamic(
    () => import('../../component/my_editor'),
    {ssr: false}
)

export default function Content() {
    const [note, setNote] = useState<NoteType>({} as NoteType);  // 使用类型断言
    const dispatch = useAppDispatch()

    return <>
        <Grid container>
            <Grid container item xs={12} md={12}>
                <MyEditor note={note} isNew={true}/>
            </Grid>
        </Grid>

    </>


}
