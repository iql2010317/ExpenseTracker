<script>
import axios from 'axios'; // 這樣引入axios庫
export default {
    data() {
        return {
            questArrLocal: JSON.parse(localStorage.getItem("questArrLocal")) || [],
            
        };
    },
    methods: {
        
    }
};
</script>

<template>
    <div class="questHomeBody">
        <div class="searchList">
            <div class="searchListTop">
                <label>問卷標題(列表頁)</label>
                <input type="search">
            </div>
            <div class="searchListDown">
                <label for="">開始/結束</label>
                <input class="searchStartTime" type="date">
                <input class="searchEndTime" type="date">
                <button class="searchButton">搜尋</button>
                <button><a href="/questHome/createQuestPage">新增問卷</a></button>
            </div>
        </div>
        <div class="showList">
            <table>
                <thead>
                    <tr>
                        <th>＃</th>
                        <th>問卷</th>
                        <th>狀態</th>
                        <th>開始時間</th>
                        <th>結束時間</th>
                        <th>觀看統計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(quest, index) in questArrLocal" :key="index">
                        <td>{{ index + 1 }}</td>
                        <td><router-link :to="'/questHome/doQuestPage/' + index">{{ quest.questionName
                        }}</router-link></td>
                        <td>狀態</td>
                        <td>{{ quest.startTime }}</td>
                        <td>{{ quest.endTime }}</td>
                        <td><router-link :to="'/questHome/showDetailPage'">觀看統計</router-link></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="showPages">
            預計放分頁顯示位置
        </div>
    </div>
</template>

<style lang="scss" scoped>
.questHomeBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    /* 设置背景颜色 */

    .searchList {
        margin-top: 15px;
        width: 900px;
        height: auto;
        /* 自适应内容高度 */
        border: 1px solid #ccc;
        padding: 15px;
        border-radius: 10px;
        /* 圆角边框 */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .searchListTop {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 15px;
        }

        .searchListDown {
            width: 100%;
            display: flex;
            justify-content: space-between;
        }

        label,
        input,
        button,
        a {
            margin: 5px;
            /* 添加一些间距 */
        }
    }

    .showList {
        margin-top: 15px;
        width: 900px;
        height: 450px;
        max-height: 400px;
        /* 设置最大高度以防止表格过长 */
        border: 1px solid #ccc;
        border-radius: 10px;
        /* 圆角边框 */
        overflow: auto;
        /* 添加滚动条，以防表格内容过长 */
        background-color: #fff;
        /* 设置白色背景 */

        table {
            width: 100%;
            border-collapse: collapse;
            border-spacing: 0;
            /* 移除表格间距 */
        }

        th,
        td {
            border: 1px solid #ccc;
            padding: 10px;
            text-align: center;
        }

        th {
            background-color: #f0f0f0;
            /* 表头背景颜色 */
        }

        tr:nth-child(even) {
            background-color: #f9f9f9;
            /* 隔行背景颜色 */
        }
    }

    .showPages {
        margin-top: 15px;
        width: 900px;
        height: 60px;
        border: 1px solid #ccc;
        border-radius: 10px;
        /* 圆角边框 */
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
        /* 设置背景颜色 */
    }
}</style>
