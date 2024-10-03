
export const createRoom = async () => {
    try{
      const res = await fetch('/api/room', {
          method: 'POST',
          body: JSON.stringify({})
      })
  
      if (!res.ok) {throw new Error(await res.text())}
      const data = await res.json()
      return data;
  
  }catch(e){
  console.error(e )}
  }
  

export const addUsersToRoom = async (userIds, roomId) => {
    try{
        const res = await fetch('/api/room/addUser', {
            method: 'POST',
            body: JSON.stringify({userId: userIds, roomId})
        })
    
        if (!res.ok) {throw new Error(await res.text())}
        const data = await res.json()
        return data;
    
    }catch(e){
    console.error(e)}
}

export const getRooms = async (filter) => {
    try{
        const res = await fetch('/api/room/get', {
            method: 'POST',
            body: JSON.stringify(filter)
        })
    
        if (!res.ok) {throw new Error(await res.text())}
        const data = await res.json()
        return data;
    
    }catch(e){
    console.error(e)}
}

class _Chat{
    constructor(){

    }
    async fetcher (roomId, purpose, userId=null, message=null){
        try{
            const res = await fetch('/api/chat', {
                method: 'POST',
                body: JSON.stringify({roomId, purpose, userId, message})
            })
            if (!res.ok){throw new Error(await res.text())}
            const data = await res.json()
            return data
        }catch(e){
            console.error(e)
        }
    }
    async send (roomId, userId, message){
        return await this.fetcher(roomId, 'send', userId, message)
    }

    async getAll(roomId){
        return await this.fetcher(roomId, 'getAll')
    }

}

export const Chat = new _Chat()
export const findRooms = getRooms