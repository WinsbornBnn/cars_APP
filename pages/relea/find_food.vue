<template>
  <view>
    <cu-custom
      bgColor="bg-blue-one"
      :isBack="true"
      :isR="false"
      :isAdd="true"
      :tabNav="tabNav"
    >
      <block slot="content">找车找货</block>
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
        <block v-for="(item, index) in findFoodList" :key="index">
          <detail-list
            @goDetail="goDetail(item)"
            :detailList="item"
            :index="index"
            @DeleteInfo="DeleteInfo"
          ></detail-list>
        </block>
      </view>
      <view v-show="isLoadMore">
        <uni-load-more class="margin-top" :status="loadStatus"></uni-load-more>
      </view>
    </template>

    <template v-if="TabCur == 1">
      <view
        class="cu-card dynamic no-card margin-top"
        style="margin-top: 100upx"
      >
        <block v-for="(item, index) in findFoodList" :key="index">
          <detail-list
            @goDetail="goDetail(item)"
            :detailList="item"
            :index="index"
            @DeleteInfo="DeleteInfo"
          ></detail-list>
        </block>
      </view>
      <view v-show="isLoadMore">
        <uni-load-more class="margin-top":status="loadStatus"></uni-load-more>
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
  mixins: [ListMoreDataMixin],
  components: { detailList },
  data () {
    return {
      CustomBar: this.CustomBar,
      TabCur: 0,
      tabNav: ['找车', '找货'],
      findFoodList: [],
      url: '/publish/release/looklist'
    }
  },
  onLoad () {
    this.FindFoodList()
  },
  onPullDownRefresh () {
    setTimeout(() => {
      this.pageNo = 1
      this.findFoodList = []
      this.FindFoodList()
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
          this.FindFoodList()
        }, 3000);
      }
    }
  },
  methods: {
    DeleteInfo () {
      this.FindCarList()
    },
    tabSelect (e) {
      if (e.currentTarget.dataset.id == 0) {
        this.url = '/publish/release/looklist'
        this.pageNo = 1
        this.findFoodList = []
        this.FindFoodList()
      } else {
        this.url = '/publish/release/goodslist'
        this.pageNo = 1
        this.findFoodList = []
        this.FindFoodList()
      }
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    },
  }
}
</script>

<style>
.margin-top-xl {
  margin-top: 20upx !important;
}
</style>
