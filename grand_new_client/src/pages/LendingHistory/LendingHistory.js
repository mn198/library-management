import React, { useEffect, useContext, useState } from 'react';

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
import Snackbar from '@material-ui/core/Snackbar';
import { Table, TableRow, TableCell, TableHead, TableBody } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import Axios from 'axios';
import CustomSnackbar from '../../components/CustomSnackbar/CustomSnackbar';
import config from '../../config/config';
import Badge from '../../components/Badge/Badge';

import { lendingContext } from '../../contexts/LendingContext';

import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

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
      mt10: {
        marginTop: theme.spacing(3)
      },  
      formControl: {
        marginTop: theme.spacing(3),
        minWidth: 150,
      },
      modal_paper: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
      },
      scrollable: {
        overflow: 'scroll'
      },
      appBar: {
        position: 'relative',
      },
      title: {
        marginLeft: theme.spacing(2),
        flex: 1,
      },
})

const useStyles = makeStyles(styles);

const LendingHistory = (props) => {
    const classes = useStyles();
    const { lending, dispatch } = useContext(lendingContext);
    //search
    const [ filter, setFilter ] = useState('');
    const [ filteredData, setFilterData] = useState(lending.list);
    const handleSearchChange = (e) => {
      setFilter(e.target.value);
      setFilterData(lending.list.filter(item => {
        return Object.keys(item).some(key => {
            if(typeof(item[key]) === 'object'){
              return Object.keys(item[key][0]).some(kie => {
                if(typeof(item[key][0][kie]) === 'string')
                  return item[key][0][kie].toLowerCase().includes(filter)
              })
            }
        });
      }))
    } 

    // dayjs
    dayjs.locale('vi');
    dayjs.extend(relativeTime);
    // snackbar
    const [openSnackbar, setOpenSnackbar ] = useState(false);
    const handleCloseSnackbar = () => setOpenSnackbar(false);
    const handleOpenSnackbar = () => setOpenSnackbar(true);
    
    const getLendingList = () => {
        Axios.get(config.base_url + '/lendings')
            .then((result) => {
                dispatch({ type: 'GET_LENDING_LIST', payload: result.data})
                setFilterData(result.data);
            })
    }

    const [ values, setValues ] = useState({
      snackbar_message: '',
      snackbar_variant: ''
    })
    
    const handleDeleteLendingHistory = (lendingId) => {
      Axios.delete(config.base_url + '/lendings/' + lendingId)
        .then((result) => {
          setValues(old => ({
            ...old,
            snackbar_message: 'Đã xóa lịch sử giao dịch vừa chọn !',
            snackbar_variant: 'success'
          }))
          handleOpenSnackbar();
        })
    }

    const handleReload = () => {
      getLendingList();
    }
    useEffect(() => {
        getLendingList();
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
              <Tooltip title="Reload">
                <IconButton onClick={() => handleReload()}>
                  <RefreshIcon className={classes.block} color="inherit" />
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
              <TableCell>Đọc giả</TableCell>
              <TableCell>Sách</TableCell>
              <TableCell>Ngày mượn</TableCell>
              <TableCell>Hạn trả</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              !lending ? null : filteredData.map((l) => {
                if(l.isHistory === true){
                return (
                <TableRow key={l._id} >
                  <TableCell>{l.reader[0].name}</TableCell>
                  <TableCell>{l.book[0].title}</TableCell>
                  <TableCell>{dayjs(l.createdAt).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{dayjs(l.dueDate).format('DD/MM/YYYY')}</TableCell>
                  <TableCell>{dayjs(l.dueDate).isBefore(dayjs(l.createdAt)) ? <Badge color="danger">Trả trễ hạn</Badge> : <Badge color="success">Trả đúng hạn</Badge>}</TableCell>
                  <TableCell>
                    <Tooltip title="Xóa" onClick={() => handleDeleteLendingHistory(l._id)}>
                      <IconButton>
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
    </Paper>
    )
}

export default LendingHistory;