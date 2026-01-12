import multer,{diskStorage} from 'multer'
import path from 'path'
import {fileURLToPath} from 'url'

const _filename=fileURLToPath(import.meta.url);
const _dirname=path.dirname(_filename);
const uploadPath=path.join(process.cwd(),"uploads");

const storage=diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadPath);
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+path.extname(file.originalname));
    }
});

export const upload=multer({storage:storage});