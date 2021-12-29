var xhReq = new XMLHttpRequest();
xhReq.open("GET", "http://localhost:8080/pontuacao/bateria/17", false);
xhReq.send(null);
var date = JSON.parse(xhReq.responseText); 
var data = date.surfista
console.log(data[0])


var bateria;
var timerId;
var updateInterval=2000;



function ascending(a, b) { return a.resultado > b.resultado ? 1 : -1; }
function descending(a, b) { return a.resultado < b.resultado ? 1 : -1; }

function reposicao() {
    var height = $("#bateria .bat").height();
    var y = height+220;
    for(var i = 0; i < bateria.length; i++) {
        bateria[i].$item.css("top", y + "px");
        y += height;			
    }
}

function atualizarRanks(bateria) {
    for(var i = 0; i < bateria.length; i++) {
        bateria[i].$item.find(".rank").text(i + 1);	
        
    }
}


function recuperarResultado(data, atributo ,name){
    for(var x in data){
        if((data[x].nome == name) == true) {
            return data[x][atributo];
        }
    }
    return null;
}

function getNewData(){
    var newReq = new XMLHttpRequest();
    xhReq.open("GET", "http://localhost:8080/pontuacao/bateria/17", false);
    xhReq.send(null);
    var newdate = JSON.parse(xhReq.responseText); 
    var newData = newdate.surfista
    bit = [];

    console.log(dadoAlterado(newData,data));
    /*console.log(data);
    console.log(newData);*/
    
    
    if(dadoAlterado(newData,data)){
        for(var i=0;i<bateria.length;i++){
        
        var bat = bateria[i];
        //bat.resultado += getRandomScoreIncrease();
        bat.resultado = recuperarResultado(newData, 'resultado', bat.nome);
        bat.$item.find(".resultado").text(bat.resultado);
        bit.push(bat);
        }
        bit.sort(descending);
        //console.log(bit);
        //console.log(bateria);
        if(bit !== bateria){
            bateria.sort(descending);
            //console.log("Passou por aqui");
        }
        atualizarRanks(bateria);
        reposicao();
        data = newData;

        //console.log("im refresh")
    }
}

function resetarTabela(){
    var $list = $("#bateria")
    $list.find(".bat").remove();
    if(timerId !== undefined){
        clearInterval(timerId);
    }

    bateria = [];
    for(let i=0; i<4; i++){
        bateria.push({
            nome:data[i].nome,
            corLycra:data[i].corLycra,
            resultado:data[i].resultado,
        })
    }

    for(var i=0; i<bateria.length;i++){
        var $item = $(
            "<tr class='bat'>" + 
                "<th class='rank'>" + (i + 1) + "</th>" + 
                "<td class='nome'>" + bateria[i].nome + "</td>" + 
                "<td class='corLycra'>" + bateria[i].corLycra + "</td>" + 
                "<td class='resultado'>" + bateria[i].resultado + "</td>" + 
            "</tr>"
        );
        
        bateria[i].$item = $item;
        $list.append($item);
    
    }
    bateria.sort(descending);
    atualizarRanks(bateria);
    reposicao();
    

    timerId = setInterval("getNewData();", updateInterval);
}
resetarTabela();
var bit = [];

function dadoAlterado(newdata, data){
    for(var x =0; x<data.length;x++){
        if(newdata[x].nome === data[x].nome && newdata[x].resultado === data[x].resultado){
            
        }else{
            console.log("passou aqui")
            return true;
            
        }
        
    }
    return false;
}
