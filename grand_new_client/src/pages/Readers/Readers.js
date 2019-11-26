import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
// moment
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/vi';

// contexts
import { readerContext } from '../../contexts/ReaderContext';

// material-ui stuffs
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import Button from "../../components/CustomButtons/Button.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import avatar from "../../assets/img/new_logo.png";
import ReaderSkeleton from './ReaderSkeleton';
import config from '../../config/config';

const styles = theme => ({
  paper: {
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
  inline: {
    display: 'inline',
  },
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  modal_paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    marginTop: theme.spacing(3),
    minWidth: 100,
  },
  dob: {
    marginTop: theme.spacing(3)
  },
  none: {
    display: 'none'
  },
  avatar: {
    width: 130,
    height: 130
  },
  pointer: {
    cursor: 'pointer',
    width: 50,
    height: 50,
  },
  bigger: {
    padding: theme.spacing(3)
  },
  mnTitle: {
    fontSize: '1rem',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: '500',
    lineHeight: '1.6',
    letterSpacing: '0.0075em'
  }
});


function Readers(props) {
  const { classes } = props;
  dayjs.locale('vi');
  dayjs.extend(relativeTime);
  const { reader, dispatch } = useContext(readerContext);

  // alert delete
  const [alertDelete, setAlertDelete] = useState(false);
  const handleOpenAlertDelete = () => { setAlertDelete(true); }
  const handleCloseAlertDelete = () => { setAlertDelete(false); }
  //search
  const [ filter, setFilter ] = useState('');
    const [ filteredData, setFilterData] = useState(reader.list);
    const handleSearchChange = (e) => {
      setFilter(e.target.value);
      setFilterData(reader.list.filter(item => {
        return Object.keys(item).some(key => {
            if(typeof(item[key]) === 'string')
               return item[key].toLowerCase().includes(filter)        
        });
      }))
    } 
  // button in modal
  const AddReaderButton = () => {
    return(
        <Button color="success" onClick={handleAddReader}>Hoàn tất</Button>
    )
  }
  const DeleteReaderButton = () => {
    return(
      <Button color="danger" onClick={handleOpenAlertDelete}>Xóa</Button>
    )
  }
  const EditReaderButton = () => {
    return(
        <Button color="success" onClick={handleEditReader}>Lưu</Button>
    )
  }
  // open-close add reader modal
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  }
  // open-close for success snackbar
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
    
    const handleCloseSnackbar = () => {
      setOpenSnackbar(false);
    };
  // add reader
  const [values, setValues] = useState({
    gender: '',
    dob: new Date('2000-12-30'),
    avatar: null,
    email: '',
    name: '',
    introduce: '',
    address: '',
    button: 0,
    title: '',
    description: '',
    avatar_link: '',
    current_reader: '',
    snackbar_variant: '',
    snackbar_message: ''
  })
  const handleAddPress = () => {
    setValues((oldValues) => ({
      ...oldValues,
      gender: '',
      dob: new Date('2000-12-30'),
      avatar: null,
      email: '',
      name: '',
      introduce: '',
      address: '',
      button: 1,
      title: 'Thêm đọc giả',
      description: 'Điền thông tin đọc giả',
      avatar_link: ''
    }))
    setOpen(true); 
  }
  const handleChange = (e) => {
    e.persist();
    setValues(oldValues => ({
      ...oldValues,
      [e.target.name]: e.target.value
    }))
  
  }
  const handleDobChange = (date) => {
    setValues(oldValues => ({
      ...oldValues,
      dob: date
    }))
  }
  const handleImageChange = (e) => {
    let imgPreview = document.getElementById("avatar");
    if(imgPreview){
      imgPreview.src = URL.createObjectURL(e.target.files[0])
    }
    setValues((oldValues) => ({
      ...oldValues,
      avatar: e.target.files[0]
    }))
  }

  const getReaderList = () => {
    axios.get(config.base_url + '/readers')
      .then((result) => {
          dispatch({ type: 'GET_READER_LIST', payload: result.data})
          setFilterData(result.data)
      })
  }

  const handleAddReader = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append('gender', values.gender);
    formData.append('dob', values.dob);
    formData.append('avatar', values.avatar);
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('email', values.email);
    formData.append('introduce', values.introduce);

    axios.post(config.base_url + '/readers', formData, {
      headers: {
      'Content-Type': 'multipart/form-data',
    }})
      .then((result) => {
        setValues((old) => ({
          ...old,
          snackbar_message: 'Thêm đọc giả thành công',
          snackbar_variant: 'success'
        }))
        setOpen(false);
        setOpenSnackbar(true);
        getReaderList();
      })
      .catch((err) => {
        setValues((old) => ({
          ...old,
          snackbar_message: 'Vui lòng điền tất cả thông tin của đọc giả',
          snackbar_variant: 'error'
        }))
        setOpenSnackbar(true);
      })
  }
  // handle edit reader
  const handleEditReader = (e) => {
    e.preventDefault();

    var formData = new FormData();
    formData.append('gender', values.gender);
    formData.append('dob', values.dob);
    formData.append('avatar', values.avatar);
    formData.append('name', values.name);
    formData.append('address', values.address);
    formData.append('email', values.email);
    formData.append('introduce', values.introduce);

    axios.patch(config.base_url + '/readers/' + values.current_reader, formData, {
      headers: {
      'Content-Type': 'multipart/form-data',
    }})
      .then((result) => {
        setValues((old) => ({
          ...old,
          snackbar_message: 'Chỉnh sửa thành công',
          snackbar_variant: 'success'
        }))
        setOpen(false);
        setOpenSnackbar(true);
        getReaderList();
      })
      .catch((err) => {
        setValues((old) => ({
          ...old,
          snackbar_message: 'Có lỗi xảy ra khi không thể chỉnh sửa thông tin đọc giả',
          snackbar_variant: 'error'
        }))
        setOpenSnackbar(true);
      })
  }
  // handle delete reader
  const handleDeleteReader = () => {
    axios.delete(config.base_url + '/readers/' + values.current_reader)
      .then((result) => {
        setValues((old) => ({
          ...old,
          snackbar_message: 'Đã xóa thông tin đọc giả',
          snackbar_variant: 'success'
        }))
        setOpenSnackbar(true);
        setOpen(false);
        getReaderList();
      })
      .catch((err) => {
        setValues((old) => ({
          ...old,
          snackbar_message: 'Có lỗi xảy ra khi xóa thông tin đọc giả',
          snackbar_variant: 'error'
        }))
        setOpenSnackbar(true);
      })
      handleCloseAlertDelete();
  }
  // handle when user press an user item in grid
  const handleEditPressed = (readerId) => {
    axios.get(config.base_url + '/readers/' + readerId)
      .then((result) => {
        setOpen(true);
        setValues(oldValues => ({
          ...oldValues,
          name: result.data.name,
          email: result.data.email,
          dob: result.data.dob,
          avatar: result.data.avatar,
          avatar_link: result.data.avatar,
          address: result.data.address,
          introduce: result.data.introduce,
          gender: result.data.gender,
          button: 2,
          title: 'Thông tin đọc giả',
          description: 'Có thể chỉnh sửa thông tin',
          current_reader: result.data._id
        }))
      })
  }

  const handleReload = () => {
    dispatch({ type: 'RESET_READER_LIST'});
    getReaderList();
  }
  
  useEffect(() => {
    getReaderList();
}, [])

  return (
    <Paper className={classes.paper}>
      <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                value={filter}
                onChange={e => handleSearchChange(e)}
                fullWidth
                placeholder="Tìm kiếm theo tên, barcode hoặc địa chỉ email"
                InputProps={{
                  disableUnderline: true,
                  className: classes.searchInput,
                }}
              />
            </Grid>
            <Grid item>
              <Tooltip title="Thêm">
                <IconButton onClick={() => handleAddPress()}>
                  <AddIcon/>
                </IconButton>
              </Tooltip>

              {/* Add reader modal */}
              <Dialog
                open={open}
                onClose={handleClose}
                scroll={'body'}
                fullWidth={true} 
                maxWidth='md'
              >
                <DialogContent fullWidth={true} maxWidth='md'>
              
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={8}>
                      <Card>
                        <CardHeader color="primary">
                          <h4 className={classes.cardTitleWhite}>{values.title}</h4>
                          <p className={classes.cardCategoryWhite}>{values.description}</p>
                        </CardHeader>
                        <CardBody>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={8}>
                              <CustomInput
                                labelText="Họ và tên"
                                id="name"
                                inputProps={{
                                  name: "name",
                                  value: values.name,
                                  onChange: handleChange
                                }}
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                            <GridItem xs={12} sm={12} md={4}>
                              <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="gender">Giới tính</InputLabel>
                                <Select
                                  value={values.gender}
                                  onChange={handleChange}
                                  inputProps={{
                                    name: 'gender',
                                    id: 'gender',
                                  }}
                                >
                                  <MenuItem value={'male'} selected>Nam</MenuItem>
                                  <MenuItem value={'female'}>Nữ</MenuItem>
                                </Select>
                              </FormControl>
                            </GridItem>
                          </GridContainer>
                          
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={6}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                className={classes.dob}
                                  disableToolbar
                                  value={values.dob}
                                  onChange={handleDobChange}
                                  variant="inline"
                                  format="MM/dd/yyyy"
                                  margin="normal"
                                  id="date-picker-inline"
                                  label="Ngày sinh"
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                />
                                </MuiPickersUtilsProvider>
                            </GridItem>
                            <GridItem xs={12} sm={12} md={6}>
                              <CustomInput
                                labelText="Email"
                                id="email"
                                inputProps={{
                                  name: "email",
                                  value: values.email,
                                  onChange: handleChange
                                }}
                                formControlProps={{
                                  fullWidth: true
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <CustomInput
                                labelText="Địa chỉ"
                                id="address"
                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  name: "address",
                                  value: values.address,
                                  onChange: handleChange,
                                  multiline: true,
                                  rows: 2
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                          <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                              <InputLabel style={{ color: "#AAAAAA" }}>Giới thiệu</InputLabel>
                              <CustomInput
                                labelText="Vài điều về bạn"
                                id="introduce"

                                formControlProps={{
                                  fullWidth: true
                                }}
                                inputProps={{
                                  name: "introduce",
                                  value: values.introduce,
                                  onChange: handleChange,
                                  multiline: true,
                                  rows: 5
                                }}
                              />
                            </GridItem>
                          </GridContainer>
                        </CardBody>
                        <CardFooter>
                          {values.button === 1 ? <AddReaderButton/> : <EditReaderButton/>}
                          {values.button === 2 ? <DeleteReaderButton/> : null}
                          <Button color="info" onClick={handleClose}>Đóng</Button>
                        </CardFooter>
                      </Card>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                      <Card profile>
                        <CardAvatar profile>
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <Avatar imgProps={{id: 'avatar'}} className={classes.avatar} src={values.avatar_link ? values.avatar_link : avatar} alt='...' />
                          </a>
                        </CardAvatar>
                        <CardBody profile>
                          <input
                            accept="image/*"
                            name="image"
                            className={classes.none}
                            id="image"
                            type="file"
                            onChange={handleImageChange}
                          />
                          <label htmlFor="image">
                            <Button round component="span" className={classes.button}>
                              Đổi ảnh
                            </Button>
                          </label>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                
                </DialogContent>
              </Dialog>
              {/* end add reader modal */}
              <Tooltip title="Tải lại">
                <IconButton onClick={handleReload}>
                  <RefreshIcon className={classes.block} color="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.contentWrapper}>
        <Grid container spacing={3}>
        
        { reader.isLoading === false ? <ReaderSkeleton/> : filteredData.map((rd) => (
          <React.Fragment key={rd._id}>
            <Grid item xs={12} md={4} onClick={() => handleEditPressed(rd._id)}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="avatar" src={rd.avatar ? rd.avatar : avatar} className={classes.pointer}/>
              </ListItemAvatar>
              <ListItemText
                className={classes.pointer}
                primary={
                  <Typography
                      component="span"
                      className={classes.inline + ' ' + classes.mnTitle}
                      color="textPrimary"
                    >
                       {rd.name}
                    </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      className={classes.inline}
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      {rd.email}
                    </Typography>
                    <Typography
                      className={classes.block}
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      Cập nhật:{' ' + dayjs(rd.updatedAt).fromNow()}
                    </Typography>
                  </React.Fragment>
                }
              />
              
            </ListItem>
            </Grid>
          </React.Fragment>

        ))
        }
      

        </Grid>
      </div>
      {/* snackbar for success reader added */}
      <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        >
        <CustomSnackbar
            onClose={handleCloseSnackbar}
            variant={values.snackbar_variant}
            message={values.snackbar_message}
        />
      </Snackbar>
      {/* end --- */}

      <Dialog
        open={alertDelete}
        onClose={handleCloseAlertDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa thông tin đọc giả này ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertDelete} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteReader} color="danger">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

    </Paper>        
  )
}

export default withStyles(styles)(Readers);