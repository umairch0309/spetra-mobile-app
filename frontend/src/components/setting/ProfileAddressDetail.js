import React, { useState } from "react";
import {
  withGoogleMap,
  GoogleMap,
  withScriptjs,
  InfoWindow,
  Marker,
} from "react-google-maps";
import { useSelector } from "react-redux";
import Autocomplete from "react-google-autocomplete";
import Geocode from "react-geocode";
import { TextField, InputAdornment } from "@material-ui/core";
import { headers } from "../../helpers/helpers";
import API from "../../config/AxiosBase";
import useProfileUpdate from "../../hooks/mutation/useProfileUpdate";

// API key
const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_KEY;

export default function ProfileAddressDetail({ data }) {
  const [position, setPosition] = useState(null);

  const [location, setLocation] = useState(null);
  const [physicalPrice, setPhysicalPrice] = useState(data?.physicalPrice || "");

  // fatching user details
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  // update profile
  const updateProfileFun = (data) => {
    headers();
    return API.patch(`/docprofile/update/${userId}`, data);
  };

  // user location
  const userLocation = data?.location;
  //
  const profileUpdate = useProfileUpdate("docProfile", updateProfileFun, true);

  //   current position of user
  navigator?.geolocation?.getCurrentPosition((pos) => setPosition(pos));
  const currLat = position?.coords?.latitude;
  const currLon = position?.coords?.longitude;

  //  on profile update
  const onUpdateProfile = (e) => {
    e.preventDefault();
    const postData = {
      location,
      physicalPrice,
    };
    profileUpdate.mutate(postData);
  };

  //   map callback
  const handleMapCallBack = (postData) => {
    setLocation(postData);
  };
  // main return
  return (
    <div>
      {(currLat || userLocation?.address) && (
        <div style={{ maxWidth: "645px", backgroundColor: "#fff" }}>
          <Map
            google={window.google}
            center={{
              lat: userLocation?.lat || currLat || 0,
              lng: userLocation?.lng || currLon || 0,
            }}
            height="350px"
            locationData={data?.location}
            zoom={15}
            callback={handleMapCallBack}
          />
        </div>
      )}

      <TextField
        margin="dense"
        style={{ height: 40, width: "100%", maxWidth: 645 }}
        label="Appointment Pricing"
        variant={"outlined"}
        className="textInput my-3"
        value={physicalPrice}
        InputProps={{
          type: "number",
          endAdornment: <InputAdornment position="end">$</InputAdornment>,
        }}
        onChange={(e) => {
          setPhysicalPrice(e.target.value);
        }}
      />

      <button
        style={{ maxWidth: "645px" }}
        onClick={onUpdateProfile}
        className=" primaryDashboardBtn mb-5"
      >
        Update Address Info
      </button>
    </div>
  );
}

