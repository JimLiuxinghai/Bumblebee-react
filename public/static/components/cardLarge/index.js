import React from 'react'
import style from './index.less'

export default class CardLarge extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        let {title, type} = this.props;
        return(
            <div className={style.cardLarge}>
                <p className={style.title}><span  className={style.icon}></span>{title}</p>
                {this.props.children}
            </div>
        )
    }
}