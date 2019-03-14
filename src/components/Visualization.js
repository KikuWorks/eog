import React from "react";
import PropTypes from 'prop-types';
import Card from "@material-ui/core/Card";
import CardHeaderRaw from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withStyles } from "@material-ui/core/styles";
import AvatarRaw from "@material-ui/core/Avatar";
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';

import DashboardVisualization  from './DashboardVisualization'
import ChartVisualization  from './ChartVisualization'
import MapVisualization from './MapVisualization'

const cardStyles = theme => ({
    root: {
      background: theme.palette.primary.main
    },
    title: {
      color: "white"
    }
  });
  const CardHeader = withStyles(cardStyles)(CardHeaderRaw);
  
  const avatarStyles = theme => ({
    root: {
      background: theme.palette.primary.main
    },
    title: {
      color: "white"
    }
  });
  const Avatar = withStyles(avatarStyles)(AvatarRaw);

function TabContainer({ children, dir }) {
    return (
      <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
        {children}
      </Typography>
    );
  }
  
  TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
    dir: PropTypes.string.isRequired,
  };
  
  const styles = theme => ({
    root: {
      backgroundColor: theme.palette.background.paper,
      flexGrow: 1,
    },
  })

class Visualization extends React.Component{
    state = {
        TabValue : 0
    }
    
    handleChange = (event, value) => {
        this.setState({ TabValue : value });
      };
      
  handleChangeIndex = index => {
    this.setState({ TabValue: index });
  };
      render() {
        const { classes , theme} = this.props;
        const { value } = this.state.TabValue;
    
        return (
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Dashboard Visualization" />
                <Tab label="Map Visualization" />
                <Tab label="Chart Visualization" />
              </Tabs>
            </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.TabValue}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>          
            <Card className={classes.card}>
              <CardHeader title="Dashboard Visualization" />
              <CardContent>
                <DashboardVisualization />
              </CardContent>
            </Card>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Card className={classes.card}>
              <CardHeader title="Map Visualization" />
              <CardContent><MapVisualization />
              </CardContent>
            </Card>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <Card className={classes.card}>
              <CardHeader title="Chart Visualization" />
              <CardContent><ChartVisualization />
              </CardContent>
            </Card>
          </TabContainer>
        </SwipeableViews>
          </div>
        );
      }
    }
    
    Visualization.propTypes = {
      classes: PropTypes.object.isRequired,
      theme: PropTypes.object.isRequired,
    };


    
    export default withStyles(styles, { withTheme: true })(Visualization);


    

