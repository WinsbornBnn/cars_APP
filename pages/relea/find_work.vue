<template>
  <view>
    <cu-custom
      bgColor="bg-blue-one"
      :isBack="true"
      :isR="false"
      :isAdd="true"
      :tabNav="tabNav"
    >
      <block slot="content">求职招聘</block>
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
        <block v-for="(item, index) in findWorkList" :key="index">
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
        <block v-for="(item, index) in findWorkList" :key="index">
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
  </view>
</template>

<script>
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
      tabNav: ['求职信息', '招聘信息'],
      findWorkList: [],
      url: '/publish/release/joblist'
    }
  },
  onLoad () {
    this.FindWorkList()
  },
  onPullDownRefresh () {
    setTimeout(() => {
      this.pageNo = 1
      this.findWorkList = []
      this.FindWorkList()
      uni.stopPullDownRefresh()
    }, 3000);
  },
  //上拉触底函数
  onReachBottom () {
    if (this.findWorkList.length < 10) {
      this.isLoadMore = false
    } else {
      this.isLoadMore = true
      if (this.isLoadMore) {
        this.loadStatus = 'loading'
        setTimeout(() => {
          this.pageNo += 1
          this.FindWorkList()
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
        this.url = '/publish/release/joblist'
        this.pageNo = 1
        this.findWorkList = []
        this.FindWorkList()
      } else {
        this.url = '/publish/release/recruitlist'
        this.pageNo = 1
        this.findWorkList = []
        this.FindWorkList()
      }
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    }
  }
}
</script>

<style>
.margin-top-xl {
  margin-top: 20upx !important;
}
</style>
