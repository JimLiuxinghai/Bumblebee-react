import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';


import store from '../store';
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
                <Layout>
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/details" exact component={Details} />
                    </Switch>
                </Layout>
            </ConnectedRouter>
        </Provider>
    )
}

export default Root();