Geocode.setApiKey(API_KEY);
Geocode.enableDebug();
class Map extends React.Component {
  constructor(props) {
    super(props);
    const { locationData } = this.props;
    this.state = {
      address: locationData?.address || "",
      city: locationData?.city || "",
      area: locationData?.area || "",
      state: locationData?.state || "",
      mapPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
      markerPosition: {
        lat: this.props.center.lat,
        lng: this.props.center.lng,
      },
    };
  }
  /**
   * Get the current address from the default map position and set those values in the state
   */
  componentDidMount() {
    Geocode.fromLatLng(
      this.state.mapPosition.lat,
      this.state.mapPosition.lng
    ).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);

        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  /**
   * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
   *
   * @param nextProps
   * @param nextState
   * @return {boolean}
   */
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.state.markerPosition.lat !== this.props.center.lat ||
      this.state.address !== nextState.address ||
      this.state.city !== nextState.city ||
      this.state.area !== nextState.area ||
      this.state.state !== nextState.state
    ) {
      return true;
    } else if (this.props.center.lat === nextProps.center.lat) {
      return false;
    }
  }
  /**
   * Get the city and set the city input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getCity = (addressArray) => {
    let city = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        "administrative_area_level_2" === addressArray[i].types[0]
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };
  /**
   * Get the area and set the area input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getArea = (addressArray) => {
    let area = "";
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            "sublocality_level_1" === addressArray[i].types[j] ||
            "locality" === addressArray[i].types[j]
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };
  /**
   * Get the address and set the address input value to the one selected
   *
   * @param addressArray
   * @return {string}
   */
  getState = (addressArray) => {
    let state = "";
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          "administrative_area_level_1" === addressArray[i].types[0]
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };
  /**
   * And function for city,state and address input
   * @param event
   */
  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  /**
   * This Event triggers when the marker window is closed
   *
   * @param event
   */
  onInfoWindowClose = (event) => {};
  /**
   * When the user types an address in the search box
   * @param place
   */
  onPlaceSelected = (place) => {
    const address = place.formatted_address,
      addressArray = address.split(","),
      city = addressArray[1],
      area = addressArray[0],
      state = addressArray[2],
      latValue = place.geometry.location.lat(),
      lngValue = place.geometry.location.lng();

    // Set these values in the state.
    this.setState({
      address: address ? address : "",
      area: area ? area : "",
      city: city ? city : "",
      state: state ? state : "",
      markerPosition: {
        lat: latValue,
        lng: lngValue,
      },
      mapPosition: {
        lat: latValue,
        lng: lngValue,
      },
    });

    const postData = {
      address,
      area,
      city,
      state,
      lat: latValue,
      lng: lngValue,
    };
    this.props.callback(postData);
  };
  /**
   * When the marker is dragged you get the lat and long using the functions available from event object.
   * Use geocode to get the address, city, area and state from the lat and lng positions.
   * And then set those values in the state.
   *
   * @param event
   */
  onMarkerDragEnd = (event) => {
    let newLat = event.latLng.lat(),
      newLng = event.latLng.lng(),
      addressArray = [];
    Geocode.fromLatLng(newLat, newLng).then(
      (response) => {
        const address = response.results[0].formatted_address,
          addressArray = response.results[0].address_components,
          city = this.getCity(addressArray),
          area = this.getArea(addressArray),
          state = this.getState(addressArray);
        this.setState({
          address: address ? address : "",
          area: area ? area : "",
          city: city ? city : "",
          state: state ? state : "",
        });
        const postData = {
          address,
          area,
          city,
          state,
          lat: newLat,
          lng: newLng,
        };
        this.props.callback(postData);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  render() {
    const AsyncMap = withScriptjs(
      withGoogleMap((props) => (
        <GoogleMap
          google={this.props.google}
          defaultZoom={this.props.zoom}
          defaultCenter={{
            lat: this.state.mapPosition.lat,
            lng: this.state.mapPosition.lng,
          }}
        >
          {/* For Auto complete Search Box */}
          <Autocomplete
            placeholder="Enter your clinic location"
            style={{
              width: "100%",
              height: "40px",
              paddingLeft: "16px",
              marginTop: "2px",
              marginBottom: "100px",
            }}
            onPlaceSelected={this.onPlaceSelected}
            options={{
              componentRestrictions: { country: "us" },
              fields: ["formatted_address", "geometry", "name"],

              strictBounds: false,
              types: ["establishment"],
            }}
          />
          {/*Marker*/}
          <Marker
            google={this.props.google}
            name={"Dolores park"}
            draggable={true}
            onDragEnd={this.onMarkerDragEnd}
            position={{
              lat: this.state.markerPosition.lat,
              lng: this.state.markerPosition.lng,
            }}
          />
          <Marker />
          {/* InfoWindow on top of marker */}
          <InfoWindow
            onClose={this.onInfoWindowClose}
            position={{
              lat: this.state.markerPosition.lat + 0.0018,
              lng: this.state.markerPosition.lng,
            }}
          >
            <div>
              <span style={{ padding: 0, margin: 0 }}>
                {this.state.address}
              </span>
            </div>
          </InfoWindow>
        </GoogleMap>
      ))
    );
    let map;
    if (this.props.center.lat !== undefined) {
      map = (
        <div>
          <div>
            {this.state.address && (
              <div className="text">{`${this.state.address}`}</div>
            )}
          </div>
          <AsyncMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
            loadingElement={<div style={{ height: `90%` }} />}
            containerElement={<div style={{ height: this.props.height }} />}
            mapElement={<div style={{ height: `90%` }} />}
          />
        </div>
      );
    } else {
      map = <div style={{ height: this.props.height }} />;
    }
    return map;
  }
}
// export default Map
