import { useContext, useState, useEffect } from "react"
import Button from "../ui/Button"
import Modal from "../ui/Modal"
import Form, { TextInput } from "../form/Form"
import * as Yup from "yup"
import CreatableSelect from 'react-select/creatable'
import LocationContext from "@/context/LocationContext"
import ItemContext from "@/context/ItemContext"
import ImageKit from "../elements/ImageKit"

const validationSchema = Yup.object({
    name: Yup.string().required('Please type something'),
    description: Yup.string()
});

const AddItem = ({ }) => {
    const [modal, setModal] = useState(true);
    const [options, setOptions] = useState([]);
    const [form, setForm] = useState(true);
    const [image, setImage] = useState(null);
    const [values, setValues] = useState({
        name: '',
        description: '',
        location: ''
    });

    const { locations } = useContext(LocationContext);
    const { addItem } = useContext(ItemContext);

    useEffect(() => {
        if (locations) {
            setOptions(locations.map(location => (
                { value: location._id, label: location.description }
            )));
        }
    }, [locations]);

    const onSubmit = async () => {
        try {

            const payload = {
                ...values,
                category: 'Misc',
                image
            }

            await addItem(payload);

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
        setValues(values => ({
            ...values,
            location: e.value
        }));
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
        setImage(res.url)
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

                                <ImageKit
                                    onUploadStart={onUploadStart}
                                    onUploadProgress={onUploadProgress}
                                    onError={onError}
                                    onSuccess={onSuccess}
                                />

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
