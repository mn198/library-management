import React, { useContext, useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Snackbar from '@material-ui/core/Snackbar';
// core components
import Header from "../../components/Header/Header";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Footer from "../../components/Footer/Footer";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Button from "../../components/CustomButtons/Button";
import Card from "../../components/Card/Card";
import CardBody from "../../components/Card/CardBody";
import CardHeader from "../../components/Card/CardHeader";
import CardFooter from "../../components/Card/CardFooter";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
// context
import { authContext } from '../../contexts/AuthContext';
// request
import axios from 'axios';
// config
import { base_url } from '../../config/config';
// jsonwebtoken decode
import jwt_decode from 'jwt-decode'; 
import setAuthToken from '../../helpers/setAuthToken';

const conatinerFluid = {
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%"
  };

const container = {
    ...conatinerFluid,
    "@media (min-width: 576px)": {
        maxWidth: "540px"
    },
    "@media (min-width: 768px)": {
        maxWidth: "720px"
    },
    "@media (min-width: 992px)": {
        maxWidth: "960px"
    },
    "@media (min-width: 1200px)": {
        maxWidth: "1140px"
    }
    };

const styles = {
    container: {
      ...container,
      zIndex: "2",
      position: "relative",
      paddingTop: "20vh",
      color: "#FFFFFF",
      paddingBottom: "200px"
    },
    cardHidden: {
      opacity: "0",
      transform: "translate3d(0, -60px, 0)"
    },
    pageHeader: {
      minHeight: "100vh",
      height: "auto",
      display: "inherit",
      position: "relative",
      margin: "0",
      padding: "0",
      border: "0",
      alignItems: "center",
      "&:before": {
        background: "rgba(0, 0, 0, 0.5)"
      },
      "&:before,&:after": {
        position: "absolute",
        zIndex: "1",
        width: "100%",
        height: "100%",
        display: "block",
        left: "0",
        top: "0",
        content: '""'
      },
      "& footer li a,& footer li a:hover,& footer li a:active": {
        color: "#FFFFFF"
      },
      "& footer": {
        position: "absolute",
        bottom: "0",
        width: "100%"
      }
    },
    form: {
      margin: "0"
    },
    cardHeader: {
      width: "auto",
      textAlign: "center",
      marginLeft: "20px",
      marginRight: "20px",
      marginTop: "-40px",
      padding: "20px 0",
      marginBottom: "15px"
    },
    socialIcons: {
      maxWidth: "24px",
      marginTop: "0",
      width: "100%",
      transform: "none",
      left: "0",
      top: "0",
      height: "100%",
      lineHeight: "41px",
      fontSize: "20px"
    },
    divider: {
      marginTop: "30px",
      marginBottom: "0px",
      textAlign: "center"
    },
    cardFooter: {
      paddingTop: "0rem",
      border: "0",
      borderRadius: "6px",
      justifyContent: "center !important"
    },
    socialLine: {
      marginTop: "1rem",
      textAlign: "center",
      padding: "0"
    },
    inputIconsColor: {
      color: "#495057"
    }
  };

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
    const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
    setTimeout(function() {
    setCardAnimation("");
    }, 700);
    const classes = useStyles();
    const { ...rest } = props;
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
            setOpen(true);
          })
    }
  
    useEffect(() => {
      if(auth.isAuthenticated){
        props.history.push('/admin');
      }
    }, [auth.isAuthenticated, props.history])

  return (
    <div>
      <Header
        absolute
        color="transparent"
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
      <div
        className={classes.pageHeader}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={4}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="primary" className={classes.cardHeader}>
                    <h4>Đăng nhập</h4>
                    <div className={classes.socialLine}>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-twitter"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-facebook"} />
                      </Button>
                      <Button
                        justIcon
                        href="#pablo"
                        target="_blank"
                        color="transparent"
                        onClick={e => e.preventDefault()}
                      >
                        <i className={"fab fa-google-plus-g"} />
                      </Button>
                    </div>
                  </CardHeader>
                  <p className={classes.divider}>Or Be Classical</p>
                  <CardBody>
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: email,
                        onChange: e => setEmail(e.target.value),
                        type: "email",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        value: password,
                        onChange: e => setPassword(e.target.value),
                        type: "password",
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off"
                      }}
                    />
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button simple color="primary" size="lg" onClick={() => handleSubmit()}>
                      Bắt đầu!
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>

      <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        >
        <CustomSnackbar
            onClose={handleClose}
            variant="error"
            message="Email hoặc mật khẩu không hợp lệ!"
        />
      </Snackbar>

    </div>
  );
}
