import React from "react";
import "antd/dist/antd.css";
import { useSelector } from "react-redux";
import { createLocation } from "../../redux/slices/locationSlice";
import { cloneDeep } from "lodash";
import LocationForm from "./locationForm";

export default function AddLocation() {
  const fetchedLocation = useSelector(
    (state) => state?.location?.fetchedLocation
  );
  const restaurants = useSelector((state) => state?.restaurant?.restaurants);
  const location = cloneDeep(fetchedLocation);

  return (
    <React.Fragment>
      <LocationForm
        location={location}
        reduxAction={createLocation}
        locationCreation={true}
        restaurants={restaurants}
      />
    </React.Fragment>
  );
}
