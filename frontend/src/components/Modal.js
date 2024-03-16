import React, { useRef, useState } from 'react'

const Modal = ({generateVariations, selectedImage, setModalOpen, setSelectedImage}) => {
    const [error, setError] = useState(null);
    const ref = useRef(null);
    const closeModal = () => {
        setModalOpen(false);
        setSelectedImage(null);
    }
    const checkSize = () => {
        console.log("eee")
        if(ref.current.width == 256 && ref.current.height == 256){
            generateVariations();
        }else{
            setError("Error: Choose 256 x 256");
            console.log("eee")
        }
    }
    
  return (
    <div className='modal'>
        <div onClick={closeModal}>X</div>
        <div  className='img-container'>
            { selectedImage && <img ref={ref} style={{width: '256px', height: '256px', objectFit: 'cover'}} src={URL.createObjectURL(selectedImage)} alt="Uploaded image" />}
        </div>
        <p>{error || "* Image must be 256 x 256"}</p>
        {!error && <button onClick={checkSize} style={{cursor: 'pointer'}}>Generate</button>}
        {error && <button onClick={closeModal}>Close this and try again</button>}
    </div>
  )
}

export default Modal