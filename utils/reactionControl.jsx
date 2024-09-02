export const createReaction = async (postId, reactorId, posterId, reaction) => {
  try{
      const data = {reactorId, posterId, postId, reaction}
      const res = await fetch('/api/reaction', {
          method: 'POST',
          body: JSON.stringify(data)
      })

      if (!res.ok) {throw new Error(await res.text())}
      const dataJson = await res.json()
      return dataJson

  }catch(e){
  console.error(e )}
}

export const updateReaction = async (postId, reactorId, reaction) => {
  try{
      const res = await fetch(`/api/reaction/${reactorId}`, {
          method: 'PUT',
          body: JSON.stringify({postId, reaction})
      })
      if (!res.ok) {throw new Error(await res.text())}
      const dataJson = await res.json()
      return dataJson

  }catch(e){
}
}

export const deleteReaction = async (postId, reactorId) => {
  try{
      const res = await fetch(`/api/reaction/${reactorId}`, {
          method: 'DELETE',
          body: JSON.stringify({postId})
      })
      if (!res.ok) {throw new Error(await res.text())}
      return true

  }catch(e){
}
}

export async function getReactionsFromPost(postId) {
  try {
    const res = await fetch(`/api/reaction/${postId}`);
    
    if (!res.ok) {  // Use 'res' instead of 'response'
      throw new Error('Network response was not ok');
    }
    
    // Parse the JSON response
    const data = await res.json();
    
    return data;
  } catch (error) {
    console.log(error);
    return null;  // It's good practice to return something in case of an error
  }
}

export async function getUserReactionFromPost(postId, reactorId) {
  try{
    const res = await fetch(`/api/reaction/${postId}`, {
        method: 'POST',
        body: JSON.stringify({reactorId})
    })
    if (!res.ok) {  // Use 'res' instead of 'response'
      throw new Error('Network response was not ok');
    }
    
    // Parse the JSON response
    const data = await res.json();
    
    return data;
  } catch (error) {
    console.log(error);
    return null;  // It's good practice to return something in case of an error
  }
}