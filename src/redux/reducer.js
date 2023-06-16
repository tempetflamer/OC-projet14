import { createSlice } from "@reduxjs/toolkit"

const { actions, reducer } = createSlice({
    name: 'employeeReducer',
    initialState: {
        employees: [],
    },

    reducers: {
        addEmployee: (state, action) => {
            // return {
            //     //...state,
            //     ...state.employees.push(action.payload)
            // }
            state.employees.push(action.payload)
        },
        getEmployees: (state, action) => {
            return {
                // ...state,
                // isConnected: true,
                // firstName: action.payload.firstName,
                // token: `${action.payload.token}`,
                ...state,
                employees: action.payload.map((row, index) => {
                    return {
                        ...row,
                        id: index + 1
                    }
                })
            }
        }
    }
})


export const { addEmployee, getEmployees } = actions
export default reducer