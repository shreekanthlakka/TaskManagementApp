import { useState } from "react";
import { useComments } from "../context/CommentsContext";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function Comments() {
    const [commentData, setCommentData] = useState("");
    const { createComment, isLoading } = useComments();
    const { id } = useParams();
    async function handleSubmit(e) {
        e.preventDefault();
        const obj = {
            commentBody: commentData,
        };
        const res = await createComment(id, obj);
        if (res.success) {
            toast.success("Comment added successfully");
        }
        setCommentData("");
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <textarea
                    placeholder="Add your comments for the task"
                    value={commentData}
                    onChange={(e) => setCommentData(e.target.value)}
                />
                <button type="submit" disabled={isLoading}>
                    {" "}
                    Add Comment
                </button>
            </form>
        </>
    );
}

export default Comments;
