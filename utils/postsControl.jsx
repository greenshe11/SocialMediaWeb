import { postMediaToDb } from "./mediaControl"

export const postPostToDb = async (userId, description, file, fileType) => {
  try{
      const data = {userId, description}
      const res = await fetch('http://localhost:3000/api/posts', {
          method: 'POST',
          body: JSON.stringify(data)
      })

      if (!res.ok) {throw new Error(await res.text())}
      const dataJson = await res.json()
      const postId = dataJson.content._id
      
      postMediaToDb(file, postId, fileType, fileType)
      
      
      return dataJson._id;

  }catch(e){
console.error(e )}
}

export const getPostsFromDb = async (userId) => {
  try {
      const response = await fetch(`/api/posts/${userId}`); // Replace with your API route
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Assuming the media data is binary, convert it to an array buffer first
      
      // Parse the JSON response
      const data = await response.json();
  
      return data.posts
    } catch (error) {
      console.log(error);
    }
}