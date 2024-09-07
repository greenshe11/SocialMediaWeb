import { postMediaToDb } from "./mediaControl"

export const addFriend = async (sourceUserId, targetUserId) => {
  try{
      const data = {sourceUserId, targetUserId}
      const res = await fetch('/api/friends', {
          method: 'POST',
          body: JSON.stringify(data)
      })

      if (!res.ok) {throw new Error(await res.text())}
      const dataJson = await res.json()      
      return dataJson;

  }catch(e){
console.error(e )}
}

export const getFriendRequests = async (sourceUserId) => {
  try{
    const res = await fetch('/api/friends/find', {
        method: 'POST',
        body: JSON.stringify({sourceUserId, state: "pending"})
    })

    if (!res.ok) {throw new Error(await res.text())}
    const data = await res.json()
    return data;

}catch(e){
console.error(e )}
}

export const getTakenFriendRequest = async (targetUserId) => {
  try{
    const res = await fetch('/api/friends/find', {
        method: 'POST',
        body: JSON.stringify({targetUserId, state: "pending"})
    })

    if (!res.ok) {throw new Error(await res.text())}
    const data = await res.json()
    return data;

}catch(e){
console.error(e )}
}

export const confirmFriendRequest = async (sourceUserId, targetUserId, replacementObj) => {
  try{
    const data = {filter: {targetUserId, sourceUserId}, replacement: replacementObj}
    const res = await fetch('/api/friends', {
        method: 'PUT',
        body: JSON.stringify(data)
    })

    if (!res.ok) {throw new Error(await res.text())}
    const resData = await res.json()
    return resData;

}catch(e){
console.error(e )}
}

export const getFriendsConfirmed = async (sourceUserId) => {
  try{
    const res = await fetch('/api/friends/find', {
        method: 'POST',
        body: JSON.stringify({sourceUserId, state: "confirmed"})
    })

    if (!res.ok) {throw new Error(await res.text())}
    const data = await res.json()
    return data;

}catch(e){
console.error(e )}
}

export const getFriends = async (userId, state=null) => {
    try{
      const conditions = [{sourceUserId: userId}, {targetUserId: userId}]
      const filter = state ? {$or: conditions, state: state} : {$or: conditions}
      const res = await fetch('/api/friends/find', {
          method: 'POST',
          body: JSON.stringify(filter)
      })

      if (!res.ok) {throw new Error(await res.text())}
      const data = await res.json()
      return data;

  }catch(e){
  console.error(e )}
}

export const cancelFriendRequest = async (filter) => {
  try{
    const res = await fetch('/api/friends', {
        method: 'DELETE',
        body: JSON.stringify(filter)
    })

    if (!res.ok) {throw new Error(await res.text())}
    const data = await res.json()
    return data;

}catch(e){
console.error(e )}
}

