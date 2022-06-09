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
import {fetchData} from "../utils";
import {useAppDispatch} from "../redux/hooks";
import {setUser} from "../redux/reducer/user_reducer";
import {LoginBody} from "../types";
import Router from "next/router";


const theme = createTheme();

export default function SignIn() {
    const dispatch = useAppDispatch()

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);  // 获取Form提交的数据
        const response = await fetch(APIServer + '/user/login', {  // 异步等待fetch完成
            method: 'post',
            body: JSON.stringify({
                username: data.get('username'),
                password: data.get('password'),
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.status !== 201) {  // 登录失败
            alert("请重试！");
        } else {
            let json: LoginBody = await response.json();
            json.token = 'Bearer ' + json.token
            dispatch(setUser(json));  // 执行redux action更新state
            await Router.push('/');  // 单页路由跳转到主页
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={{marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center',}}>
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        登录
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField margin="normal" required fullWidth id="username" label="用户名" name="username"
                                   autoComplete="username" autoFocus
                        />
                        <TextField margin="normal" required fullWidth name="password" label="密码" type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button type="submit" fullWidth variant="contained" sx={{mt: 3, mb: 2}}>登录</Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href={"/signUp"} passHref>
                                    <MuiLink href="#" variant="body2">
                                        注册
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