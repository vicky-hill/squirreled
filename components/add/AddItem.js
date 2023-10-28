import { useState } from "react"
import Button from "../elements/Button"
import Modal from "../elements/Modal"
import Form, { TextInput } from "../form/Form"
import * as Yup from "yup"

const validationSchema = Yup.object({
    name: Yup.string().required('Please type something'),
    description: Yup.string()
})

const AddItem = ({ }) => {
    const [modal, setModal] = useState(false);
    const [form, setForm] = useState(true);
    const [values, setValues] = useState({
        name: '',
        description: ''
    });

    const onSubmit = async () => {
        try {
            console.log('submit', values);
            setModal(false);

        } catch (err) {
            console.log(err);
        }
    };

    const resetForm = () => {
        setTimeout(() => {
            setForm(false);
        }, 500)
        setTimeout(() => {
            setForm(true);
        }, 501);
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
                                <button type="submit">Add new item</button>
                            </Form>
                        )
                    }

                </div>
            </Modal>

        </>
    )
}

export default AddItem;
