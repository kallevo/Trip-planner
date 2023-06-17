import {Autocomplete, CircularProgress, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
import {GEO_API_URL, geoApiOptions} from '../Api'
import axios from "axios";

const Search = ({onSearchChange}) => {
    //Search box input state.
    const [search, setSearch] = useState('');
    //Suggested city options.
    const [searchOptions, setSearchOptions] = useState([]);
    //Set to true when requesting data from api.
    const [loading, setLoading] = useState(false);

    /*
    Sends an api call to search for cities containing the characters that are in the search field.
    Activates when the search state changes.
     */
    useEffect(() => {
        setLoading(true)
        try {
            const timeout = setTimeout(() => {
                axios(`${GEO_API_URL}?namePrefix=${search}`, geoApiOptions)
                    .then((response) => response.data.data)
                    .then((responseData) => {
                        const updatedOptions = responseData.map((c) => {
                            return {
                                id: c.id,
                                name: c.name,
                                region: c.region,
                                country: c.country,
                                latitude: c.latitude,
                                longitude: c.longitude
                            };
                        });
                        setSearchOptions(updatedOptions);
                    })
                setLoading(false)
            }, 1000)
            return () => clearTimeout(timeout)
        } catch (error) {
            console.error('Error occurred while searching for city names. Full error message: ' + error.message);
        }
    }, [search])

    //Called when input in search field changes.
    const handleOnInputChange = (event, value) => {
        if (value === undefined) {
            setSearch("");
        } else {
            setSearch(value);
        }
    }

    //Sends a prop containing the search field value to App.js when a location is selected in the search field.
    const handleOnOptionClick = (event, value) => {
        if (value !== undefined && value !== null) {
            onSearchChange(value);
        }
    }
    return (
        <Autocomplete
            id="outlined-basic"
            className={"Searchbar"}
            inputValue={search}
            options={searchOptions}
            getOptionLabel={(option) => `${option.name}, ${option.region}, ${option.country}`}
            renderOption={(props, option) => {
                return (
                    <li {...props} key={option.id}>
                        {option.name}, {option.region}, {option.country}
                    </li>
                );
            }}
            renderInput={(params) => (
                <TextField {...params}
                           label="Search for a city"
                           fullWidth
                           InputProps={{
                               ...params.InputProps,
                               endAdornment: (
                                   <React.Fragment>
                                       {loading ? <CircularProgress color="inherit" size={20}/> : false}
                                       {params.InputProps.endAdornment}
                                   </React.Fragment>
                               ),
                           }}/>
            )}
            noOptionsText={"No cities found"}
            onInputChange={handleOnInputChange}
            onChange={handleOnOptionClick}
            loading={loading}
            autoComplete={true}
            autoHighlight={true}
        />
    )
}

export default Search;