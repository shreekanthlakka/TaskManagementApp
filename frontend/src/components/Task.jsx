import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTask } from "../context/taskContext";
import Comments from "./Comments";
import ListComments from "./ListComments";
import { useComments } from "../context/CommentsContext";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 40%;
    & img {
        height: 100px;
        width: 100px;
    }
    & p {
        font-size: 1rem;
    }
`;

function Task() {
    const { id } = useParams();
    const { getATask, selectedTask } = useTask();
    const { allComments } = useComments();

    useEffect(() => {
        (async () => {
            await getATask(id);
            await allComments(id);
        })();
    }, []);

    return (
        <div>
            {selectedTask && (
                <>
                    <Container>
                        <TaskContainer>
                            <h2>Details of Task : {selectedTask.title}</h2>
                            <TaskDetails task={selectedTask} />
                        </TaskContainer>

                        {/* <h2>Comments</h2> */}
                        {/* <Comments /> */}
                    </Container>
                    <ListComments />
                </>
            )}
        </div>
    );
}

function TaskDetails({ task }) {
    return (
        <>
            <p>Title : {task.title}</p>
            <p>Description : {task.description}</p>
            <p>Created by : {task.userId?.name}</p>
            {/* <img
                src={task.taskfile?.url}
                alt={`Image of task created by user ${task.userId?.name}`}
            /> */}
        </>
    );
}

export default Task;
