import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

const primaryColor = "#9c27b0";
const warningColor = "#ff9800";
const dangerColor = "#f44336";
const successColor = "#4caf50";
const infoColor = "#00acc1";
const roseColor = "#e91e63";
const grayColor = "#999999";

const title = {
    color: "#3C4858",
    margin: "1.75rem 0 0.875rem",
    textDecoration: "none",
    fontWeight: "900",
    fontFamily: `"Roboto Slab", "Times New Roman", serif`,
    fontSize: '1.25rem',
    lineHeight: '1.5em'
};

const styles = {
    infoArea: {
      maxWidth: "360px",
      margin: "0 auto",
      padding: "0px"
    },
    iconWrapper: {
      float: "left",
      marginTop: "24px",
      marginRight: "10px"
    },
    primary: {
      color: primaryColor
    },
    warning: {
      color: warningColor
    },
    danger: {
      color: dangerColor
    },
    success: {
      color: successColor
    },
    info: {
      color: infoColor
    },
    rose: {
      color: roseColor
    },
    gray: {
      color: grayColor
    },
    icon: {
      width: "36px",
      height: "36px"
    },
    descriptionWrapper: {
      color: grayColor,
      overflow: "hidden"
    },
    title,
    description: {
      color: grayColor,
      overflow: "hidden",
      marginTop: "0px",
      fontSize: "16px",
      fontWeight: '400',
      lineHeight: '1.5em'
    },
    iconWrapperVertical: {
      float: "none"
    },
    iconVertical: {
      width: "61px",
      height: "61px"
    }
  };

const useStyles = makeStyles(styles);

export default function InfoArea(props) {
  const classes = useStyles();
  const { title, description, iconColor, vertical } = props;
  const iconWrapper = classNames({
    [classes.iconWrapper]: true,
    [classes[iconColor]]: true,
    [classes.iconWrapperVertical]: vertical
  });
  const iconClasses = classNames({
    [classes.icon]: true,
    [classes.iconVertical]: vertical
  });
  return (
    <div className={classes.infoArea}>
      <div className={iconWrapper}>
        <props.icon className={iconClasses} />
      </div>
      <div className={classes.descriptionWrapper}>
        <h4 className={classes.title}>{title}</h4>
        <p className={classes.description}>{description}</p>
      </div>
    </div>
  );
}

InfoArea.defaultProps = {
  iconColor: "gray"
};

InfoArea.propTypes = {
  icon: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  iconColor: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  vertical: PropTypes.bool
};