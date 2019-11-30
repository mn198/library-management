import React, { useContext, useState, useEffect } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/CustomButtons/Button";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import HeaderLinks from "../../components/Header/HeaderLinks";
import Parallax from "../../components/Parallax/Parallax";
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import profile from "../../assets/img/tim_512x512.png";
//context
import { authContext } from '../../contexts/AuthContext';

import styles from "../../assets/jss/material-dashboard-react/views/profilePage";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const { auth } = useContext(authContext);
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const [ checkboxes, setCheckboxes ] = useState({
    addReader: false, editReader: false, deleteReader: false,
    addBook: false, editBook: false, deleteBook: false,
    addLending: false, editLending: false, deleteLending: false
  })
  useEffect(() => {
    var permissionTable = [1, 2, 4, 8, 16, 32, 64, 128, 256];
    var total = auth.user.permissionLevel;
    for(var i = permissionTable.length-1; i >= 0; i--){
      if(total >= permissionTable[i]){
        permissionTable[i] = 0;
        total -= permissionTable[i];
      }
    }
    var permissionName = ["addReader", "editReader", "deleteReader", "addBook", "editBook", "deleteBook", "addLending", "editLending", "deleteLending"];
    for(var i = 0; i < permissionTable.length; i++){
      if(permissionTable[i] === 0){
        checkboxes[permissionName[i]] = true;
      }
    }


    setCheckboxes({...checkboxes})
  }, [auth.isAuthenticated])
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <Header
        color="transparent"
        brand="Thư viện tỉnh Kiên Giang"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("../../assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>{auth.user.name}</h3>
                    <h6>{auth.user.email}</h6>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button>
                  </div>
                </div>

                <Grid container spacing={3} style={{marginTop: '30px'}}>
                          <Grid item xs={12} md={4} >
                          <FormControl component="fieldset">
                            <FormLabel component="legend"> Quyền vào dữ liệu đọc giả</FormLabel>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  checked={checkboxes.addReader}
                                  value="0"
                                  control={<Checkbox color="primary" />}
                                  label="Thêm"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.editReader}
                                  value="1"
                                  control={<Checkbox color="primary" />}
                                  label="Sửa"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.deleteReader}
                                  value="2"
                                  control={<Checkbox color="primary" />}
                                  label="Xóa"
                                  labelPlacement="bottom"
                                />
                              </FormGroup>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={4}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend"> Quyền vào dữ liệu sách</FormLabel>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  checked={checkboxes.addBook}
                                  value="3"
                                  control={<Checkbox color="primary" />}
                                  label="Thêm"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.editBook}
                                  value="4"
                                  control={<Checkbox color="primary" />}
                                  label="Sửa"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.deleteBook}
                                  value="5"
                                  control={<Checkbox color="primary" />}
                                  label="Xóa"
                                  labelPlacement="bottom"
                                />
                              </FormGroup>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={4}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend"> Quyền vào dữ liệu mượn sách</FormLabel>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  checked={checkboxes.addLending}
                                  value="6"
                                  control={<Checkbox color="primary" />}
                                  label="Thêm"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.editLending}
                                  value="7"
                                  control={<Checkbox color="primary" />}
                                  label="Sửa"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.deleteLending} 
                                  value="8"
                                  control={<Checkbox color="primary" />}
                                  label="Xóa"
                                  labelPlacement="bottom"
                                />
                              </FormGroup>
                            </FormControl>
                          </Grid>
                          </Grid>

              </GridItem>
            </GridContainer>
            <div className={classes.description} style={{marginTop: '30px'}}>
              <p>
                  .
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
