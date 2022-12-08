import { useEffect, useState } from 'react';
import picture from '../nonbinary-person.png';
import { Link } from 'react-router-dom';
import { getDescription } from '../axioscalls';
import Popup from 'reactjs-popup';
import { AboutPopup } from '../popup';

function About() {
	const [desc, setDesc] = useState('');
	const [title, setTitle] = useState('');
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		getDescription().then((d) => {
			setDesc(d.mainText);
			setTitle(d.headline);
		});

		if (localStorage.getItem('jwt') !== null) {
			document.getElementById('description')!.className = 'authorized';
			document.getElementById('aboutTitle')!.className = 'authorized';
			setAuthorized(true);
		}
	}, []);

	return (
		<>
			<div id='hej'>
				<Link to='/'>
					<button className='button button1'>
						<span>Home</span>
					</button>{' '}
				</Link>
				<div id='about'>
					<div id='aboutTitle'>
						<Popup
							trigger={
								<button className='aboutPopupBtn' disabled={!authorized}>
									<h1 id='aboutTitleText'>{title}</h1>
								</button>
							}>
							<AboutPopup sender='title' func={setTitle} />
						</Popup>
					</div>
					<div id='content'>
						<div id='description'>
							<Popup
								trigger={
									<button className='aboutPopupBtn' disabled={!authorized}>
										<p id='t'>{desc}</p>
									</button>
								}
								position='right center'>
								<AboutPopup sender='description' func={setDesc} />
							</Popup>
						</div>
						<div id='rightSide'>
							<div id='picture'>
								<img id='pic' src={picture} alt='insertPersonHere' />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
