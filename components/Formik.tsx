import {Formik} from 'formik';
import React from 'react';
import {Button, TextInput, View} from 'react-native'
import * as Yup from 'yup';

import styles from "./styles"

interface Values {
    name: string;
    email: string;
    password: string;
}

const userSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Email is not valid').required('Email is required'),
    password: Yup.string().min(8, 'Password is too short').required('Password is required')
});

function UserSignup() {
    const initialValues = {name: '', email: '', password: ''};

    return (
        <Formik initialValues={initialValues} validationSchema={userSchema} onSubmit={values => console.log(values)}>
            {({handleChange, handleBlur, handleSubmit, values}) => (
                <View>
                    <TextInput
                        style={styles.loginPage}
                        placeholder="Name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                    />

                    <TextInput
                        style={styles.loginPage}
                        placeholder="Email"
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                    />

                    <TextInput
                        style={styles.loginPage}
                        placeholder="Password"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={true}
                    />

                    <Button onPress={() => handleSubmit} title="Submit"/>
                </View>
            )}
        </Formik>
    );
};

export default UserSignup;