export const getAccountInfo = async (sessionId) => {
    try {
        const response = await fetch(`/api/accounts/${sessionId}`); // Replace with your API route
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Assuming the media data is binary, convert it to an array buffer first
        
        // Parse the JSON response
        const data = await response.json();
    
        return data
      } catch (error) {
        console.log(error);
      }
}

export const getAllAccounts = async () => {
  try {
      const response = await fetch(`/api/accounts`); // Replace with your API route
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Assuming the media data is binary, convert it to an array buffer first
      
      // Parse the JSON response
      const data = await response.json();
  
      return data
    } catch (error) {
      console.log(error);
    }
}


export async function editAccount(accountId, username, address, birthdate, profileImg) {
    try{
      //profileIMg -> mediaId
        const res = await fetch(`/api/accounts/${accountId}`, {
            method: 'PUT',
            body: JSON.stringify({username, address, birthdate, profileImg})
        })
        if (!res.ok) {throw new Error(await res.text())}

    }catch(e){
console.error(e )};

}