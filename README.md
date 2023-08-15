# Shopedia (Tokopedia Play Clone)

This is a final project for Generasi GIGIH 3.0 for Fullstack Engineering Track

## Tech Stack

This app built using the MERN stack (MongoDB, Express, React, Node.js) with Vite + Typescript to make things fast and sleek. Using Tailwind CSS for the styling to add the extra flair to our user-friendly interfaces, and Socket IO for the live comments feature.

## Features

- Multiple Pages:
  - Home Page :
    - Display a list of videos from YouTube with thumbnails. Allow users to click on each video to navigate to the video detail page.
    - User can search videos by its title.
  - Video Detail Page :
    - Show the selected video from YouTube along with its details. Include a product list relevant to the video content.
    - Display a list of LIVE comments related to the video.
    - Provide a form for users to submit comments.
  - Profile Page :
    - Show user profile information
    - User can change profile picture
  - Auth Page :
    - Login & Register new account

## Database Schema :

[DB Schema](https://viewer.diagrams.net/?tags=%7B%7D&highlight=0000ff&edit=_blank&layers=1&nav=1&title=erd.drawio#R7Vpbc%2BI2FP41ntk%2BbMYX7JDHQELbKUmZkHR3nzrCFrYa2XJlmcv%2B%2Bh7ZEo5xIN5QL8yEGQas4yP56HzfuQgwnGG8%2BpWjNLpjAaaGbQYrw7kxbNtyLAc%2BpGRdSrzLfikIOQmUUiWYku9YCU0lzUmAs5qiYIwKktaFPksS7IuaDHHOlnW1OaP1p6YoxA3B1Ee0Kf1CAhGV0r5rVvLfMAkj%2FWTLVHdipJWVIItQwJY1EV6JEUuEMnGCeYwSnAi4c4f4M%2BaGexsJIXd6bdgjeM2l9kXIWEgxSkl24bMYxH4GKqM5igmVbn6x0EAtBI9zbg1nyBkT5VW8GmIqsdIwlDaNdtzd%2BIHLdVtMoJPp6lvPWiwWjw8hfvz7Cxs8fO6pjS8QzZWD%2FwJ8WaZcJNba79mSxBQ2YTgDuempumPC2I8IDcZozXJpSCaQ%2F6xHg4hx8h30EYVbFgjgNheKVrZX05jKmWpNjjPQmejdWVuiO7SqKY5RJrQ1jFKUZmRW2CcnxoiHJBkwIQCcUglREiZw7cNagIbaU2mV1YOxcgvmAq92OtzawAjhhlmMBV%2BDipqgfasCbUOyZUVbW9M2eklZPREpHoabpSt44UIh%2FCNoW6%2Bj%2FTtcmVPBSRLCxf2fj%2FL9aTw2bA%2FFKXgjmWVp4RTz0%2BSPXxrcAB%2BJAlrOnvGQUQYevUlYSRZC6ZYoS5EPjxrjudxxr5I8KCdIEQPfz2kRnxEJApxIrJlAAs02xEsZUcHqDuAFbhuaF67hgk1DGFvVGF5SnYshS8BMRAoIMbBmiSVzavgDpoNlRASegllSsoRUKpkqYs1iqa53ZdjOteXaptmWNnsisUkmzR6vHXmczrhjN7hDYki2T5zuIs%2BHZ0lnbHCPzganwYaFzCT3KMZnOvxsOvRb0sHtdUWHXoMOE86C3BfnRuLwRsK5rHcSTttGot9Z%2BLu78D63EifQSvROvJXwGuwBelDtu%2BLwqP3h%2FZvLAxJ4w8HIm3neS5EXys83Wljz00jyrFxfHdn0VC2e8d2SMUmed3L6zdn7CuLbsyec%2BHL6fR7P5KHxXE%2F%2Fp3q6P0LatleW3VlBvWqEyJDFMU7OBbWLgtpvWVHtq65yotv8IkYBfq6oJ1BRr067orrNL3ZOuKKS7BrIBusMGKMYJT9cFlPOgLl4QnyR8wPKa55hnpQF%2BtUK%2B%2FYKfhmj7zfhEJiewPzuUPI5RgIH19KsRxJDJMp000g6LbycBm0W%2BvBpq7P01LadsZ2u2hm3eV6U5D33Mof3MpduvZdp%2FzNDd71M83y3P1WdG5mf1ciUgXjCjcxlgzqnU%2BxxjMjOHztadC0oy5aMB7tW%2BPB074zWrc%2Fz3RXAfgNfHIRY1zfwYcRCliB6W0kBmTwJcKBwqXTGjKXKZf9gIdbKxSgXrO5QvCLi64vrb3IpwK4c3ejiVgzWepDAfr8WimYBWiEoZ5pXl1pQTS5GtdkTzKHNKyreTZWu5H731zhwD8u5j%2Fd1OupXSCjvId7bEnmvM4JjigRZ1C15De5i6jXnaP1CQcVGtfJECqpivPl%2BYJNPt%2F6TsaXvOIfpX%2FW3mFkaXPF0s%2FP3U9ezjkJdTcPPQDtzm4cQTkfmodWSh%2B6O7q01Dw9KO559zLRjviftWAB3rw635x077egCcjS4YVj9U6yM7Orvfc7tfw%3D%3D)

## Bonus Features Mentioned :

- **User profile picture and username**
- **Websocket for live comments**
- **Search feature**

## i. Database Structure

### Videos

The "Videos" collection stores information about video thumbnails.

```
{
    _id : 64c322fed19689926076678b
    imageUrl : "https://i.ytimg.com/vi/Lvq01WvB5D0/maxresdefault.jpg?sqp=-oaymwEcCOgCE…"
    videoName : "iPhone 14 Pro"
    __v : 0
}
```

### Products

The "Products" collection stores information about various products available on a video.

```
{
    _id : 64c322fed196899260766797
    _videoId : 64c322fed19689926076678b
    name : "iPhone 14 Pro"
    link : "https://tokopedia.link/0dujrW78EBb"
    price : 17009000
    __v : 0
}
```

### Comments

The "Comments" collection stores information about comments in a video.

```
{
    _id : 64c322fed1968992607667a4
    _videoId : 64c322fed19689926076678b
    isAnon : false
    profilePicture : "http://hostname/files/default.jpg"
    username : "User 1"
    comment : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae fugit…"
    _userId : 64c322fed1968992607667a4
    __v : 0
    createdAt : 2023-07-28T02:07:58.390+00:00
    updatedAt : 2023-07-28T02:07:58.390+00:00
}
```

### Users

The "Users" collection stores information about users account.

```
{
    _id : 64c322fed1968992607667a4
    profilePicture : "http://hostname/files/default.jpg"
    username : "User 1"
    email : "user@email.com"
    password : "$2a$10$sLOt/OxRQ.eEp92fosL3yOcU5C3M5rQc8.G3t087A9s88diHuggou"
    __v : 0
}
```

## ii. API Structure

### API Endpoints

#### Get a list of all video thumbnails

**Method**: GET

**Endpoint**: `/videos`

**Description**: This endpoint allows you to retrieve a list of all video thumbnails.

### Get a list of products in a video by videoID

**Method**: GET

**Endpoint**: `/products/:_videoID`

**Description**: This endpoint allows you to retrieve a list of products associated with a video, specified by the `videoID`.

### Get a list of comments in a video by videoID

**Method**: GET

**Endpoint**: `/comments/:_videoId`

**Description**: This endpoint allows you to retrieve a list of comments posted on a video, specified by the `videoID`.

### Post a comment on a video by videoID

**Method**: POST

**Endpoint**: `/comments/:_videoId`

**Description**: This endpoint allows you to post a new comment on a video, specified by the `videoID`.

### Get a video by videoID

**Method**: GET

**Endpoint**: `/videos/:_videoId`

**Description**: This endpoint allows you to get a video, specified by the `videoID`.

### Register

**Method**: POST

**Endpoint**: `/auth/register`

**Description**: This endpoint allows you to register a new user account.

### Login

**Method**: POST

**Endpoint**: `/auth/login`

**Description**: This endpoint allows you to login into a user account.

### Get a user by \_id

**Method**: POST

**Endpoint**: `/users/:_id`

**Description**: This endpoint allows you to get a user account information, specified by the `_id`.

### Update a user profile picture

**Method**: PUT

**Endpoint**: `/users/profile-picture/:_id`

**Description**: This endpoint allows you to change a user profile picture , specified by the `_id`.

### Get a list of all user account

**Method**: GET

**Endpoint**: `/users`

**Description**: This endpoint allows you to get all users account.

## iii. API Requests & Responses

### **GET /videos**

Returns all video thumbnails URL.

- **URL Params**  
  None
- **Query Params**  
  `videoName` (Optional) : Filter videos by its name
- **Data Params**  
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
  - **Code:** 200  
    **Content:**

```
{
    videos: [
        {
            _id: string,
            imageUrl: string,
            videoName: string,
            __v: number
        }
    ]
}
```

- **Error Response:**
  - **Code:** 404  
    **Content:** `{ message : "No matching videos found!" }`
  - **Code:** 500  
    **Content:** `{ message : "Internal server error" }`

### **GET /products/:\_videoId**

Returns all products in a video by videoID.

- **URL Params**  
  `_videoId` : Filter products by its \_videoId
- **Query Params**  
  None
- **Data Params**
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    products: [
        {
            _id: string,
            name: string,
            link: string,
            price: number,
            __v: number
        }
    ]
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message : "Invalid data type!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Request params can not be empty!" }`
    OR
  - **Code:** 404  
    **Content:** `{ message : "Products not found!" }`

### **GET /comments/:\_videoId**

Returns all comments in a video by videoID.

- **URL Params**  
  `_videoId` : Filter comments by its \_videoId
- **Query Params**  
  None
- **Data Params**
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    comments: [
        {
            isAnon: boolean,
            profilePicture: string,
            username: string,
            comment: string,
            _userId: string,
            createdAt: timestamp,
            updatedAt: timestamp
        }
    ]
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message : "Invalid data type!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Request params can not be empty!" }`
    OR
  - **Code:** 404  
    **Content:** `{ message : "Comments not found!" }`
    OR
  - **Code:** 500
    **Content:** `{ message : "Something went wrong!" }`

