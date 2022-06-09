import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import React, {useState} from "react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Router from "next/router";

type DrawerType = {
    title: string,
    link: string,
}

export default function Navigation() {
    // const username = useAppSelector(Username);
    // const avatarHref = useAppSelector(AvatarHref);


    function handleAddClick() {
        Router.push("/content")
    }

    function handleUserClick() {
        Router.push("/account");
    }

    return (
            <Box sx={{flexGrow: 1}}>
                <AppBar>
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            记事本
                        </Typography>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={handleUserClick}
                        >
                            <AccountCircleIcon/>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                            onClick={handleAddClick}
                        >
                            <AddIcon/>
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <Toolbar/>
            </Box>
    )

}
