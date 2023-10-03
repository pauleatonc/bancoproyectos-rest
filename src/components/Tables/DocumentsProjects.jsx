import { useState } from "react";
import UploadBtn from "../Commons/UploadBtn";

export const DocumentsProjects = ({ index, description, fileType }) =>
{
  const [ fileUploaded, setFileUploaded ] = useState(false);
  const [ fileName, setFileName ] = useState('');

  const handleFileChange = (event) =>
  {
    const file = event.target.files[ 0 ];
    if (file)
    {
      console.log(file);
      setFileUploaded(true);
      setFileName(file.name);
    }
  };

  return (
    <>
      <div className="col-1 p-3">{index}</div>
      <div className="col p-3">{description}</div>
      <div className="col p-3">{fileUploaded ? fileName : fileType }</div>
      <div className="col p-3">
        <UploadBtn onFileChange={handleFileChange} fileUploaded={fileUploaded} />
      </div>
    </>
  );

}
