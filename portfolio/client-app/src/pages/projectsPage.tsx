import { useEffect, useState } from 'react';
import { getBlob, getFiles } from '../axioscalls';
import { Link } from 'react-router-dom';

export default function Projects() {
  const [language, setLanguage] = useState('unknown Language');
  const [type, setType] = useState(' unknown type');
  const [name, setName] = useState(' unknown name');

  useEffect(() => {
    getFiles().then((d) => {
      setLanguage(d.language);

      setType(d.fileType);
      setName(d.name);

      console.log('console printout', d);
    });
  }, []);
  function addRow(tableID: string) {
    var table = document.getElementById(tableID) as HTMLTableElement;
    if (table != null) {
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);

      var cell1 = row.insertCell(0);
      cell1.innerHTML = name;

      var cell2 = row.insertCell(1);
      cell2.innerHTML = type;

      var cell3 = row.insertCell(2);
      cell3.innerHTML = language;

      var cell4 = row.insertCell(3);
      cell4.innerHTML =
        '<button id="' +
        '1' +
        '" name="btn' +
        '1' +
        '"onClick={() => getBlob(' +
        '1' +
        ')}>Button</button>';
    }
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
          <button id='btn1' name='btn1' onClick={() => getBlob('1')}>
            Button
          </button>
          '
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
