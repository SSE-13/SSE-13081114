
module data {
    
    var xmlhttp :XMLHttpRequest;
    var mapData;
    export class Storage {
        

        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }
    
       public readFile(callback) { 
           
           
           
            var state_Change = ()=>{
            if(xmlhttp.readyState == 4){
                if(xmlhttp.status == 200){               
                var obj = JSON.parse(xmlhttp.responseText);
                this.mapData = obj.map;
                callback();     
           }
           else{
               
               }
            }        
        }
              
              
           if(XMLHttpRequest){
               xmlhttp =  new XMLHttpRequest();
           }
           if(xmlhttp!=null){
               xmlhttp.onreadystatechange = state_Change;
               xmlhttp.open("GET","lib/map.json",true);
               xmlhttp.send(null);
               
             
           }
           else {
               alert("not support");
           }
                 
     
           
           // var map_path = __dirname + "/map.json"
           // var content = fs.readFileSync(map_path, "utf-8");
           // var obj = JSON.parse(content);
           // this.mapData = obj.map;
        }
              
        public saveFile(){
            
        }
        
        
        public mapData;

    }
}

        
        