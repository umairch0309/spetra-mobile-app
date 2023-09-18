import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps";

const API_KEY = "AIzaSyD2IvMHXgkUS9s2Vb-RADy2uNozVj9hf0s";
export const GoogleMapWithMarker = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) => (
  <GoogleMap
    defaultZoom={props.zoom || 8}
    defaultCenter={{
      lat: Number(props.markerLat),
      lng: Number(props.markerLng),
    }}
    containerElement={<div style={{ height: props.containerHeight }} />}
  >
    {props.isMarkerShown && (
      <Marker
        position={{
          lat: Number(props.markerLat),
          lng: Number(props.markerLng),
        }}
      />
    )}
  </GoogleMap>
));
