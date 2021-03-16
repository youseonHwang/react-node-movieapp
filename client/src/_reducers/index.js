import { combineReducers } from 'redux';
import user from './user_reducer';

/*보통 하나의 프로젝트에 하나의 스토어를 원칙으로 합니다. 복잡성을 줄이기 위해서겠지요.
따라서 우리가 각각의 기능별로 만들어 둔 리듀서를 하나의 스토어로 합치기 위해 rootReducer를 만듭니다.
리듀서 합치기 */
const rootReducer = combineReducers({
    user,//= user_reducer
});

export default rootReducer;