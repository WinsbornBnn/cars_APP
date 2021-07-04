<template>
  <view>
    <cu-custom
      bgColor="bg-blue-one"
      :isBack="true"
      :isR="false"
      :isAdd="true"
      :tabNav="tabNav"
    >
      <block slot="content">买卖二手车</block>
    </cu-custom>
    <scroll-view
      scroll-x
      class="bg-white nav fixed"
      :style="[{ top: CustomBar + 'px' }]"
    >
      <view class="flex text-center">
        <view
          class="cu-item flex-sub"
          :class="index == TabCur ? 'text-blue cur' : ''"
          v-for="(item, index) in tabNav"
          :key="index"
          @tap="tabSelect"
          :data-id="index"
        >
          {{ tabNav[index] }}
        </view>
      </view>
    </scroll-view>

    <template v-if="TabCur == 0">
      <view
        class="cu-card dynamic no-card margin-top"
        style="margin-top: 100upx"
      >
        <block v-for="(item, index) in buyCarList" :key="index">
          <detail-list
            @goDetail="goDetail(item)"
            :detailList="item"
            :index="index"
            @DeleteInfo="DeleteInfo"
          ></detail-list>
        </block>
      </view>
      <view v-show="isLoadMore">
        <uni-load-more :status="loadStatus"></uni-load-more>
      </view>
    </template>

    <template v-if="TabCur == 1">
      <view
        class="cu-card dynamic no-card margin-top"
        style="margin-top: 100upx"
      >
        <block v-for="(item, index) in buyCarList" :key="index">
          <detail-list
            @goDetail="goDetail(item)"
            :detailList="item"
            :index="index"
            @DeleteInfo="DeleteInfo"
          ></detail-list>
        </block>
      </view>
      <view v-show="isLoadMore">
        <uni-load-more :status="loadStatus"></uni-load-more>
      </view>
    </template>
  </view>
</template>

<script>
import util from '@/common/util.js';
import {
  ListMoreDataMixin
} from '@/common/public-mixin.js';
import detailList from './component/detail-list.vue'
export default {
  name: 'find-car',
  mixins: [ListMoreDataMixin],
  components: { detailList },
  data () {
    return {
      swiperheight: 500,
      CustomBar: this.CustomBar,
      TabCur: 0,
      tabNav: ['买二手车', '卖二手车'],
      buyCarList: [],
      url: '/publish/release/buylist'
    }
  },
  onLoad () {
    this.FindCarList()
    uni.getSystemInfo({
      success: (res) => {
        const height = res.windowHeight - uni.upx2px(100)
        this.swiperheight = height
      }
    });
  },
  onPullDownRefresh () {
    setTimeout(() => {
      this.pageNo = 1
      this.buyCarList = []
      this.FindCarList()
      uni.stopPullDownRefresh()
    }, 3000);
  },
  //上拉触底函数
  onReachBottom () {
    if (this.buyCarList.length < 10) {
      this.isLoadMore = false
    } else {
      this.isLoadMore = true
      if (this.isLoadMore) {
        this.loadStatus = 'loading'
        setTimeout(() => {
          this.pageNo += 1
          this.FindCarList()
        }, 3000);
      }
    }
  },
  methods: {
    tabChange (e) {
      console.log(e);
      // this.tabIndex = e.detail.current
    },
    DeleteInfo () {
      this.FindCarList()
    },
    // 下拉刷新
    RefreshData () {
      setTimeout(() => {
        this.pageNo = 1
        this.FindCarList()
        uni.stopPullDownRefresh()
      }, 3000);
    },
    tabSelect (e) {
      // 每次切换tabbar是重新请求数据，然而并不能实现数据的缓存，
      // 该如何解决呢
      if (e.currentTarget.dataset.id == 0) {
        this.url = '/publish/release/buylist'
        this.pageNo = 1
        this.buyCarList = []
        this.FindCarList()
      } else {
        this.url = '/publish/release/selllist'
        this.pageNo = 1
        this.buyCarList = []
        this.FindCarList()
      }
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    },
    ViewImage (e) {
      uni.previewImage({
        urls: [e.currentTarget.dataset.url],
        current: e.currentTarget.dataset.url
      });
    }
  }
}
</script>

<style>
.margin-top-xl {
  margin-top: 20upx !important;
}
</style>
