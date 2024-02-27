import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelectortype } from "../../redux/store/store";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { createUser } from "../../redux/reducers/teamReducer";

import styles from "./registration.module.scss"

type FormErrors = {
    email: string;
    password: string;
    confirmPassword:string;
  };

export const Registration = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [formValid, setFormValid] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({ email: '', password: '', confirmPassword: '' });

    const navigate = useNavigate()
    const loginState = useAppSelectortype((state)=> state.info.loginState)
    const dispatch = useAppDispatch()

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
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
            .then(({ user })=>{
                console.log(user)
                 dispatch(createUser({
                    email:user.email,
                    uid:user.uid,
                    token:user.refreshToken,
                }))
                navigate('/Login')
            })
            .catch(console.error)
    navigate('/Login')
    };

    const validateConfirmPassword = (confirmPassword: string) => {
        if (confirmPassword !== password) {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: 'Not correct' }));
        } else {
            setErrors((prevErrors) => ({ ...prevErrors, confirmPassword: '' }));
        }
        };

        const handleConfirmPasswordBlur = () => {
        validateConfirmPassword(confirmPassword);
    };

    useEffect(() => {
        validateForm();
      }, [email, password, confirmPassword, errors]);

    const validateForm = () => {
    if (email !== '' && password !== '' && confirmPassword !== '' && errors.email === '' && errors.password === '' && errors.confirmPassword === '') {
        setFormValid(true);
    } else {
        setFormValid(false);
    }
    };
    useEffect(()=>{
        if(loginState){
            navigate('/')
        }
    },[loginState])
    
return(
    <div className={styles.container}>
        <form onSubmit={handleSubmit}>
            <h3>Registration</h3>
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
            <div>
                <label>Confirm Password:
                    <div style={{ position: 'relative' }}>
                    <input
                        type='password'
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onBlur={handleConfirmPasswordBlur}
                    />
                    </div>
                    {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
                </label>
            </div>
            <button type="submit" disabled={!formValid}>Login</button>
            <div>
                <NavLink className={styles.link} to="/Login">Do have an account? Login</NavLink>
            </div>
        </form>
    </div>
)
}