import {ListItem, Grid, Card, CardActionArea, CardContent, Typography, Divider, Box} from "@mui/material";
import {NoteType} from "../types";
import Link from "next/link";


export default function IndexItem(props: { note: NoteType }) {
    return <>
        <ListItem>
            <Card sx={{width: 1}}>
                <Link href={'/content/' + props.note.id} passHref>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {props.note.title}
                            </Typography>
                            <Typography variant="subtitle2" color="text.secondary">
                                {new Date(props.note.create_date).toLocaleString()}
                            </Typography>
                            <Divider/>
                            <br/>
                            <Typography variant="body2" color="text.secondary">
                                {props.note.content.replace(/<[^>]+>/g, "")}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Link>
            </Card>
        </ListItem>
    </>
}