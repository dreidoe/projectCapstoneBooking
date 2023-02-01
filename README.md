# Insert Title Here

## Overview

The purpose of this calendar is to removed unnecessary fluff from the client booking process. Many independent contracted business owners are forced to use various social media outlets to book, if they do not have a website of their own. When the smartBooks calendar, merchants can place think link in their bio, post a QR code at their business or any place convenient, and a user will be able to have full access to their schedule. Merchants can make this 30 days at a time or up to a full year out depending on the demands and individual needs of their business. A user will be able to select a date that is not greyed out and currently available. After selecting a product, date, time, and service a request will be sent out to the merchant for approval. Upon approval a a booking request will be made a fulfilled.

## Primary Goals

- When a merchant logs in they should see their profile view and a calendar
- When looking at a profile view as the merchant you should see a view of a menu that you can add to and take away from
- A merchant should be able to update their prices at will
- A merchant viewing their calendar should be able to view any day and add be able to grey it out for days that they do not want to take customers
- When a stylist wants to add a new booking they should see a requests bin with new request that need approval or denial with comments and concerns made by the user
- When a client clicks the calendar link they should be able to choose between a consult or regular menu appointment
- When the client selects a day, they should be able to select services and add it to a cart ,
- When the client selects a date they should also be able to pick a specific time
- When a client wants to find a merchant, then they should be able to access the search bar and search for a merchant and filter
- When a a user wants to be updated, then they should be able to to sign up for an email subscription or turn on notifications for merchant updates
- When a merchant is reading their profile, they should be able to add an about me with a description of their services and themselves
- When a merchant receives and accepts a booking, then the user should get an update of their booking confirmation

 ## Secondary Goals

- When a user is creating their profile, then they should be able to add a gallery of their work including pictures and videos to a gallery
- When a user gets approved for service they should then be able to send the merchant a message
- when a merchant approves a request, then they should be able add reminders to update
- before submission for request they should be prompted to pay a deposit based on what the merchant set, no larger than 50%
- When a merchant is creating their menu they should be able to set the deposit range from 0-50%

## Bonus/Stretch Goals

TBD

## Proposed Schema

```js
export default model(
"Merchant",
new Schema({
firstName: { type: String, required: true },
lastName: {type: String, required: true},
userName: {
type: String,
required: [true, "Username is required"],
unique: [true, "Username already exists"],
minLength: [3, "Username must be at least 3 characters long"],
maxLength: [15, "Username must be at most 20 characters long"],
},
email: {type: String, required: true},
password: {type: String, required: [true, "Password is required"],
minLength:[12, "Password must be at least 12 characters long"],
},

    avatar: { type: String, required: false },
    id: { type: String, required: true },

})
);
```

```js
export default model(
"Client",
new Schema({
fullName: { type: String, required: true },
userName: {
type: String,
required: [true, "Username is required"],
unique: [true, "Username already exists"],
minLength: [3, "Username must be at least 3 characters long"],
maxLength: [15, "Username must be at most 20 characters long"],
},

    avatar: { type: String, required: false },
    id: { type: String, required: true },

})
);
```

## Sample Data

### Request Collection

```json
[
{
"User": {
"firstName": "Bob",
"lastName":"Evans"
"services": { "type",
"description",
"accepted by": {
"approved: false},
},
},
},
]
```
### Merchant Collection

```json
[
{
"firstName": "Bob",
"lastName": "Evans",
"DOB":"04-30-1987",
"username": "bEvans123",
"email": "bobevan2@email.com"
"password": "Password123!"
"phone": "615-555-5551",
"avatar":"https://unsplash.com/photos/iulnjpZyWnc?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
},
{
"firstName": "Jill",
"lastName": "Weathers",
"DOB":"02-13-1996",
"username": "JillWeather123"
"email": "jillweat@email.com"
"password": "Password123!"
"phone": "615-555-5551",
"avatar":"https://unsplash.com/photos/iulnjpZyWnc?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
"followers":"followers"
"following":"following"
},
]
```

### User Collection

```json
[
{
"firstName": "Verenice ",
"lastName": "Bryant",
"DOB":"01-02-1997",
"username": "bvere123",
"email": "bvere123@email.com"
"password": "Password123!"
"phone": "615-555-5551",
"avatar":"https://unsplash.com/photos/iulnjpZyWnc?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink"
},
{
"firstName": "Jane",
"lastName": "Doe",
"DOB":"03-20-1995",
"username": "JillWeather123"
"email": "jillweat@email.com"
"password": "Password123!"
"phone": "615-555-5551",
"avatar":"https://unsplash.com/photos/iulnjpZyWnc?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
"following":"following"
},
]
```

## Routes

- [ ] `POST /api/merchant/register` - Register a Merchant
- [ ] `POST /api/merchant/login` - Login a Merchant
- [ ] `POST /api/merchant/logout` - Logout a Merchant
- [ ] `DELETE /api/merchant/:teacherID` - Delete a Merchant (admin only)
- [ ] `GET /api/merchant` - Get all Merchants(Admin only)
- [ ] `PUT /api/merchant/:merchantID` - Update a Merchant( merchant updates their own profiles admin only updates all)

- [ ] `POST /api/user/register` - Register a user
- [ ] `POST /api/user/login` - Login a user
- [ ] `POST /api/user/logout` - Logout a user
- [ ] `PUT /api/user/:userID` - Update a user( user updates their own profiles admin only updates all )
- [ ]`PUT /api/user/request`- User sends out a request
- [ ] `DELETE /api/user/delete`- User can delete a request perviously sent (within a time frame)
