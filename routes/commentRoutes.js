import e from "express";
import { createcomment, getAllcomment} from "../controllers/commentcontroller.js";
import authorize from "../middlewares/authorize.js";
const router =e.Router();

router.post('/:postId',authorize(["Admin","User"]), createcomment);

router.get('/', getAllcomment);

// router.get('/', get1comment); 

// router.delete('/', del1comment);

// router.put('/', update1comment) ;





export default router