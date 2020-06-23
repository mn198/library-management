import React, { useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from "@material-ui/core/styles";
import classNames from "classnames";
import Container from '@material-ui/core/Container';
import Face from "@material-ui/icons/Face";
import Smartphone from "@material-ui/icons/Smartphone";
import Security from "@material-ui/icons/Security";

import InfoArea from '../../components/InfoArea/InfoArea';
import Footer from './Footer';
import Header from '../../components/Header/Header';
import HeaderLinks from '../../components/Header/HeaderLinks';
import Parallax from '../../components/Parallax/Parallax';
// background image
import bg from '../../assets/img/bg.jpg';

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

const title = {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "700",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontSize: '3.3125rem'
};

const styles = {
    container: {
      zIndex: "12",
      color: "#FFFFFF",
      ...container
    },
    title: {
      ...title,
      display: "inline-block",
      position: "relative",
      marginTop: "30px",
      minHeight: "32px",
      color: "#FFFFFF",
      textDecoration: "none"
    },
    subtitle: {
      fontSize: "1.313rem",
      maxWidth: "500px",
      margin: "10px auto 0"
    },
    main: {
      background: "#FFFFFF",
      position: "relative",
      zIndex: "3",
    },
    mainRaised: {
      margin: "-40px 30px 0px",
      borderRadius: "6px",
      boxShadow:
        "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
    },
    description: {
      fontWeight: '300',
      lineHeight: '1.5em',
      fontSize: '1.1rem'
    },
    section: {
        padding: "60px 0",
        textAlign: "center"
      },
      section_title: {
        marginBottom: "1rem",
        marginTop: "30px",
        minHeight: "32px",
        fontSize: '2.4rem',
        lineHeight: '1.5em',
        color: "#3C4858",
        margin: "1.75rem 0 0.875rem",
        textDecoration: "none",
        fontWeight: "700",
        fontFamily: `"Roboto Slab", "Times New Roman", serif`
      }
  };

  const useStyles = makeStyles(styles);


export default function Landing(props){
    const { ...rest } = props;
    const classes = useStyles();

    useEffect(() => {
      document.title = "Quản lý thư viện"
    }, [])
    return(
        <div>
            <Header
            color="transparent"
            routes={'/'}
            rightLinks={<HeaderLinks />}
            brand="Thư Viện Tỉnh Kiên Giang"
            fixed
            changeColorOnScroll={{
            height: 400,
            color: "white"
            }}
            {...rest}
        />
            <Parallax filter image={bg}>
                <div className={classes.container}>
                    <Grid container>
                        <Grid item xs={12} sm={12} md={6}>
                        <h1 className={classes.title}>Quản lý thư viện</h1>
                        <h4 className={classes.description}>
                        </h4>
                        <br />
                        <Button
                            variant="contained"
                            color="secondary"                            
                            href="/login"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fas fa-play"/>
                            {' '} Quản lý
                        </Button>
                        </Grid>
                    </Grid>
                </div>
            </Parallax>
            <div className={classNames(classes.main, classes.mainRaised)}>
                <Container>
                    <div className={classes.section}>
                        <Grid container justify="center">
                            <Grid item xs={12} sm={12} md={8}>
                            <h2 className={classes.section_title}>Chào mừng bạn đến với trang quản lý thư viện</h2>
                            <h5 className={classes.description}>
                                Đây sẽ là nơi giúp bạn thống kê thông tin về các quyển sách và đồng thời giúp bạn quản lý việc mượn sách một cách hiệu quả nhất.
                            </h5>
                            </Grid>
                        </Grid>
                        <div>
                            <Grid container>
                            <Grid item xs={12} sm={12} md={4}>
                                <InfoArea
                                title="Giao diện thân thiện"
                                description="Được thiết kế với mục tiêu dễ dàng sử dụng, giao diện gần gũi cho người trải nghiệm tốt nhất."
                                icon={Face}
                                iconColor="info"
                                vertical
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InfoArea
                                title="Linh hoạt"
                                description="Hỗ trợ cả trên mobile và desktop giúp bạn xem hoạt động mọi lúc mọi nơi."
                                icon={Smartphone}
                                iconColor="success"
                                vertical
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4}>
                                <InfoArea
                                title="Bảo mật"
                                description="Các thông tin quan trọng sẽ được mã hóa."
                                icon={Security}
                                iconColor="danger"
                                vertical
                                />
                            </Grid>
                            </Grid>
                    </div>
                    </div>
                </Container>
            </div>
            <Footer/>
        </div>
    )
}