let canvas = document.getElementById('draw');
context = canvas.getContext("2d");

<!--додаємо обробники подій миші-->
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
let brushD = new Array();
let colorD = new Array();
let paint;
let mouseX;
let mouseY;

//розкоментуйте якщо використовуєте layout з практичною
//необхідно отримати додактовий offset
 let offsetLeft = canvas.parentElement.parentElement.offsetLeft;
 let offsetTop  = canvas.parentElement.parentElement.offsetTop;


canvas.addEventListener('mousedown',function (e){
    //mouseX = e.pageX - this.offsetLeft;
    //mouseY = e.pageY - this.offsetTop;
    // версія для нашої розмітки
       mouseX = e.pageX - this.offsetLeft - offsetLeft;
       mouseY = e.pageY - this.offsetTop - offsetTop;
    paint = true;
    addClick(mouseX, mouseY);
    redraw();
});
canvas.addEventListener('mousemove',function (e){
    if(paint){
      //  addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        //  /*версія для нашої розмітки*/
               addClick(e.pageX - this.offsetLeft - offsetLeft, e.pageY - this.offsetTop - offsetTop, true);

        redraw();
    }
});
canvas.addEventListener('mouseup',function (e){
    paint = false;
});
canvas.addEventListener('mouseleave',function (e){
    paint = false;
});

//Малювання:

    function addClick(x, y, dragging) {
        clickX.push(x);
        clickY.push(y);
        clickDrag.push(dragging);
        brushD.push(0);
        colorD.push(0);
    }
    function clearRect(){
        context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
        while(clickX.length > 0){
            clickX.length--;
            clickY.length--;
            clickDrag.length--
            brushD.length--;
            colorD.length--;
            clickX.pop();
            clickY.pop();
            clickDrag.pop();
            brushD.pop();
            colorD.pop();
        }
    }

function redraw(){
    context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    //context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    let brushW = document.getElementsByName("mybrush");
    let brushC;
    for (let i = 0; i < brushW.length; i++) {
        if (brushW[i].checked) {
            brushC = brushW[i].value;
            break;
        }
    }
    let colorS =  document.getElementById("mycolor");
    let colorC = colorS.value;
    for(var i=0; i < clickX.length; i++) {
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i] - 1, clickY[i]);
        }
        if(brushD[i] == 0) {
            context.lineWidth = brushC;
            brushD[i] = brushC;
        }
        else context.lineWidth = brushD[i];
        if(colorD[i] == 0) {
            context.strokeStyle = colorC;
            colorD[i] = colorC;
        }
        else context.strokeStyle = colorD[i];

        context.lineTo(clickX[i], clickY[i]);
        context.stroke();
        context.closePath();
    }
}
