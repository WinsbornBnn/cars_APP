<template>
  <view>
    <cu-custom bgColor="bg-blue-one" :isBack="true" :isR="false">
      <block slot="content">厂区公告</block>
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
      <view style="margin-top: 50px">
        <!-- 带图标 -->
        <uni-collapse accordion="true">
          <block v-for="(item, index) in LineUpInfoList" :key="index">
            <uni-collapse-item :title="item.name" num="3">
              <view class="margin-bottom-sm">
                <view class="cu-list menu">
                  <view
                    class="cu-item"
                    v-for="(item1, index1) in item.list"
                    :key="index1"
                  >
                    <view class="content">
                      <text class="text-grey margin-left text-bold">{{
                        item1.carno
                      }}</text>
                    </view>
                    <view class="action">
                      <text class="text-grey text-sm">{{
                        item1.ordertime
                      }}</text>
                    </view>
                  </view>
                </view>
              </view>
            </uni-collapse-item>
          </block>
        </uni-collapse>
      </view>
      <view v-show="isLoadMore">
        <uni-load-more :status="loadStatus"></uni-load-more>
      </view>
    </template>

    <template v-if="TabCur == 1">
      <view style="margin-top: 50px">
        <block v-for="(item, index) in annountCementList" :key="index">
          <view class="margin-top-sm">
            <view class="text-center">
              <text>{{ item.sendTime }}</text>
            </view>

            <view class="cu-list menu">
              <view class="cu-item margin-top-sm">
                <view class="content padding-tb-sm">
                  <view class="text-black text-xl padding-bottom-xs">
                    <template v-if="item.sendStatus === '1' ? isRead : !isRead">
                      <text class="cuIcon-title text-orange"></text>
                    </template>
                    {{ item.titile }}
                  </view>
                  <view class="text-gray text-l"> {{ item.msgAbstract }}</view>
                </view>
              </view>
              <view
                class="cu-item arrow"
                @tap="showModal(item)"
                data-target="Image"
              >
                <view class="content">
                  <text class="text-grey">查看详情</text>
                </view>
              </view>
            </view>
          </view>
        </block>

        <view class="cu-modal" :class="modalName == 'Image' ? 'show' : ''">
          <view class="cu-dialog">
            <view
              style="
                background-image: url('../../static/drawable-xxhdpi/msg_bg.png');
                height: 400px;
                background-size: 100% 100%;
              "
            >
              <view class="cu-bar justify-end text-white">
                <view class="action" @tap="hideModal">
                  <text class="cuIcon-close"></text>
                </view>
              </view>
              <view style="margin-top: 80px">
                <view class="text-center">
                  <view class="text-xl text-blue">{{
                    annountItem.titile
                  }}</view>
                  <view class="text-sm text-gray">{{
                    annountItem.sendTime
                  }}</view>
                </view>
                <view class="padding">
                  <rich-text :nodes="annountItem.msgContent"></rich-text>
                </view>
              </view>
            </view>
            <view class="cu-bar bg-blue-one">
              <view class="action margin-0 flex-sub solid-left" @tap="hideModal"
                >我知道了</view
              >
            </view>
          </view>
        </view>
      </view>
      <!-- 上拉加载更多 -->
      <view v-show="isLoadMore">
        <uni-load-more :status="loadStatus"></uni-load-more>
      </view>
    </template>
  </view>
</template>

<script>
import {
  ListMoreDataMixin
} from '@/common/public-mixin';
import util from '@/common/util.js';
export default {
  mixins: [ListMoreDataMixin],
  data () {
    return {
      CustomBar: this.CustomBar,
      TabCur: 0,
      tabNav: ['车辆排队', '公告查看'],
      modalName: '',
      annountCementList: [],
      LineUpInfoList: [],
      annountItem: {},
      isRead: true
    }
  },
  onLoad (option) {
    if (option.tab === '0') {
      this.getCarLineUpInfo()
    } else {
      this.FindAnnountCementList()
    }
    this.TabCur = option.tab
  },
  onShow () {
  },
  // 下拉刷新
  onPullDownRefresh () {
    setTimeout(() => {
      this.pageNo = 1
      this.annountCementList = []
      this.FindAnnountCementList()
      uni.stopPullDownRefresh()
    }, 3000);
  },
  //上拉触底函数
  onReachBottom () {
    if (this.annountCementList.length < 10) {
      this.isLoadMore = false
    } else {
      this.isLoadMore = true
      if (this.isLoadMore) {
        this.loadStatus = 'loading'
        setTimeout(() => {
          this.pageNo += 1
          this.FindAnnountCementList()
        }, 3000);
      }
    }
  },
  methods: {
    tabSelect (e) {
      if (e.currentTarget.dataset.id == 0) {
        // this.url = '/publish/release/buylist'
        // this.pageNo = 1
        this.LineUpInfoList = []
        this.getCarLineUpInfo()
      } else {
        this.url = '/sys/annountCement/list'
        this.pageNo = 1
        this.annountCementList = []
        this.FindAnnountCementList()
      }
      this.TabCur = e.currentTarget.dataset.id;
      this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
    },
    showModal (item) {
      this.modalName = "Image";//e.currentTarget.dataset.target
      this.annountItem = Object.assign(item)
      // this.isRead = !this.isRead
    },
    hideModal (e) {
      this.modalName = null
    }
  }
}
</script>

<style>
.cu-dialog {
  background-color: transparent;
}
</style>