### **POST /comments/:\_videoId**

Submit a comment on a video by videoId

- **URL Params**  
  `_videoId` : Filter comments by its \_videoId
- **Query Params**  
  None
- **Data Params**
  ```
    {
        _userId: string,
        isAnon: boolean,
        profilePicture: string,
        username: string,
        comment: string
    }
  ```
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 201  
  **Content:**

```
{
    message: "Comment added successfully!"
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message : "Invalid data type!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Request body can not be empty!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Request params can not be empty!" }`
    OR
  - **Code:** 404  
    **Content:** `{ message : "Video not found!" }`
    OR
  - **Code:** 404  
    **Content:** `{ message : "User not found!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Comment can not be added!" }`
    OR
  - **Code:** 404  
    **Content:** `{ message : "Video not found!" }`
    OR
  - **Code:** 500  
    **Content:** `{ message : "Something went wrong!" }`

### **GET /videos/:\_videoId**

Returns a video by videoID.

- **URL Params**  
  `_videoId` : Filter videos by its \_videoId
- **Query Params**  
  None
- **Data Params**
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  **Content:**

```
{
     message: "video found!",
     video: {
        _id: "64d85d2c6f15b6a3d0fb6191",
        imageUrl: "https://i.ytimg.com/vi/6A6C51G0ZQ8/maxresdefault.jpg?...",
        videoName: "Steam Deck",
        __v: 0
    }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message : "Invalid data type!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Request params can not be empty!" }`
    OR
  - **Code:** 404  
    **Content:** `{ message : "Video not found!" }`

