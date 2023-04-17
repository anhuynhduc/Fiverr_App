import React from 'react';
import "./Message.scss"
import {Link, useParams} from "react-router-dom";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import newRequest from "../../../utils/newRequest.js";

const Message = () => {
    const { id } = useParams()
    const currentUser = JSON.parse(localStorage.getItem("currentUser"))

    const queryClient = useQueryClient()

    const { isLoading, error, data } = useQuery({
        queryKey: ["messages"],
        queryFn: () =>
            newRequest.get(`/messages/${id}`).then((res) => {
                    return res.data
                }
            )
    })

    const mutation = useMutation({
        mutationFn: (message) => {
            console.log("message",message)
            return newRequest.post(`/messages`, message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["messages"]);
        },
    });

    const handleSubmit = (e) =>{
        e.preventDefault()
        mutation.mutate({
            conversationId: id,
            userId: currentUser._id,
            desc: e.target[0].value
        })
        e.target[0].value = ""
    }
    return (
        <div className="message">
            <div className="container">
                <span className="breadCrumbs">
                    <Link to="/messages">MESSAGES</Link> > MARRY >
                </span>
                { isLoading ? (
                    "loading"
                ): error ? (
                    "error"
                ): (
                    <div className="messages">
                        {data.map((m) => (
                            <div className={ currentUser._id === m.userId ? "owner item" : "item" } key={m._id} >
                                <img
                                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                    alt=""
                                />
                                <p>
                                    {m.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
                <hr/>
                <form className="write" onSubmit={handleSubmit}>
                    <textarea
                        name=""
                        placeholder="Write a message"
                        id=""
                        cols="30"
                        rows="10"
                    >
                    </textarea>
                    <button>Send</button>
                </form>
            </div>
        </div>
    );
};

export default Message;