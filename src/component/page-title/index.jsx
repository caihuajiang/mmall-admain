import React from 'react';

class PageTitle extends React.Component{
    constructor(props){
       super(props)
    }
    componentWillMount(){
        document.title = this.props.title + '-HappyMMall'
    }
    render(){
        return(
            <div className="row">
                <div className="col-md-12">
                    <h1 classNmae="page-header">{this.props.title}</h1>
                {/*容器式组件 在父组件中引用该组件时可以加入别的东西*/}
                    {this.props.children}
                </div>

            </div>

      
        )
    }
}

export default PageTitle;