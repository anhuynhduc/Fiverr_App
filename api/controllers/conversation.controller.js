import Conversation from "../models/conversation.model.js";

export const createConversation = async (req,res, next) =>{
    const neConversation = new Conversation({
        id: req.body.id,
        sellerId: req.body.sellerId,
        buyerId: req.body.buyerId,
        readBySeller: true,
        readByBuyer: true,
    })

    try {
        const savedConversation = await neConversation.save()
        res.status(200).send(savedConversation)
    }catch (err) {
        next(err)
    }
}

export const getSingleConversation = async (req,res, next) =>{
    try {
        const conversation = await Conversation.findOne(
            {id: req.params.id},
        )
        res.status(200).send(conversation)
    }catch (err) {
        next(err)
    }
}

export const getConversations = async (req,res, next) =>{
    try {
        const conversations = await Conversation.find(
            req.params.body
        )
        res.status(200).send(conversations)
    }catch (err) {
        next(err)
    }
}

export const updateConversation = async (req,res, next) =>{
    try {
        const updatedConversation = await Conversation.findOneAndUpdate(
            {id: req.params.id},
            {
                $set: {
                    readBySeller: req.isSeller,
                    readByBuyer: !req.isSeller
                }
            },
            { new : true}
        )

        res.status(200).send(updatedConversation)
    }catch (err) {
        next(err)
    }
}