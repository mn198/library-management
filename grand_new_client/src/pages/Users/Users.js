import React, { useState, useEffect, useContext} from 'react';
//material ui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Snackbar from '@material-ui/core/Snackbar';
//custom
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
import Button from "../../components/CustomButtons/Button";
import CardBody from '../../components/Card/CardBody';
import Card from '../../components/Card/Card';
import CardHeader from '../../components/Card/CardHeader';
import CardFooter from '../../components/Card/CardFooter';
import CustomInput from '../../components/CustomInput/CustomInput';


import { Table, TableRow, TableCell, TableHead, TableBody, Typography } from '@material-ui/core';
// context
import { userContext } from '../../contexts/UserContext';
import { authContext } from '../../contexts/AuthContext';
//dayjs
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';
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
    contentWrapper: {
        margin: '40px 16px',
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
})

const useStyles = makeStyles(styles);

const Users = (props) => {
    const classes = useStyles();

    const { user, dispatch } = useContext(userContext);
    const auth = useContext(authContext);

    const [permission, setPermission] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);

    // error input
    const [ errorInput, setErrorInput ] = useState(false);

    // state
    const [ checkboxes, setCheckboxes ] = useState({
      addReader: false, editReader: false, deleteReader: false,
      addBook: false, editBook: false, deleteBook: false,
      addLending: false, editLending: false, deleteLending: false
    })

    const [ values, setValues ] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      permissionLevel: '',
      snackbar_message: '',
      snackbar_variant: '',
      current_userId: '',
      title: ''
    })

    const handleChange = (e) => {
      e.persist();

       setValues(oldValues => ({
        ...oldValues,
        [e.target.name]: e.target.value
      }))    
    }
    
    const handleChecboxChange = name => event => {
      setCheckboxes({ ...checkboxes, [name]: event.target.checked });
      if(event.target.checked){
        permission[(event.target.value)] = 1;
      } else {
        permission[(event.target.value)] = 0;
      }
    };

    const setDefaultValues = () => {
      setValues({
        name: '',
        email: '',
        password: '',
        permissionLevel: '',
        snackbar_message: '',
        snackbar_variant: '',
        current_userId: '',
        confirmPassword: '',
        title: 'Thêm người dùng'
      })
      setCheckboxes({
        addReader: false, editReader: false, deleteReader: false,
        addBook: false, editBook: false, deleteBook: false,
        addLending: false, editLending: false, deleteLending: false
      })
      setPermission([0, 0, 0, 0, 0, 0, 0, 0, 0]);
      setCheckAllBook(false);
      setCheckAllLending(false);
      setCheckAllReader(false);
    }

    // check all reader
    const [ checkAllReader, setCheckAllReader ] = useState(false);
    const handleCheckAllReaderChange = () => {
      if(!checkAllReader){
        setCheckAllReader(true);
        setCheckboxes({...checkboxes, addReader: true, editReader: true, deleteReader: true })
        permission[0] = permission[1] = permission[2] = 1;
      } else {
        setCheckAllReader(false);
        setCheckboxes({...checkboxes, addReader: false, editReader: false, deleteReader: false })
        permission[0] = permission[1] = permission[2] = 0;
      }
    }

    // check all book
    const [ checkAllBook, setCheckAllBook ] = useState(false);
    const handleCheckAllBookChange = () => {
      if(!checkAllBook){
        setCheckAllBook(true);
        setCheckboxes({...checkboxes, addBook: true, editBook: true, deleteBook: true })
        permission[3] = permission[4] = permission[5] = 1;
      } else {
        setCheckAllBook(false);
        setCheckboxes({...checkboxes, addBook: false, editBook: false, deleteBook: false })
        permission[3] = permission[4] = permission[5] = 0;

      }
    }

    const [ checkAllLending, setCheckAllLending ] = useState(false);
    const handleCheckAllLendingChange = () => {
      if(!checkAllLending){
        setCheckAllLending(true);
        setCheckboxes({...checkboxes, addLending: true, editLending: true, deleteLending: true })
        permission[6] = permission[7] = permission[8] = 1;

      } else {
        setCheckAllLending(false);
        setCheckboxes({...checkboxes, addLending: false, editLending: false, deleteLending: false })
        permission[6] = permission[7] = permission[8] = 0;

      }
    }
    // snackbar
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = () => { setOpenSnackbar(false); };
    const handleOpenSnackbar = () => { setOpenSnackbar(true); }

    // modal
    const [ openModal, setOpenModal ] = useState(false);
    const handleOpenModal = () => { setOpenModal(true); }
    const handleCloseModal = () => { setOpenModal(false); }
    // dayjs
    dayjs.locale('vi');
    dayjs.extend(relativeTime);
    // alert delete
    const [ alertDelete, setAlertDelete ] = useState(false);
    const handleOpenAlertDelete = () => setAlertDelete(true);
    const handleCloseAlertDelete = () => setAlertDelete(false);    

    // add user
    const handleAddUserPressed = () => {
      setDefaultValues();
      handleOpenModal();
    }

    const handleAddUser = () => {

      var count = 0;
      for(var i = 0; i < permission.length; i++){
        if(permission[i]){
          count += Math.pow(2, i);
        }
      }
      
      const data = {
        name: values.name,
        email: values.email,
        password: values.password,
        permissionLevel: count
      }

      axios.post(config.base_url + '/users', data)
        .then((result) => {
          setValues(oldValues => ({
            ...oldValues,
            snackbar_message: 'Thêm người dùng thành công !',
            snackbar_variant: 'success'
          }))
          handleOpenSnackbar();
          handleCloseModal();
          getUserList();
        })
        .catch((err) => {
          setValues(oldValues => ({
            ...oldValues,
            snackbar_message: 'Có lỗi xảy ra khi thêm người dùng!',
            snackbar_variant: 'error'
          }))
        })
      
    }

    const handleDeletePressed = (userId) => {
      setValues(old => ({
        ...old,
        current_userId: userId
      }))
      handleOpenAlertDelete();
    }

    const handleEditPressed = (usr) => {
      setDefaultValues();
      var permissionTable = [1, 2, 4, 8, 16, 32, 64, 128, 256];
      var total = usr.permissionLevel;
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
      
      setValues({
        ...values,
        name: usr.name,
        email: usr.email,
        title: 'Chỉnh sửa thông tin người dùng'
      })

      setCheckboxes({...checkboxes})
      handleOpenModal();
      
    }

    const handleDeleteUser = () => {
      axios.delete(config.base_url + '/users/' + values.current_userId)
        .then((result) => {
          setValues(old => ({
            ...old,
            snackbar_message: 'Đã xóa thông tin người dùng!',
            snackbar_variant: 'success'
          }))
          handleOpenSnackbar();
          handleCloseModal();
          getUserList();
        })
        .catch((err) => {
          setValues(old => ({
            ...old,
            snackbar_message: 'Có lỗi xảy ra khi xóa thông tin người dùng!',
            snackbar_variant: 'error'
          }))
          handleOpenSnackbar();
          handleCloseModal();
        })
        handleCloseAlertDelete();
    }

    const getUserList = () => {
        axios.get(config.base_url + '/users')
        .then((result) => {
          if(result.data.error){
            dispatch({ type: 'RESET_USER_LIST'});
            setValues(old => ({
              ...old,
              snackbar_message: 'Trang này chỉ dành cho người quản trị!',
              snackbar_variant: 'error'
            }))
            handleOpenSnackbar();
          } else {
            dispatch({ type: 'GET_USER_LIST', payload: result.data})
          }
        })
    }

    useEffect(() => {
        document.title = "Người dùng"
        getUserList();
    }, [])

    return(
        <Paper className={classes.paper}>
            <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
                <Toolbar>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item>
                        <SearchIcon className={classes.block} color="inherit" />
                        </Grid>
                        <Grid item xs>
                            <TextField
                                name="search"
                                fullWidth
                                placeholder="Tìm kiếm"
                                InputProps={{
                                disableUnderline: true,
                                className: classes.searchInput,
                                }}
                            />
                        </Grid>
                        <Grid item>
                            <Tooltip title="Thêm">
                                <IconButton onClick={handleAddUserPressed}>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Tải lại">
                                <IconButton onClick={handleAddUserPressed}>
                                    <RefreshIcon/>
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <div className={classes.contentWrapper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Tên</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Ngày tạo</TableCell>
                    <TableCell>Hành động</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                      
                        !user.isLoading ? null : user.list.map((usr) => {
                        if(usr._id !== auth.auth.user.userId){
                            return (
                            <TableRow key={usr._id} >
                                <TableCell>{usr.name}</TableCell>
                                <TableCell>{usr.email}</TableCell>
                                <TableCell>{dayjs(usr.createdAt).format('DD/MM/YYYY')}</TableCell>
                                <TableCell>
                                    <Tooltip title="Sửa" onClick={() => handleEditPressed(usr)}>
                                        <IconButton>
                                            <EditIcon/>
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Xóa">
                                        <IconButton onClick={() => handleDeletePressed(usr._id)}>
                                            <DeleteIcon/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        )}}
                    )
                    }
                </TableBody>
                </Table>
            </div>
            <Dialog
              open={openModal}
              onClose={handleCloseModal}
              scroll={'body'}
              fullWidth={true} 
              maxWidth='md'>
              <DialogContent>
                  <Card>
                      <CardHeader color="info">
                          <h4 className={classes.cardTitleWhite}>Thêm tài khoản quản lý</h4>
                          <p className={classes.cardCategoryWhite}>Vui lòng nhập tất cả thông tin</p>
                      </CardHeader>
                      <CardBody>
                        <Grid container spacing={3}>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <CustomInput
                              labelText="Tên"
                              id="name"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                name: 'name',
                                value: values.name,
                                onChange: handleChange,
                              }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <CustomInput
                              labelText="Mật khẩu"
                              id="password"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                type: "password",
                                name: 'password',
                                value: values.password,
                                onChange: handleChange,
                              }}
                              />
                            </Grid>
                          </Grid>
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <CustomInput
                              labelText="Email"
                              id="email"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                name: 'email',
                                value: values.email,
                                onChange: handleChange,
                              }}
                              />
                            </Grid>
                            <Grid item xs={12} md={6}>
                              <CustomInput
                              labelText="Xác nhận mật khẩu"
                              id="confirmPassword"
                              formControlProps={{
                                fullWidth: true
                              }}
                              error={errorInput}
                              inputProps={{
                                type: "password",
                                name: 'confirmPassword',
                                value: values.confirmPassword,
                                onChange: handleChange,
                              }}
                              />
                            </Grid>
                          </Grid>
                        
                        <Grid container spacing={3}>
                          <Grid item xs={12} md={6}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Các quyền vào dữ liệu đọc giả</FormLabel>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  checked={checkboxes.addReader}
                                  onChange={handleChecboxChange('addReader')}
                                  value="0"
                                  control={<Checkbox color="primary" />}
                                  label="Thêm"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.editReader}
                                  onChange={handleChecboxChange('editReader')}
                                  value="1"
                                  control={<Checkbox color="primary" />}
                                  label="Sửa"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.deleteReader}
                                  onChange={handleChecboxChange('deleteReader')}
                                  value="2"
                                  control={<Checkbox color="primary" />}
                                  label="Xóa"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkAllReader}
                                  onChange={handleCheckAllReaderChange}
                                  value="all"
                                  control={<Checkbox color="secondary" />}
                                  label="Tất cả"
                                  labelPlacement="bottom"
                                />
                              </FormGroup>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Các quyền vào dữ liệu sách</FormLabel>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  checked={checkboxes.addBook}
                                  onChange={handleChecboxChange('addBook')}
                                  value="3"
                                  control={<Checkbox color="primary" />}
                                  label="Thêm"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.editBook}
                                  onChange={handleChecboxChange('editBook')}
                                  value="4"
                                  control={<Checkbox color="primary" />}
                                  label="Sửa"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.deleteBook}
                                  onChange={handleChecboxChange('deleteBook')}
                                  value="5"
                                  control={<Checkbox color="primary" />}
                                  label="Xóa"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkAllBook}
                                  onChange={handleCheckAllBookChange}
                                  value="all"
                                  control={<Checkbox color="secondary" />}
                                  label="Tất cả"
                                  labelPlacement="bottom"
                                />
                              </FormGroup>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                          <FormControl component="fieldset">
                            <FormLabel component="legend">Các quyền vào dữ liệu mượn sách</FormLabel>
                              <FormGroup aria-label="position" row>
                                <FormControlLabel
                                  checked={checkboxes.addLending}
                                  onChange={handleChecboxChange('addLending')}
                                  value="6"
                                  control={<Checkbox color="primary" />}
                                  label="Thêm"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.editLending}
                                  onChange={handleChecboxChange('editLending')}
                                  value="7"
                                  control={<Checkbox color="primary" />}
                                  label="Sửa"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkboxes.deleteLending} 
                                  onChange={handleChecboxChange('deleteLending')}
                                  value="8"
                                  control={<Checkbox color="primary" />}
                                  label="Xóa"
                                  labelPlacement="bottom"
                                />
                                <FormControlLabel
                                  checked={checkAllLending}
                                  onChange={handleCheckAllLendingChange}
                                  value="bottom"
                                  control={<Checkbox color="secondary" />}
                                  label="Tất cả"
                                  labelPlacement="bottom"
                                />
                              </FormGroup>
                            </FormControl>
                          </Grid>
                          <Grid item xs={12} md={6}>
                            * Lưu ý: nếu không đánh vào bất cứ quyền nào thì người dùng chỉ có thể xem dữ liệu.
                          </Grid>
                          </Grid>
                        </Grid>
                      </CardBody>
                      <CardFooter>
                        <Button color="info" onClick={handleAddUser}>Hoàn tất</Button>
                        <Button color="danger" onClick={handleCloseModal}>Đóng</Button>
                      </CardFooter>
                  </Card>
              </DialogContent>
          </Dialog>

          <Snackbar
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        >
        <CustomSnackbar
            onClose={handleCloseSnackbar}
            variant={values.snackbar_variant}
            message={values.snackbar_message}
        />
      </Snackbar>

      <Dialog
        open={alertDelete}
        onClose={handleCloseAlertDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận!"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc muốn xóa thông tin người dùng này ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertDelete} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteUser} color="danger">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

        </Paper>
    )
}

export default Users;   