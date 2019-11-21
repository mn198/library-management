import React, { useContext } from "react";
// react plugin for creating charts
import { NavLink } from "react-router-dom";
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import HistoryIcon from '@material-ui/icons/History';
// core components
import GridItem from "../../components/Grid/GridItem.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import Card from "../../components/Card/Card.js";
import CardHeader from "../../components/Card/CardHeader.js";
import CardIcon from "../../components/Card/CardIcon.js";
import CardBody from "../../components/Card/CardBody.js";
import CardFooter from "../../components/Card/CardFooter.js";

import { bookContext } from '../../contexts/BookContext';
import { readerContext } from '../../contexts/ReaderContext';
import { lendingContext } from '../../contexts/LendingContext';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "../../variables/charts.js";

import styles from "../../assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  const { book } = useContext(bookContext);
  const { reader } = useContext(readerContext);
  const { lending } = useContext(lendingContext);

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
                { reader.list.length } <small>Bạn đọc</small>
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
              <p className={classes.cardCategory}>Sách</p>
              <h3 className={classes.cardTitle}>{book.list.length} <small>Quyển</small></h3>
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
              <p className={classes.cardCategory}>Mượn trả</p>
              <h3 className={classes.cardTitle}>{ lending.length } <small>Lượt</small></h3>
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
              <h3 className={classes.cardTitle}>{lending.length } <small>Lượt</small></h3>
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
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Daily Sales</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                increase in today sales.
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> updated 4 minutes ago
              </div>
            </CardFooter>
          </Card>
        </GridItem>
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
      </GridContainer>
    </div>
  );
}