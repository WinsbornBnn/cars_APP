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
            <view style="margin: 5px 0">{{ messageList.user }}</view>
            <text>{{ messageList.name }}</text>
            <view class="text-content">
              {{ messageList.content }}
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
              <view class="text-gray text-sm padding u-f-jsb">
                <text
                  ><uni-dateformat
                    :format="'yyyy-MM-dd'"
                    :date="item.createTime"
                    :threshold="[0, 2592000000]"
                  ></uni-dateformat
                ></text>
                <text
                  ><uni-icons
                    @click="AddHand(item.id, item.flag)"
                    :type="
                      item.flag === 1 ? 'hand-thumbsup-filled' : 'hand-thumbsup'
                    "
                    size="12"
                  ></uni-icons>
                  {{ item.fabulous > 0 ? item.fabulous : 0 }}</text
                >
              </view>
            </view>
          </view>
        </view>
      </view>
    </block>
    <view v-show="isLoadMore" class="load-more">
      <uni-load-more class="margin-top" :status="loadStatus"></uni-load-more>
    </view>
    <view class="user-chat-bottom u-f-ac">
      <input type="text" placeholder="我来回答..." v-model="commentValue" />
      <view class="cuIcon-forwardfill" @click="submit"></view>
      <view class="cuIcon-dianhua" @click="callPhone"></view>
      <uni-icons
        :type="!isHand ? 'hand-thumbsup' : 'hand-thumbsup-filled'"
        size="25"
        @click="thumbsup"
      ></uni-icons>
    </view>
  </view>
</template>

<script>
import util from '@/common/util.js';
var that
export default {
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
      ridTotal: 0,
      isHand: false,
      isRclike: false
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
          if (data.success) {
            this.detailList = data.result.somesslist
            this.ridTotal = data.result.somesslist ? data.result.somesslist.length : 0
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
    // 发布评论
    submit () {
      const releasecomment = {
        commssss: this.commentValue,
        rid: this.rid,
        sysid: this.userId
      }
      if (this.commentValue === '') {
        uni.showToast({
          icon: 'none',
          position: 'center',
          title: '您还未填写任何评论？'
        });
      } else {
        util.myRequest({
          url: '/releasecomment/releasecomment/add',
          method: 'post',
          data: releasecomment,
          success: ({ data }) => {
            if (data.success) {
              this.getDetailList()
            }
          }
        })
      }
    },
    // 联系他
    callPhone () {
      uni.makePhoneCall({
        phoneNumber: this.messageList.tel
      });
    },
    // 信息点赞
    thumbsup () {
      const rcLikeAndSys = {
        rid: this.messageList.id,
        sysid: this.userId
      }
      // 取消点赞
      if (this.isHand) {
        util.myRequest({
          url: '/like/likeAndSys/deleteByRid',
          method: 'DELETE',
          data: rcLikeAndSys,
          success: ({ data }) => {
            console.log(data);
            if (data.success) {
              this.isHand = false
            }
          }
        })
      } else {
        // 点赞
        util.myRequest({
          url: '/like/likeAndSys/add',
          method: 'post',
          data: rcLikeAndSys,
          success: ({ data }) => {
            console.log(data);
            if (data.success) {
              this.isHand = true
            } else {
              this.isHand = false
            }
          }
        })
      }
    },
    // 评论点赞
    AddHand (id, flag) {
      const rcLikeAndSys = {
        rcid: id,
        sysid: this.userId
      }
      // 取消点赞
      if (flag === 1) {
        util.myRequest({
          url: '/rclikeandsys/rcLikeAndSys/deleteByrcid',
          method: 'DELETE',
          data: rcLikeAndSys,
          success: ({ data }) => {
            if (data.success) {
              this.detailList = []
              this.getDetailList()
            }
          }
        })
      } else {
        // 点赞
        util.myRequest({
          url: '/rclikeandsys/rcLikeAndSys/add',
          method: 'post',
          data: rcLikeAndSys,
          success: ({ data }) => {
            if (data.success) {
              this.detailList = []
              this.getDetailList()
            }
          }
        })
      }
    },
    ViewImage (e) {
      uni.previewImage({
        urls: [e.currentTarget.dataset.url],
        current: e.currentTarget.dataset.url
      });
    }
  },
  onLoad () {
    that = this
    uni.$on("releaDetail", (data) => {
      that.messageList = Object.assign(data)
      console.log(that.messageList);
      that.rid = that.messageList.id
      that.isHand = that.messageList.flags === 1 ? true : false
      // flags 1 已点赞  0 未点赞
      that.getDetailList()
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
.user-chat-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100upx;
  padding: 0 20upx;
  background-color: #fff;
  border-top: 1upx solid #ccc;

  input {
    flex: 1;
    margin-right: 20upx;
    background-color: #f7f7f7;
    padding: 10upx 20upx;
    border-radius: 10upx;
    height: 80upx;
  }

  view {
    width: 80upx;
    font-size: 50upx;
  }
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
