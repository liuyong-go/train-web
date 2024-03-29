import axios from 'axios'
// 设置基础访问路径
axios.defaults.baseURL='http://127.0.0.1:8010'
const apicall = {
    POST:"POST",
    GET:"GET",
    fetch:function(url,
        method,
        data = {},
        headers = {},
        needToken=false,
        timeout=5*1000){
            if(needToken){
                headers['Authorization'] =  'Bearer ' + localStorage.getItem('auth')
            }
            return new Promise((resolve, reject) => {     
                   axios({url, method,data,validateStatus: () => true,headers, timeout})
                    .then(res => {
                        if (res.data.code == 0) {
                            resolve(res.data);
                        } else {
                            if(res.data.code == -403){
                                localStorage.removeItem("auth")
                                location.reload()
                            }else{
                                reject(res.data.msg);
                            }
                            
                        }
                    })
                    .catch(err => {
                        console.log(err)
                        reject(err);
                    });
                });
        }
}
export default apicall;