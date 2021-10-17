import classes from "./PolicyDataEntry.module.css";
import { Fragment } from "react";

const PolicyDataEntry = (props) => {
  return (
    <Fragment>
      <h2 className={classes.dataTitle}>{props.h2}</h2>
      <p className={classes.data}>{props.p}</p>
    </Fragment>
  );
};

export default PolicyDataEntry;
