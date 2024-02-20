# proj4_backend

This repository contains the backend source code for [todaybakewhat](https://todaybakewhat.onrender.com), designed to .....(app description)
More info on the application and its design documentations can be found [here](https://github.com/jx0906/proj4-frontend).

- Libraries/Packages/Databases used:
  - [Mongo DB](https://www.mongodb.com/)
  - [Mongoose](https://mongoosejs.com/)
  - [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

## Data Model

[ERD](https://app.diagrams.net/#Hjx0906%2Fproj4-backend%2Fmain%2FERD.drawio)

## Overview of APIs available

We have organised the APIs by the main feature they are supporting in the application, ie, User, Recipes and Notes. Pls see the relevant tables below for the specific API paths and descriptions you will need to find the most appropriate endpoint for your use cases.

### API Group: User

**This API Group manages user accounts and authentication.**

| Feature | API Path | Method | Access | Query Params | Business Logic | Sample Request | Sample Response |
|---|---|---|---|---|---|---|---|
| **Sign Up** | `/user/signup` | POST | **Public** | - | Creates a new user account. | `POST /user/signup` (with user data in request body) | `{"success": true, "data": { ...user data... }}` |
| **Get Hash/Iterations** | `/user/login` | GET | **Public** | `email` | Retrieves the password hash and number of iterations used for password hashing for a given email (used for login). | `GET /user/login?email=john.doe@example.com` | `{"salt": "...", "iterations": 10000}` |
| **Login** | `/user/login` | POST | **Public** | - | Logs in a user and returns a JWT token. | `POST /user/login` (with email and password in request body) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| **Logout** | `/user/logout` | POST | **Private** | - | Logs out the currently authenticated user. | `POST /user/logout` | `"logout success"` |
| **Update Profile** | `/user/update` | PUT | **Private** | - | Updates the profile of the currently authenticated user. | `PUT /user/update` (with updated user data in request body) | `{"success": true, "data": { ...updated user data... }}` |
| **Delete Account** | `/user/delete` | DELETE | **Private** | - | Deletes the account of the currently authenticated user. | `DELETE /user/delete` | `"user account successfully deleted"` |

### API Group: Recipe

**This API Group manages recipes and related data.**

| Feature | API Path | Method | Access | Query Params | Business Logic | Sample Request | Sample Response |
|---|---|---|---|---|---|---|---|
| **Get All Recipes** | `/recipe/` | GET | **Public** | - | Retrieves a list of all available recipes. | `GET /recipe/` | `{"recipes": [...recipe data...]}` |
| **Get Specific Recipe** | `/recipe/:id` | GET | **Public** | - | Retrieves details of a specific recipe by its ID. | `GET /recipe/12345` | `{...recipe data...}` |
| **Get Recipes by Filter** | `/recipe/` | GET | **Public** | `filter params` | Retrieves recipes based on specified filter criteria (e.g., cuisine, ingredients). | `GET /recipe/?cuisine=italian&vegetarian=true` | `{"recipes": [...recipe data...]}` |
| **Get User Recipes** | `/recipe/user/` | GET | **Private** | - | Retrieves a list of recipes created by the currently authenticated user. | `GET /recipe/user/` | `{"recipes": [...recipe data...]}` |
| **Create Recipe** | `/recipe/create` | POST | **Private** | - | Creates a new recipe for the currently authenticated user. | `POST /recipe/create` (with recipe data in request body) | `{"success": true, "data": { ...created recipe data... }}` |
| **Update Recipe** | `/recipe/:recId/edit` | POST | **Private** | - | Updates an existing recipe for the currently authenticated user. | `POST /recipe/12345/edit` (with updated recipe data in request body) | `{"success": true, "data": { ...updated recipe data... }}` |
| **Delete Recipe** | `/recipe/:recId/delete` | DELETE | **Private** | - | Deletes an existing recipe for the currently authenticated user. | `DELETE /recipe/12345/delete` | `"recipe deleted"` |
| **Get Ingredient Prices** | `/price/ingredients` | GET | **Private** | `ingredients` | Retrieves prices for specified ingredients. | `GET /price/ingredients?ingredients=sugar,flour,eggs` | `{...price data...}` |

### API Group: Note

**This API Group manages user notes associated with recipes.**

| Feature | API Path | Method | Access | Query Params | Business Logic | Sample Request | Sample Response |
|---|---|---|---|---|---|---|---|
| **Get all notes based on user ID** | `/note/user?id=xxx` | GET | **Private** | `userId` | Retrieves all notes created by the user with the specified `userId`. | `GET /note/user?id=658ac33fcfe93c8dbf43fb28` | `[{"restId": "...", "userId": "...", "date": "...", ...}]` |
| **Get all relevant notes based on recipe ID** | `/note/recipe?id=xxx` | GET | **Private** | `filter params` (optional) | Retrieves all notes relevant to the recipe with the specified `id`, based on optional filter parameters. | `GET /note/recipe?id=65ce1938aecd6e150c8abf55&date=2024-02-15` | `[{"restId": "...", "userId": "...", "date": "...", ...}]` |
| **Get note by ID** | `/note/:noteId` | GET | **Private** | - | Retrieves the note with the specified `noteId`. | `GET /note/65b8346fa1234567890abcde` | `{"restId": "...", "userId": "...", "date": "...", ...}` |
| **Create note** | `/note/create` | POST | **Private** | - | Creates a new note. | `POST /note/create` (with note data in request body) | `{"success": true, "data": { ...created note data... } }` |
| **Update note detail** | `/note/:noteId` | POST | **Private** | - | Updates the details of an existing note. | `POST /note/65b8346fa1234567890abcde` (with updated note data in request body) | `{"success": true, "data": { ...updated note data... } }` |
| **Delete note** | `/note/:noteId` | DELETE | **Private** | - | Deletes the note with the specified `noteId`. | `DELETE /note/65b8346fa1234567890abcde` | `{"success": true, "message": "Note deleted"}` |


## Coming Soon

To be updated
