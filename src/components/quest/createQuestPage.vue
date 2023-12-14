<script>
export default {
    data() {
        return {
            questArrLocal: JSON.parse(localStorage.getItem("questArrLocal")) || [],

            questionName: '',
            description: '',
            startTime: '',
            endTime: '',

            questArr: [],

            selectedQuestionType: "radio",
            questionTypes: ["radio", "checkbox", "text"],
        }
    },
    methods: {

        createNewQuest() {
            const newQuestion = {
                questionType: 'radio',
                question: [],
                options: [],
            };
            this.questArr.push(newQuestion);
        },

        createNewOptions(questionIndex) {
            const newOption = {
                text: '',
            }
            this.questArr[questionIndex].options.push(newOption);
        },

        deleteNewQuest(questionIndex) {

            if (this.questArr.length > 1) {
                this.questArr.splice(questionIndex, 1);
            } else {
                alert("至少需要保留一個問題。");
            }
        },
        deleteNewOptions(questionIndex, optionIndex) {
            this.questArr[questionIndex].options.splice(optionIndex, 1);
        },

        saveNewQuestPages() {
            const newQuestionnaire = {
                questionName: this.questionName,
                description: this.description,
                startTime: this.startTime,
                endTime: this.endTime,
                questions: this.questArr,
                userResponse: []   //新增儲存回答區域
            };
            this.questArrLocal.push(newQuestionnaire);
            localStorage.setItem("questArrLocal", JSON.stringify(this.questArrLocal));
            alert("已經成功儲存問卷")
        },

        postToDB() {
            // const newQuestionnaire = {
            //     questionName: this.questionName,
            //     description: this.description,
            //     startTime: this.startTime,
            //     endTime: this.endTime,
            //     // questions: this.questArr,
            //     // userResponse: []   //新增儲存回答區域
            // };

            const newQuestionnaire = {
                hwQuestionnaire: {
                    questionName: this.questionName,
                    description: this.description,
                    startTime: this.startTime,
                    endTime: this.endTime,
                },
                hwQuestionList: [
                    {
                        questionType: "Type A",
                        questionText: "What is your favorite color?"
                    },
                    {
                        questionType: "Type B",
                        questionText: "How often do you exercise?"
                    }
                ],
                hwOptionList: [
                    {
                        optionText: "Red111"
                    },
                    {
                        optionText: "Blue111"
                    },
                    {
                        optionText: "Every day"
                    },
                    {
                        optionText: "Once a week"
                    }
                ]
            };

            // 将对象转换为 JSON 字符串
            const requestBody = JSON.stringify(newQuestionnaire);





            //http://localhost:8080/api/HwQuestionnaire/create
            //http://0.0.31.144/api/HwQuestionnaire/create
            // 发送 POST 请求
            fetch('http://localhost:8080/api/HwQuestionnaire/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newQuestionnaire)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
        }
    }
}
</script>

<template>
    <div class="createQuestPageBody">
        <div class="createQuestHeader">
            <div>
                <h1>新增問卷</h1>
                <label for="">問卷名稱</label>
                <input style="width: 90%;" type="text" name="" id="" v-model="this.questionName">
            </div>
            <div>
                <label for="">描述內容</label>
                <input style="width: 90%;height: 150px;" type="text" name="" id="" v-model="this.description">
            </div>
            <div>
                <label for="">問卷開始時間</label>
                <input type="date" name="" id="" v-model="this.startTime">
                <label for="">問卷結束時間</label>
                <input type="date" name="" id="" v-model="this.endTime">
            </div>
            <div>
                <button v-on:click="createNewQuest()">新增問題</button>
                <button v-on:click="saveNewQuestPages()">儲存本次問卷(舊 local)</button>
                <button v-on:click="postToDB()">Post to DB</button>
            </div>
        </div>

        <div class="createQuest" v-for="(quest, questionIndex) in questArr" :key="questionIndex">
            <!-- 第一個Vfor做出每一個題目 -->
            <label>第{{ questionIndex + 1 }}題</label>
            <select v-model="quest.questionType">
                <option v-for="(type, index) in questionTypes" :key="index" :value="type">{{ type === 'radio' ? '單選' : type
                    === 'checkbox' ? '複選' : '簡答' }}</option>
            </select>
            <input type="text" v-model="quest.question" placeholder="輸入題目">
            <button @click="createNewOptions(questionIndex)">新增選項</button>

            <!-- selected是在input標籤在選擇radio或checkbox時，才會新增selected屬性在該選項上面 
            單選為on 複選為true-->
            <div class="NewOptions" v-for="(option, optionIndex) in quest.options" :key="optionIndex">
                <input v-if="quest.questionType === 'radio'" type="radio" name="radioGroup"
                    v-model="quest.options[optionIndex].selected">
                <input v-if="quest.questionType === 'checkbox'" type="checkbox"
                    v-model="quest.options[optionIndex].selected">
                <input type="text" placeholder="輸入選項" v-model="quest.options[optionIndex].text">
                <button style="background-color: red;" @click="deleteNewOptions(questionIndex, optionIndex)">刪除選項</button>
            </div>

            <button style="margin-left: 43px; background-color: red;"
                v-on:click="deleteNewQuest(questionIndex)">刪除問題</button>
        </div>
    </div>
</template>



<style lang="scss" scoped>
.createQuestPageBody {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f0f0f0;
    padding: 20px;

    .createQuestHeader {
        width: 900px;
        height: auto;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        margin: 20px 0;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;

        div {
            width: 100%;
            margin: 10px 0;
        }

        label {
            font-weight: bold;
            margin-right: 5px;
        }

        input[type="text"],
        input[type="date"] {
            width: 30%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-bottom: 10px;
            margin-right: 5px;
        }

        input[type="date"] {
            height: auto;
        }

        button {
            background-color: #007BFF;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-right: 10px;
        }

        button+button {
            margin-left: 10px;
        }
    }

    .createQuest {
        margin-top: 15px;
        width: 900px;
        border: 1px solid #ccc;
        border-radius: 10px;
        padding: 20px;
        background-color: #fff;

        label {
            font-weight: bold;
        }

        input[type="text"] {
            margin-top: 15px;
            margin-bottom: 15px;
            width: 80%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
            margin-right: 15px;
        }

        input[type="radio"] {
            margin-right: 29px;
        }

        button {
            background-color: #007BFF;
            color: #fff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
</style>
