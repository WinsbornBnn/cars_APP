<template>
  <view>
    <cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
      <block slot="content">我的收藏</block>
    </cu-custom>
    <view class="cu-card dynamic no-card">
      <block v-for="(item, index) in myLikeList" :key="index">
        <detail-list
          @goDetail="goDetail(item)"
          :detailList="item"
          :index="index"
        ></detail-list>
      </block>
    </view>
    <view v-show="isLoadMore">
      <uni-load-more :status="loadStatus"></uni-load-more>
    </view>
  </view>
</template>

<script>
import detailList from '@/pages/relea/component/detail-list.vue'
import util from '@/common/util.js';
export default {
  components: {
    detailList
  },
  data () {
    return {
      loadStatus: 'more',
      isLoadMore: false,
      pageSize: 10,
      pageNo: 1,
      myLikeList: [],
      url: '/publish/release/buylist'
    }
  },
  onLoad(){
    this.getMyLikeList()
  },
  onPullDownRefresh () {
    setTimeout(() => {
      this.pageNo = 1
      this.myLikeList = []
      this.getMyLikeList()
      uni.stopPullDownRefresh()
    }, 3000);
  },
  //上拉触底函数
  onReachBottom () {
    if (this.myLikeList.length < 10) {
      this.isLoadMore = false
    } else {
      this.isLoadMore = true
      if (this.isLoadMore) {
        this.loadStatus = 'loading'
        setTimeout(() => {
          this.pageNo += 1
          this.getMyLikeList()
        }, 3000);
      }
    }
  },
  methods: {
    getMyLikeList () {
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
            this.myLikeList = newFoodList
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
    goDetail (item) {
      uni.navigateTo({
        url: '/pages/relea/detail',
        success: function () {
          uni.$emit("test", item);
        }
      })
    },
  },
}
</script>

<style>
.margin-top-xl {
  margin-top: 20upx !important;
}
</style>
