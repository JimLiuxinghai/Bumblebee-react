import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';


import store from '../store';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import '../assets/style/index.less';
import Layout from '../components/layout'
import Home from '../pages/home';
import Details from '../pages/details';


import history from '@/history';

/**
 * @param {Object} store  
 */

const Root = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ConfigProvider locale={zh_CN}>
                    <Layout>
                        <Switch>
                            <Route path="/" exact component={Home} />
                            <Route path="/details" exact component={Details} />
                        </Switch>
                    </Layout>
                </ConfigProvider>
            </ConnectedRouter>
        </Provider>
    )
}

export default Root();