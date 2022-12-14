import { useEffect, useState } from 'react';
import { getBlob, getFiles, getFilesFind, getFilesSort } from '../axioscalls';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';

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
		var expire = window.localStorage.getItem('expire');
		if (expire && new Date().getTime().toString() > expire) {
			window.localStorage.removeItem('jwt');
			window.localStorage.removeItem('expire');
		}
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

			<DropdownButton id='dropbtn' title='Dropdown button'>
				<Dropdown.Item onClick={() => Sortby('name')}>
					Sort By Name
				</Dropdown.Item>
				<Dropdown.Item onClick={() => Sortby('date')}>
					Sort By Date
				</Dropdown.Item>
				<Dropdown.Item onClick={() => FindLanguage('c#')}>
					Find all C# Projects
				</Dropdown.Item>
			</DropdownButton>
			<div id='dataTable'>
				<table id='dataTable' data-testid='table' width='350px'>
					<tbody data-testid='hejs'>
						<tr id='Titel'>
							<td>{'Encrypted Project name'}</td>
							<td>{'File Type'}</td>
							<td>{'Coding language'}</td>
							<td>{'Download button'}</td>
						</tr>

						{fileinfo.map((f, i) => (
							<tr key={i}>
								<td>{f.name}</td>
								<td>{f.fileType}</td>
								<td>{f.language}</td>
								<div id='Download'>
									<button
										id='Download'
										onClick={() =>
											getBlob(f.id, f.fileType, f.name)
										}
									>
										Download
									</button>
								</div>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div id='upload'>
				{window.localStorage.getItem('jwt') !== null && (
					<Link to='/UploadProject'>
						<button className='button button1'>
							<span>Upload A new Project</span>
						</button>{' '}
					</Link>
				)}
			</div>
		</div>
	);
}