### **POST /auth/register**

Register a new user account.

- **URL Params**  
  None
- **Query Params**  
  None
- **Data Params**
  ```
    {
        username: string,
        email: string,
        password: string,
    }
  ```
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 201
  **Content:**

```
{
     message: "Register Success!",
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message : "Invalid data type!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Request body can not be empty!" }`
    OR
  - **Code:** 409  
    **Content:** `{ message : "This email is already registered!" }`

### **POST /auth/login**

Login into a user account.

- **URL Params**  
  None
- **Query Params**  
  None
- **Data Params**
  ```
    {
        email: string,
        password: string,
    }
  ```
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  **Content:**

```
{
     success: true,
     token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRkOWJjZTA..."
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message : "Invalid data type!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Request body can not be empty!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Invalid email!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Invalid password!" }`
    OR
  - **Code:** 500  
    **Content:** `{ message : "An error occurred during login." }`

### **POST /users/:\_id**

Returns a user by \_id.

- **URL Params**  
  `_id` : Filter users by its \_id
- **Query Params**  
  None
- **Data Params**
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  **Content:**

```
{
     user: {
        _id: "64d9bce07d6c9bda6cc879f0",
        profilePicture: "http://hostname/files/myprofile.jpg",
        "username": "John Doe",
        "email": "john@email.com",
        "password": "$2a$10$sLOt/OxRQ.eEp92fosL3yOcU5C3M5rQc8.G3t087A9s88diHugfpi",
        "__v": 0
    }
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message : "Invalid data type!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Request params can not be empty!" }`

