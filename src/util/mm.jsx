class MUtil{
    request(param){
        return new Promise((resolve,reject) => {
            $.ajax({
                type:param.type||'get',
                url:param.url||'',
                data:param.data || '',
                dataType:param.dataType||'json',
                success: res => {
                   //status = 0 或者 1 表示的是数据成功或者错误 都在ajax的success里面
                   console.log(resolve)
                   if(0 === res.status){
                        typeof resolve === 'function' && resolve(res.data,res.msg)
                   }else if( 10 === res.status){
                    //做强制登录
                        this.doLogin();  
                   }else{
                        typeof reject === 'function' && reject(res.msg||res.data)
                   }
                },
                error: err => {
                   typeof reject === 'function' && reject(err.statusText)
                }
            })
        })
    }
    //跳转到登陆页面
    doLogin(){
        //redirect参数表示从哪个路径跳转到登陆页面的 encodeURIComponent() 函数把字符串作为 URI 组件进行编码。
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }
    // 获取URL参数
    getUrlParam(name){
        // param=123&param1=456
        let queryString = window.location.search.split('?')[1] || '',
            reg         = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result      = queryString.match(reg);
          //  result:['param=123','','123','&']
        return result ? decodeURIComponent(result[2]) : null;
    }
    // 成功提示
    successTips(successMsg){
        alert(successMsg || '操作成功！');
    }
    // 错误提示
    errorTips(errMsg){
        alert(errMsg || '好像哪里不对了~');
    }
    setStorage(name,data){
        let dataType = typeof data
        if(dataType === 'object'){
            window.localStorage.setItem(name,JSON.stringify(data))
        }else if(['string','number','boolean'].indexof(dataType) >= 0){
            window.localStorage.setItem(name,data)
        }else{
            alert('该类型不能用于本地存储')
        }
    }
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data)
        }else{
            return ''
        }
    }
    removeStorage(name){
        window.localStorage.removeItem(name)
    }
}
export default MUtil;