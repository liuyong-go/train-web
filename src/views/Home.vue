<template>
<Layout>
  <template v-slot:main >
    <div style="display: flex; justify-content: center; align-items: center; margin-top: 100px;">
      <el-card class="box-card">
        <template v-slot:header>
          <div style="text-align:center">
              <span >车票查询</span>
          </div>
        
        </template>
        <el-form
              ref="searchForm"
              status-icon
              label-width="120px"
              style="width: 400px;"
          >
         <el-form-item label="起始站" prop="start" >
          <el-select v-model="startSite"  value-key="site_id">
            <el-option
                v-for="item in options"
                :key="item.site_id"
                :label="item.site_name"
                :value="item">
              </el-option>
            </el-select>
           </el-form-item>
          <el-form-item label="到达站" prop="arrive">
           <el-select v-model="endSite"   value-key="site_id">
            <el-option
              v-for="item in options"
              :key="item.site_id"
              :label="item.site_name"
              :value="item">
            </el-option>
          </el-select>
           </el-form-item>
          <el-form-item label="日期" prop="arrive" >
           <el-select v-model="chooseDate" >
            <el-option
              v-for="item in dates"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
           </el-form-item>
         </el-form>
        <div style="margin:50px 20px ;display: flex; justify-content: center; align-items: center;">
          <el-button type="primary" round  @click="submitSearch()">查询车票</el-button>
        </div>
      </el-card>
    </div>


  </template>

</Layout>
</template>

<script>
// @ is an alias to /src
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
        dates:this.getNext15Days()
      }
    },
    methods:{
        submitSearch(){
          console.log(this.chooseDate)
          console.log(this.startSite)
          console.log(this.endSite)
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