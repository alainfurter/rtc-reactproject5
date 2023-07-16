# rtc-reactproject5
Rock The Code React Project 5 - Weather App

The page tries to retrieve the user location and - if successful - shows the daily details in the "user location view". This view has two routes, the hourly forecast of that day and the daily forecast for the next seven days. The result can be seen at the bottom. The navigation button are right above in order to switch between the hourly and daily forecast.

When the user clicks on the "city button" at the top right, the city view opens. Standard selection is "Zurich" and the API loads this data. This shows the weather details of that city. This view also has two routes similiar to the view mentioned above. On the top right, the user can switch between five hard coded cities.

Routes:
--------
1. "/"                  Weather @ user location, today details and hourly forecast
2. "/forecast"          Weather @ user location, today details and daily forecast
1. "/city"              Weather @ selected city, today details and hourly forecast
2. "/city/forecast"     Weather @ selected city, today details and daily forecast

Specials:
--------
During many hours of research, I found some great weather related content that were used for developing this page:

- The weather icons are special font from "FontAweSome.com". Category weather: https://fontawesome.com/icons/categories/weather. The Helper/Constants JS functions map the icon codes to these.
- The animated weather icon in the daily weather detail main view is from: https://codepen.io/joshbader/pen/EjXgqr. Purely designed and animated with CSS. Credits to: Josh Bader.
- The background image of the page is also switched depending on the weather conditions. The mapping is done in the Helper/Constants classes. The images are from: https://www.pexels.com/search/weather/
- The spinner, progress bar (ProgressBar) that shows when the API is loading is from https://github.com/mhnpd/react-loader-spinner
- The modal alert view that shows an error message when the user has not granted permission to get his location is from: https://github.com/jakobinn/react-popup-alert. 


Screenshots:
<img src="/public/assets/screenshots/sc_loading.png" alt="loading">
<img src="/public/assets/screenshots/sc_city.png" alt="loading">
