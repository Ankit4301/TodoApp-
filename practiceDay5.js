var tasks=[];
let left=document.querySelector("#left");
let right=document.querySelector("#right");
let inputBox=document.querySelector("#inputBox");
let ol=document.createElement("ol");
ol.id="ol-id";
left.appendChild(ol);
ol.style="list-style:none;padding:0;";
right.addEventListener("keydown",(event)=>{
    if(event.key=="Enter"){
        addTask();
    }
});
function addTask(){
    var task={};
    task.name=inputBox.value;
    createTask(task);
    if(localStorage.getItem('toDoKey')){
        tasks=JSON.parse(localStorage.getItem('toDoKey'));
    }       
    tasks.push(task);   
    localStorage.setItem('toDoKey',JSON.stringify(tasks));
}
function createTask(task){
    let li=document.createElement('li');
    let div=document.createElement('div');
    li.appendChild(div);
    ol.appendChild(li);
    let hr=document.createElement("hr")    ;
    hr.style="position:relative;right:40px;width:10000px;color:grey;";
    //div elements
    div.style="display:flex;gap:8px;justify-content:space-between;margin-right:55px;";
    let p1=document.createElement("p");
    p1.style="flex-grow:1;position:relative;top:15px;";
    let chkbox=document.createElement('input');
    chkbox.type="checkbox";
    let p2=document.createElement("p");
    p2.style="font-size:25px;font-weight:800;position:relative;bottom:3px;cursor:pointer;";
    div.append(p1,chkbox,p2);
    li.appendChild(hr);
    p2.innerHTML="x";
    p1.innerHTML=task.name;
    linethrough(chkbox);
    function linethrough(chkbox){
        chkbox.addEventListener('change',function(){
            if(chkbox.checked){
                p1.style.textDecoration="line-through";
            }
            else{
                p1.style.textDecoration="none";
            }
        })
    }
    remove(p2);
    // console.log(tasks.indexOf(p1));
    function remove(p2){
        p2.addEventListener('click',function(){
            li.remove(); 
        })
    }
    inputBox.value="";
}
document.body.onload = function(){
    if(localStorage.getItem('toDoKey')){
        tasks=JSON.parse(localStorage.getItem('toDoKey'));
        tasks.forEach(function(element){
            createTask(element);
        });
    }
}
