import { useComments } from "../context/CommentsContext";
import styled from "styled-components";
import { useUser } from "../context/userContext";

const Container = styled.div`
    background-color: aliceblue;
    color: black;
`;

function ListComments() {
    const { comments, isLoading } = useComments();

    if (isLoading) {
        return <h1>Loading ... </h1>;
    }
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment._id}>
                    <CommentDisplay comment={comment} />
                </div>
            ))}
        </div>
    );
}

function CommentDisplay({ comment }) {
    const { userProfile, user } = useUser();
    const { deleteComment } = useComments();
    console.log("comment id ==>", comment);
    console.log("user profile ==> ", userProfile);

    return (
        <Container>
            <h2>@{comment.userId?.name}</h2>
            <p>{comment.commentBody}</p>
            {comment.userId.email === user?.email && (
                <>
                    {/* <button>Update</button> */}
                    <button onClick={() => deleteComment(comment._id)}>
                        delete
                    </button>
                </>
            )}
        </Container>
    );
}

export default ListComments;
