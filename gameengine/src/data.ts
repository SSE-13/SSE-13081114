var fs = require("fs");

module data {

    export class Storage {

        private static _instance: Storage;

        public static getInstance(): Storage {
            if (Storage._instance == null) {
                Storage._instance = new Storage();
            }
            return Storage._instance;
        }


        public readFile() {
            var map_path = __dirname + "/map.json"
            var content = fs.readFileSync(map_path, "utf-8");
            var obj = JSON.parse(content);
            this.mapData = obj.map;
        }
        
        public saveFile(mapdata){
            var json = {"map":[mapdata[0], mapdata[1], mapdata[2], mapdata[3],mapdata[4], mapdata[5], mapdata[6], mapdata[7]]};
            var obj = JSON.stringify(json);
            var map_path = __dirname + "/map.json";
            fs.writeFile(map_path, obj, function (err) {
               if (err) throw err;
               console.log('Save success!');
               alert("Save success!");
            });

            
        }
        
        
        public mapData;

    }



}