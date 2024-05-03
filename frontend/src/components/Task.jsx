import { useParams } from "react-router-dom";

function Task() {
    const { id } = useParams();
    return (
        <div>
            <h2>Details for task #{id}</h2>
        </div>
    );
}

export default Task;
