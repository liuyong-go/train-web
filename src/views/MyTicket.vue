<template>
    <Layout>
         <template v-slot:main >
      <el-table
    :data="tickets"
    stripe
    style="width: 100%">
    <el-table-column
      prop="username"
      label="乘客"
      >
    </el-table-column>
    <el-table-column
      prop="train_name"
      label="车次"
      >
    </el-table-column>
    <el-table-column
      prop="from_site_name"
      label="起始站"
      >
    </el-table-column>
    <el-table-column
      prop="to_site_name"
      label="到达站"
    >
    </el-table-column>
    <el-table-column
      prop="seat"
      label="座位"
      >
    </el-table-column>
    <el-table-column
      prop="depart_date"
      label="出发时间"
    >
    </el-table-column>
  </el-table>
  </template>
    </Layout>
</template>


<script>
// @ is an alias to /src
import { ElMessage } from 'element-plus'
import Layout from "../views/Layout.vue";
export default {
  name: 'MyTicket',
  components: {
    Layout
  },
  
  data() {
      return {
        tickets:[]
      }
    },
    created() {
        this.ticketList()
    },
    methods:{
       ticketList(){
            const apicall = require('../assets/js/apicall').default
            apicall.fetch('/my-tickets',apicall.GET,{},{},true)
            .then((res) => {
                if (res.ticket_list.length) {
                    this.tickets = []
                    res.ticket_list.forEach((item) => {
                    this.tickets.push(item)
                    })
                }   
            })
            .catch((err) => {
                ElMessage({
                    showClose: true,
                    message: err,
                    type: 'sucess',
                })
            });
       }
    }
}
</script>
<style>
  .text {
    font-size: 14px;
  }

</style>