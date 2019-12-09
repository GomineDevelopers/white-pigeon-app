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
  Toast.loading({
    message: `文件上传中...`,
    loadingType: 'spinner',
    duration: 0,
    forbidClick: true
  });
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
    }
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
}
/**
 * 上传文件到七牛云方法
 * @param {file} file [获取的本地文件信息]
 * @param {String} token [请求的token参数]
 * @param {String} domain [请求的七牛云地址]
 */
function uploadToQiniuyun( file, token, domain, resolve ) {
    Toast.clear();
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

export function photograph() {

  return new Promise((resolve, reject) => {
    let cmr = plus.camera.getCamera();
    let res = cmr.supportedImageResolutions[0];
    let fmt = cmr.supportedImageFormats[0];
    cmr.captureImage(
      (path) => {
        plus.io.resolveLocalFileSystemURL(
          path,
          (entry) => {
            entry.file((file) => {
              let filename = file.name;
              let reader = new plus.io.FileReader();
              reader.onload = function(res){
                  let base64Img = res.target.result;
                  let files = base64ToFile(filename,base64Img);
                  console.log({ content: base64Img, file: files })
                  resolve({ content: base64Img, file: files });
                  
              };
              reader.readAsDataURL(file);
            }, (e) => {
              console.log('读取文件失败')
              reject('读取文件失败')
            })
          }, (e) => {
            console.log(e)
            reject(e.message);
          }
        );
      }, (error) => {
        console.log("拍摄失败",error.message)
        reject("拍摄失败: " + error.message);
      }, {
        resolution: res,
        format: fmt
      }
    );
  })
}

function base64ToFile(name,dataurl) {
  let fileName = name.split(".")[0];
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let suffix = mime.split("/")[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], `${fileName}.${suffix}`, {
    type: mime
  });
}