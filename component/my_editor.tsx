import React, {useEffect, useState} from "react"
import '@wangeditor/editor/dist/css/style.css'
import {Editor, Toolbar} from '@wangeditor/editor-for-react'
import {IDomEditor, IToolbarConfig} from '@wangeditor/editor'
import {Box, Button, Chip, TextField} from "@mui/material";
import {APIServer} from "../config";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {JWTToken} from "../redux/reducer/user_reducer";
import {NoteType} from "../types";
import {LoadingButton} from "@mui/lab";
import Router from "next/router";
import Link from "next/link";
import {fetchData} from "../utils";
import {forceRefreshNote} from "../redux/reducer/note_reducer";


export default function MyEditor(props: { note: NoteType, isNew: boolean }) {
    const token = useAppSelector(JWTToken);
    const [editor, setEditor] = useState<IDomEditor | null>(null)// 存储 editor 实例
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const toolbarConfig: Partial<IToolbarConfig> = {} // 菜单栏配置

    // 编辑器配置
    const editorConfig = {
        placeholder: '请输入内容...',
        MENU_CONF: {
            uploadImage: {
                server: APIServer + '/file/upload',
                maxFileSize: 3 * 1024 * 1024, // 最大3MB
                fieldName: 'file',
                allowedFileTypes: ['image/*'],
                headers: {
                    Accept: 'application/json',
                    Authorization: token,
                },

            }
        },
        onCreated: (editor: React.SetStateAction<IDomEditor | null>) => {  // 编辑器创建之后，记录 editor 实例，用于执行 editor API
            setEditor(editor)
        },
        onChange: (editor: { children: any }) => {  // editor 选区或者内容变化时触发
            // @ts-ignore
            // setTimeout(() => props.handleChange(editor.getHtml()), 5000); // 检测到内容修改时五秒后状态提升
            // @ts-ignore
            // console.log('changed', editor.getHtml());
            setContent(editor.getHtml());
        },
    }

    // 组件销毁时，销毁 editor 实例
    // 使用hooks而不是class组件能减少重复代码(在DidUpdate/DidMount中)
    useEffect(() => {
        setTitle(props.note.title);
        setContent(props.note.content);
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    }, [editor])

    async function handleSaveClick() {  // 保存或更新
        setLoading(true);  // 按钮展示加载中动画
        if (props.isNew) {  // 根据详细内容页面传入的props判断按钮是新增还是更新
            // 使用utils.ts定义好的fetchData函数，省略了手动传入token的步骤
            await fetchData('post', '/note/create', JSON.stringify({
                "title": title,
                "content": content,
                "content_type": "html",
                "create_date": new Date(),
                "author_id": props.note.author_id
            }))
        } else {
            await fetchData('post', '/note/update', JSON.stringify({
                "id": props.note.id,
                "title": title,
                "content": content,
                "content_type": "html",
                "create_date": new Date(),
                "author_id": props.note.author_id
            }));
        }
        setLoading(false);  // 按钮停止加载中动画
    }

    async function handleDeleteClick() {
        setLoading(true);  // 按钮展示加载中动画
        await fetchData('post', '/note/delete', JSON.stringify({id: props.note.id}));
        dispatch(forceRefreshNote());  // 根据最后修改时间无法刷新，在这触发强制刷新notes
        setLoading(false);  // 按钮停止加载中动画
        await Router.push("/");
    }

    return (
        <Box>
            <Box style={{border: '1px solid #ccc', zIndex: 100}} sx={{maxWidth: '100%'}}>
                <TextField fullWidth label="标题" id="fullWidth" value={title} onChange={(event) => {
                    setTitle(event.target.value)
                }}/>
                {props.isNew ? '' :
                    <Chip label={'上次修改时间: ' + new Date(props.note.create_date).toLocaleString()} variant="outlined"/>}

                {/* 渲染 toolbar */}
                <Toolbar
                    editor={editor}
                    defaultConfig={toolbarConfig}
                    style={{borderBottom: '1px solid #ccc'}}
                />

                {/* 渲染 editor */}
                <Editor
                    defaultConfig={editorConfig}
                    style={{minHeight: 400}}
                    value={content}
                />

            </Box>
            <LoadingButton variant={"contained"} loading={loading} onClick={handleSaveClick}>保存</LoadingButton>
            {props.isNew ? '' :
                <LoadingButton variant={"contained"} loading={loading} onClick={handleDeleteClick}>删除</LoadingButton>
            }
            <Link href={'/'} passHref><Button variant={"contained"}>回到主页</Button></Link>
        </Box>

    )
}