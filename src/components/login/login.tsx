import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"
import styles from "./login.module.scss"
import { useAppDispatch, useAppSelectortype } from "../../redux/store/store";
import { setLoginState } from "../../redux/reducers/teamReducer";

type FormErrors = {
    email: string;
    password: string;
  };

export const LoginForm = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [formValid, setFormValid] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({ email: '', password: '' });

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const logState = useAppSelectortype((state)=> state.info.loginState)

    const validateEmail = (email: string) => {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
            setErrors((prevErrors) => ({ ...prevErrors, email: 'incorrect email' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
        }
    };

    const validatePassword = (password: string) => {
        if (password.length < 6) {
            setErrors((prevErrors) => ({ ...prevErrors, password: 'min 6' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
        }
    };
    
    const handleEmailBlur = () => {
        validateEmail(email);
    };

    const handlePasswordBlur = () => {
        validatePassword(password);
    };        

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validateEmail(email);
        validatePassword(password);
        dispatch(setLoginState())
        navigate('/')
    };

    const validateForm = () => {
        if (email !== '' && password !== '' && errors.email === '' && errors.password === '' ) {
            setFormValid(true);
        } else {
            setFormValid(false);
        }
        };
        useEffect(()=>{
            if(logState){
                navigate('/')
            }
        },[])
    
        useEffect(() => {
        validateForm();
        }, [email, password, errors]);

    return(
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h3>Login Form</h3>
                <div>
                    <label>Email:
                        <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={handleEmailBlur}
                        />
                        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
                    </label>
                </div>
                <div>
                    <label>Password:
                    <div style={{ position: 'relative' }}>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={handlePasswordBlur}
                        />
                    </div>
                        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
                    </label>
                </div> 
                <button type="submit" disabled={!formValid}>Login</button>
                <div>
                    <NavLink className={styles.link} to="/Registration">Don't have an account? Sign up</NavLink>
                </div>
            </form>
        </div>
    )
}