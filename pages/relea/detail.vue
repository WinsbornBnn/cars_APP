<template>
  <view class="uni-body">
    <cu-custom bgColor="bg-blue-one" :isBack="true">
      <block slot="content">详情</block>
    </cu-custom>
    <!-- 详情 -->
    <view
      style="display: flex; border-bottom: 1upx #ccc solid"
      class="cu-item shadow margin-top-xl"
    >
      <view class="cu-list menu-avatar left">
        <image
          class="cu-avatar round lg"
          src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
          mode=""
        ></image>
      </view>
      <view class="right">
        <view class="cu-item">
          <view class="content flex-sub">
            <view style="margin: 5px 0">{{ messageList.name }}</view>
            <view class="text-content">
              {{ messageList.description }}
            </view>
            <view class="grid flex-sub padding-lr col-3 grid-square">
              <block v-for="(item, index) in messageList.picurl" :key="index">
                <image
                  :data-url="item.imgs"
                  @tap="ViewImage"
                  class="bg-img"
                  :src="item.imgs"
                  mode="widthFix"
                  lazy-load
                ></image>
              </block>
            </view>
            <view class="text-gray text-sm">
              <text
                ><uni-dateformat
                  :format="'yyyy-MM-dd'"
                  :date="messageList.createTime"
                  :threshold="[60000, 2592000000]"
                ></uni-dateformat
              ></text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="allAnswer">全部回答（{{ ridTotal }}）</view>
    <!-- 评论区 -->
    <block v-for="(item, index) in detailList">
      <view
        style="display: flex; border-bottom: 1upx #ccc solid"
        class="cu-item shadow margin-top-xl"
      >
        <view class="cu-list menu-avatar left">
          <image
            class="cu-avatar round lg"
            src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
            mode=""
          ></image>
        </view>
        <view class="right">
          <view class="cu-item">
            <view class="content flex-sub">
              <view style="margin: 5px 0">{{ item.createBy }}</view>
              <view class="text-content">
                {{ item.commssss }}
              </view>
              <view class="text-gray text-sm padding">
                <text
                  ><uni-dateformat
                    :format="'yyyy-MM-dd'"
                    :date="item.createTime"
                    :threshold="[0, 2592000000]"
                  ></uni-dateformat
                ></text>
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>
    <view v-show="isLoadMore" class="load-more">
      <uni-load-more :status="loadStatus"></uni-load-more>
    </view>
    <user-chat-bottom
      @submit="submit"
      @callPhone="callPhone"
    ></user-chat-bottom>
  </view>
</template>

<script>
import userChatBottom from './component/user-chart-bottom.vue'
import util from '@/common/util.js';
var that
export default {
  components: {
    userChatBottom
  },
  data () {
    return {
      messageList: {},
      loadStatus: 'nomore',
      isLoadMore: true,
      pageSize: 10,
      pageNo: 1,
      commentValue: '',
      createBy: util.readUserData().updateBy,
      userId: util.readUserData().id,
      rid: 0,
      detailList: [],
      ridTotal: 0
    }
  },
  methods: {
    getDetailList () {
      util.myRequest({
        url: "/publish/release/queryById",
        method: 'get',
        data: {
          id: this.rid
        },
        success: ({ data }) => {
          console.log(data);
          if (data.success === true) {
            this.detailList = data.result.list
            this.ridTotal = data.result.list.length
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
    submit (value) {
      console.log(value);
      const releasecomment = {
        commssss: value,
        createBy: this.createBy,
        id: this.userId,
        rid: this.rid
      }
      util.myRequest({
        url: '/releasecomment/releasecomment/add',
        method: 'post',
        data: releasecomment,
        success: ({ data }) => {
          console.log(data);
          if (data.success === true) {
            this.getDetailList()
          }
        }
      })
    },
    callPhone () {
      uni.makePhoneCall({
        phoneNumber: this.messageList.tel
      });
    },
    ViewImage (e) {
      uni.previewImage({
        urls: [e.currentTarget.dataset.url],
        current: e.currentTarget.dataset.url
      });
    }
  },
  mounted () {
    that = this
    uni.$on("test", (data) => {
      that.messageList = Object.assign(data)
      that.rid = that.messageList.id
      this.getDetailList()
    })
  },
  //上拉触底函数
  onReachBottom () {
    // if (this.buyCarList.length < 10) {
    //   this.isLoadMore = false
    // } else {
    //   this.isLoadMore = true
    //   if (this.isLoadMore) {
    //     this.loadStatus = 'loading'
    //     setTimeout(() => {
    //       this.pageNo += 1
    //       this.FindWorkList()
    //     }, 3000);
    //   }
    // }
  }
}
</script>

<style lang="less" scoped>
.margin-top-xl {
  margin-top: 0 !important;
}
.u-f {
  display: flex;
  justify-content: space-between;
}
.left {
  width: 20%;
}
.cu-avatar {
  margin: 13px !important;
}
.right {
  width: 80%;
}
.cu-card .grid.grid-square {
  margin-top: 5px;
  margin-bottom: 0;
}
.padding-lr,
.padding {
  padding-left: 0;
}
.like {
  color: #f00;
}
.allAnswer {
  border-bottom: 1upx #ccc solid;
  padding-left: 13px;
  line-height: 50px;
  height: 50px;
}
.uni-body {
  position: relative;
  background-color: #fff !important;
}

.padding {
  padding-left: 0;
}
</style>
