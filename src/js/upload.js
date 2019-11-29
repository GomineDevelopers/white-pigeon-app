import axios from "axios";
import {
  Toast
} from "vant";
import * as qiniu from "qiniu-js";

/**
 * 上传文件方法
 * @param {Object} file [获取的本地文件信息]
 * @param {Number} type [上传文件格式类型，0：图片文件，1：文档文件]
 */
export function upload(file,type) {
  return new Promise((resolve) => {
    let files = file['file'];
    switch (type) {
      case 0:
        if (!files.type.match('image.*')) {
          Toast({
              message: "请上传图片格式文件",
              duration: 3000,
              forbidClick: true
            });
            return false;
        } 
        break;
      case 1:
        if (files.type.match('image.*')) {
          Toast({
              message: "请上传文档文件",
              duration: 3000,
              forbidClick: true
            });
            return false;
        } 
      break;
    };
    // 获取上去七牛云的doman和token
    axios.post('/getQiniu/getToken',{})
    .then( res => {
      if (res.data.code === 100){
        let domain = res.data.domain;
        let token = res.data.token;
        uploadToQiniuyun( files, token, domain, resolve)
      } else {
        Toast({
          message: res.data.message,
          duration: 1500,
          forbidClick: true
        });
      }
      
    }).catch(err => {
      console.log(err)
    })

  })
};
/**
 * 上传文件到七牛云方法
 * @param {file} file [获取的本地文件信息]
 * @param {String} token [请求的token参数]
 * @param {String} domain [请求的七牛云地址]
 */
function uploadToQiniuyun( file, token, domain, resolve ) {
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z2
    };
    let api = `http://${domain}/`;
    let fileName = file.name;
    let putExtra = {
      mimeType: null
    };
    const observable = qiniu.upload(file, fileName, token, putExtra, config);
    observable.subscribe({
      next (res) {
        let percent = Math.floor(res.total.percent);
        Toast.loading({
          message: `上传${percent}%`,
          loadingType: 'spinner',
          duration: 0,
          forbidClick: true
        });
      },
      error (err){
        switch (err.code) {
          case 401:
            Toast({
              message: '上传失败，请检查是否登录再重试',
              duration: 3000,
              forbidClick: true
            });
            break;
          default:
            Toast({
              message: err.message,
              duration: 3000,
              forbidClick: true
            });
            break;
        }
      },
      complete(res) {
        let imgSrc = `${api}${res.key}`;
        resolve(imgSrc);
        setTimeout(() => {
          Toast.clear();
        },1000)
      }
    });
  
}