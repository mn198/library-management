import React, { useState, useContext, useEffect } from 'react';

// material-ui stuffs
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { amber, green } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';

import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardBody from '../../components/Card/CardBody';

// context
import { authContext } from '../../contexts/AuthContext';
// request
import axios from 'axios';
// config
import { base_url } from '../../config/config';
// jsonwebtoken decode
import jwt_decode from 'jwt-decode'; 
import setAuthToken from '../../helpers/setAuthToken';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          mn
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const useStyles = makeStyles(theme => ({
    '@global': {
      body: {
        backgroundColor: theme.palette.common.white,
      },
    },
    root: {
        marginTop: theme.spacing(16)
    },
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  
  const useStyles1 = makeStyles(theme => ({
      success: {
        backgroundColor: green[600],
      },
      error: {
        backgroundColor: theme.palette.error.dark,
      },
      info: {
        backgroundColor: theme.palette.primary.main,
      },
      warning: {
        backgroundColor: amber[700],
      },
      icon: {
        fontSize: 20,
      },
      iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
      },
      message: {
        display: 'flex',
        alignItems: 'center',
      },
    }));
  
    const variantIcon = {
      success: CheckCircleIcon,
      warning: WarningIcon,
      error: ErrorIcon,
      info: InfoIcon,
    };
  
function MySnackbarContentWrapper(props) {
    const classes = useStyles1();
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
    <SnackbarContent
        className={classes[variant] + ' ' + className}
        aria-describedby="client-snackbar"
        message={
        <span id="client-snackbar" className={classes.message}>
            <Icon className={classes.icon + ' ' + classes.iconVariant} />
            {message}
        </span>
        }
        action={[
        <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
            <CloseIcon className={classes.icon} />
        </IconButton>,
        ]}
        {...other}
    />
    );
}


export default function SignIn(props) {
    // style
    const classes = useStyles();
    
    // context
    const { auth, dispatch } = useContext(authContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // open snackbar error message
    const [open, setOpen] = React.useState(false);
    
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleSubmit = (e) => {
        e.preventDefault();
  
        const data = {
          email,
          password
        }
  
        axios.post(base_url + '/auth', data)
          .then((result) => {
              if(result.data.accessToken){
                const { accessToken } = result.data;
                const user = jwt_decode(accessToken);
  
                localStorage.setItem('jwtToken', accessToken);
                setAuthToken(accessToken);
                dispatch({type: 'LOGIN', payload: user});
              } else {
                setOpen(true);
                setPassword('');
              }
          })
          .catch((err) => {
            console.log(err);
            setOpen(true);
          })
    }
  
    useEffect(() => {
      if(auth.isAuthenticated){
        props.history.push('/admin');
      }
    }, [auth.isAuthenticated, props.history])
  
    return (
    
      <Container component="main" maxWidth="xs" className={classes.root}>
        <CssBaseline />
        <Card>
            <CardHeader color="info">
                <h4 className={classes.cardTitleWhite}>Đăng nhập vào trang quản lý</h4>
            </CardHeader>
            <CardBody>
            <div className={classes.paper}>
            <form className={classes.form} noValidate onSubmit={(e) => handleSubmit(e)}>
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Địa chỉ Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Nhớ mật khẩu"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                >
                Đăng nhập
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Quên mật khẩu
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="/sign-up" variant="body2">
                    {"Chưa có tài khoản? Đăng ký ngay!"}
                    </Link>
                </Grid>
                </Grid>
            </form>
            </div>

            <Box mt={8}>
            <Copyright />
            </Box>
            <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            >
            <MySnackbarContentWrapper
                onClose={handleClose}
                variant="error"
                message="Email or password is invalid!"
            />
            </Snackbar>
            </CardBody>
        </Card>
      </Container>
    );
  }