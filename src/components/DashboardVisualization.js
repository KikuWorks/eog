import React, { Component } from "react";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const cardStyles = theme => ({
  root: {
    background: theme.palette.secondary.main
  },
  label: {
    color: theme.palette.primary.main
  }
});
const styles =theme => ({
    card: {
      width: '50%',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 50,
      },
  });

class DashboardVisualization extends Component {
  componentDidMount() {
    this.props.onLoad();
  }
  render() {
    const { classes, theme } = this.props;
    const {
      loading,
      droneData
    } = this.props;
    if (loading) return <LinearProgress />;

   
    console.log("Drone Data");
 
    return (
        <Card className={classes.card}>
        <CardContent>
        <Paper className={classes.root}>
        <Table className={classes.table}>
        <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Temperature:
              </TableCell>
              <TableCell align="right">
                {droneData ? droneData.entities.Measurment[0].metric : ""}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Latitude:
              </TableCell>
              <TableCell align="right">
                {droneData ? droneData.entities.Measurment[0].latitude : ""}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Longitude:
              </TableCell>
              <TableCell align="right">
                {droneData ? droneData.entities.Measurment[0].longitude : ""}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Last Received:
              </TableCell>
              <TableCell align="right">
                {droneData ? new Date(droneData.entities.Measurment[0].timestamp).toString() : ""}</TableCell>
            </TableRow>
        </TableBody>
        </Table>
    </Paper>
        </CardContent>
      </Card>
    );
  }
}
DashboardVisualization.propTypes = {
    classes: PropTypes.object.isRequired,
  };

const mapState = (state, ownProps) => {
  const {
    loading,
    droneData
  } = state.drone;
  return {
    loading,
    droneData
  };
};

const mapDispatch = dispatch => ({
  onLoad: () =>{
    dispatch({
      type: actions.FETCH_DRONE_DATA
    })
  }
});

export default connect(
  mapState,
  mapDispatch
) (withStyles(styles, )(DashboardVisualization));

