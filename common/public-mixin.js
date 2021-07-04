import util from '@/common/util.js';
export const ListMoreDataMixin = {
  data () {
    return {
      loadStatus: 'more',
      isLoadMore: false,
      swiperheight: 500,
      pageSize: 10,
      pageNo: 1,
      isTwo:false
    }
  },
  onLoad () {
    uni.getSystemInfo({
      success: (res) => {
        let height = res.windowHeight - uni.upx2px(100)
        this.swiperheight = height;
      }
    });
  },
  methods: {
    // 订单
    getOrderList () {
      util.myRequest({
        url: '/order/orderinfo/list',
        method: 'get',
        data: {
          pageSize: this.pageSize,
          pageNo: this.pageNo,
          orderstatus: this.orderstatus ? this.orderstatus : ''
        },
        success: ({ data }) => {
          if (data.success === true) {
            this.orderList = data.result.records
            // data.result.records.forEach(item => {
            //   for (let i = 0; i < 7; i++) {
            //     this.orderList.push(item)
            //   }
            // });
            if (data.result.records.length < this.pageSize) {
              this.isLoadMore = true
              this.loadStatus = 'noMore'
              if (this.pageNo > 1) {
                this.pageNo -= 1
              }
            } else {
              this.isLoadMore = false
            }
          } else {
            uni.showToast({
              icon: 'none',
              position: 'center',
              title: data.message
            });
            this.isLoadMore = false
          }
        }
      })
    },
    Search () {
      util.myRequest({
        url: '/order/orderinfo/list',
        method: 'get',
        data: {
          parameterName: this.inputValue
        },
        success: ({ data }) => {
          if (data.success === true) {
            this.orderList = data.result.records
          } else {
            uni.showToast({
              icon: 'none',
              position: 'center',
              title: data.message
            });
          }
        }
      })
      this.inputValue = ''
    },
    // 买卖二手车
    FindCarList () {
      util.myRequest({
        method: 'get',
        url: this.url,
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        },
        success: ({ data }) => {
          if (data.success === true) {
            let newimage, newCarList = []
            data.result.records.forEach(item => {
              newimage = item.imgs.split(',')
              item.picurl = []
              item.description = '下面的例子演示了组件的属性设置bool值和数字的例子。注意false作为一个js变量，在组件的属性中使用时，属性前面需增加:冒号前缀，属性值仍使用引号包裹，但引号里不是字符串，而是js在组件的属性中使用时，属性前面需增加:冒号前缀，属性值仍使用引号包裹，但引号里不是字符串，而是js'
              for (let i = 0; i < newimage.length; i++) {
                item.picurl.push({ imgs: util.getSysImgUrl() + newimage[i] })
              }
              newCarList.push(item)
            });
            this.buyCarList = newCarList
            // data.result.records.forEach(item => {
            //   for (let i = 0; i < 2; i++) {
            //     this.buyCarList.push(item)
            //   }
            // });
            if (data.result.records.length < this.pageSize) {
              this.isLoadMore = true
              this.loadStatus = 'noMore'
              if (this.pageNo > 1) {
                this.pageNo -= 1
              }
            } else {
              this.isLoadMore = false
            }
          } else {
            uni.showToast({
              icon: 'none',
              position: 'center',
              title: data.message
            });
            this.isLoadMore = false
          }
        }
      })
    },
    // 找车找货
    FindFoodList () {
      util.myRequest({
        method: 'get',
        url: this.url,
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        },
        success: ({ data }) => {
          if (data.success === true) {
            let newimage, newFoodList = []
            data.result.records.forEach(item => {
              newimage = item.imgs.split(',')
              item.picurl = []
              item.description = '下面的例子演示了组件的属性设置bool值和数字的例子。注意false作为一个js变量，在组件的属性中使用时，属性前面需增加:冒号前缀，属性值仍使用引号包裹，但引号里不是字符串，而是js'
              for (let i = 0; i < newimage.length; i++) {
                item.picurl.push({ imgs: util.getSysImgUrl() + newimage[i] })
              }
              newFoodList.push(item)
            });
            this.findFoodList = newFoodList
            if (data.result.records.length < this.pageSize) {
              this.isLoadMore = true
              this.loadStatus = 'noMore'
              if (this.pageNo > 1) {
                this.pageNo -= 1
              }
            } else {
              this.isLoadMore = false
            }
          } else {
            uni.showToast({
              icon: 'none',
              position: 'center',
              title: data.message
            });
            this.isLoadMore = false
          }
        }
      })
    },
    // 求职招聘
    FindWorkList () {
      util.myRequest({
        method: 'get',
        url: this.url,
        data: {
          pageNo: this.pageNo,
          pageSize: this.pageSize
        },
        success: ({ data }) => {
          if (data.success === true) {
            let newimage, newWorkList = []
            data.result.records.forEach(item => {
              newimage = item.imgs.split(',')
              item.picurl = []
              // item.description = '下面的例子演示了组件的属性设置bool值和数字的例子。注意false作为一个js变量，在组件的属性中使用时，属性前面需增加:冒号前缀，属性值仍使用引号包裹，但引号里不是字符串，而是js'
              for (let i = 0; i < newimage.length; i++) {
                item.picurl.push({ imgs: util.getSysImgUrl() + newimage[i] })
              }
              newWorkList.push(item)
            });
            this.findWorkList = newWorkList
            if (data.result.records.length < this.pageSize) {
              this.isLoadMore = true
              this.loadStatus = 'noMore'
              if (this.pageNo > 1) {
                this.pageNo -= 1
              }
            } else {
              this.isLoadMore = false
            }
          } else {
            uni.showToast({
              icon: 'none',
              position: 'center',
              title: data.message
            });
            this.isLoadMore = false
          }
        }
      })
    },
    // 商城
    getproductList (e, url) {
      let queryInfo = {
        pageSize: this.pageSize,
        pageNo: this.pageNo
      }
      switch (e) {
        case 1:
          if (!(this.isTwo)) {
            queryInfo.flag = '1'
            this.isTwo = !this.isTwo
          } else {
            queryInfo.flag = '2'
            this.isTwo = !this.isTwo
          }
          break;
        case 2:
          if (!this.isTwo) {
            queryInfo.flag = '1'
            this.isTwo = !this.isTwo
          } else {
            queryInfo.flag = '2'
            this.isTwo = !this.isTwo
          }
          break;
        default:
          break;
      }
      util.myRequest({
        url: url,
        method: 'get',
        data: queryInfo,
        success: ({ data }) => {
          if (data.success === true) {
            let newimage, newProductList = []
            data.result.records.forEach(item => {
              newimage = item.imgs ? item.imgs.split(',') : ''
              for (let i = 0; i < newimage.length; i++) {
                item.picurl = util.getSysImgUrl() + newimage[i]
              }
              newProductList.push(item)
            });
            this.productList = newProductList
            if (data.result.records.length < this.pageSize) {
              this.isLoadMore = true
              this.loadStatus = 'noMore'
              if (this.pageNo > 1) {
                this.pageNo -= 1
              }
            } else {
              this.isLoadMore = false
            }
          } else {
            uni.showToast({
              icon: 'none',
              position: 'center',
              title: data.message
            });
          }
        }
      })
    },
    // 去详情页
    goDetail (item) {
      uni.navigateTo({
        url: '/pages/relea/detail',
        success: function () {
          uni.$emit("test", item);
        }
      })
    },
    FindAnnountCementList () {
      util.myRequest({
        method: 'get',
        url: '/sys/annountCement/list',
        success: ({
          data
        }) => {
          if (data.success === true) {
            this.annountCementList = data.result.records
          } else {
            uni.showToast({
              icon: 'none',
              position: 'center',
              title: data.message
            });
          }
        }
      })
    }
  }
}