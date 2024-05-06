import { useComments } from "../context/CommentsContext";
import styled from "styled-components";

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
    return (
        <Container>
            <h2>@{comment.userId?.name}</h2>
            <p>{comment.commentBody}</p>
        </Container>
    );
}

export default ListComments;
