const fs = require('fs');

function parseDirectory(name, directory) {
    var obj = {'name': name, children: [], 'settings': {}};
    while(true) {
        var dirent = directory.readSync();
        if(dirent === null)
            break

        if(dirent.isDirectory()) {
            let dir = fs.opendirSync(directory.path + '/' + dirent.name);
            obj['children'].push(parseDirectory(dirent.name, dir))
        } else if(dirent.name[0] === '.') {
            obj['settings'][dirent.name.slice(1, -4)] = fs.readFileSync(directory.path + '/' + dirent.name, "utf8"); 
        } else {
            obj['children'].push({
                'name': dirent.name,
                'content': fs.readFileSync(directory.path + '/' + dirent.name, "utf8"), 
            })
        }
    }
    return obj;
}
var dir = fs.opendirSync('sessions')
var obj = parseDirectory('/root', dir)

var string = JSON.stringify(obj)
fs.writeFileSync("src/sessions.json", string, {encoding: 'utf8'});
