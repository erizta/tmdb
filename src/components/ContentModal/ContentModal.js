import React, { useEffect, useState } from "react"
import axios from "axios"
import "./ContentModal.css"

import { makeStyles } from "@material-ui/core/styles"
import { Button } from "@material-ui/core"

import Modal from "@material-ui/core/Modal"
import Backdrop from "@material-ui/core/Backdrop"
import Fade from "@material-ui/core/Fade"

import {
    img_500,
    unavailable,
    unavailableLandscape,
} from "../../config/config"

import YouTubeIcon from "@material-ui/icons/YouTube"
import Carousel from "../Carousel/Carousel"

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        width: "85%",
        height: "90%",
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        position: "relative",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        boxShadow: "20px 20px 50px rgba(0, 0, 0, 0.5)",
        overflow: "hidden",
        padding: theme.spacing(1, 1, 3),
        backdropFilter: "blur(5.8px)"
    },
}))

export default function TransitionsModal({ children, media_type, id }) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [content, setContent] = useState()
    const [video, setVideo] = useState()

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )

        setContent(data)
        // console.log(data)
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )

        setVideo(data.results[0]?.key)
    }

    useEffect(() => {
        fetchData()
        fetchVideo()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <div
                className="media"
                style={{ cursor: "pointer" }}
                color="inherit"
                onClick={handleOpen}
            >
                {children}
            </div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <div className="ContentModal">
                                <img
                                    src={
                                        content.poster_path
                                            ? `${img_500}/${content.poster_path}`
                                            : unavailable
                                    }
                                    alt={content.name || content.title}
                                    className="ContentModal__portrait"
                                />
                                <img
                                    src={
                                        content.backdrop_path
                                            ? `${img_500}/${content.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={content.name || content.title}
                                    className="ContentModal__landscape"
                                />
                                <div className="ContentModal__about">
                                    <span className="ContentModal__title">
                                        {content.name || content.title} (
                                        {(
                                            content.first_air_date ||
                                            content.release_date ||
                                            "-----"
                                        ).substring(0, 4)}
                                        )
                                    </span>
                                    {content.tagline && (
                                        <i className="tagline">{content.tagline}</i>
                                    )}
                                    <span className="ContentModal__description">
                                        {content.overview}
                                    </span>
                                    <Button
                                        variant="contained"
                                        startIcon={<YouTubeIcon />}
                                        color="primary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Play Clip
                                    </Button>
                                    <div>
                                        <Carousel id={id} media_type={media_type} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    )
}