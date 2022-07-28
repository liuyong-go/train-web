<template>
  <div class="login-title">火车票售票系统</div>
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
        }
    }
}
</script>