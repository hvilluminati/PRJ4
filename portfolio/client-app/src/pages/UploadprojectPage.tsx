import { useState } from 'react';
import { postProject } from '../axioscalls';
import { Link } from 'react-router-dom';



export default function Upload() {
  const [selectedFile, setSelectedFile] = useState<any>([]);
  const [language, setLanguage] = useState('no Language');
  const [isFilePicked, setIsFilePicked] = useState(false);

  const fileUploaded = (event: any) => {
    setSelectedFile(event.target.files[0]);
    setIsFilePicked(true);
  };
  const Submit = () => {
    postProject(selectedFile, language);
  };
  return (
    <div>
       <div  id='hej'>
      <Link to='/'>
        <button className='button button1'>
          <span>Home</span>
        </button>{' '}
      </Link>
      </div>
      <div  id='Selectfile'>
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
      <div id='submit'>
        <button onClick={Submit}>Submit</button>
      </div>
      </div>
    </div>
    
  );
}
