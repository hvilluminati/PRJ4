import { useEffect, useState } from 'react';
import { getBlob, getFiles, getFilesFind, getFilesSort } from '../axioscalls';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { count } from 'console';
import { func } from 'prop-types';

export default function Projects() {
  const [fileinfo, setFileinfo] = useState<
    Array<{
      id: string;
      name: string;
      fileType: string;
      language: string;
    }>
  >([]);
  function clearFileInfo() {
    setFileinfo([]);
  }
  useEffect(() => {
    getFiles().then((response) => {
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
  const Sortby = (sort: string) => {
    clearFileInfo();
    getFilesSort(sort).then((response) => {
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
  };

  const FindLanguage = (Find: string) => {
    clearFileInfo();
    getFilesFind(Find).then((response) => {
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
  };
  return (
    <div id='hej'>
      <Link to='/'>
        <button className='button button1'>
          <span>Home</span>
        </button>{' '}
      </Link>

      <DropdownButton id='dropdown-basic-button' title='Dropdown button'>
        <Dropdown.Item onClick={(event) => Sortby('name')}>
          Sort By Name
        </Dropdown.Item>
        <Dropdown.Item onClick={(event) => Sortby('date')}>
          Sort By Date
        </Dropdown.Item>
        <Dropdown.Item onClick={(event) => FindLanguage('c#')}>
          Find all C# Projects
        </Dropdown.Item>
      </DropdownButton>
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
        <Link to='/UploadProject'>
          <button className='button button1'>
            <span>Upload A new Project</span>
          </button>{' '}
        </Link>
      </div>
    </div>
  );
}
