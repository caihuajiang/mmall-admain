import React        from 'react';
import { Link }     from 'react-router-dom';
import User from 'service/user-service.js'
import PageTitle    from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx'
import MUtil        from 'util/mm.jsx'
import TableList from 'util/table-list/index.jsx'
const _mm   = new MUtil();
const _user = new User();
class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            pageNum: 1
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then( res => {
            this.setState(res)
        },errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        })
    }
    //setState是一个异步函数，传入一个回调函数。
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },() => {
            this.loadUserList();
        })
    }
    render(){
        let listBody = this.state.list.map((user,index) => {
            return(
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        })
        //console.log(listBody) listBody是一个数组
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表"/>
                <TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}>
                {/*容器式组件 传入的参数为this.props.children*/}
                   {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={ pageNumber => this.onPageNumChange(pageNum)}/>
            </div>
           
        );
    }
}

export default UserList;