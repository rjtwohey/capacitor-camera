import './ExploreContainer.css';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import {useState} from 'react';
import { IonButton } from '@ionic/react';

interface ContainerProps { }

const ExploreContainer: React.FC<ContainerProps> = () => {
  const [image, setImage] = useState('');
  const [cameraImages, setCameraImages] = useState<Array<string>>([])

  const takePicture = async () => {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });
  
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
  
    // Can be set to the src of an image now
    if (imageUrl != undefined) setImage(imageUrl)
  };

  const uploadPicture = async() => {
    const options = {
      quality: 100,
      source: CameraSource.Photos,
      resultType: CameraResultType.Uri,
      allowEditing: false,
    }

    const images = await Camera.pickImages(options);
    let newImages: string[] = [];

    images.photos.map(img => {
      newImages.push(img.webPath)
    })
    setCameraImages(newImages)
  }

  return (
    <div className="container">
      <IonButton onClick={takePicture}>Take a picture!</IonButton>
      <IonButton onClick={uploadPicture}>Upload a picture!</IonButton>
      <img src={image} className='imageElement'></img>
      <div className='image-section'>
        {cameraImages.map(img => {
          return (
            <img src={img} className='imageElement'></img>
          )
        })}
      </div>
    </div>
  );
};

export default ExploreContainer;
