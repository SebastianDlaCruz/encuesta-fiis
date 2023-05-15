import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { formatDate } from "app/shared/utils/formatDate";
import { getDataUsers } from "services/db/getDataUsers.services";
import { AdminState, Encuesta, TypeQuestion } from "./types";


const now = new Date();


const res = await getDataUsers('users', 'ywNoLPVjpsMzMNssddyh7AypT3t2');


export const adminInitialState: AdminState = {
  encuestas: res

  /* [
    {
      id: 1,
      description: "Encuesta 1",
      title: "Encuesta 1",
      fecha: formatDate(now),
      questions: [
        {
          id: 1,
          name: "Pregunta #1",
          type: TypeQuestion.Regular,
          options: [],
        },
        {
          id: 2,
          name: "Pregunta #2",
          type: TypeQuestion.Regular,
          options: [],
        },
      ],
    },
    {
      id: 2,
      description: "Encuesta 2",
      title: "Encuesta 2",
      fecha: formatDate(now),
      questions: [],
    },
    {
      id: 3,
      description: "Encuesta 3",
      title: "Encuesta 3",
      fecha: formatDate(now),
      questions: [],
    },
  ], */
};

export const adminSlice = createSlice({
  name: "admin",
  initialState: adminInitialState,
  reducers: {
    addQuestion: (
      state: AdminState,
      { payload }: PayloadAction<Encuesta["id"]>
    ) => {
      const { encuestas } = state;
      const newEncuestas = [...encuestas];
      const encuestaFind = newEncuestas.filter(
        (encuesta) => encuesta.id === payload
      )[0];
      const idQuestion = encuestaFind.questions.length + 1;
      const newQuestion = {
        id: idQuestion,
        type: TypeQuestion.Regular,
        options: [],
        name: `pregunta #${idQuestion}`,
      };
      newEncuestas[payload - 1].questions.push(newQuestion);
      state.encuestas = [...newEncuestas];
    },
    deleteQuestion: (
      state: AdminState,
      { payload }: PayloadAction<{ idEncuesta: number; idQuestion: number }>
    ) => {
      const { encuestas } = state;
      const newEncuestas = [...encuestas];
      const encuestaFind = newEncuestas.filter(
        (encuesta) => encuesta.id === payload.idEncuesta
      )[0];
      encuestaFind.questions.splice(
        encuestaFind.questions.findIndex((encuesta) => encuesta.id === payload.idQuestion),
        1
      );
      const newQuestions = encuestaFind.questions.map((encuesta, index) => {
        return { ...encuesta, id: index + 1 };
      });
      const idQuestion = encuestaFind.questions.length + 1;
      // newEncuestas[payload - 1].questions.push(newQuestion);
      state.encuestas = [...newEncuestas];
    },
    addEncuestas: (
      state: AdminState,
      action: PayloadAction<Partial<Encuesta>>
    ) => {
      const newEncuesta = {
        id: state.encuestas.length + 1,
        fecha: formatDate(new Date()),
        ...action.payload,
      } as Encuesta;
      state.encuestas.push(newEncuesta);
    },
    removeEncuesta: (
      state: AdminState,
      action: PayloadAction<Encuesta["id"]>
    ) => {
      const { encuestas } = state;
      encuestas.splice(
        encuestas.findIndex((encuesta) => encuesta.id === action.payload),
        1
      );
      state.encuestas = encuestas.map((encuesta, index) => {
        return { ...encuesta, id: index + 1 };
      });
    },
    editEncuesta: (
      state: AdminState,
      action: PayloadAction<Partial<Encuesta>>
    ) => {
      const { encuestas } = state;
      const index = encuestas.findIndex(
        (encuesta) => encuesta.id === action.payload.id
      );
      const newEncuestas = [...encuestas];
      newEncuestas[index] = {
        ...encuestas[index],
        ...action.payload,
      };
      state.encuestas = [...newEncuestas];
    },
    initData: (state) => {
      state = adminInitialState;
    },
  },
});

export const {
  initData,
  addEncuestas,
  removeEncuesta,
  editEncuesta,
  addQuestion,
} = adminSlice.actions;

export default adminSlice.reducer;
