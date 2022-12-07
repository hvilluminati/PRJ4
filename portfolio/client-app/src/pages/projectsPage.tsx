import { useEffect, useState } from 'react';
import { getBlob, getFiles } from '../axioscalls';
import { Link } from 'react-router-dom';
import { count } from 'console';

export default function Projects() {
  const [fileinfo, setFileinfo] = useState<
    Array<{
      id: string;
      name: string;
      fileType: string;
      language: string;
    }>
  >([]);

  useEffect(() => {
    getFiles().then((response) => {
      setFileinfo([
        {
          id: response[0].documentId,
          name: response[0].name,
          fileType: response[0].fileType,
          language: response[0].language,
        },
      ]);
      for (let index = 0; index < response.length; index++) {
        setFileinfo((arr) => [
          ...arr,
          {
            id: response[index].documentId,
            name: response[index].name,
            fileType: response[index].fileType,
            language: response[index].language,
          },
        ]);
      }
    });
  }, []);

  return (
    <div  id='hej'>
      <Link to='/'>
        <button className='button button1'>
          <span>Home</span>
        </button>{' '}
      </Link>
      <table id='dataTable' width='350px'>
        <tr id='Titel'>
          <td>{'Encrypted Project name'}</td>
          <td>{'File Type'}</td>
          <td>{'Coding language'}</td>
          <td>{'Download button'}</td>
        </tr>

        {fileinfo.map((f) => (
          <tr>
            <td>{f.name}</td>
            <td>{f.fileType}</td>
            <td>{f.language}</td>
            <button onClick={() => getBlob(f.id)}>Download</button>'
          </tr>
        ))}
      </table>
      <div id='upload'>
      <Link to='/UploadProjects'>
        <button className='button button1'>
          <span>Upload A new Project</span>
        </button>{' '}
      </Link>
    </div>
    </div>
  );
}
