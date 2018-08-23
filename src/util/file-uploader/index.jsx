import React from 'react'
import FileUpload from './FileUpload.jsx'

class FileUploader extends React.Component{
    render(){
        const options={
        baseUrl:'/manage/product/upload.do',
        chooseAndUpload:true,
        //上传成功后把返回的数据传给父组件的回调函数，父组件的回调函数设置state，用于将图片返回在页面展示。
        uploadSuccess   : (res) => {
            this.props.onSuccess(res.data);
        },
        uploadError     : (err) => {
            this.props.onError(err.message || '上传图片出错啦');
        },
        //上传的文件名称
        fileFiledName: 'upload_file'
    }
    /*Use FileUpload with options*/
    /*Set two dom with ref*/
    return (
        <FileUpload options={options}>
            <button ref="chooseAndUpload">请选择图片</button>
        </FileUpload>
    )      
    }
}
export default FileUploader