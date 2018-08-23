import React        from 'react';
import RcPagination from 'rc-pagination'
import 'rc-pagination/dist/rc-pagination.min.css'

class Pagination extends React.Component{
    constructor(props){
       super(props)
    }
    render(){
        return(
           <div className="row">
               <div className="col-md-12">
           {/*{...this.props} es6结构函数 表示把this.props的参数复制给组件参数*/}
                   <RcPagination {...this.props} hideOnSinglePage showQuickJumper/>
               </div>
           </div>
        )
    }
}

export default Pagination;