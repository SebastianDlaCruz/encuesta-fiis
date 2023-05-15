import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { addEncuestas, editEncuesta } from 'app/admin/store/adminSlice';
import { useDispatch } from "react-redux";
import { Encuesta } from 'app/admin/store/types';

export enum Type {
    Edit = "Editar",
    Add = "Agregar",
}

export enum TitleModal {
    Edit = "Editar encuesta",
    Add = "Agregar nueva encuesta",
}

interface ModalInterface {
    type: Type;
    open: boolean;
    setOpen: (value: boolean) => void;
    encuesta?: Encuesta
}

const Modal: React.FC<ModalInterface> = ({ open, setOpen, type, encuesta ={} }) => {
    const dispatch = useDispatch()
    const { id, title, description } = encuesta as Encuesta;

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = (values: Partial<Encuesta>) => {
        switch (type) {
            case Type.Add:
                dispatch(addEncuestas(values))
                resetForm();
                handleClose();
                break;
            case Type.Edit:
                const encuestaEdited: Partial<Encuesta> = {
                    ...values,
                    id: id
                }
                dispatch(editEncuesta(encuestaEdited))
                resetForm();
                handleClose();
                break;
        }
    }

    const validationSchema = Yup.object().shape({
        title: Yup
            .string()
            .required('El título es requerido'),
        description: Yup
            .string()
            .required('La descripción es requerida'),
    });

    const { handleChange, resetForm, handleSubmit, errors, values, touched } = useFormik({
        initialValues: {
            title: !encuesta ? '' : `${title}`,
            description: !encuesta ? '' : `${description}`,
        },
        validationSchema: validationSchema,
        onSubmit: (values: Partial<Encuesta>) => onSubmit(values),
    });

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{type === Type.Add ? TitleModal.Add : TitleModal.Edit}</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Título"
                            placeholder='Ingresa el título'
                            type="text"
                            fullWidth
                            variant="standard"
                            name="title"
                            onChange={handleChange}
                            value={values.title}
                            error={touched.title && Boolean(errors.title)}
                            helperText={touched.title && errors.title}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            label="Descripción"
                            placeholder='Ingresa una descripción'
                            type="text"
                            fullWidth
                            variant="standard"
                            name="description"
                            onChange={handleChange}
                            value={values.description}
                            error={touched.description && Boolean(errors.description)}
                            helperText={touched.description && errors.description}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancelar</Button>
                        <Button type="submit">{type === Type.Add ? Type.Add : Type.Edit} Encuesta</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default Modal;
