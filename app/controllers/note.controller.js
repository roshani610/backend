const Note=require('../models/note.model.js')
const express=require('express');
const app=express();
const router=express.Router();
//create and save new note
exports.create=(req,resp)=>{
    console.log("create calleds");
    //validating data
    if(!req.body.content){
        return resp.status(400).send({
            message:"Note cant be empty"
        });
    }

    //create note
    const note=new Note({
        title:req.body.title || 'untitled note',
        content:req.body.content
    })

    //save note
    note.save()
    .then(data=>{
        //resp.send(data);
        resp.status(200).send({
            message:"Successfully added"
        })
    }).catch(err=>{
        resp.status(500).send({
            message:err.message || "Some error occured while creating note"
        });
    });
};

exports.findAll=(req,resp)=>{
    //retriving all notes
    Note.find().then(notes=>{
        resp.send(notes);
    }).catch(err=>{
       return resp.status(500).send({
            message:err.message||"Fail retirving data"
        });
    })
};

exports.findOne=(req,resp)=>{
    Note.findById(req.params.noteId).then(note=>{
        if(!note){
            return resp.status(404).send({
                message:"No records found"
            })
        }
        resp.send(note);
    }).catch(err=>{
        if(err.kind === 'ObjectId'){
            return resp.status(404).send({
                message:"Note not found"+req.params.noteId
            });
        }
        return resp.status(500).send({
            message:err.message || "error occured while fetching single note data" + req.params.noteId
        });
    });
};
exports.update=(req,resp)=>
{   
    if(!req.body.content){
        return resp.status(400).send({
            message:"Note content can not be empty"
        })
    }
    Note.findByIdAndUpdate(req.params.noteId,{
        title:req.body.title || "untitled note",
        content:req.body.content
    },{new:true}).then(note=>{
        if(!note){
            return resp.status(404).send({
                message:"Note not found"+req.params.noteId
            })
        }
        resp.send(note)
    }).catch(err=>{
        if(err.kind === 'ObjectId'){
            return resp.status(404).send({
                message:"Note not found with id:"+req.params.noteId
            })
        }
       return resp.status(500).send({
            message:err.message || "Some error while updating note:"+req.params.noteId
        });
    });
};
exports.delete=(req,resp)=>{
    Note.findByIdAndRemove(req.params.noteId).then(note=>{
        if(!note){
            return resp.status(404).send({
                message:"Note not found with id:"+req.params.noteId
            })
        }
        resp.send({message:"Note deleted successfully having id:"+req.params.noteId})
    }).catch(err=>{
        if(err.kind === "ObjectId"){
            return resp.status(404).send({
                message:"Note not found with id:"+req.params.noteId
            })
        }
        return resp.status(500).send({
            message:err.message || "error while deleting note having id:"+req.params.noteId
        });

    });
};