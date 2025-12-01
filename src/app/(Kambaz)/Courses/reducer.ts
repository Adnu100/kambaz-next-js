import { createSlice } from "@reduxjs/toolkit";
import { enrollments } from "../Database";
import { v4 as uuidv4 } from "uuid";

const getInitialEnrollments = () => {
  if (typeof window !== "undefined") {
    const storedEnrollments = sessionStorage.getItem("enrollments");
    return storedEnrollments ? JSON.parse(storedEnrollments) : enrollments;
  }
  return enrollments;
};

const initialState: { courses: any[]; enrollments: any[] } = {
  courses: [],
  enrollments: getInitialEnrollments(),
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },

    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("enrollments", JSON.stringify(action.payload));
      }
    },

    addCourse: (state, { payload: Course }) => {
      const newCourse: any = {
        _id: Course._id || uuidv4(),
        name: Course.name,
        number: Course.number,
        startDate: Course.startDate,
        endDate: Course.endDate,
        department: Course.department,
        credits: Course.credits,
        description: Course.description,
        image: Course.image,
      };
      state.courses = [...state.courses, newCourse] as any;
    },
    deleteCourse: (state, { payload: CourseId }) => {
      state.courses = state.courses.filter((c: any) => c._id !== CourseId);
    },
    updateCourse: (state, { payload: { course } }) => {
      state.courses = state.courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      });
    },
    editCourse: (state, { payload: CourseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === CourseId ? { ...c, editing: true } : c
      ) as any;
    },
    enroll: (state, { payload: { user, course } }) => {
      const newEnrollment = {
        _id: uuidv4(),
        user: user._id,
        course: course._id || course,
      };
      state.enrollments = [...state.enrollments, newEnrollment];
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "enrollments",
          JSON.stringify(state.enrollments)
        );
      }
    },
    unenroll: (state, { payload: { user, course } }) => {
      state.enrollments = state.enrollments.filter(
        (e: { user: any; course: any }) =>
          !(e.course === (course._id || course) && e.user === user._id)
      );
      if (typeof window !== "undefined") {
        sessionStorage.setItem(
          "enrollments",
          JSON.stringify(state.enrollments)
        );
      }
      console.log(
        "After unenroll:",
        JSON.stringify(state.enrollments, null, 2)
      );
    },
  },
});

export const {
  addCourse,
  deleteCourse,
  updateCourse,
  editCourse,
  enroll,
  unenroll,
  setCourses,
  setEnrollments,
} = coursesSlice.actions;

export default coursesSlice.reducer;
