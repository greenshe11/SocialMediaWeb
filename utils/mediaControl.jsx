
/**
 * Creates a local object URL from an uploaded file.
 *
 * @param {Event} event - The event object from the file input change event.
 * @description Useful for getting an image url from input into src
 * @returns {Object} {file, url}
 */
export const createLocalFileUrl = (event) => {
    const selectedLocalFile = event.target.files[0];
    if (!selectedLocalFile) {
        console.error("No file selected");
        return null;
    }

    // Create a preview URL for the selected file
    
    const url = URL.createObjectURL(selectedLocalFile);
    return {file: selectedLocalFile, url};
};


/**
 * 
 * @param {File} file File
 * @param {String} postId id of the post linked to be linked to file
 * @param {String} mediaType Image, sound, video, document
 * @returns Id of image from database
 */
export const postMediaToDb = async (file, postId, mediaType) => {
    console.log("POSTING MEDIA TO DB")
    console.log("file:", file)
    console.log("postId:", postId)
    console.log("mediaType:", mediaType)
    if (!file) {return}
    try{
        const data = new FormData();
        data.set('file', file);
        data.set('postId', postId);
        data.set('mediaType', mediaType)
        const res = await fetch('http://localhost:3000/api/media', {
            method: 'POST',
            body: data
        })

        if (!res.ok) {throw new Error(await res.text())}
        const dataJson = await res.json();
        return dataJson._id;
    }catch(e){
console.error(e )}
}

/**
 * 
 * @param {string} mediaId 
 * @param {File} mediaData 
 * @param {string} postId 
 * @param {string} mediaType 
 */
export async function editMedia(mediaId, mediaData, postId, mediaType){
    
    try{
        const data = new FormData();
        data.set('mediaData', mediaData)
        data.set('postId', postId)
        data.set('mediaType', mediaType)
        const res = await fetch(`/api/media/${mediaId}`, {
            method: 'PUT',
            body: data
        })
        if (!res.ok) {throw new Error(await res.text())}

    }catch(e){
console.error(e )}

}

/**
 * 
 * @param {string} mediaId 
 * @returns JSON
 */
export async function getMediaFromDb(mediaId) {
    try {
        const response = await fetch(`/api/media/${mediaId}`); // Replace with your API route
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

export async function getMediaFromDbUsingPost(postId) {
    try {
        const response = await fetch(`/api/media/getByPost/${postId}`); // Replace with your API route
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
    

/**
 * 
 * @param {JSON} mediaJson 
 * @param {string} mimeType 
 * @returns url string
 */
export function createUrlForMedia(mediaJson){
    try {
        const mediaData = mediaJson?.media?.mediaData?.data;
        let mimeType = mediaJson?.media?.mediaType
        if (!mediaData) {
            throw new Error("Media data is undefined");
        }
        
        const buffer = Buffer.from(mediaData, "base64");
        const base64String = buffer.toString("base64");
        const mediaUrl = `data:${mimeType};base64,${base64String}`;
        
        return mediaUrl;
    } catch (e) {
        console.log("Error:", e.message);
        return null; // Or handle the error accordingly
    }
}
