import { useContext, useState, useEffect } from "react"
import Button from "../elements/Button"
import Modal from "../elements/Modal"
import Form, { TextInput } from "../form/Form"
import * as Yup from "yup"
import CreatableSelect from 'react-select/creatable'
import LocationContext from "@/context/LocationContext"
import { IKContext, IKUpload } from 'imagekitio-react'

const validationSchema = Yup.object({
    name: Yup.string().required('Please type something'),
    description: Yup.string()
})

const AddItem = ({ }) => {
    const [modal, setModal] = useState(false);
    const [options, setOptions] = useState([]);
    const [form, setForm] = useState(true);
    const [file, setFile] = useState(null);
    const [values, setValues] = useState({
        name: '',
        description: ''
    });

    const { locations } = useContext(LocationContext);

    useEffect(() => {
        if (locations) {
            setOptions(locations.map(location => (
                { value: location._id, label: location.description }
            )));
        }
    }, [locations]);

    const handleUpload = (e) => {
        setFile(e.target.files[0])
    }

    const onSubmit = async () => {
        try {
            console.log('submit', values);
            setModal(false);

        } catch (err) {
            console.log(err);
        }
    };

    const onCreate = (e) => {
        // const event = { name: e, year: 2023 }
        // options.push({ value: event.name, label: `${event.name} ${event.year}` })
        console.log('create', e)
    }

    const onChange = (e) => {
        console.log('change', e)
    }

    const resetForm = () => {
        setTimeout(() => {
            setForm(false);
        }, 500)
        setTimeout(() => {
            setForm(true);
        }, 501);
    };

    const onUploadStart = (evt) => {
        console.log('Started', evt);
      };
    
      const onUploadProgress = (evt) => {
        console.log('Progress: ', evt);
      };
    
      const onError = (err) => {
        console.log('Error');
        console.log(err);
      };
    
      const onSuccess = (res) => {
        console.log('Success');
        console.log(res);
      };

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
        <>
            <Button onClick={() => setModal(true)} floating><i className="fas fa-plus"></i></Button>

            <Modal title="Add Item" modal={modal} setModal={setModal} onClose={resetForm} >
                <div className="flex items-center flex-col">
                    {
                        form && (
                            <Form
                                validation={validationSchema}
                                values={values}
                                setValues={setValues}
                                onSubmit={onSubmit}
                            >
                                <TextInput name="name" />
                                <TextInput name="description" />

                                <label className='form__group-label'>Location</label>
                                <CreatableSelect
                                    isClearable options={options}
                                    classNamePrefix='location-select'
                                    onCreateOption={onCreate}
                                    onChange={onChange}
                                    placeholder="Select location"
                                />

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

                                <button className="mt-6" type="submit">Add new item</button>
                            </Form>
                        )
                    }

                </div>
            </Modal>

        </>
    )
}

export default AddItem;
