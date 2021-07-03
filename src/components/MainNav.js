import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import TheatersIcon from '@material-ui/icons/Theaters'
import LiveTvIcon from '@material-ui/icons/LiveTv'


const useStyles = makeStyles({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        backgroundColor: 'rgb(3,37,65)',
        zIndex: 100,
    },
})

export default function SimpleBottomNavigation() {
    const classes = useStyles()
    const [value, setValue] = React.useState(0)
    const history = useHistory()

    useEffect(() => {
        if (value === 0) {
            history.push("/")
        } else if (value === 1) {
            history.push("/movies")
        } else if (value === 2) {
            history.push("/series")
        }
    }, [value, history])

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue)
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction
                style={{ color: "rgb(203, 228, 248)" }}
                label="Trending"
                icon={<FlashOnIcon />} />
            <BottomNavigationAction
                style={{ color: "rgb(203, 228, 248)" }}
                label="Movie"
                icon={<TheatersIcon />} />
            <BottomNavigationAction
                style={{ color: "rgb(203, 228, 248)" }}
                label="TV Series"
                icon={<LiveTvIcon />} />
        </BottomNavigation>
    )
}
