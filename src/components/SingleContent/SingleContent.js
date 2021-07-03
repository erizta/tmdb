import './SingleContent.css'

import { img_300, unavailable } from '../../config/config'
import { Badge } from '@material-ui/core'

import ContentModal from "../ContentModal/ContentModal"

const SingleContent = ({ id, poster, title, date, vote_average, media_type }) => {
    return (
        <ContentModal media_type={media_type} id={id}>
            <img
                className="poster"
                src={poster ? `${img_300}/${poster}` : unavailable}
                alt={`poster${title}`} />
            <Badge
                badgeContent={vote_average * 10 + '%'}
                color={vote_average < 5 ? 'error' : vote_average > 7 ? 'primary' : 'secondary'}
                overlap="rectangle"
                variant="standard"
            />
            <b className="title">{title}</b>
            <span className="subTitle">{date}</span>
        </ContentModal>

    )
}

export default SingleContent