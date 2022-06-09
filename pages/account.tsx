import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import MuiLink from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Link from "next/link";
import {APIServer} from "../config";
import {LoginBody, UserType} from "../types";
import {clearToken, setUser} from "../redux/reducer/user_reducer";
import Router from "next/router";
import {useEffect, useState} from "react";
import {fetchData} from "../utils";
import {useAppDispatch} from "../redux/hooks";


const theme = createTheme();

export default function SignUp() {
    const [userData, setUserData] = useState<UserType>({} as UserType);  // 创建空内容的组件state
    const dispatch = useAppDispatch()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);  // 获取Form提交的数据
        const avatar = await fetch(APIServer + '/file/upload-signup');  // 上传头像，异步等待fetch完成
        const {avatar_url} = await avatar.json();  // 解构JSON，取出头像地址
        const response = await fetch(APIServer + '/user/update', {  // 更新信息
            method: 'post',
            body: JSON.stringify({
                username: data.get('username'),
                password: data.get('password'),
                nickname: data.get('nickname'),
                avatar: avatar_url,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status !== 201) {  // 注册失败
            alert("请重试！");
        } else {
            // 成功也不需要处理返回数据了
            await Router.push('/signUp');  // 单页路由跳转到登录页
        }
    }

    function handleLogout() {
        dispatch(clearToken());
        Router.push("/");
    }

    useEffect(() => {
        fetchData("get", "/user")
            .then((res) => {
                console.log("获取用户信息")
                setUser(res)  // 把获取到的数据设定到组件state中
            })
    }, [])


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        更新/查询用户信息
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                        <Grid container spacing={2}>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="用户名"
                                    name="username"
                                    autoComplete="username"
                                    defaultValue={userData.username}

                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nickname"
                                    label="昵称"
                                    name="nickname"
                                    defaultValue={userData.nickname}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="密码"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="repeatPassword"
                                    label="重输密码"
                                    type="password"
                                    name="repeatPassword"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="repeatPassword"
                                    label="头像"
                                    type="file"
                                    name="file"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <img
                                    src={userData.avatar}
                                    alt={"头像"}
                                    width={"100"}
                                    height={"100"}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            提交更新
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                            onClick={handleLogout}
                        >
                            退出登录
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={"/"} passHref>
                                    <MuiLink variant="body2">
                                        返回主页
                                    </MuiLink>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
}