var inputText =document.querySelector('.inputText');
var addBtn = document.querySelector('.addBtn');
var deleteAllBtn =document.querySelector('.deleteAllBtn');
var recoverBtn =document.querySelector('.recoverBtn');
var todoList =document.querySelector('.todoList');

var dataList = JSON.parse(localStorage.getItem('data')) ||[];
var recoverData =JSON.parse(localStorage.getItem('recoverData')) ||[];
//監聽
todoList.addEventListener('click',deleteAndEdit);
addBtn.addEventListener('click',addData);
deleteAllBtn.addEventListener('click',deleteAll);
recoverBtn.addEventListener('click',recover)
inputText.addEventListener('keypress',keyboardIn);


updateView(dataList);

function keyboardIn(e){
    console.log(e);
    if(e.code === 'Enter' ||e.code === 'NumpadEnter'){
        addData();
    }
}

//新增一筆紀錄
function addData(){
    if((inputText.value).trim() != ''){
        dataList.push(inputText.value);
        inputText.value = '';
        updateView(dataList);
    }
}


//更新畫面 + 儲存紀錄
function updateView(dataList){
    var str='';
    for(var i=0 ; i<dataList.length;i++)
    {
        str +='<li><input data-num='+i+' type="text" value='+dataList[i]+'><button data-num='+i+' class="deleteBtn"><i class="fas fa-eraser"></i></button></li>';    
    }
    todoList.innerHTML=str;
    saveLocalStroage(dataList);
}

function saveLocalStroage(data){
    localStorage.setItem('data',JSON.stringify(data));
}

function saveRecoverData(data){
    
    localStorage.setItem('recoverData',JSON.stringify(data));
}

//刪除所有紀錄
function deleteAll(){
    if(dataList[0]==null){
        return;
    }
    var deleteData =dataList.splice(0,dataList.length)
    recoverData = recoverData.concat(deleteData);//合併array
    saveRecoverData(recoverData);
    updateView(dataList);
}

//刪除 or 編輯一筆紀錄
function deleteAndEdit(e){
    if(e.target.nodeName=='BUTTON' ||e.target.nodeName=='I'){
        var  num= e.target.dataset.num;
        var deleteData =dataList.splice(num,1);//刪除資料，並把刪掉的資料存起來
        recoverData = recoverData.concat(deleteData);//合併array
        saveRecoverData(recoverData);
        updateView(dataList);
    }
    if(e.target.nodeName=='INPUT'){
        e.target.addEventListener('blur',edit);
    }
}

function edit(e){
    var num =e.target.dataset.num;
    dataList.splice(num,1,e.target.value)
    e.target.removeEventListener('blur',edit);
    updateView(dataList);
}

function recover(){
    if(recoverData[0]==null){
        return;
    }
    var lastIndex =recoverData.length-1;
    var lastData =recoverData[lastIndex];
    recoverData.splice(lastIndex,1)
    saveRecoverData(recoverData);
    dataList.push(lastData);
    saveLocalStroage(dataList);
    updateView(dataList);
}