import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";

const { Title } = Typography;

// Route의 컴포넌트에 기본적으로 props로 match, history, location을 넘겨주는 특성
function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false; //로컬스토리지에서 'rememberMe' 가져옴 

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  /* 아이디 기억 */
  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };
  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    /* onSubmit과 initialValues는 Formik태그 안에 꼭 들어가야 하는 props들  */

    <Formik
      // react 인풋을 상태관리하려면 항상 value가 제공되어야 하기때문에 최초값으로 인풋의 이름과 기본값을 설정
      initialValues={{
        email: initialEmail,
        password: '',
      }}

      /* Yup 유효성 체크 */
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email is invalid')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}

      // 폼 제출시 실행될 함수(values에는 initialValues와 동일한 구조를 가진 값)
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          //user_actions로 감
          dispatch(loginUser(dataToSubmit))
            .then(response => { // type: LOGIN_USER, payload: request
              if (response.payload.loginSuccess) { // payload 는 body 에 담기는 data
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/");
              } else {
                setFormErrorMessage('Check out your Account or Password again')
              }
            })
            .catch(err => {
              setFormErrorMessage('Check out your Account or Password again')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {/*props를 input태그에 전달하여 인풋이 form 내에서 작동되도록 */}
      {props => {
        const {
          values, // 현재 form에 공ㅇ되는 상태값 (인풋들이 setFieldValue메소드를 통해 이 value값을 변경하고 이는 form 어디서든 접근이 가능 )
          touched, // 해당 인풋이 클릭되었는지를 저장합니다. error와 touched를 조합하여 피드백을 줄것입니다.
          errors,// 설정된 유효성 체크에 따른 에러 여부를 객체 형태로 보관합니다.
          dirty,
          isSubmitting,
          handleChange, // 어떤 형태의 값이 변경을 처리하기 위해 필요로 하는 핸들러 (각 <input>, <select> 또는 <textarea>에 전달하는 change핸들러)
          handleBlur, //onBlur형태 요소 처리기
          handleSubmit, //양식을 제출 여부되고 있는지 여부를 알 수 있는 유용한 매개 변수
          handleReset,
        } = props;


        return (
          <div className="app">

            <Title level={2}>Log In</Title>
            {/*formik의 handleSubmit 사용 */}
            <form onSubmit={handleSubmit} style={{ width: '350px' }}>

              <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}
              </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              {/* 버튼 */}
              <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                  forgot password
                  </a>
                <div>
                  {/*양식을 두번 보내지 않도록 isSubmitting을 disable시킴 */}
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
                    Log in
                </Button>
                </div>
                Or <a href="/register">register now!</a>
              </Form.Item>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


