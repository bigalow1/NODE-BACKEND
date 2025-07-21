import e from "express";
import { createPost, del1post,  get1post, getAllpost,  update1post } from "../controllers/postController.js";
import authorize from "../middlewares/authorize.js";
import upload from "../middlewares/multer.js";
const router =e.Router();

router.post('/', authorize(["Admin","user"]),upload.single('image'), createPost);

router.get('/', getAllpost);

router.get('/ :id', get1post); 

router.delete('/:id',authorize(["Admin"]) ,del1post);

router.put('/:id', update1post) ;





export default router