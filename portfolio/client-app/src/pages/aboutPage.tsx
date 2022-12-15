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
	//hej
	useEffect(() => {
		var expire = window.localStorage.getItem('expire');
		if (expire && new Date().getTime().toString() > expire) {
			window.localStorage.removeItem('jwt');
			window.localStorage.removeItem('expire');
		}

		getDescription()
			.then((d) => {
				setDesc(d.mainText);
				setTitle(d.headline);
			})
			.catch(() => {
				setDesc('Error');
				setTitle('Error');
			});

		if (window.localStorage.getItem('jwt')) {
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
					<div id='aboutTitle' data-testid='aboutTitle'>
						<Popup
							trigger={
								<button
									className='aboutPopupBtn'
									disabled={!authorized}
									data-testid='butt'
								>
									<h1 id='aboutTitleText' data-testid='title'>
										{title}
									</h1>
								</button>
							}
						>
							<AboutPopup sender='title' func={setTitle} />
						</Popup>
					</div>
					<div id='content'>
						<div id='description' data-testid='desc'>
							<Popup
								trigger={
									<button
										className='aboutPopupBtn'
										disabled={!authorized}
										data-testid='butt'
									>
										<p id='t' data-testid='description'>
											{desc}
										</p>
									</button>
								}
								position='right center'
							>
								<AboutPopup
									sender='description'
									func={setDesc}
								/>
							</Popup>
						</div>
						<div id='rightSide'>
							<div id='picture'>
								<img
									id='pic'
									src={picture}
									alt='insertPersonHere'
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default About;
