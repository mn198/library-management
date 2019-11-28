import React, { useContext, useEffect, useState } from "react";
// react plugin for creating charts
import { NavLink } from "react-router-dom";
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
//import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HistoryIcon from '@material-ui/icons/History';
import CircularProgress from '@material-ui/core/CircularProgress';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardFooter from "../../components/Card/CardFooter.js";
import CardBody from '../../components/Card/CardBody'
//context
import { bookContext } from '../../contexts/BookContext';
import { readerContext } from '../../contexts/ReaderContext';
import { lendingContext } from '../../contexts/LendingContext';

import {
  dailySalesChart
} from "../../variables/charts";
import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";
import config from '../../config/config';
import axios from 'axios';

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const book = useContext(bookContext);
  const reader = useContext(readerContext);
  const lending = useContext(lendingContext);
  const [lendingHis, setLendingHis] = useState(0);
  const [ formatChartData, setFormatChartData ] = useState(null);


  useEffect(() => {
    axios.get(config.base_url + '/books')
      .then((result) => {
          book.dispatch({ type: 'GET_BOOK_LIST', payload: result.data});
          handleData(result.data)
      })
    axios.get(config.base_url + '/lendings')
    .then((result) => {
        lending.dispatch({ type: 'GET_LENDING_LIST', payload: result.data})
    })
    axios.get(config.base_url + '/readers')
    .then((result) => {
        reader.dispatch({ type: 'GET_READER_LIST', payload: result.data})
    })
    axios.get(config.base_url + '/lendings/isDeleted')
    .then((result) => {
        setLendingHis(result.data);
    })
  }, [])

  const handleData = (data) => {
    var formatCount = { Hardcover: 0, Paperback: 0, Audiobook: 0, Ebook: 0, Newspaper: 0, Magazine: 0, Journal: 0}
    for(var i = 0; i < data.length; i++){
      formatCount[data[i].format]++;
    }
    setFormatChartData({
      labels: ["Bìa cứng", "Bìa mềm", "Sách nói", "Ebook", "Báo", "Tạp chí", "Tạp chí CN"],
      series: [[ formatCount.Hardcover, formatCount.Paperback, formatCount.AudioBook, formatCount.Ebook, formatCount.Newspaper, formatCount.Magazine, formatCount.Journal ]]
    })
  }

  

  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Accessibility/>
              </CardIcon>
              <p className={classes.cardCategory}>Đọc giả</p>
              <h3 className={classes.cardTitle}>
                { !reader.reader.isLoading ? <CircularProgress size={35}/> : reader.reader.list.length } <small>Bạn đọc</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>chevron_right</Icon>
                <NavLink to="/admin/readers" className={classes.stats}>
                  Tìm đọc giả
                </NavLink>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <LibraryBooksIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Tổng số sách</p>
              <h3 className={classes.cardTitle}>{ !book.book.isLoading ? <CircularProgress size={35}/> : book.book.list.length} <small>Quyển</small></h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>chevron_right</Icon>
                <NavLink to='/admin/books' className={classes.stats}>
                  Khám phá sách
                </NavLink>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <AccountBalanceWalletIcon/>
              </CardIcon>
              <p className={classes.cardCategory}>Lượt mượn hiện tại</p>
              <h3 className={classes.cardTitle}>{ !lending.lending.isLoading ? <CircularProgress size={35}/> : lending.lending.list.length } <small>Lượt</small></h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Icon>chevron_right</Icon>
                <NavLink to="/admin/lendings" className={classes.stats}>
                 Kiểm tra sách đang được mượn
                </NavLink>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <HistoryIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Lịch sử mượn trả</p>
              <h3 className={classes.cardTitle}>{ !lendingHis ? <CircularProgress size={35}/> : lendingHis.length } <small>Lượt</small></h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
              <Icon>chevron_right</Icon>
                <NavLink to="/admin/history" className={classes.stats}>
                 Xem lịch sử mượn sách
                </NavLink>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
  
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={formatChartData}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Thống kê loại sách</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Cập nhật vài phút trước
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        {/*
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Email Subscriptions</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Completed Tasks</h4>
              <p className={classes.cardCategory}>Last Campaign Performance</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> campaign sent 2 days ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        */}
      </GridContainer>
  
    </div>
  );
}