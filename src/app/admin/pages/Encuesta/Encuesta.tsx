import { Box, Button, Stack, Typography } from "@mui/material"
import { Colors } from "app/shared/utils/colors"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AdminStoreState } from "app/admin/store/store";
import { useParams } from "react-router-dom";
import CardQuestion from "./components/CardQuestion";
import { Question, TypeQuestion } from "app/admin/store/types";
import { useDispatch } from "react-redux";
import { addQuestion } from "app/admin/store/adminSlice";

const Encuesta: React.FC = () => {

    const questionInitialState = [
        {
            id: 1,
            name: 'Pregunta #1',
            type: TypeQuestion.Regular,
            options: [],
        }, {
            id: 2,
            name: 'Pregunta #2',
            type: TypeQuestion.Regular,
            options: [],
        }
    ];
    const { id } = useParams() as { id: string };
    const dispatch = useDispatch();
    const [questions, setQuestions] = useState<Question[]>(questionInitialState);
    const { encuestas } = useSelector((state: AdminStoreState) => state.admin);

    const encuestaSelected = encuestas.filter(encuesta => encuesta.id === Number(id))[0];

    const addQuestionF = () => {
        const questionId = questions.length + 1;
        setQuestions([
            ...questions,
            {
                id: questionId,
                type: TypeQuestion.Regular,
                options: [],
                name: `pregunta #${questionId}`
            }
        ])
        // const idEncuesta = Number(id);
        // console.log(idEncuesta);
        // dispatch(addQuestion(idEncuesta));
    }
    const deleteQuestion = (idQuestion: number) => {
        const newQuestions = questions.filter(question => question.id !== idQuestion).map((question, index) => {
            return {
                ...question,
                id: index,
            }
        });
        setQuestions([
            ...newQuestions
        ])
    }

    useEffect(() => {
        console.log('Init');
    }, [encuestas])

    return (
        <Stack spacing={4} position="relative">
            <Box display="flex" alignItems="center" justifyContent="space-between" position="fixed" width={1135} sx={{ backgroundColor: Colors.White, zIndex: 9 }} padding={2}>
                <Typography variant="h5" component="h5">Modulo de preguntas</Typography>
                <Button
                    onClick={addQuestionF}
                    sx={{
                        backgroundColor: Colors.Primary,
                        color: "white",
                        textTransform: "capitalize",
                        ':hover': {
                            backgroundColor: Colors.Secundary,
                        }
                    }}>Agregar pregunta</Button>
            </Box>
            {
                questions.map((question, index) => (
                    <CardQuestion
                        key={`${index}-questions`}
                        question={question}
                        handleDelete={deleteQuestion}
                    />
                ))
            }
        </Stack>
    )
}

export default Encuesta