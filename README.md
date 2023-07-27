## **GET /videos**

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

## **GET /products**

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

## **GET /comments**

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

## **POST /comments**

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
