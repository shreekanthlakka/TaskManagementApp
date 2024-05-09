import { useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useFiles } from "../context/fileContext";

function UploadFiles() {
    const { id } = useParams();
    const [files, setFiles] = useState([]);
    const { uploadFiles, isLoading } = useFiles();

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await uploadFiles(id, files);
        if (res.success) {
            toast.success("Files uploaded successfully");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Upload Files</h2>
            <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
            />
            <button type="submit" disabled={isLoading}>
                {!isLoading ? "upload files" : "uploading ... "}
            </button>
        </form>
    );
}

export default UploadFiles;
