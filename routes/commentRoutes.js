import e from "express";
import { createcomment, getAllcomment, get1comment, del1comment, update1comment} from "../controllers/commentcontroller.js";
import authorize from "../middlewares/authorize.js";
const router =e.Router();

router.post('/:postId',authorize(["Admin","User"]), createcomment);

router.get('/', getAllcomment);

router.get('/:Id', get1comment); 

router.delete('/:Id', del1comment);

router.put('/:Id', update1comment) ;





export default router