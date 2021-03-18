/* 고차 컴포넌트 (HOC는 컴포넌트를 인자로 받아 새로운 컴포넌트를 반환하는 함수) */
import React, { useEffect } from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

//라우트에서  <Route exact path="/" component={Auth(LandingPage, null)} /> 이런식으로 사용하던
export default function (SpecificComponent, option, adminRoute = null) {

  //권한체크 함수
  function AuthenticationCheck(props) {

    let user = useSelector(state => state.user); // useSelector는 상태조회 (state를 가져다가 사용 할 수 있음.)
    const dispatch = useDispatch(); // useDispatch를 사용하여 props에 action dispatch를 사용 할 필요없이 action 객체를 dispatch 할 수 있음.

    //랜더링 될때마다
    useEffect(() => {

      // user_actions에 있는 auth 함수가 리턴하는 action(type 등)을 reducer에게 dispatch함
      dispatch(auth())
        .then(response => {
          /*_id: req.user._id,
            isAdmin: req.user.role === 0 ? false : true,
            isAuth: true,
            email: req.user.email,
            name: req.user.name,
            lastname: req.user.lastname,
            role: req.user.role,
            image: req.user.image, */
          if (!response.payload.isAuth) { // 권한이 false인데
            if (option) { // 로그인 사용자만 이용 할 수 있다면
              props.history.push('/login') // 로그인 페이지로 이동
            }
          } else { // 권한이 있는 경우
            
            // 어드민이 아닐 경우
            if (adminRoute && !response.payload.isAdmin) {
              props.history.push('/')
            }else { // 그렇지 않은 경우
              if (option === false) {
                props.history.push('/')
              }
            }
          }
        })
    }, [])

    return (
      /* 컴포넌트에서 사용 할 수 있도록 props와 user를 넘김 */
      <SpecificComponent {...props} user={user} /> 
    )
  }
  return AuthenticationCheck
}


