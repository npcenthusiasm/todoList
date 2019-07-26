var inputText =document.querySelector('.inputText');
var addBtn = document.querySelector('.addBtn');
var deleteAllBtn =document.querySelector('.deleteAllBtn');
var todoList =document.querySelector('.todoList');
var dataList = JSON.parse(localStorage.getItem('data')) ||[];

update(dataList);


//add
addBtn.addEventListener('click',addData);
function addData(){
    if(inputText.value != ''){
        dataList.push(inputText.value);
    }
    //console.log();  
    update(dataList);
}

function saveLocalStroage(data){
    str = JSON.stringify(data);
    localStorage.setItem('data',str);
}
function readLocalStroage(){
    str = JSON.parse(data);
    dataList =localStorage.getItem('data');
    update(dataList);
}

//update
function update(dataList){
    str='';
    for(var i=0 ; i<dataList.length;i++)
    {
        str +='<li data-num='+i+'>'+dataList[i]+'<button>刪除</button></li>';
        
    }
    todoList.innerHTML=str;
    saveLocalStroage(dataList);
}

//deleteAll
deleteAllBtn.addEventListener('click',deleteAll);
function deleteAll(dataList){
    str='';
    todoList.innerHTML=str;
    
}
