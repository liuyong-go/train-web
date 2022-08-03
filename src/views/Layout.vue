<template>

<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" >
<el-menu-item :index="main" class="login-title" disabled=true ><span style="font-weight:bold; color:#000; font-size:20px">火车票售票系统</span></el-menu-item>
<el-menu-item @click="deliveryRouter('TrainHome')" index="/">购票</el-menu-item>
<el-menu-item @click="deliveryRouter('MyTicket')" index="/myticket" >我的车票</el-menu-item>
</el-menu>

  <!-- <div class="login-title">火车票售票系统</div> -->
    <el-container style="height: 100%;">
        <el-main>
            <slot name="main"></slot>
        </el-main>
        <el-footer height="40px" style="color: #909399; text-align: center;">©2022 liuyong 火车票售票系统</el-footer>
    </el-container>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from 'element-plus'
export default {
    name: 'TrainLayout',
    setup() {
        const router = useRouter();
        const route = useRoute();
        console.log("path",route.path)
        return {
            
            routes: router.getRoutes().filter(value => value.name != 'Login' && value.name != 'Logout'),
            activeIndex: route.path,
        }
    },
    computed: {
        username() {
            return this.$store.state.username || ''
        }
    },
    methods: {
        logoff() {
            ElMessage({
                showClose: true,
                message: `用户 ${this.$store.state.username} 注销成功!`,
                type: 'success',
            })
            this.$store.commit('logoff')
            this.$router.replace({ name: 'Login' })
        },
        deliveryRouter(route){
             this.$router.replace({ name: route })
        }
    }
}
</script>