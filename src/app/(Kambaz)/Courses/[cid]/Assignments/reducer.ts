import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: assignments,
};

const assignmentSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addNewAssignment: (state, { payload: assignment }) => {
      const newAssignment = { ...assignment, _id: uuidv4() };
      state.assignments = [...state.assignments, newAssignment] as any;
      return state;
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (assignment: any) => assignment._id !== assignmentId
      );
      return state;
    },
    updateAssignment: (state, { payload: assignment }) => {
      state.assignments = state.assignments.map((c: any) =>
        c._id === assignment._id ? assignment : c
      ) as any;
      return state;
    },
  },
});

export const { addNewAssignment, deleteAssignment, updateAssignment } =
  assignmentSlice.actions;
export default assignmentSlice.reducer;
