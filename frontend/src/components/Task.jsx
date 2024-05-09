import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useTask } from "../context/taskContext";
import Comments from "./Comments";
import ListComments from "./ListComments";
import { useComments } from "../context/CommentsContext";
import styled from "styled-components";
import TimeTracker from "./TimeTracker";
import UploadFiles from "./UploadFiles";
import { useFiles } from "../context/fileContext";
import ListFiles from "./ListFiles";

const Container = styled.div`
    /* display: flex;
    flex-direction: row;
    width: 50%; */
    display: grid;
    grid-template-columns: 1fr 1fr;
`;

const TaskContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
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
    const { getFiles, taskFiles } = useFiles();

    useEffect(() => {
        (async () => {
            await getATask(id);
            await allComments(id);
            await getFiles(id);
        })();
    }, [id]);

    return (
        <div>
            {selectedTask && (
                <>
                    <Container>
                        <TaskContainer>
                            <h2>Details of Task : {selectedTask.title}</h2>
                            <TaskDetails task={selectedTask} />
                        </TaskContainer>

                        <TaskContainer>
                            <h2>Time Tracker</h2>
                            <TimeTracker task={selectedTask} />
                            <UploadFiles />
                            <ListFiles files={taskFiles} />
                        </TaskContainer>
                    </Container>

                    <h2>Comments</h2>
                    <Comments />
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
