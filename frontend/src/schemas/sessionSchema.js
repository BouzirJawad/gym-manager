import * as yup from 'yup';

export const sessionSchema = yup.object().shape({
    sessionName: yup.string().required("Required"),
    coach: yup.string().required("Required"),
    startTime: yup.date().required(),
    endTime: yup.date().required("Required"),
    availableSlots: yup.number(3)
})