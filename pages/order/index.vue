<template name="dw">
	<view>
		<cu-custom bgColor="bg-blue-one" :isBack="false" :isR="false">
			<block slot="content">全部订单数量</block>
		</cu-custom>
		<view class="page-body">
			<view class="cu-bar search bg-white fixed" :style="[{top:CustomBar + 'px'}]">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text"
						placeholder="请输入客户名称或者工厂名称" confirm-type="search" v-model="inputValue"></input>
				</view>
				<view class="action">
					<button class="cu-btn bg-blue-one shadow-blur round" @click="Search">搜索</button>
				</view>
			</view>

			<view class="padding">
				<view @click="goDetails(item)" v-for=" (item,index) in orderList" :key="index"
					class="radius shadow shadow-lg orader margin-top-xl first-child"
          :style="[{ width:item.factoryname.length + item.customername.length <= 10 ? 310 + 'px' : 330 + 'px' }]"
          >
					<view class="flex">
						<view class="flex-treble margin-xs radius text-lg padding-sx">
							{{item.factoryname}} <text class="cuIcon-forwardfill text-grey"
								style="padding-left:10px ;padding-right:10px ;"></text>{{item.customername}}
						</view>
						<view class="flex-sub  margin-xs radius padding-sx">
							<view class='cu-tag round bg-blue light'>{{item.orderstatus == 0? '已完成':'运输中'}}</view>
						</view>
					</view>
					<view>
						<view class="cu-item padding-or">
							<view class="content">
								<text class="cuIcon-deliver_fill text-grey"></text>
								<text class="text-grey">运单号：{{item.id}}</text>
							</view>
						</view>
					</view>

					<view class="cu-list menu margin-top-xl">
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">车牌号</text>
							</view>
							<view class="action">
								<text class="text-black">{{item.carno}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">公司</text>
							</view>
							<view class="action">
								<text class="text-black">{{item.factoryname}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey  text-sm">装车时间</text>
							</view>
							<view class="action">
								<text class="text-black">{{item.ordertime}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">出厂时间</text>
							</view>
							<view class="action">
								<text class="text-black">{{item.createTime}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">完成时间</text>
							</view>
							<view class="action">
								<text class="text-black">{{item. finishtime}}</text>
							</view>
						</view>
						<view class="cu-item">
							<view class="content">
								<text class="text-grey text-sm">规格</text>
							</view>
							<view class="action">
								<text class="text-black">{{item.goodsname}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-if="isLoadMore">
				<uni-load-more :status="loadStatus"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
import util from '@/common/util.js';
import {
  ListMoreDataMixin
} from '@/common/public-mixin.js'
import tabItemTap from '@/common/tabItemTap.js'
export default {
  mixins: [ListMoreDataMixin, tabItemTap],
  data () {
    return {
      CustomBar: this.CustomBar,
      InputBottom: '',
      orderList: [],
      inputValue: ''
    }
  },
  onShow () {
    var account_type = util.readUserData().accountType
    if (account_type === '2') {
      uni.setTabBarItem({
        index: 1,
        pagePath: "/pages/order/all_list",
        text: "订单",
        iconPath: "/static/drawable-xxhdpi/dw.png",
        selectedIconPath: "/static/drawable-xxhdpi/dw_cur.png"
      })
    } else if (account_type === '1') {
      uni.setTabBarItem({
        index: 1,
        pagePath: "/pages/order/index",
        text: "订单",
        iconPath: "/static/drawable-xxhdpi/dw.png",
        selectedIconPath: "/static/drawable-xxhdpi/dw_cur.png"
      })
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.pageNo = 1
        this.getOrderList()
        uni.stopPullDownRefresh()
      }, 3000);
    },
    goDetails (item) {
      uni.navigateTo({
        url: '/pages/order/detail',
        success: function (res) {
          uni.$emit("test", item);
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
  onPullDownRefresh () {
    setTimeout(() => {
      this.pageNo = 1
      this.orderList = []
      this.getOrderList()
      uni.stopPullDownRefresh()
    }, 3000);
  },
  //上拉触底函数
  onReachBottom () {
    if (this.orderList.length < 10) {
      this.isLoadMore = false
    } else {
      this.isLoadMore = true
      if (this.isLoadMore) {
        this.loadStatus = 'loading'
        setTimeout(() => {
          this.pageNo += 1
          this.getOrderList()
        }, 3000);
      }
    }
  },
  mounted () {
    if (this.orderList.length <= 0) {
      this.getOrderList();
    } else {
      console.log('我有数据了');
    }
  }
}
</script>

<style lang="less">
.padding {
  .first-child {
    &:first-child {
      margin-top: 100upx;
    }
  }
}

.page {
  height: 100vh;
}

.orader {
  background-image: url(../../static/drawable-xxhdpi/order_bg.png);
  background-size: 100% 100%;
  min-height: 680upx;
}

.padding-sx {
  padding-left: 14px;
  padding-top: 14px;
}

.padding-or {
  padding-left: 18px;
  padding-top: 6px;
}

.cu-list.menu > .cu-item {
  min-height: 30px !important;
  background-color: transparent !important;
}

.cu-list.menu-avatar > .cu-item:after,
.cu-list.menu > .cu-item:after {
  position: absolute;
  top: 0;
  left: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 200%;
  height: 200%;
  border-bottom: 0px solid #ddd;
  -webkit-border-radius: inherit;
  border-radius: inherit;
  content: ' ';
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  pointer-events: none;
}
</style>
