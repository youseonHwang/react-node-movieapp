import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
} from '../_actions/types';
 
/* Reducer는 변화를 일으키는 함수(현재 상태, 전달받은 액션) => 새로운 상태 반환 */
// 초기상태는 Reducer의 디폴트 인수에서 정의 state ={}
// 상태가 변할 때 전해진 state는 그 자체의 값으로 대체 되는 것이 아니라, 
// 새로운 것이 합성되는 것처럼 쓰여진다. ...state

/*createStore 메소드는 추가적인 두 번째 인자로 preloadedState값을 받을
 수 있습니다. 또한 리듀서는 undefined인 인자를 찾고 초깃값으로 사용할
  값을 반환해서 초깃값을 지정할 수 있습니다.  */
export default function(state={},action){
    switch(action.type){
      case REGISTER_USER:
            //실질적으로 state가 변경되는 곳은 return state부분
            // ...state를 통해 기존에 존재했던 state를 그대로 출력하기 위함
            return {...state, register: action.payload }
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }
        case AUTH_USER:
            return {...state, userData: action.payload }
        case LOGOUT_USER:
            return {...state }
        default:
            return state;
    }
}