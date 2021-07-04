import util from '@/common/util.js';
export default {

  data () {
    return {
      tabClick: true, // true 表示是两次点击中的第一次点了 tabBar
      account_type: util.readUserData().accountType
    }
  },
  onTabItemTap (e) {
    var account_type = util.readUserData().accountType
    // tab 点击时执行，此处直接接收单击事件
    switch (account_type) {
      // 司机登录
      case '1':
        // 点击订单
        if (e.index === 1) {
          uni.reLaunch({
            url: '/pages/order/index'
          });
        } else if (e.index === 0) {
          uni.reLaunch({
            url: '/pages/index/index',
            success: () => {
              uni.setTabBarItem({
                index: 0,
                pagePath: "/pages/index/index",
                text: "首页",
                iconPath: "/static/drawable-xxhdpi/home.png",
                selectedIconPath: "/static/drawable-xxhdpi/home_cur.png"
              })
            }
          });
        }
        break;
      // 供应商登录
      case '2':
        // 点击订单
        if (e.index === 1) {
          uni.reLaunch({
            url: '/pages/order/all_list'
          });
        } else if (e.index === 0) {
          uni.reLaunch({
            url: '/pages/index/priverIndex',
            success: () => {
              uni.setTabBarItem({
                index: 0,
                pagePath: "/pages/index/priverIndex",
                text: "首页",
                iconPath: "/static/drawable-xxhdpi/home.png",
                selectedIconPath: "/static/drawable-xxhdpi/home_cur.png"
              })
            }
          });
        }
        break;

      default:
        break;
    }
  }
}