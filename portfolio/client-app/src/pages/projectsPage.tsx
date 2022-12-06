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
	function addRow(tableID: string, fileinfo: any) {
		console.log(fileinfo);
		var table = document.getElementById(tableID) as HTMLTableElement;
		if (table) {
			var rowCount = table.rows.length;
			var row = table.insertRow(rowCount);
			var numberOfEntries = fileinfo.length;
			var cell1 = row.insertCell(0);
			cell1.innerHTML = fileinfo[0].name;

			var cell2 = row.insertCell(1);
			cell2.innerHTML = fileinfo[0];

			var cell3 = row.insertCell(2);
			cell3.innerHTML = fileinfo[0];

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
				onClick={() => addRow('dataTable', fileinfo)}
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
