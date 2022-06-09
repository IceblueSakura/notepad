import * as React from 'react';
import {Head, Html, Main, NextScript} from 'next/document';


export default function MyDocument() {
    return (
        <Html lang="en">
            <Head>
                <meta name='application-name' content='记事本'/>
                <meta name='apple-mobile-web-app-capable' content='yes'/>
                <meta name='apple-mobile-web-app-status-bar-style' content='default'/>
                <meta name='apple-mobile-web-app-title' content='PWA App'/>
                <meta name='description' content='一个在线记事本'/>
                <meta name='format-detection' content='telephone=no'/>
                <meta name='mobile-web-app-capable' content='yes'/>
                <meta name='msapplication-TileColor' content='#2B5797'/>
                <meta name='msapplication-tap-highlight' content='no'/>
                <meta name='theme-color' content='#000000'/>
                <link rel='shortcut icon' type='image/png' href='/icons/128.png'/>
                <link rel='icon' type='image/png' sizes='144x144' href='/icons/144.png'/>
                <link rel='icon' type='image/png' sizes='256x256' href='/icons/256.png'/>
                <link rel='manifest' href='/manifest.webmanifest'/>
                <link rel="stylesheet"
                      href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
                <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            </Head>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );

}

