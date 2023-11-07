import { IKContext, IKUpload } from 'imagekitio-react'

const ImageKit = ({ onUploadStart, onUploadProgress, onError, onSuccess}) => {

 

    const authenticator = async () => {
        try {
            const response = await fetch('https://masterapi.pro/api/minite/image/imagekit');

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }

            const data = await response.json();
            const { signature, expire, token } = data;
            return { signature, expire, token };
        } catch (error) {
            throw new Error(`Authentication request failed: ${error.message}`);
        }
    };

    return (
        <IKContext
            publicKey={process.env.IK_PUBLIC_KEY}
            urlEndpoint='https://ik.imagekit.io/minite'
            authenticator={authenticator}
        >
            <IKUpload
                fileName="img.jpg"
                folder={"/Squirreled"}
                onError={onError}
                onSuccess={onSuccess}
                onUploadStart={onUploadStart}
                onUploadProgress={onUploadProgress}
            />
        </IKContext>
    )
}

export default ImageKit;
