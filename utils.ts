import {APIServer} from "./config";
import Router from "next/router";
import {store} from "./redux/store";
import {refreshToken} from "./redux/reducer/user_reducer";


export async function fetchData(method: string, url: string, body: string = '') {  // 设置body默认值为空字符串，可不传入
    const token = store.getState().user.token;  // 获取redux token state
    let response;  // 定义变量
    if(method.toLowerCase()==='post'){
        response = await fetch(APIServer + url, {  // 等待数据获取完成
            method: 'post',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'

            },
            body:body  // post请求才能带body
        });
    }else{
        response = await fetch(APIServer + url, {  // 等待数据获取完成
            method: method,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            },
        });
    }
    if (response.status === 401) {  // Unauthorized 未登录错误
        await Router.push('/signIn');  // 跳转到登录页
        return [];
    }
    return await response.json();
}