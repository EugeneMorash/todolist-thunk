import React from 'react';
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";
import {useFormik} from "formik";
import {loginTC} from "../../app/app-reducer";


type FormikErrorType = {
    email?: string
    password?: string
}


export function Login() {
    const isLogIn = useSelector<AppRootStateType, boolean>((state) => state.app.isLogIn)

    const dispatch: any = useDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },

        validate: (values) => {
            // Срабатывает каждый раз, когда меняются значения инпутов (change)
            const errors: FormikErrorType = {}

            if (!values.email) {
                errors.email = 'Empty field'
            } else if (!/^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }


            if (!values.password) {
                errors.password = 'Empty field'
            } else if (!/^[A-Z0-9._%+-]{6,32}$/i.test(values.password)) {
                errors.password = 'Invalid password'
            }

            // Есть библиотека с готовыми регулярками yup

            return errors
        },

        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 4))
            dispatch(loginTC(values))
            formik.resetForm()
        }
    })

    if (isLogIn) {
        return <Navigate to={'/'}/>
    }


    return (
        <div>
            <h2>Login</h2>
            {/* Formik */}

            <form onSubmit={formik.handleSubmit}>
                <div>
                    {/* name должен совпадать с values (email)*/}
                    <input
                        {...formik.getFieldProps('email')}
                        // name={'email'}
                        // onChange={formik.handleChange}
                        // value={formik.values.email}
                        // onBlur={formik.handleBlur}
                    />
                    {/* {...formik.getFieldProps('email')} -> value / name / checked? / onChange / onBlur / multiple*/}
                    {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                </div>

                <div>
                    <input
                        type="password"
                        {...formik.getFieldProps('password')}
                        // name={'pass'}
                        // onChange={formik.handleChange}
                        // value={formik.values.pass}
                        // onBlur={formik.handleBlur}
                    />
                    {/*  onBlur={formik.handleBlur} нужен для formik.touched.email */}
                    {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                </div>

                <label>
                    <input
                        type="checkbox"
                        // name={'rememberMe'}
                        // onChange={formik.handleChange}
                        // checked={formik.values.rememberMe}
                        {...formik.getFieldProps('rememberMe')}
                        checked={formik.values.rememberMe}

                    />
                    {/*{...formik.getFieldProps('rememberMe')} - баг у чекбокса он не сбрасывается*/}
                    {/* checked={formik.values.rememberMe} - лечение */}
                    Remember me
                </label>

                <div>
                    <button type={"submit"}>Log In</button>
                </div>
            </form>
        </div>
    );
}

