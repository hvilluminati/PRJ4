import { useEffect, useState } from 'react';
import { getBlob, getFiles } from '../axioscalls';
import { Link } from 'react-router-dom';
import { count } from 'console';

export default function Projects() {
  const [language, setLanguage] = useState(['unknown Language']);
  const [type, setType] = useState([' unknown type']);
  const [name, setName] = useState([' unknown name']);
  const [id, setId] = useState([' unknown Id']);

  useEffect(() => {
    getFiles().then((d) => {
      //let submissions = sizeof(d);
      //console.log(submissions);
      setLanguage(d.language);

      setType(d.fileType);
      setName(d.name);
      setId(d.id);
      console.log(id);

      console.log('console printout', d);
    });
  }, []);
  function addRow(tableID: string) {
    var table = document.getElementById(tableID) as HTMLTableElement;
    if (table && id) {
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);

      var cell1 = row.insertCell(0);
      cell1.innerHTML = name[0];

      var cell2 = row.insertCell(1);
      cell2.innerHTML = type[0];

      var cell3 = row.insertCell(2);
      cell3.innerHTML = language[0];

      var cell4 = row.insertCell(3);

      let buttonString =
        '<button onClick={() => callblob(${id})}>Download</button>';

      cell4.innerHTML = buttonString;
    }
  }
  function callblob(id: string) {
    getBlob('${id}');
  }
  return (
    <div>
      <input
        type='button'
        value='Add Row'
        onClick={() => addRow('dataTable')}
      />

      <table id='dataTable' width='350px'>
        <tr>
          <td>{'name'}</td>
          <td>{'File Type'}</td>
          <td>{'Programming language'}</td>
          <td>{'Download Button'}</td>
          <button onClick={() => getBlob('1')}>Download</button>'
        </tr>
      </table>
    </div>
  );
}

/*
return (
  <>
    <Projects />
    <Link to='/'>
        <button className='button button1'>
          <span>Home</span>
        </button>{' '}
      </Link>
  </>
);
}
export default function App() {
  const [fileData, setFileData] = useState();
  const previewFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener("loadend", () => {
      console.log(reader.result);
      setFileData(reader.result);
    });
    reader.readAsDataURL(file);
  };
  return (
    <div className="App">
      <input type="file" onChange={previewFile} />
      <div>{fileData}</div>
    </div>
  );
axios.get(blobUrl, {
       responseType: 'blob'            
      })
      .then(r => r.blob())
      .then(blobFile => 
           new File([blobFile], fileName, { type: blobFile.type })
      );

*/
