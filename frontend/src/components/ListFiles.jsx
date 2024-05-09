import { FaDownload } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
    & a {
        text-decoration: none;
        margin: 10px;
        margin-top: 40px;
        font-size: larger;
    }
    & a span {
        margin-left: 10px;
        color: black;
        font-family: "Times New Roman", Times, serif;
    }
`;

function ListFiles({ files }) {
    console.log("files ==>", files);
    const totalFiles = [];
    files.forEach((file) => {
        totalFiles.push(...file.taskfiles);
    });
    return (
        <Container>
            {totalFiles.map((ele) => (
                <a href={ele.url} key={ele._id} target="_blank">
                    <FaDownload />
                    <span>{ele.orginalPath}</span>
                </a>
            ))}
        </Container>
    );
}

export default ListFiles;
