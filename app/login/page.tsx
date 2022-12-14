"use client"
/* eslint-disable */
import {useState} from 'react'
import { useRouter } from 'next/navigation'

import Container from '@/components/std/Container';
import Row from '@/components/std/Row';
import Spacer from '@/components/std/Spacer';

import styles from './login.module.css'

export default function Login() {

    const router = useRouter();
    const [LoginData, setLoginData] = useState({
        login: '',
        password:''
    })
    const [Errors, setErrors] = useState([])


    function handleChange(event: any) {

        const {name, value} = event.target

        setLoginData(prev => {
            return ({
                ...prev,
                [name]: value
            })
        })
    }


    function send_request() {

        const data = {
            name: LoginData.login,
            password: LoginData.password
        }

        fetch('/api/login',
        {
            method: 'POST',
            body: JSON.stringify(data)
        }).then(res => {
            res.json()
            .then(answer => {

                if (answer.res == "wrong password") {
                    setErrors(['password']) 
                }

                if (answer.res == "ok") {
                    window.localStorage.setItem("name", data.name)
                    router.push("/office")
                }

            })
        })
    }

    function send_data() {

        let errors = [];
        if (LoginData.login == '') {
            errors.push('login')
        }
        if (LoginData.password == '') {
            errors.push('password')
        }

        if (errors.length == 0) {
            send_request()
            setErrors([])
        } else {
            setErrors(errors)
        }
    }


    const error_style = {
        border: "2px solid red",
        color: "red"
    }

    return (
        <Container>
            <div className={styles.login}>
                <div className={styles.login_block}>
                    <h3>Войти / зарегестрироваться</h3>
                    <Spacer top="1"/>
                    <Row>
                        <input type="text" name="login" id="" placeholder='Название' onChange={handleChange} style={Errors.includes('login') ? error_style : {}}/>
                        <input type="password" name="password" id="" placeholder='Пароль' onChange={handleChange} style={Errors.includes('password') ? error_style : {}}/>
                    </Row>
                    <Spacer top="1"/>
                    <button onClick={send_data}>
                        Войти / зарегестрироваться
                    </button>
                </div>
            </div>
        </Container>
    );
}