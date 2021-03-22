import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'core-js';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";

import Reducer from './_reducers';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'; // 일반적인 redux에서는 객체 형태만을 받아들이지만
import promiseMiddleware from 'redux-promise'; //dispatch에게 promise함수 형식을 대처하게끔
import ReduxThunk from 'redux-thunk'; //dispatch에게 함수 형식을 대처하게끔

//createStore(reducer, [preloadedState], [enhancer]) enhancer은 redux의 기능을 도와주는 미들웨어나 데브툴즈같은 것들
// 여러개의 미들웨어를 적용 할 수 있습니다.
// applyMiddleware를 활용하여 미들웨어를 거쳐가도록 하는 store 생성법
// const store = createStore(reducer, applyMiddlewares(middleware1, middleware2));
// object뿐 아니라 promise, function을 모두 받기 위해 redux-promise, redux-thunk을 가져와 redux에서 store생성 
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

// Provider는 Providersms react-reduxs내부에 존재하는 컴포넌트
ReactDOM.render(
  <Provider
    // store를 App이 아닌 Provider에 연결 (장점은 더이상 store를 부모가 자식에게 재산 물려주듯 내려줄 필요가 없다)
    // 위에서 만든 store를 store에 넣었다.
    // web에서 받은 redux 확장프로그램 삽입
    store={
      createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    }
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
