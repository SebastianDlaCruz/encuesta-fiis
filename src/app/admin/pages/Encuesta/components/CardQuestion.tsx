import { CheckCircleSharp } from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Card, CardActions, CardContent, FormControl, FormLabel, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import { Question, TypeQuestion } from "app/admin/store/types";
import { Colors } from "app/shared/utils/colors";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

interface ButtonsCrud {
  question: Question,
  name: any,
  bgColor: any,
  icon: any,
  handleDelete: (id: number) => void,
  isEditable: boolean,
  setIsEditable: (value: boolean) => void,
}

export const ButtonsCRUD: React.FC<ButtonsCrud> = ({ question, name, bgColor, icon, handleDelete, isEditable, setIsEditable }) => {

  const selectOperation = () => {
    switch (bgColor) {
      case Colors.Save:
        return onSave();
      case Colors.Edit:
        return onEdit();
      case Colors.Close:
        return onDelete();
    }
  }
  const selectDisabled = () => {
    switch (bgColor) {
      case Colors.Save:
        return !isEditable;
      case Colors.Edit:
        return isEditable;
      case Colors.Close:
        return false;
    }
  }

  const onSave = () => {
    setIsEditable(false);
  }
  const onEdit = () => {
    setIsEditable(true);
  }
  const onDelete = () => {
    handleDelete(question.id);
  }

  return (
    <Button
      onClick={() => selectOperation()}
      size="small"
      disabled={selectDisabled()}
      sx={{
        color: bgColor,
        borderWidth: '1px',
        borderColor: bgColor,
        borderStyle: "solid",
        alignItems: "flex-end",
        '&:hover': { backgroundColor: bgColor, color: Colors.White }
      }} >
      {name} {icon}
    </Button>
  );
}

export interface CardQuestionInterface {
  question: Question,
  handleDelete: (id: number) => void
}

const CardQuestion: React.FC<CardQuestionInterface> = ({ question, handleDelete }) => {

  const [options, setOptions] = useState<string[]>(["opcion 1"]);
  const [isEditable, setIsEditable] = useState<boolean>(true);

  const editOption = (index: number) => {
    const optionsSelected = options;
    optionsSelected[index] = values.option
    setOptions([...optionsSelected]);
    setFieldValue('option', '')
  }

  const deleteOption = (index: number) => {
    const optionsFilter = options.filter((option, select) => select !== index)
    setOptions([...optionsFilter]);
  }

  const saveOption = () => {
    setOptions([...options, values.option]);
    console.log([...options, values.option])
    setFieldValue('option', '')
  };


  const operations = [
    { name: 'guardar', bgColor: Colors.Save, icon: <SaveIcon /> },
    { name: 'editar', bgColor: Colors.Edit, icon: <EditIcon /> },
    { name: 'eliminar', bgColor: Colors.Close, icon: <DeleteIcon /> },
  ]

  const onSubmit = () => {

  }

  const validationSchema = Yup.object().shape({
    question: Yup
      .string()
      .required('El título es requerido'),
    description: Yup
      .string()
      .required('La descripción es requerida'),
  });

  const { values, setFieldValue, handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      question: 'Ingrese una pregunta',
      type: TypeQuestion.Regular,
      option: ''
    },
    validationSchema,
    onSubmit: () => onSubmit()
  });

  useEffect(() => {
    setFieldValue('question', question.name);
    setFieldValue('type', question.type);
    setOptions([...question.options])
  }, [question])

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 50 }}>
      <Card>
        <CardContent sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <TextField
            sx={{ minWidth: 500 }}
            autoFocus
            disabled={!isEditable}
            margin="normal"
            label="Pregunta"
            placeholder='Ingresa la pregunta'
            type="text"
            variant="filled"
            name="question"
            onChange={handleChange}
            value={values.question}
            error={touched.question && Boolean(errors.question)}
            helperText={touched.question && errors.question}
          />
          <FormControl variant="filled" sx={{ m: 1, minWidth: 200 }}>
            <InputLabel id="demo-simple-select-standard-label">Tipo de pregunta</InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={values.type}
              onChange={handleChange}
              name="type"
              disabled={!isEditable}
              label="Tipo de pregunta"
            >
              <MenuItem value={TypeQuestion.Regular}>{TypeQuestion.Regular}</MenuItem>
              <MenuItem value={TypeQuestion.Multiple}>{TypeQuestion.Multiple}</MenuItem>
            </Select>
          </FormControl>
        </CardContent>
        {values.type === TypeQuestion.Multiple && (
          <CardContent>
            <FormControl>
              <Box display="flex" alignItems="center" gap={4}>
                <FormLabel id="demo-radio-buttons-group-label">Opciones</FormLabel>
                <TextField
                  disabled={!isEditable}
                  margin="dense"
                  placeholder='Ingresa la opcion'
                  type="text"
                  variant="standard"
                  name="option"
                  size="small"
                  onChange={handleChange}
                  value={values.option}
                  error={touched.option && Boolean(errors.option)}
                  helperText={touched.option && errors.option}
                  sx={{ minWidth: 400 }}
                />
                <Button disabled={!isEditable} sx={{ backgroundColor: Colors.Save }} onClick={saveOption}>
                  <SaveIcon sx={{ color: Colors.White }} fontSize="medium" />
                </Button>
              </Box>
              <Stack spacing={2} marginTop={3}>
                {options.map((option, index) => (
                  <Box display="flex" alignItems="center" gap={2}>
                    <CheckCircleSharp sx={{ color: Colors.Primary }} />
                    <Typography>
                      {option}
                    </Typography>
                    <Button disabled={!isEditable} onClick={() => editOption(index)}>
                      <EditIcon sx={{ color: Colors.Edit }} fontSize="medium" />
                    </Button>
                    <Button disabled={!isEditable} onClick={() => deleteOption(index)}>
                      <DeleteIcon sx={{ color: Colors.Close }} fontSize="medium" />
                    </Button>
                  </Box>

                ))}
              </Stack>
            </FormControl>
          </CardContent>
        )}
        <CardActions sx={{ justifyContent: "flex-end" }}>
          {operations.map((operation) => (
            <ButtonsCRUD
              {...operation}
              key={`operation-${operation.name}`}
              question={question}
              handleDelete={handleDelete}
              isEditable={isEditable}
              setIsEditable={setIsEditable}
            />
          ))}
        </CardActions>
      </Card>
    </form>
  )
}

export default CardQuestion