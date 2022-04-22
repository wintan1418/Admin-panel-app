import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { useSelector, useDispatch } from "react-redux";
import { updateLocation, fetchSingleLocation } from "../../redux/slices/locationSlice";
import { cloneDeep } from "lodash";
import LocationForm from "../location/locationForm";
import { useParams } from "react-router";
export default function EditLocation() {

    const { id } = useParams()
    const dispatch = useDispatch()
    const [fetchedLocation, setFetchedLocation] = useState({
        loading: false,
        data: null
    })
    const restaurants = useSelector(state => state?.restaurant?.restaurants)


    const getLocation = async () => {
        setFetchedLocation({
            loading: true,
            data: null
        })
        try {
            let res = await dispatch(fetchSingleLocation(id));
            console.dir(res.location)
            if (res?.error) {
                console.log(res)
            }
            else {
                setFetchedLocation({
                    loading: false,
                    data: res.location
                })
            }
        }
        catch (error) {
            console.log(error)
            setFetchedLocation({
                loading: false,
                data: null
            })
            // message.error(error.error.data.error)
        }
    }


    useEffect(() => {
        getLocation()
    }, [])


    return (
        <React.Fragment>
            {!fetchedLocation.loading &&
                <LocationForm location={cloneDeep(fetchedLocation.data)} reduxAction={updateLocation} locationCreation={false} restaurants={restaurants} />}
        </React.Fragment>
    )
}