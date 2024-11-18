import fs from 'fs/promises'
import path from 'path'
import fsn from 'fs'

let basePath = path.join("D:\\javaScript\\Sigma-Web-Dev-Course\\Sigma-Web-Dev-Course\\clutter");

let dir = await fs.readdir(basePath);
// console.log(dir);
for (const item of dir) {
    let ext = item.split(".")[item.split(".").length - 1];
    if(ext != "js" && ext != "json" && item.split(".").length > 1){
        if(fsn.existsSync(path.join(basePath, ext))){
            await fs.rename(path.join(basePath, item), path.join(basePath, ext, item));
        }else{
            await fs.mkdir(path.join(basePath, ext));
            await fs.rename(path.join(basePath, item), path.join(basePath, ext, item));

        }
        // console.log(ext);
    }
}