<template>
  <view style="display: flex" class="cu-item shadow margin-top-xl">
    <view class="cu-list menu-avatar left">
      <image
        class="cu-avatar round lg"
        @tap="ViewAvatar"
        :src="avatarImg"
        :data-url="avatarImg"
        mode=""
        lazy-load
      ></image>
    </view>
    <view class="right">
      <view class="cu-item">
        <view class="content flex-sub">
          <view style="margin: 5px 0">{{ detailList.user }}</view>
          <view class="text-content" @click="goDetail">
            <text>{{ detailList.name }}</text>
            <view :class="[showText ? 'topic_cont_text' : '']">
              {{ detailList.content }}
            </view>
            <template v-if="showText">
              <text
                v-if="
                  detailList.content !== null && detailList.content.length > 70
                "
                class="full_text"
                @click.stop="toggleDescription"
                >全文</text
              >
            </template>
            <template v-else>
              <!-- <view :class="[showText ? 'topic_cont_text' : 'topic_cont']">
                {{ detailList.description.substr(0, 70) }}
              </view> -->
              <text
                v-if="
                  detailList.content !== null && detailList.content.length > 70
                "
                class="full_text"
                @click.stop="toggleDescription"
                >收起</text
              >
            </template>
          </view>
          <view class="grid flex-sub padding-lr col-3 grid-square">
            <block v-for="(item, index) in detailList.picurl" :key="index">
              <image
                :data-url="item.imgs"
                @tap="ViewImage"
                class="bg-img"
                :src="item.imgs"
                mode=""
                lazy-load
              ></image>
            </block>
          </view>
          <view class="text-gray text-sm padding u-f-jsb">
            <view class="padding-rf">
              <text
                >{{ detailList.numbers ? detailList.numbers : 0 }}人回答</text
              >
              <text>{{ detailList.likes ? detailList.likes : 0 }}点赞</text>
              <text
                ><uni-dateformat
                  :format="'yyyy-MM-dd'"
                  :date="detailList.createTime"
                  :threshold="[0, 31536000000]"
                ></uni-dateformat
              ></text>
            </view>
            <view class="like" @click.stop="myLike"
              ><text
                :class="[!isLike ? 'cuIcon-like' : 'cuIcon-likefill']"
                class="margin-lr-xs"
              ></text
              >{{ !isLike ? '关注' : '取消' }}</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import util from '@/common/util.js';
export default {
  name: 'detail-list',
  props: {
    detailList: {
      type: Object
    }
  },
  data () {
    return {
      textStatus: '全文',
      showText: true,
      isLike: this.detailList.flag === 1 ? true : false,
      // 0 未关注 false，1 已关注 true
      sysid: util.readUserData().id,
      rid: this.detailList.id,
      avatarImg: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg'
    }
  },

  methods: {
    goDetail () {
      this.$emit('goDetail')
    },
    toggleDescription (num) {
      this.showText = !this.showText
    },
    myLike () {
      const releaseandsys = {
        rid: this.rid,// 信息id
        sysid: this.sysid,// 用户id
      }
      // 取消关注
      if (this.isLike) {
        util.myRequest({
          url: '/releaseandsys/releaseandsys/deleteByRid',
          method: 'delete',
          data: releaseandsys,
          success: ({ data }) => {
            if (data.success) {
              this.$emit('DeleteInfo')
              this.isLike = false
            }
          }
        })
      } else {
        // 关注
        util.myRequest({
          url: '/releaseandsys/releaseandsys/add',
          method: 'post',
          data: releaseandsys,
          success: ({ data }) => {
            if (data.success) {
              this.isLike = true
            } else {
              this.isLike = false
            }
          }
        })
      }
    },

    ViewImage (e) {
      const arr = []
      this.detailList.picurl.forEach(item => {
        if (item.imgs) {
          arr.push(item.imgs)
        }
      });
      let index = arr.findIndex(value => value == e.currentTarget.dataset.url)
      uni.previewImage({
        urls: arr,
        current: index,
        indicator: 'default'
      });
    },
    ViewAvatar (e) {
      const arr = []
      arr.push(e.currentTarget.dataset.url)
      uni.previewImage({
        urls: arr,
        fail:(err)=>{
          console.log(err);
        }
      });
      console.log(e.currentTarget.dataset.url[0]);
    }
  },
}
</script>

<style lang="less" scoped>
.topic_cont_text {
  max-height: 140upx;
  margin-bottom: 10upx;
  overflow: hidden;
  word-break: break-all; /* break-all(允许在单词内换行。) */
  text-overflow: ellipsis; /* 超出部分省略号 */
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 3; /** 显示的行数 **/
}
.full_text {
  color: #36649d;
  margin: 5px 0;
}
.u-f {
  display: flex;
  justify-content: space-between;
}
.padding-lr,
.padding {
  padding-left: 0;
}
.padding-rf {
  text {
    padding-right: 2px;
  }
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
.like {
  color: #f00;
}
</style>
