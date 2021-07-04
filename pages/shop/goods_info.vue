<template>
  <view>
    <cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
      <block slot="content">商品详情</block>
    </cu-custom>
    <view>
      <swiper
        class="screen-swiper square-dot"
        :indicator-dots="true"
        :circular="true"
        :autoplay="true"
        interval="5000"
        duration="500"
      >
        <swiper-item v-for="(item, index) in swiperList" :key="index">
          <image
            :src="item.url"
            mode="aspectFill"
            v-if="item.type == 'image'"
          ></image>
          <video
            :src="item.url"
            autoplay
            loop
            muted
            :show-play-btn="false"
            :controls="false"
            objectFit="cover"
            v-if="item.type == 'video'"
          ></video>
        </swiper-item>
      </swiper>
    </view>
    <view>
      <view class="padding bg-white" style="border-radius: 0 0 15px 15px">
        <text class="text-bold text-lg"
          >{{ productInfo.name }}{{ productInfo.commodityInfo }}</text
        >

        <view class="flex">
          <view class="flex-twice padding-sm margin-xs radius"
            ><text class="marginright text-xxl text-red"
              >￥{{ productInfo.priceInfo }}</text
            ><text>{{ productInfo.freight }}</text></view
          >
          <view class="flex-sub padding-sm margin-xs radius"
            >{{ productInfo.payersnumber }}人付款</view
          >
        </view>
      </view>

      <view class="margin-top bg-white" style="border-radius: 15px">
        <view
          class="flex"
          v-for="(item, index) in productInfo.list"
          :key="index"
        >
          <view class="flex-sub padding-sm radius text-center">{{
            item.name
          }}</view>
          <view class="flex-twice padding-sm radius text-black text-left">{{
            item.describes
          }}</view>
        </view>

        <!-- <view class="flex">
          <view class="flex-sub padding-sm radius text-center">轮胎花纹</view>
          <view class="flex-twice padding-sm radius text-black text-left">{{
            productInfo.createBy
          }}</view>
        </view>

        <view class="flex">
          <view class="flex-sub padding-sm radius text-center">尺寸规格</view>
          <view class="flex-twice padding-sm radius text-black text-left">{{
            productInfo.sales
          }}</view>
        </view> -->
      </view>

      <view class="margin-top" style="border-radius: 15px">
        <view class="bg-white solid-bottom allAnswer">
          <view class="action"> 评论 </view>
        </view>
        <view class="bg-white solid-bottom" style="margin-bottom:100upx">
          <block v-for="(item, index) in productInfo.clist" :key="index">
            <view style="display: flex" class="cu-item shadow margin-top-xl">
              <view class="cu-list menu-avatar left">
                <image
                  class="avatar round lg"
                  src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"
                  mode=""
                ></image>
              </view>
              <view class="right">
                <view class="cu-item">
                  <view class="content flex-sub u-f-jsb">
                    <view style="margin: 5px 0">{{ item.createBy }}</view>
                    <view class="text-gray text-sm" style="margin: 5px 15px">
                      <text
                        ><uni-dateformat
                          :format="'yyyy-MM-dd'"
                          :date="item.createTime"
                        ></uni-dateformat
                      ></text>
                    </view>
                  </view>
                  <view class="text-content">
                    {{ item.comment }}
                  </view>
                </view>
              </view>
            </view>
          </block>
        </view>
        <view class="user-chat-bottom u-f-ac">
          <input type="text" placeholder="提问" v-model="commentValue" />
          <button type="default" @click="addComment">提交</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import util from '@/common/util.js';
var that
export default {
  data () {
    return {
      CustomBar: this.CustomBar,
      InputBottom: '',
      productInfo: [],
      picId: 0,
      swiperList: [],
      clist: [],
      commentValue: '',
      createBy: util.readUserData().updateBy,
      proId: 0
    }
  },
  onLoad () {
    that = this
    var proId = 0
    uni.$on("test", (data) => {
      proId = data.id
      this.proId = data.id
      that.getProductInfo(proId)
    })
  },
  methods: {
    addComment () {
      const comment = {
        cid: this.proId,
        comment: this.commentValue,
        createBy: this.createBy,
      }
      if (this.commentValue !== '') {
        util.myRequest({
          url: '/comment/comment/add',
          method: 'post',
          data: comment,
          success: ({ data }) => {
            if (data.success === true) {
              this.commentValue = ''
              this.getProductInfo(this.proId)
            } else {
              uni.showToast({
                icon: 'none',
                position: 'bottom',
                title: 'data.message'
              });
            }
          }
        })
      } else {
        uni.showToast({
          icon: 'none',
          position: 'bottom',
          title: '评论内容不能为空？?'
        });
      }
    },
    getProductInfo (proId) {
      util.myRequest({
        url: '/commodity/commodity/queryById',
        method: 'get',
        data: {
          id: proId
        },
        success: ({ data }) => {
          console.log(data);
          if (data.success === true) {
            let newimage, newswiperList = []
            newimage = data.result.imgs ? data.result.imgs.split(',') : ''
            for (let i = 0; i < newimage.length; i++) {
              data.result.picurl = util.getSysImgUrl() + newimage[i]
              // 轮播图
              newswiperList.push({
                id: that.picId++,
                type: 'image',
                url: util.getSysImgUrl() + newimage[i]
              })
            }
            that.swiperList = newswiperList
            that.productInfo = Object.assign(data.result)
            // if(this.productInfo.clist.length === 0){}
          }
        }
      })
    },
    InputFocus (e) {
      this.InputBottom = e.detail.height
    },
    InputBlur (e) {
      this.InputBottom = 0
    }
  },
  mounted () {
    this.swiperList = []
  },
}
</script>

<style lang="less" scoped>
.page {
  background-color: #aaaaaa;
}
.marginright {
  margin-right: 5px;
  font-weight: 700;
}
.allAnswer {
  border-bottom: 1upx #ccc solid;
  padding-left: 13px;
  line-height: 50px;
  height: 50px;
}
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
.avatar {
  width: 80upx;
  height: 80upx;
  margin: 13px !important;
  border-radius: 5px;
}
.right {
  width: 80%;
}
.cu-card .grid.grid-square {
  margin-top: 5px;
  margin-bottom: 0;
}
.user-chat-bottom {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100upx;
  padding: 0 20upx;
  background-color: #fff;

  input {
    flex: 1;
    margin-right: 20upx;
    background-color: #e8edf1;
    padding: 10upx 20upx;
    border-radius: 10upx;
    height: 80upx;
    border-radius: 50px;
    color: #979797;
  }

  view {
    width: 80upx;
    font-size: 50upx;
  }
  button {
    background-color: #2c65a8;
    height: 40px;
    border-radius: 10px;
    color: #fff;
  }
}
</style>
