# Happy houR!
Welcome to Happy houR! An app for connecting restaurants and bars with fun loving clientele. 

### User Stories:
- As a restaurant I want to sign up or log in
- As a restaurant I want to add a happy hour to my profile with information on location, days of the week, times, deals, and keywords
- As a restaurant I want to be able to edit or delete happy hours
- As a guest I want to sign up or log in
- As a guest I want to view a list of happy hours
- As a guest I want to be able to view a details page of a specific happy hour
- As a guest I want to be able to comment on a happy hour 
- As a guest I want to be able to search for happy hours based on location, restaurant, or keyword
- As a guest I want to be able to add happy hours to my "favorites" page
- As a guest I want to view the happy hours that I have favorited

### Wireframes:
![alt text](/Untitled%20(1).jpg)
![alt text](/Untitled%20(2).jpg)
![alt text](/Untitled%20(3).jpg)
![alt text](/Untitled%20(4).jpg)

### Technologies:
- Mongoose
- Express
- React
- Node.js
- Google Maps API
- Google Geocoding API
- Google Places API
- @react-google-maps/api
- Hero patterns by Steve Schoger (https://heropatterns.com/)
- CSS
- Bootstrap

### Included Routes

| Endpoint         | Component | `AuthenticatedRoute`? |
|------------------|-------------------|-------|
| `/establishment/sign-up`       | `EstabSignUp`    | No |
| `/establishment/sign-in`       | `EstabSignIn`    | No |
| `/establishment/change-password` | `EstabChangePassword`  | Yes |
| `/establishment/sign-out`        | `EstabSignOut`   | Yes |
| `/guest/sign-up`       | `GuestSignUp`    | No |
| `/guest/sign-in`       | `GuestSignIn`    | No |
| `/guest/change-password` | `GuestChangePassword`  | Yes |
| `/guest/sign-out`        | `GuestSignOut`   | Yes |
| `/happy-hours` | `IndexHappyHours`  | Yes |
| `/happy-hours/index/:city/:tag`        | `TaggedCityHappyHours`   | Yes |
| `/happy-hours/:city` | `CityHappyHours`  | Yes |
| `/happy-hours/mine`        | `IndexHappyHours`   | Yes |
| `/happy-hours/favorites` | `MyFaveHappyHours`  | Yes |
| `/happy-hours/:id`        | `ShowHappyHour`   | Yes |
| `/add-happy-hour` | `CreateHappyHour`  | Yes |