### **PUT /users/profile-picture/:\_id**

Update a user profile picture by \_id.

- **URL Params**  
  `_id` : Filter users by its \_id
- **Query Params**  
  None
- **Data Params**
  ```
   {
       profilePicture: "http://hostname/files/photo.jpg"
   }
  ```
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  **Content:**

```
{
     message: 'Profile picture updated!'
}
```

- **Error Response:**
  - **Code:** 400  
    **Content:** `{ message : "Invalid data type!" }`
    OR
  - **Code:** 400  
    **Content:** `{ message : "Request params can not be empty!" }`
    OR
  - **Code:** 500  
    **Content:** `{ message: 'Something went wrong!' }`

### **GET /users**

Get all user account.

- **URL Params**  
  None
- **Query Params**  
  None
- **Data Params**
  None
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200
  **Content:**

```
{
     users: [
        {
            _id: "64d88aaec523d566f4cdaffc",
            profilePicture: "http://hostname/files/image.jpg",
            username: "John Doe",
            email: "john@email.com",
            password: "$2a$10$Z1XGv4UqVhQ7/u6kRC1vC.1UN6DdHdrHDBY9M3eOVF3Z4mGROVxyz",
            "__v": 0
        },
    ]
}
```

- **Error Response:**
  - **Code:** 404  
    **Content:** `{ message : "Its Empty!" }`

## iv. How To Run in Local

# Prerequisites

Before running this project, make sure you have the following software installed:

1. [Node.js](https://nodejs.org/en/) - Make sure to install the latest version.
2. [MongoDB](https://www.mongodb.com/) - Ensure you have MongoDB installed and running.

# Getting Started

Follow these steps to set up and run the project:

1. **Download or Clone the Repo:**

   - Download the project as a ZIP file and extract it, or
   - Clone the repository using Git:
     ```
     git clone https://github.com/alfazaatariq/gigih-final_project.git
     ```

2. **Install Dependencies:**

   - Open the terminal or command prompt.
   - Navigate to the project directory (where you downloaded or cloned the repo).
   - Navigate to each folder (Frontend & Backend)
   - Type the following command to install the required dependencies for each folder:
     ```
     npm install
     ```

3. **Environment Configuration:**

   - Locate the file named `.env.example` in each folder.
   - Rename this file to `.env`:

4. **Set the PORT Variable:**

   - Open the `.env` file in a text editor.
   - Find the line that says `PORT=3000` (or any other number).
   - Change the value to any available port number you prefer.
   - IMPORTANT :
     -- For the Frontend, you need to set the port on `vite.config.ts` to set the port to run it

5. **Start the App:**
   - In the terminal or command prompt on each folder (Frontend & Backend), type the following command to start :
   - Frontend :
     ```
     npm run dev
     ```
   - Backend :
     ```
     npm run dev
     ```

That's it! The backend and frontend should now be up and running. For the frontend you can access it by navigating to `http://localhost:<PORT>` in your web browser, where `<PORT>` is the port number you set in the `vite.config.ts` file. And for the backend, you can access it by navigating to `http://localhost:<PORT>`, where `<PORT>` is the port number you set in the `.env` file in backend folder.

Here is the collection to use in Postman
[postman.collections](https://drive.google.com/drive/folders/11SGqqv1rO_6HEYvtihquihlc9pcBDk4s?usp=drive_link)

If everything went smoothly, you are now ready to use the application.
