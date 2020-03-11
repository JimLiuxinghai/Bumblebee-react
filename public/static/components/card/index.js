import React, { Component } from 'react';
import style from './index.less';


export default class Card extends Component {
    constructor(props) {
        super(props);
    }
  
    componentDidMount() {

    }
  
    render() {
        let {title} = this.props;
        return (
            <div className={style.cardContainer}>
                <div className={style.title}>{title}</div>
                {this.props.children}
            </div>
        )
    }
}