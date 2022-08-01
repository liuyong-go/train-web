<template>
<Layout>
  <template v-slot:main >
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 100px;">
        <el-form
              inline="true"
              ref="searchForm"
              status-icon>
         <el-form-item label="起始站"  >
          <el-select v-model="startSite"  value-key="site_id">
            <el-option
                v-for="item in options"
                :key="item.site_id"
                :label="item.site_name"
                :value="item">
              </el-option>
            </el-select>
           </el-form-item>
          <el-form-item label="到达站" >
           <el-select v-model="endSite"   value-key="site_id">
            <el-option
              v-for="item in options"
              :key="item.site_id"
              :label="item.site_name"
              :value="item">
            </el-option>
          </el-select>
           </el-form-item>
          <el-form-item label="日期" >
           <el-select v-model="chooseDate" >
            <el-option
              v-for="item in dates"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
           </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitSearch">查询车票</el-button>
          </el-form-item>
         </el-form>
    </div>

    <div>
      <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="train_name"
      label="车次"
      >
    </el-table-column>
    <el-table-column
      prop="start_name"
      label="起始站/时间"
      >
    </el-table-column>
    <el-table-column
      prop="end_name"
      label="到达站/时间"
    >
    </el-table-column>
    <el-table-column
      prop="seat_business_left"
      label="商务座"
      >
    </el-table-column>
    <el-table-column
      prop="seat_first_left"
      label="一等座"
    >
    </el-table-column>
    <el-table-column
      prop="seat_second_left"
      label="二等座"
    >
    </el-table-column>
    <el-table-column>
      <template v-slot="scope">
        <el-button
          size="mini"
          @click="buyticket(scope.row)">抢票</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>


  </template>

</Layout>
</template>

<script>
// @ is an alias to /src
import { ElMessage } from 'element-plus'
import Layout from "../views/Layout.vue";
export default {
  name: 'TrainHome',
  components: {
    Layout
  },
  data() {
      return {
        startSite:{
          site_id: 1,
          site_name: '北京西'
        },
        endSite:{
          site_id: 2,
          site_name: '石家庄'
        },
        chooseDate:this.getNext15Days()[0],
        options: [{
          site_id: 1,
          site_name: '北京西'
        }, {
          site_id: 2,
          site_name: '石家庄'
        }, {
          site_id: 3,
          site_name: '郑州东'
        }, {
          site_id: 4,
          site_name: '南阳东'
        }, {
          site_id: 5,
          site_name: '襄阳东'
        },{
          site_id: 6,
          site_name: '重庆北'
        },{
          site_id: 7,
          site_name: '保定东'
        },{
          site_id: 8,
          site_name: '邯郸东'
        },{
          site_id: 9,
          site_name: '安阳东'
        },{
          site_id: 10,
          site_name: '鹤壁东'
        }
        ],
        dates:this.getNext15Days(),
        tableData: []
      }
    },
    methods:{
        submitSearch(){
          const apicall = require('../assets/js/apicall').default
          const formData = new FormData();
          formData.append("startSiteID",this.startSite.site_id)
          formData.append("endSiteID",this.endSite.site_id)
          formData.append("chooseDate",this.chooseDate)
          apicall.fetch('/search',apicall.POST,formData,{},true)
          .then((res) => {
              if (res.train_list.length) {
                res.train_list.forEach((item) => {
                  item.start_name = item.start_name + '/'+item.start_time
                  item.end_name = item.end_name + '/'+item.end_time
                  this.tableData.push(item)
                })
              }   
          })
          .catch((err) => {
              console.log("err",err)
              ElMessage({
                  showClose: true,
                  message: err,
                  type: 'sucess',
              })
          });
        },
         getNext15Days() {
            let dates = []
            for (var i=0;i<15;i++){
              var dd = new Date();
              dd.setDate(dd.getDate() + (+i));//获取p_count天后的日期
              var y = dd.getFullYear();
              var m = dd.getMonth() + 1;//获取当前月份的日期
              if (m < 10) {
                  m = '0' + m;
              }
              var d = dd.getDate();
              if (d < 10) {
                  d = '0' + d;
              }
              dates.push(y + "-" + m + "-" + d)
            }
            return dates
            
        },
        buyticket(data){
          console.log(data)
        }
    }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>