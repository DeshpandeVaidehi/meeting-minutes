import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Videocam from '@material-ui/icons/Videocam';

const styles = (theme) => ({
    input: {
        display: 'none'
    }
});

class MediaCapture extends Component {

    state = {
        audio : [],
        videos : []
    }

    handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        const name = target.accept.includes('audio') ? 'audio' : 'videos';

        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            this.setState((prevState) => ({
                [name]: [...prevState[name], e.target.result]
            }));
        };
    };

    render() {
        const { classes } = this.props;

        return (
            <Fragment>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="icon-button-photo"
                    onChange={this.handleCapture}
                    type="file"
                />
                <label htmlFor="icon-button-photo">
                    <IconButton color="primary" component="span">
                        <PhotoCamera />
                    </IconButton>
                </label>

                <input
                    accept="audio/*"
                    capture="camcorder"
                    className={classes.input}
                    id="icon-button-audio"
                    onChange={this.handleCapture}
                    type="file"
                />
                <label htmlFor="icon-button-audio">
                    <IconButton color="primary" component="span">
                        <Videocam />
                    </IconButton>
                </label>
            </Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(MediaCapture);
