import post from "../models/post.js";
import Comment from "../models/comment.js";
// import bcrypt from "bcryptjs";

const createPost = async (req,res)=>{
    
    try {
          let {title,snippet,content} = req.body;
          if(!title || !snippet || !content) {
            return res.status(400).json({message:"All fields are required"});                                                       

             }   const image ={
           url: req.file.path,
           filename: req.file?.filename
    }

      const newpost = await post.create({
        title,  
        snippet,
        content,
        image,
        author: req.user.id,
    });
    res.status(201).json({message:"Post created successfully", });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});    
    }

   
}

const getAllpost = async (req,res)=>{
    const myPost = await post.find().populate({
        path:"author",
        select:"fullname"
    })

    if(!myPost) return res.status(404).json({message:"No post found"});

    res.status(200).send(myPost)
}

const get1post = async (req,res)=>{
    let {id} = req.params;

    const onepost = await post.findById(id).populate({
        path:"author",
        select:"firstname lastname"
    })

    if(!onepost) return res.status(404).json({message:"No post found"});
    
    res.status(200).send(onepost)
}

const del1post = async (req,res)=>{
    let {id} = req.params;
    
    const deletedPost = await post.findByIdAndDelete(id);

    if(!deletedPost) return res.status(404).json({message:"No post found"});

    res.status(200).json({messgae:"post deleted successfully"})
}

const update1post= async (req,res)=>{
    let {id} = req.params;

    let newData = req.body;

    let updatedPost = await post.findByIdAndUpdate(id, newData, {new:true});

    if(!updatedPost) return res.status(404).json({message:"post not found"});

    res.status(200).json({messgae:"post updated successfully"})
}

export {
    getAllpost,
    get1post, 
    del1post,
    update1post,
    createPost
}