import { useState, useEffect } from 'react';
import { postProject } from '../axioscalls';
import { Link, useNavigate } from 'react-router-dom';

export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [language, setLanguage] = useState('no Language');
  const [isFilePicked, setIsFilePicked] = useState(false);
  const nav = useNavigate();

  useEffect(() => {
    var expire = window.localStorage.getItem('expire');
    if (expire && new Date().getTime().toString() > expire) {
      window.localStorage.removeItem('jwt');
      window.localStorage.removeItem('expire');
      nav('/');
    } else if (window.localStorage.getItem('jwt') === null) nav('/');
  }, []);

  const fileUploaded = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const Submit = () => {
    if (isFilePicked) {
      postProject(selectedFile, language);
    }
  };
  return (
    <div>
      <div id='hej'>
        <Link to='/'>
          <button className='button button1'>
            <span>Home</span>
          </button>{' '}
        </Link>
      </div>
      <div id='Selectfile'>
        <input type='file' name='file' onChange={fileUploaded} />
        <input
          type='string'
          name='language'
          onChange={(event) => setLanguage(event.target.value)}
        />
        {isFilePicked ? (
          <div id='uplloadedprojektinfo'>
            <p> Filename: {selectedFile?.name}</p>
            <p> Filetype: {selectedFile?.type}</p>
            <p> Size in bytes: {selectedFile?.size}</p>
            <p>
              lastModifiedDate:{' '}
              {selectedFile?.lastModifiedDate.toLocaleDateString()}
            </p>
          </div>
        ) : (
          <p>Select a file to show details</p>
        )}
        <div id='submit'>
          <button onClick={Submit}>Submit</button>
        </div>
      </div>
    </div>
  );
}
