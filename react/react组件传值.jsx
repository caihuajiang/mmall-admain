import React from 'react'
import ReactDOM from 'react-dom'

//子组件修改父组件数据 利用回调函数
class Child extends React.Component{
    constructor(props){
        super(props)
    }
    handleClick(){
        this.props.changeColor('red')
    }
    render(){
        return(
            <div>
                <h1>父组件的背景颜色：{this.props.bgColor}</h1>
                <button onClick={(e) => {this.handleClick(e)}}>改变父组件背景色</button>
            </div>
        )
    }
}
class Father extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            bgColor: '#999'
        }
    }
    onBgColorChange(color){
        this.setState({
            bgColor:color
        })
    }
    render(props){
        return(
            <div style={{background:this.state.bgColor}}>
                //props changeColor是一个函数 函数传递的参数为color 函数changeColor的执行体为函数
                <Child bgColor={this.state.bgColor} changeColor ={(color) => {this.onBgColorChange(color)}}>
            </npmdiv>
        )  
    }
}

// 子组件之间传值
class Child1 extends React.Component{
    constructor(props){
        super(props)
    }
    handleClick(){
        this.props.changeChild2BgColor('red')
    }
    render(){
        return(
            <div>
                <h1>Child1</h1>
                <button onClick={(e) => {this.handleClick(e)}}>改变Child2背景色</button>
            </div>
        )
    }
}
class Child2 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div style={{background:this.props.bgColor}}>
                <h1>Child2</h1>
            </div>
        )
    }
}
class Father extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            bgColor: '#999'
        }
    }
    onChild2BgColorChange(color){
        this.setState({
            bgColor:color
        })
    }
    render(props){
        return(
            <div>
                <Child1 changeChild2BgColor={(color)=>{this.onChild2BgColorChange(color)}}/>
                <Child2 bgColor={this.state.bgColor}/>
            </div>
        )  
    }
}

ReactDOM.render(
    <Father/>,
    document.getElementById('root')
);