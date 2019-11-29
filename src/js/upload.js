import axios from "axios";
import {
  Toast
} from "vant";
import store from "@/store";

export function upload(file) {
    console.log(store);

    function uploadToQiniuyun(file) {
        let that = this;
        const config = {
          useCdnDomain: true,
          region: qiniu.region.z2
        };
        let api = "http://xbg.zidata.cn/";
        let token =
          "wOmPSnAO6hOEzRY6p0Dz8KMF8suRWK1LnBYYQrEV:wCg-4JzXbbIPbgH9PUgbakPuC2o=:eyJzY29wZSI6ImdvbWluZTEyMyIsImRlYWRsaW5lIjoxNTc0OTM3Nzg5fQ==";
        let fileName = file.name;
        let putExtra = {
          fname: "",
          params: {},
          mimeType: null
        };
        const observable = qiniu.upload(file, fileName, token, putExtra, config);
        observable.subscribe(
          res => {
            console.log(res.total);
            that.value = Math.floor(res.total.percent);
          },
          err => {
            switch (err.code) {
              case 401:
                alert("上传失败");
                break;
              default:
                alert(err.message);
                break;
            }
          },
          res => {
            console.log(res);
            that.IDcardurl1 = `${api}${res.key}`;
          }
        );
    }
}