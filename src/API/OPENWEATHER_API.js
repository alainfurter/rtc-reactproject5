import { OPENWEATHERAPI_TOKEN } from "../constants/constants";
import { OPENWEATHER_URL } from "../constants/constants";

import { API_RESULT_TEST_RESPONSE } from "../constants/api_callback_test_result";
import { API_RESULT_TEST_RESPONSE_HOURS } from "../constants/api_callback_test_result_hours";

import axios from "axios";

export const get_todays_weather_for_coordinate = async (
  coordinate,
  callback
) => {
  try {
    const api_call_string = `${OPENWEATHER_URL}data/3.0/onecall?lat=${coordinate.lat}&lon=${coordinate.lon}&exclude=minutely&units=metric&appid=${OPENWEATHERAPI_TOKEN}`;
    //console.log(api_call_string);

    // Testing
    callback(API_RESULT_TEST_RESPONSE_HOURS);
    return;

    const response = await axios.get(api_call_string);
    if (response && response.status == "200") {
      console.log("NASA API Fetch result: ", response.data);
      callback(response.data);
    } else {
      console.log("NASA API Fetch error: ", response.statusText);
    }
  } catch (error) {
    console.error(error);
  }
};
