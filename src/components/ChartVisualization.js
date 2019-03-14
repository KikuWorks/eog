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
import moment from 'moment';
import {
    Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea,
} from 'recharts';

let metricData =[];

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

    const getAxisYDomain = (from, to, ref, offset) => {
    
        const refData = Object.keys(metricData).filter((key,index) => metricData[index]["timestamp"] >= from -1 && metricData[index]["timestamp"] <= to);
        console.log(refData)
        let [bottom, top] = [refData[0][ref], refData[0][ref]];
        refData.forEach((d) => {
          if (d[ref] > top) top = d[ref];
          if (d[ref] < bottom) bottom = d[ref];
        });
      
        return [(bottom | 0) - offset, (top | 0) + offset];
      };
const initialState = {
    left : 'dataMin',
    right : 'dataMax',
    refAreaLeft : '',
    refAreaRight : '',
    top : 'dataMax+1',
    bottom : 'dataMin-1',
    top2 : 'dataMax+20',
    bottom2 : 'dataMin-20',
    animation : true,
    loading: false,
    droneData:[]
  };

class ChartVisualization extends React.Component {
  componentDidMount() {
    this.props.onLoad();
  }
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

  constructor(props) {
    super(props);
    this.state = initialState;
  }

  zoom() {
    let { refAreaLeft, refAreaRight} = this.state;

    if (refAreaLeft === refAreaRight || refAreaRight === '') {
      this.setState(() => ({
        refAreaLeft: '',
        refAreaRight: '',
      }));
      return;
    }

    // xAxis domain
    if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

    // yAxis domain
    const [bottom, top] = getAxisYDomain(refAreaLeft, refAreaRight, 'metric', 4);
    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      left: refAreaLeft,
      right: refAreaRight,
      bottom,
      top
    }));
  }

  zoomOut() {
    this.setState(() => ({
      refAreaLeft: '',
      refAreaRight: '',
      left: 'dataMin',
      right: 'dataMax',
      top: 'dataMax+1',
      bottom: 'dataMin'
    }));
  }
  render() {
    const {
      loading,
      droneData,
      classes
    } = this.props;
    const { barIndex, left, right, refAreaLeft, refAreaRight, top, bottom } = this.state;
    if (loading) return <LinearProgress />;
    metricData = droneData ? Object.keys(droneData.entities.Measurment).map((key, index) => droneData.entities.Measurment[index] ): [];

    if(droneData)
    return (


        <Card className={classes.card}>
        <CardContent>
      <div className="highlight-bar-charts" style={{ userSelect: 'none' }}>  
      <a
      href="javascript: void(0);"
      className="btn update"
      onClick={this.zoomOut.bind( this )}
    >
      Zoom Out
    </a>
<LineChart
width={800}
height={400}
data={metricData}
onMouseDown={e => this.setState({ refAreaLeft: e.activeLabel })}
onMouseMove={e => this.state.refAreaLeft && this.setState({ refAreaRight: e.activeLabel })}
onMouseUp={this.zoom.bind(this)}
>
<CartesianGrid strokeDasharray="3 3" />
<XAxis 
              allowDataOverflow={true}
              dataKey="timestamp"
              domain={[left, right]}
              tickFormatter={(tick) => moment(tick).format('hh:mm')}
              type="number"
            />
            <YAxis 
              allowDataOverflow={true}
              domain={[240, 320]}
              type="number"
              yAxisId="1"
             />
<Tooltip />
            <Line yAxisId="1" type='natural' dataKey='metric' stroke='#8884d8' animationDuration={300}/>
{
  (refAreaLeft && refAreaRight) ? (
    <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
  }
</LineChart>
</div>
        </CardContent>
      </Card>
    );
    else{
        return(
            <div></div>
        )
    }
  }
}
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
  ) (withStyles(styles,  )(ChartVisualization));