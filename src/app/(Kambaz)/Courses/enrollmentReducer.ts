import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    addNewEnrollment: (state, { payload: enrollment }) => {
      const newEnrollment = { ...enrollment, _id: uuidv4() };
      state.enrollments = [...state.enrollments, newEnrollment] as any;
      return state;
    },
    deleteEnrollment: (
      state,
      { payload: { course: courseId, user: userId } }
    ) => {
      state.enrollments = state.enrollments.filter(
        (enrollment: any) =>
          enrollment.course !== courseId || enrollment.user !== userId
      );
      return state;
    },
    setEnrollments: (state, { payload: enrollments }) => {
      state.enrollments = enrollments;
      return state;
    },
  },
});

export const { addNewEnrollment, deleteEnrollment, setEnrollments } =
  enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;
