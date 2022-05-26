var ss = SpreadsheetApp.getActive();
var timeZone = ss.getSpreadsheetTimeZone();
var timestamp4id = Utilities.formatDate(new Date(), timeZone, "dd-MM-yyyy-HH-mm-ss");
let sheet = ss.getSheetByName("sessions");



function doPost(e){
  
  let paraOneVal = false;
  let basicGetResponse = false;

  paraOneVal =  e.parameters.paraOne;
  paraOneVal = paraOneVal.toString();

  if(paraOneVal==="first"){


  basicGetResponse = makeCaptchaObj();
  

  }else if(paraOneVal==="second"){

    basicGetResponse = JSON.parse(e.postData.contents);

    basicGetResponse = checkAnswer(basicGetResponse);
       
  }else{

    
  }
    
   
    
 basicGetResponse = JSON.stringify(basicGetResponse);
    basicGetResponse = ContentService.createTextOutput(basicGetResponse).setMimeType(ContentService.MimeType.JAVASCRIPT);
   return  basicGetResponse;

}

function makeCaptchaObj(){
  let captchaObj = {}
  captchaObj["num1"] = Math.floor(Math.random() * (5 - 1) + 1);
  captchaObj["num2"] = Math.floor(Math.random() * (5 - 1) + 1);
  captchaObj["symbol"] = Math.floor(Math.random() * (1 - 0) + 0);
  captchaObj["ans"] = "0";
  captchaObj["ghh"] = startSession(captchaObj.num1,captchaObj.num2,timestamp4id);
captchaObj.num1 ="what";
captchaObj.num2 ="whaty";
  return captchaObj
}

function startSession(num1,num2,timestamp4id){

   let obj ={k:"dd"};

   obj["eqid"] = filldeEq(num1,num2,timestamp4id)

num1=num1+".jpg";
num2=num2+".jpg";
 


     var folders = DriveApp.getFoldersByName("captchav1");
     while(folders.hasNext()){
       let folder = folders.next();
       let files1 = folder.getFilesByName(num1);
       let files2 = folder.getFilesByName(num2);

          console.log(files1.hasNext())
          console.log(files2.hasNext())

            while (files1.hasNext()) {
                  var file = files1.next();
                  var blob = file.getBlob();
                  obj["l11"] = Utilities.base64Encode(blob.getBytes());
              }

            while (files2.hasNext()) {
                var file = files2.next();
                var blob = file.getBlob();
                obj["l12"] = Utilities.base64Encode(blob.getBytes());
                
            }
            
     }
    
console.log(obj);
      return obj;  

};


function filldeEq(num1,num2,timestamp4id){

  
  let row = sheet.getLastRow();
  row = row+1;
  sheet.appendRow([timestamp4id+row, num1, num2,"plus",(num1+num2),]);

  return timestamp4id+row;
}



function checkAnswer(basicGetResponse){

let id = basicGetResponse.two;
let answer = basicGetResponse.one;
let objy = {};


  var rangeFound = sheet.createTextFinder(id).matchCase(false).findNext();
           var rowIndex = 0;

              if(rangeFound!=null){
                  rowIndex = rangeFound.getRowIndex();
                 var cloudansw = sheet.getRange(rowIndex,5).getValue();
                 cloudansw = parseInt(cloudansw,10);
                 answer = parseInt(answer,10);

                 if(cloudansw===answer){
                   objy["status"] = "pass";
                 }else{
                   objy["status"] = "fail";
                 }
              }else{

              rowIndex = "Not Found Error!";
              objy["notf"]="ntf";

              }






return objy;



};










