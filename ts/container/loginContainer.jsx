import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Lock from '@material-ui/icons/Lock';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { loginAuthenticate } from '../../mme/redux/loginAuth/loginAuthDataActions';
// import LoginAuthResponse from '../component/login/loginAuthResponse';

const styles = {
  card: {
    maxWidth: 345,
    padding: 50,
    margin: 'auto',
  },
  
  margin: {
    margin: 10,
  },
  btnpadding:{
    padding: '0 60px'
  },
  centenContent:{
    justifyContent: 'center'
  }
};

class LoginContainer extends Component {


  login = () => {
      this.props.history.push('/demo/Home')
  } 
  render() {
    const { classes } = this.props;

    return (
      <div>
      <Card style={styles.card} elevation="3">
        {/* <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              Seat Occupancy
            </Typography>
          </CardContent>
      </CardActionArea> */}
        <CardContent>
              <div>
                <Grid container spacing={8} alignItems="flex-end">
                  <Grid item>
                  <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                    Sign in
                    </Typography>
                  </Grid>
                  <Grid item>
                  <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                   <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                  </Grid>
                </Grid>
           </div>         
          </CardContent>
          
      <CardActions style={styles.centenContent}>
        <Button variant="contained" color="primary" style={styles.btnpadding} onClick = {this.login}>
        Login
        </Button>
         <Button variant="contained" color="primary" style={styles.btnpadding} component={Link} to="/mme/" >
        Reset
        </Button>
        
      </CardActions>
    </Card>
    </div>
    
    )
  }
}

// LoginContainer.propTypes = {
//   loginAuthenticate : PropTypes.func.isRequired,
// }

// const mapDispatchToProps = dispatch => {
//   return bindActionCreators({
//     loginAuthenticate
//   }, dispatch);
// }

LoginContainer = withStyles(styles)(LoginContainer);

export default LoginContainer;