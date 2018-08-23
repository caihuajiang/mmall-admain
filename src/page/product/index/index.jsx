import React        from 'react';
import { Link } from 'react-router-dom'
import "./index.scss"
import Product from 'service/product-service.jsx'
import PageTitle    from 'component/page-title/index.jsx'
import TableList from 'util/table-list/index.jsx'
import Pagination from 'util/pagination/index.jsx'
import MUtil        from 'util/mm.jsx'
import ListSearch   from './index-list-search.jsx'


const _mm   = new MUtil();
let _product = new Product();
class ProductList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list            : [],
            pageNum         : 1,
            listType        : 'list'
        };
    }
    componentDidMount(){
        this.loadProductList()
    }
    // 加载商品列表
    loadProductList(){
        let listParam = {};
        listParam.listType = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        // 如果是搜索的话，需要传入搜索类型和搜索关键字
        if(this.state.listType === 'search'){
            listParam.searchType = this.state.searchType;
            listParam.keyword    = this.state.searchKeyword;
        }
        // 请求接口
        _product.getProductList(listParam).then(res => {
            this.setState(res);
        }, errMsg => {
            this.setState({
                list : []
            });
            _mm.errorTips(errMsg);
        });
    }
    // 搜索
    onSearch(searchType, searchKeyword){
        let listType = searchKeyword === '' ? 'list' : 'search';
        this.setState({
            listType        : listType,
            pageNum         : 1,
            searchType      : searchType,
            searchKeyword   : searchKeyword
        }, () => {
            this.loadProductList();
        });
    }
    // 改变商品状态，上架 / 下架
    onSetProductStatus(e, productId, currentStatus){
        let newStatus   = currentStatus == 1 ? 2 : 1,
            confrimTips = currentStatus == 1 
                ? '确定要下架该商品？' : '确定要上架该商品？';
        if(window.confirm(confrimTips)){
            _product.setProductStatus({
                productId: productId,
                status: newStatus
            }).then(res => {
                _mm.successTips(res);
                this.loadProductList();
            }, errMsg => {
                _mm.errorTips(res);
            });
        }
    }
    //setState是一个异步函数，传入一个回调函数。
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },() => {
            this.loadProductList();
        })
    }
    render(){
        let listBody = this.state.list.map((product,index) => {
            return(
                <tr key={index}>
                    <td>{product.id}</td>
                    <td>
                     <p>{product.name}</p>
                     <p>{product.subtitle}</p>
                    </td>
                    <td>{product.price}</td>
                    <td>
                        <span>{product.status == 1 ? '在售' : '已下架'}</span>
                        <button className="btn btn-xs btn-warning" 
                                            onClick={(e) => {this.onSetProductStatus(e, product.id, product.status)}}>{product.status == 1 ? '下架' : '上架'}</button>
                    </td>
                    <td>
                        <Link className="opear" to={`/product/detail/${product.id}`}>查看详情</Link>
                        <Link className="opear" to={`/product/save/${product.id}`}>编辑</Link>
                    </td>
                </tr>
            )
        })
        //console.log(listBody) listBody是一个数组
        return (
            <div id="page-wrapper">
                <PageTitle title="商品列表">
                    <div className="page-header-right">
                        <Link to="/product/save" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加商品</span>
                        </Link>
                    </div>
                </PageTitle>
                <ListSearch onSearch={(searchType, searchKeyword) => {this.onSearch(searchType, searchKeyword)}}/>
                <TableList tableHeads={['商品ID', '商品信息', '价格', '状态', '操作']}>
                {/*容器式组件 传入的参数为this.props.children*/}
                   {listBody}
                </TableList>
                <Pagination current={this.state.pageNum} total={this.state.total} onChange={ pageNumber => this.onPageNumChange(pageNum)}/>
            </div>
           
        );
    }
}

export default ProductList;