import React from 'react';
import ReactDOM from 'react-dom';
// antd style
// import 'antd/dist/antd.css';

// tvirus style
import 'tvirus/dist/tvirus.css';
import router from './router/index';

const CONTAINER = document.getElementById('root');
if (!CONTAINER) {
    throw new Error('当前页面不存在 <div id="root"></div> 节点.');
}

ReactDOM.render(router , CONTAINER);