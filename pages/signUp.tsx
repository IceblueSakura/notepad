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
import {LoginBody} from "../types";
import {setUser} from "../redux/reducer/user_reducer";
import Router from "next/router";


const theme = createTheme();

export default function SignUp() {
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);  // 获取Form提交的数据
        const avatar = await fetch(APIServer + '/file/upload-signup');  // 上传头像，异步等待fetch完成
        const {avatar_url} = await avatar.json();  // 解构JSON，取出头像地址
        const response = await fetch(APIServer + '/user/login', {
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
                        注册
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
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="nickname"
                                    label="昵称"
                                    name="nickname"
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
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            注册
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={"/signIn"} passHref>
                                    <MuiLink variant="body2">
                                        已有账号，登录
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