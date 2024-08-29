"use client";

import {useState} from 'react';
/*
function DisplayImage({ fileId }) {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        async function fetchImage() {
            try {
                const res = await fetch(`/api/media?id=${fileId}`);
                if (!res.ok) throw new Error('Failed to fetch the file data');

                const jsonResponse = await res.json();
                const base64Data = jsonResponse.media; // The Base64 string from MongoDB

                // Set the Base64 data directly as the image source
                setImageSrc(base64Data);
            } catch (error) {
                console.error('Error displaying image:', error);
            }
        }

        fetchImage();
    }, [fileId]);

    return (imageSrc);
}
*/
export default function FileUpload(){
    const [file, setFile] = useState(null);
    const [filePreview, setFilePreview] = useState(null);

    const onFileChange = (e) => {
        setFile(e.target.files?.[0])
        const selectedFile = e.target.files[0];
       

        // Create a preview URL for the selected file
        const fileUrl = URL.createObjectURL(selectedFile);
        setFilePreview(fileUrl);
    };

    const onSubmit = async (e) => {
        e.preventDefault()
        if (!file) {return}
        try{
            const data = new FormData();
            data.set('file', file);
            const res = await fetch('http://localhost:3000/api/media', {
                method: 'POST',
                body: data
            })
            
            if (!res.ok) {throw new Error(await res.text())}
       
        }catch(e){
    console.error(e )}
    
    }
    return (
        <main>
            <form onSubmit={onSubmit}>
                <input type="file" 
                name="file"
                onChange={onFileChange}
                />
            <input type="submit" value="Upload"/>

            </form>
            {filePreview && (
                <div>
                    <h3>Uploaded File:</h3>
                    {/* Display based on file type */}
                    {file.type.startsWith('image/') ? (
                        <img src={filePreview} alt="Uploaded File" style={{ maxWidth: '100%' }} />
                    ) : (
                        <a href={filePreview} target="_blank" rel="noopener noreferrer">
                            View File
                        </a>
                    )}
                </div>)}
        </main>
    )

}