## i. Database Structure

### Videos

The "Videos" collection stores information about video thumbnails.

```
{
    _id : 64c322fed19689926076678b
    imageUrl : "https://i.ytimg.com/vi/Lvq01WvB5D0/maxresdefault.jpg?sqp=-oaymwEcCOgCE…"
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
    username : "User 1"
    comment : "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae fugit…"
    __v : 0
    createdAt : 2023-07-28T02:07:58.390+00:00
    updatedAt : 2023-07-28T02:07:58.390+00:00
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

**Endpoint**: `/products`

**Description**: This endpoint allows you to retrieve a list of products associated with a video, specified by the `videoID`.

### Get a list of comments in a video by videoID

**Method**: GET

**Endpoint**: `/comments`

**Description**: This endpoint allows you to retrieve a list of comments posted on a video, specified by the `videoID`.

### Post a comment on a video by videoID

**Method**: POST

**Endpoint**: `/comments`

**Description**: This endpoint allows you to post a new comment on a video, specified by the `videoID`.

## iii. API Requests & Responses

### **GET /videos**

Returns all video thumbnails URL.

- **URL Params**  
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
    videos: [
        {
            _id: string,
            imageUrl: string,
            __v: number
        }
    ]
}
```

- **Error Response:**
  - **Code:** 404  
    **Content:** `{ message : "Its Empty!" }`

### **GET /products**

Returns all products in a video by videoID.

- **URL Params**  
  None
- **Data Params**
  ```
    {
        _videoId: string
    }
  ```
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
    **Content:** `{ message : "Request body can not be empty!" }`
    OR
  - **Code:** 404  
    **Content:** `{ message : "Products not found!" }`

### **GET /comments**

Returns all comments in a video by videoID.

- **URL Params**  
  None
- **Data Params**
  ```
    {
        _videoId: string
    }
  ```
- **Headers**  
  Content-Type: application/json
- **Success Response:**
- **Code:** 200  
  **Content:**

```
{
    comments: [
        {
            username: string,
            comment: string,
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
    **Content:** `{ message : "Request body can not be empty!" }`
    OR
  - **Code:** 404  
    **Content:** `{ message : "Comments not found!" }`

### **POST /comments**

Submit a comment on a video.

- **URL Params**  
  None
- **Data Params**
  ```
    {
        _videoId: string,
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
    **Content:** `{ message : "Comment can not be added!" }`
    OR
  - **Code:** 404  
    **Content:** `{ message : "Video not found!" }`

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
     git clone https://github.com/alfazaatariq/gigih-mid_term_project.git
     ```

2. **Install Dependencies:**

   - Open the terminal or command prompt.
   - Navigate to the project directory (where you downloaded or cloned the repo).
   - Type the following command to install the required dependencies:
     ```
     npm install
     ```

3. **Environment Configuration:**

   - Locate the file named `.env.example` in the project root.
   - Rename this file to `.env`:

4. **Set the PORT Variable:**

   - Open the `.env` file in a text editor.
   - Find the line that says `PORT=3000` (or any other number).
   - Change the value to any available port number you prefer.

5. **Start the Server:**
   - In the terminal or command prompt, type the following command to start the server:
     ```
     npm run start
     ```

That's it! The server should now be up and running. You can access it by navigating to `http://localhost:<PORT>` in your web browser, where `<PORT>` is the port number you set in the `.env` file or you can use Postman

Here is the collection to use in Postman
[Collection.json](https://drive.google.com/file/d/1VhcYaKoDLVX4MmRy1th0ZKw_OJ7pcxuG/view?usp=drive_link)

If everything went smoothly, you are now ready to use the application.
