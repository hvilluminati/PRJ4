import { useEffect, useState } from 'react';
import { getBlob, getFiles } from '../axioscalls';
import { Link } from 'react-router-dom';
import { count } from 'console';

export default function Projects() {
  //const [language, setLanguage] = useState(['unknown Language']);
  //const [type, setType] = useState([' unknown type']);
  //const [name, setName] = useState([' unknown name']);
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
      setFileinfo(response[0]);
      // for (let index = 0; index < response.length; index++) {
      setFileinfo((arr) => [
        {
          id: response.id,
          name: response.name,
          fileType: response.fileType,
          language: response.language,
        },
      ]);
      //}
      console.log('test2', fileinfo);
      /*
      setLanguage(response.language[0]);
      console.log('language contains', language);

      setType(response.fileType);
      setName(response.name);
      //setId(d.id);
      //console.log(id);

      console.log('console printout', response);
      */
    });
  }, []);
  function addRow(tableID: string) {
    var table = document.getElementById(tableID) as HTMLTableElement;
    if (table) {
      var rowCount = table.rows.length;
      var row = table.insertRow(rowCount);

      var cell1 = row.insertCell(0);
      cell1.innerHTML = fileinfo[0].name;

      var cell2 = row.insertCell(1);
      cell2.innerHTML = fileinfo[0].fileType;

      var cell3 = row.insertCell(2);
      cell3.innerHTML = fileinfo[0].language;

      var cell4 = row.insertCell(3);

      //let buttonString = `<button onClick={() => getBlob(${id})}>Download</button>`;

      //cell4.innerHTML = buttonString;
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
          <button onClick={() => getBlob('1')}>Download</button>'
        </tr>
      </table>
    </div>
  );
}
