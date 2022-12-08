import { useState } from 'react';
//import { postProject } from '../axioscalls';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [language, setLanguage] = useState('no Language');
  const [isFilePicked, setIsFilePicked] = useState(false);

  const fileUploaded = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + localStorage.getItem('jwt'),
    },
  };
  const Submit = async () => {
    var data = new FormData();
    data.append('file', selectedFile[0]);
    data.append('id', '1337');
    const result = await axios.postForm(
      'https://localhost:7041/api/Files',
      data,
      config
    );
    console.log(result.data);
  };
  return (
    <div>
      <Link to='/'>
        <button className='button button1'>
          <span>Home</span>
        </button>{' '}
      </Link>
      <input type='file' name='file' onChange={fileUploaded} />
      <input
        type='string'
        name='language'
        onChange={(event) => setLanguage(event.target.value)}
      />
      {isFilePicked ? (
        <div>
          <p>Filename: {selectedFile?.name}</p>
          <p>Filetype: {selectedFile?.type}</p>
          <p>Size in bytes: {selectedFile?.size}</p>
          <p>
            lastModifiedDate:{' '}
            {selectedFile?.lastModifiedDate.toLocaleDateString()}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
      <div>
        <button onClick={Submit}>Submit</button>
      </div>
    </div>
  );
}
