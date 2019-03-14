import React, { Component }  from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import * as actions from "../store/actions";
import LinearProgress from "@material-ui/core/LinearProgress";
import { withStyles } from "@material-ui/core/styles";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


let locationsArr=[];

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


const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBKmSAnW_0oZM0_I5zOo6FQnxIQkBhq5s",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={props.latlng}
  >
    {props.isMarkerShown && <Marker position={props.latlng} onClick={props.onMarkerClick} />}
  </GoogleMap>
);

class MapVisualization extends React.Component {
  state = {
    isMarkerShown: false,
    latlng: { lat: 29.7604, lng: -95.3698},
    loading: false,
    locations: {}
  }

  componentDidMount() {
    this.delayedShowMarker();
    this.props.onLoad();    
    setInterval(this.changeLattLng,4000)
  }  

  changeLattLng = () =>{
    if(locationsArr.entities){
        const locationsArray = locationsArr.entities.Location;
        const min = 1;
        const max = Object.keys(locationsArray).length;
        const rand = Math.random() * (max - min);
            let latlng = locationsArray[parseInt(rand)].latt_long.split(',');
            let latlngJson = { lat: Number(latlng[0]), lng: Number(latlng[1])}
            this.setState({
                latlng: latlngJson
            });     
      }  
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: true })
    this.delayedShowMarker()
  }

  render() {
    const {
        loading,
        locations
      } = this.props;
      locationsArr = this.props.locations;
      if (loading) return <LinearProgress />; 
      return <MyMapComponent
      isMarkerShown={this.state.isMarkerShown}
      onMarkerClick={this.handleMarkerClick}
      latlng = { this.state.latlng }
    />;
      
  }  
}

MapVisualization.propTypes = {
    classes: PropTypes.object.isRequired,
  };
const mapState = (state, ownProps) => {
    const {
      loading,
      locations
    } = state.locations;
    return {
      loading,
      locations
    };
  };
const mapDispatch = dispatch => ({
    onLoad: () =>{
        dispatch({
            type: actions.FETCH_LOCATION_DATA,
            longitude: -95.3698,
            latitude: 29.7604
          })

    }
  });
  
  export default connect(
    mapState,
    mapDispatch
  ) (withStyles(styles, )(MapVisualization));