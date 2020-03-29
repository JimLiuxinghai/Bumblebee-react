import React, { PropsWithChildren, useRef, useEffect } from 'react';
import './index.less';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { CombinedState, HomeState } from '@/typings';
import mapDispatchToProps from '@/store/actions/home';

type Props = PropsWithChildren<RouteComponentProps & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps>;
function Home(props: Props) {
    
    return (
            <div>
                <h1>Start</h1>
            </div>

    )
}
const mapStateToProps = (state: CombinedState): HomeState => state.home;
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);