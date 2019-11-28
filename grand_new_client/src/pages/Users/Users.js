import React, { useState, useEffect, useContext} from 'react';

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

import { Table, TableRow, TableCell, TableHead, TableBody, Typography } from '@material-ui/core';
// context
import { userContext } from '../../contexts/UserContext';
import { authContext } from '../../contexts/AuthContext';
//dayjs
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
})

const useStyles = makeStyles(styles);

const Users = (props) => {
    const classes = useStyles();
    const { user, dispatch } = useContext(userContext);
    const auth = userContext(authContext);
    // dayjs
    dayjs.locale('vi');
    dayjs.extend(relativeTime);
    
    const getUserList = () => {
        axios.get(config.base_url + '/users')
        .then((result) => {
            dispatch({ type: 'GET_USER_LIST', payload: result.data})
        })
    }

    useEffect(() => {
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
                                <IconButton>
                                    <AddIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Tải lại">
                                <IconButton onClick={() => getUserList()}>
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
              <TableCell>Đọc giả</TableCell>
              <TableCell>Sách</TableCell>
              <TableCell>Ngày mượn</TableCell>
              <TableCell>Hạn trả</TableCell>
              <TableCell>Ngày trả</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            !user.isLoading ? null : user.list.map((usr) => {
                if(usr._id !== auth.auth.user._id){
                    return (
                        <TableRow key={usr._id} >
                        <TableCell>{usr.name}</TableCell>
                        <TableCell>{usr.email}</TableCell>
                        <TableCell>{dayjs(usr.createdAt).format('DD/MM/YYYY')}</TableCell>
                        <TableCell>
                            <Tooltip title="Sửa">
                                <IconButton>
                                    <EditIcon/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa">
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
        </Paper>
    )
}

export default Users;   