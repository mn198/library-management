import React, { useContext, useEffect, useState } from 'react';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import RefreshIcon from '@material-ui/icons/Refresh';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import StdCard from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
import Button from "../../components/CustomButtons/Button";
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardAvatar from "../../components/Card/CardAvatar.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";
import BookSkeleton from './BookSkeleton';

// contexts
import { bookContext } from '../../contexts/BookContext';

import bookIcon from "../../assets/img/flat-book-icon-11.jpg";
import Axios from 'axios';
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
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
    borderRadius: 0,
    bigAvatar: {
      width: 130,
      height: 130
    },
    formControl: {
      marginTop: theme.spacing(3),
      minWidth: '100%',
    },
    weightedFont: {
      fontWeight: '500'
    },
    bigger: {
      padding: theme.spacing(3)
    },
    media: {
      height: 140,
    }
})

function Books(props) {
    const { classes } = props;
    const { book, dispatch } = useContext(bookContext);
    // alert delete
    const [ alertDelete, setAlertDelete ] = useState(false);
    const handleOpenAlertDelete = () => setAlertDelete(true);
    const handleCloseAlertDelete = () => setAlertDelete(false);

    // search
    const [ filter, setFilter ] = useState('');
    const [ filteredData, setFilterData] = useState(book.list);
    const handleSearchChange = (e) => {
      setFilter(e.target.value);
      setFilterData(book.list.filter(item => {
        return Object.keys(item).some(key => {
            if(typeof(item[key]) === 'string')
               return item[key].toLowerCase().includes(filter)        
        });
      }))
    } 
    
    useEffect(() => {
      getBookList();
      Axios.get(config.base_url + '/racks')
        .then((result) => {

          setValues(oldValues => ({
            ...oldValues,
            rack_data: result.data
          }))

        })
    }, [])

    const bookFormat = {'Magazine': 'Tạp chí', 'Journal': 'Nhật ký', 'Ebook': 'Sách điện tử', 'Newspaper': 'Báo', 'Audiobook': 'Sách nói'};
    const bookStatus = {'Available': 'Hiện còn', 'Loaned': 'Đang được mượn', 'Lost': 'Mất', 'Reserved': 'Đã được đặt'}
    const getBookList = () => {
      Axios.get(config.base_url + '/books')
        .then((result) => {
            dispatch({ type: 'GET_BOOK_LIST', payload: result.data})
            setFilterData(result.data)
        })
    }

    // button in modal
    const AddBookButton = () => (<Button color="success" onClick={handleAddBook}>Hoàn tất</Button>)
    const EditBookButton = () => (<Button color="success" onClick={handleEditBook}>Lưu</Button>)
    const DeleteBookButton = () => (<Button color="danger" onClick={handleOpenAlertDelete}>Xóa</Button>)
    // snackbar
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const handleCloseSnackbar = () => { setOpenSnackbar(false); };
    const handleOpenSnackbar = () => { setOpenSnackbar(true); }

    // modal
    const [ openModal, setOpenModal ] = useState(false);
    const handleOpenModal = () => { setOpenModal(true); }
    const handleCloseModal = () => { setOpenModal(false); }

    // form data
    const [ values, setValues ] = useState({
      isbn: '',
      title: '',
      author: '',
      numberOfPages: 0,
      rack: '',
      status: '',
      format: '',
      publisher: '',
      publicationYear: '',
      rack_data: null,
      snackbar_message: '',
      snackbar_variant: '',
      button: 1,
      current_book: '',
      form_title: '',
    })

    const setDefaultValues = () => {
      setValues(oldValues => ({
        ...oldValues,
        isbn: '',
      title: '',
      author: '',
      numberOfPages: '',
      rack: '',
      status: '',
      format: '',
      publisher: '',
      publicationYear: '',
      button: 1,
      current_book: '',
      form_title: 'Thêm sách mới'
      }))
    }

    const handleChange = (e) => {
      e.persist();

      setValues(oldValues => ({
        ...oldValues,
        [e.target.name]: e.target.value
      }))
    
    }

    const handleEditPressed = (id) => {
      setDefaultValues();
      Axios.get(config.base_url + '/books/'+id)
        .then((result) => {
          setValues(oldValues => ({
            ...oldValues,
            isbn: result.data[0].isbn,
            title: result.data[0].title,
            author: result.data[0].author,
            numberOfPages: result.data[0].numberOfPages,
            rack: result.data[0].rack ? result.data[0].rack[0]._id : null,
            status: result.data[0].status,
            format: result.data[0].format,
            publisher: result.data[0].publisher,
            publicationYear: result.data[0].publicationYear,
            button: 2,
            current_book: result.data[0]._id,
            form_title: 'Chỉnh sửa thông tin sách'
          }))
        })
        handleOpenModal();
    }

    const handleAddPressed = () => {
      setDefaultValues();
      handleOpenModal();
    }

    const handleAddBook = (e) => {
      e.preventDefault();

      var formData = new FormData();
      formData.append('isbn', values.isbn);
      formData.append('title', values.title);
      formData.append('author', values.author);
      formData.append('numberOfPages', values.numberOfPages);
      formData.append('rack', values.rack);
      formData.append('status', values.status);
      formData.append('format', values.format);
      formData.append('publisher', values.publisher);
      formData.append('publicationYear', values.publicationYear);

      Axios.post(config.base_url + '/books', formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
      }})
        .then((result) => {
          setValues(old => ({
            ...old,
            snackbar_message: 'Đã thêm sách thành công !',
            snackbar_variant: 'success'
          }))
          handleOpenSnackbar();
          handleCloseModal();
          getBookList();
        })
        .catch((err) => {
          setValues(old => ({
            ...old,
            snackbar_message: 'Đã có lỗi xảy ra trong quá trình thêm sách!',
            snackbar_variant: 'error'
          }))
          handleOpenSnackbar();
        })

    }

    const handleEditBook = (e) => {
      e.preventDefault();
    
      var formData = new FormData();
      formData.append('isbn', values.isbn);
      formData.append('title', values.title);
      formData.append('author', values.author);
      formData.append('numberOfPages', values.numberOfPages);
      formData.append('rack', values.rack);
      formData.append('status', values.status);
      formData.append('format', values.format);
      formData.append('publisher', values.publisher);
      formData.append('publicationYear', values.publicationYear);

      Axios.patch(config.base_url + '/books/' + values.current_book, formData, {
        headers: {
        'Content-Type': 'multipart/form-data',
      }})
        .then((result) => {
          setValues(old => ({
            ...old,
            snackbar_message: 'Đã chỉnh sửa thông tin sách thành công !',
            snackbar_variant: 'success'
          }))
          handleOpenSnackbar();
          handleCloseModal();
          getBookList();
        })
        .catch((err) => {
          setValues(old => ({
            ...old,
            snackbar_message: 'Đã có lỗi xảy ra trong quá trình sửa thông tin sách!',
            snackbar_variant: 'error'
          }))
          handleOpenSnackbar();
        })
    }

    const handleDeleteBook = (id) => {
      Axios.delete(config.base_url + '/books/' + values.current_book)
        .then((result) => {
          setValues(old => ({
            ...old,
            snackbar_message: 'Đã xóa thông tin sách!',
            snackbar_variant: 'success'
          }))
          handleOpenSnackbar();
          handleCloseModal();
          getBookList();
        })
        .catch((err) => {
          setValues(old => ({
            ...old,
            snackbar_message: 'Có lỗi xảy ra khi xóa thông tin sách!',
            snackbar_variant: 'error'
          }))
          handleOpenSnackbar();
          handleCloseModal();
        })
        handleCloseAlertDelete();
    }

    const handleReload = () => {
      dispatch({ type: 'RESET_BOOK_LIST'});
      getBookList();
    }

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
                value={filter}
                onChange={e => handleSearchChange(e)}
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
                <IconButton onClick={() => handleAddPressed()}>
                  <AddIcon/>
                </IconButton>
              </Tooltip>
              <Dialog
                open={openModal}
                onClose={handleCloseModal}
                scroll={'body'}
                fullWidth={true} 
                maxWidth='md'
              >
              
              <DialogContent>

                  <GridContainer>
                  <GridItem xs={12} sm={12} md={8}>
                    <Card>
                      <CardHeader color="primary">
                        <h4 className={classes.cardTitleWhite}>{values.form_title}</h4>
                        <p className={classes.cardCategoryWhite}>Nhập tất cả thông tin về sách</p>
                      </CardHeader>
                      <CardBody>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={3}>
                            <CustomInput
                              labelText="ISBN"
                              id="isbn"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                value: values.isbn,
                                onChange: handleChange,
                                name: 'isbn'
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={9}>
                            <CustomInput
                              labelText="Tên sách"
                              id="title"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                value: values.title,
                                onChange: handleChange,
                                name: 'title'
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={9}>
                            <CustomInput
                              labelText="Tác giả"
                              id="author"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                value: values.author,
                                onChange: handleChange,
                                name: 'author'
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12}  sm={3}>
                            <CustomInput
                              labelText="Số trang"
                              id="numberOfPages"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                value: values.numberOfPages,
                                onChange: handleChange,
                                name: 'numberOfPages'
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={4}>
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="rack">Vị trí</InputLabel>
                              <Select
                                value={values.rack}
                                onChange={handleChange}
                                inputProps={{
                                  name: 'rack',
                                  id: 'rack',
                                }}
                              >
                                {
                                  !values.rack_data ? null : (
                                    values.rack_data.map((r) => (
                                      <MenuItem value={r._id} key={r._id}>Kệ sách {r.number}</MenuItem>
                                    ))
                                  ) 
                                }
                                

                              </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="status">Trạng thái</InputLabel>
                              <Select
                                value={values.status}
                                onChange={handleChange}
                                inputProps={{
                                  name: 'status',
                                  id: 'status',
                                }}
                              >
                                <MenuItem value={'Available'} selected>Sẵn sàng</MenuItem>
                                <MenuItem value={'Reserved'}>Đã được đặt trước</MenuItem>
                                <MenuItem value={'Loaned'}>Đang Được mượn</MenuItem>
                                <MenuItem value={'Lost'}>Mất</MenuItem>
                              </Select>
                            </FormControl>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <FormControl className={classes.formControl}>
                              <InputLabel htmlFor="format">Thể loại</InputLabel>
                              <Select
                                value={values.format}
                                onChange={handleChange}
                                inputProps={{
                                  name: 'format',
                                  id: 'format',
                                }}
                              >
                                <MenuItem value={'Magazine'} selected>Tạp chí</MenuItem>
                                <MenuItem value={'Newspaper'}>Báo</MenuItem>
                                <MenuItem value={'Ebook'}>Sách điện tử</MenuItem>
                                <MenuItem value={'Journal'}>Nhật ký</MenuItem>
                                <MenuItem value={'Audiobook'}>Sách nói</MenuItem>
                              </Select>
                            </FormControl>
                          </GridItem>
                        </GridContainer>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Năm xuất bản"
                              id="publicationYear"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                value: values.publicationYear,
                                onChange: handleChange,
                                name: 'publicationYear'
                              }}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={6}>
                            <CustomInput
                              labelText="Nhà xuất bản"
                              id="publisher"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                value: values.publisher,
                                onChange: handleChange,
                                name: 'publisher'
                              }}
                            />
                          </GridItem>
                        </GridContainer>
                      </CardBody>
                      <CardFooter>
                        {values.button === 1 ? <AddBookButton/> : <EditBookButton/>}
                        {values.button === 2 ? <DeleteBookButton/> : null}
                        <Button color="info" onClick={handleCloseModal}>Đóng</Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <Card profile>
                      <CardAvatar profile>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                          <Avatar src={bookIcon} className={classes.bigAvatar}/>
                        </a>
                      </CardAvatar>
                      <CardBody profile>
                        <Button color="primary" round>
                          Đổi ảnh
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                </GridContainer>

                </DialogContent>
              </Dialog>
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
        <GridContainer>

        { book.isLoading === false ? <BookSkeleton/> : filteredData.map((b) => ( 
          <GridItem key={b._id} xs={12} md={4} onClick={() => handleEditPressed(b._id)}>

            <Card profile>
              <CardAvatar profile>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  <Avatar src={bookIcon} className={classes.bigAvatar} variant="square"/>
                </a>
              </CardAvatar>
              <CardBody profile>
                <Typography>b.title</Typography>
                <Typography>b.author</Typography>
              </CardBody>
            </Card>

          </GridItem>
          ))}

        </GridContainer>
      </div>
      {/* snackbar for success reader added */}
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
            Bạn có chắc muốn xóa thông tin quyển sách này ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAlertDelete} color="primary">
            Hủy
          </Button>
          <Button onClick={handleDeleteBook} color="danger">
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>

    </Paper>
    )

}

export default withStyles(styles)(Books);