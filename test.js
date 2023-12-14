// let wet = [];
// // 构建查询字符串
// var queryParams = new URLSearchParams({
//     title: "",
//     start_date: "2023-11-18",  // 请使用实际的日期字符串
//     end_date: "2023-11-20",    // 请使用实际的日期字符串
// });

// // 拼接 URL //axios
// var url = `http://localhost:8080/api/quiz/search?${queryParams.toString()}`;

// // 发送 GET 请求
// fetch(url, {
//     method: 'GET', // GET 是默认方法，这里可省略 post 可能需要包含body
//     headers: {
//         'Content-Type': 'application/json',
//         // 可以根据需要添加其他头部信息
//     },
// })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//         wet = data;
//     })
//     .catch(error => console.error('Error:', error));


/////////

let wet = [];

// 构建请求体数据
const requestData = {
    questionnaire: {
        title: "this666",
        description: "hihi",
        published: false,
        startDate: "2023-11-22",
        endDate: "2023-11-22"
    },
    questionList: [
        {
            quId: 1,
            qTitle: "Q1120 1",
            optionType: "checkbox",
            necessary: true,
            option: "AAA;BBB;CCC"
        },
        {
            quId: 2,
            qTitle: "Q1120 2",
            optionType: "radio",
            necessary: true,
            option: "150;200;250"
        }
    ]
};

// 发送 POST 请求
fetch('http://localhost:8080/api/quiz/create', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
})
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        wet = data;
    })
    .catch(error => console.error('Error:', error));








