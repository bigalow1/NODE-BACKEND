import Comment from "../models/comment.js";
import post from "../models/post.js";
import User from "../models/user.js";

const createcomment = async (req,res)=>{
    let {comment} = req.body;
    let {postId} = req.params;

   let checkPost = await post.findById(postId);
   let checkuser = await User.findById(req.user.id);

   const newcomment = await Comment.create({
        comment,
        post: postId,
        author: req.user.id

    });
     
    checkPost.comments.push(newcomment._id);
    await checkPost.save();
    checkuser.comments.push(newcomment._id );
    await checkuser.save();

    res.status(201).json({message:"comment created successful"})

}

const getAllcomment = async (req,res)=>{
    const mycomment = await comment.find();

    if(!mycomment) return res.status(404).json({message:"No comment found"});

    res.status(200).send(mycomment)
}

const get1comment = async (req,res)=>{
    let {id} = req.params;

    const onecomment = await comment.findById(id);

    if(!onecomment) return res.status(404).json({message:"No comment found"});
    
    res.status(200).send(onecomment)

}

const del1comment = async (req,res)=>{
    let {id} = req.params;
    
    const deletedcomment = await comment.findByIdAndDelete(id);

    if(!deletedcomment) return res.status(404).json({message:"No comment found"});

    res.status(200).json({messgae:"comment deleted successfully"})
}

const update1comment= async (req,res)=>{
    let {id} = req.params;

    let newData = req.body;

    let updatedcomment = await post.findByIdAndUpdate(id, newData, {new:true});

    if(!updatedcomment) return res.status(404).json({message:"comment not found"});

    res.status(200).json({messgae:"comment updated successfully"})
}

export {
    getAllcomment,
    get1comment, 
    del1comment,
    update1comment,
    createcomment
}