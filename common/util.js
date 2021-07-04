const getSysUrl = () => {
  //return "https://zzdw.scduke.com/ele-seal/";
  return "http://192.168.2.30:8080/cvas";
}

const getSysImgUrl = () => {
  //return "https://zzdw.scduke.com/ele-seal/";  
  return "http://192.168.2.30:8080/cvas/sys/common/static/";
  //return "https://zzdw.scduke.com/ele-seal/sys/common/view/"; 
}

/**
 * 网络请求封装
 */
const myRequest = (opt) => {
  uni.showLoading({
    mask: true,
    title: opt.title ? opt.title : "加载中"
  });
  let method = "GET";
  if (opt.method != undefined) {
    method = opt.method;
  }
  console.log(opt.url + "---requestData---" + JSON.stringify(opt.data));
  uni.request({
    url: getSysUrl() + opt.url,
    method: method,
    data: opt.data,
	timeout:3000000,
    header: {
      'X-Access-Token': getToken(),
      'Accept': 'aplication/json,text/plain,*/*',
      'content-type': 'application/json'
    },
    success: (res) => {
      uni.hideLoading();
      if (res.data.status == 500 || res.data.message.indexOf('Token失效，请重新登录') > -1) {
        uni.showToast({
          icon: 'none',
          title: '登录过期,请重新登录!'
        })
        uni.removeStorageSync('global.userData');
        uni.removeStorageSync('global.token');
        uni.clearStorage()
        setTimeout(() => {
          uni.reLaunch({
            url: '/pages/login/login'
          })
        }, 1000)
      } else {
        opt.success(res);
      }
    },
    fail: (res) => {
		console.log(JSON.stringify(res))
      uni.hideLoading();
      uni.showToast({
        duration: 2000,
        icon: 'none',
        title: '请求超时'
      });
    }
  })
}

const friendlyDate = (timestamp) => {
  var formats = {
    'year': '%n% 年前',
    'month': '%n% 月前',
    'day': '%n% 天前',
    'hour': '%n% 小时前',
    'minute': '%n% 分钟前',
    'second': '%n% 秒前',
  };

  var now = Date.now();
  var seconds = Math.floor((now - timestamp) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);

  var diffType = '';
  var diffValue = 0;
  if (years > 0) {
    diffType = 'year';
    diffValue = years;
  } else {
    if (months > 0) {
      diffType = 'month';
      diffValue = months;
    } else {
      if (days > 0) {
        diffType = 'day';
        diffValue = days;
      } else {
        if (hours > 0) {
          diffType = 'hour';
          diffValue = hours;
        } else {
          if (minutes > 0) {
            diffType = 'minute';
            diffValue = minutes;
          } else {
            diffType = 'second';
            diffValue = seconds === 0 ? (seconds = 1) : seconds;
          }
        }
      }
    }
  }
  return formats[diffType].replace('%n%', diffValue);
}

const getNowTime = (opt) => {
  // 加0
  function add_10 (num) {
    if (num < 10) {
      num = '0' + num
    }
    return num;
  }


  var myDate = new Date();
  myDate.getYear(); //获取当前年份(2位)
  myDate.getFullYear(); //获取完整的年份(4位,1970-????)
  myDate.getMonth(); //获取当前月份(0-11,0代表1月)
  myDate.getDate(); //获取当前日(1-31)
  var nowTime = myDate.getFullYear() + '-' + add_10(myDate.getMonth() + 1) + '-' + add_10(myDate.getDate());

  return nowTime;
}

/**
 * 存储用户数据
 */
const saveUserData = (userData) => {
  uni.setStorageSync("global.userData", userData);
}
const setToken = (token) => {
  uni.setStorageSync("global.token", token);
}
const setcarInfo = (carInfo) => {
  uni.setStorageSync("global.carInfo", carInfo);
}


const getToken = () => {
  return uni.getStorageSync("global.token");
}
const getcarInfo = () => {
  return uni.getStorageSync("global.carInfo");
}

const getUserId = () => {
  return uni.getStorageSync("global.userData")['id'];
}

const removeToken = () => {
  return uni.removeStorageSync('global.token');
}

const removeUserData = () => {
  return uni.removeStorageSync('global.userData');
}


/**
 * 读取用户数据
 */
const readUserData = () => {
  return uni.getStorageSync("global.userData");
}

/**
 * 设置项目权限
 */
const setJurisdiction = (Jurisdiction) => {
  uni.setStorageSync("global.Jurisdiction", Jurisdiction);
}

// /**
//  * 设置项目权限
//  */
// const setRole  = (role) => {
// 	return uni.getStorageSync("global.role",role);
// }

//判断是否有操作权限

const hasJurisdiction = (url) => {
  var menus = uni.getStorageSync("global.Jurisdiction")
  var status = menus.indexOf(url);
  if (status != -1) {
    return true;
  } else {
    return false;
  }

}

export default {
  getNowTime,
  friendlyDate,
  saveUserData,
  removeUserData,
  getToken,
  removeToken,
  setToken,
  getUserId, setcarInfo,
  getcarInfo,
  readUserData,
  getSysUrl,
  myRequest,
  hasJurisdiction,
  setJurisdiction,
  getSysImgUrl
}
