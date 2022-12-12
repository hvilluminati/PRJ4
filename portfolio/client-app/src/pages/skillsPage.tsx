import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { SkillsPopup } from '../popup';

//https://codepen.io/ryasan86/pen/bGpqdYV
function Skills() {
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		var expire = window.localStorage.getItem('expire');
		if (expire && new Date().getTime().toString() > expire) {
			window.localStorage.removeItem('jwt');
			window.localStorage.removeItem('expire');
		}

		if (window.localStorage.getItem('jwt') !== null) {
			setAuthorized(true);
		}
	}, []);

	return (
		<>
			<div id='hello'>
				<Link to='/'>
					<button className='button button1'>
						<span>Home</span>
					</button>{' '}
				</Link>
				<div id='skills'>
					<div id='skillsTitle'>
						<h1>Skills</h1>
					</div>
					<div id='skillText1'>Click a code language</div>
					<div id='skillText2'>
						Click the bar to see more information, and click a code
						language to close
					</div>
				</div>
				<div id='skillMonths'> </div>
				<input type='checkbox' id='btnControl' />
				<label className='btn' htmlFor='btnControl'>
					<div id='codeBox'>
						<div id='codeBoxFill'></div>
					</div>
				</label>
				{authorized === true && (
					<Popup
						trigger={
							<div id='skills-btn-wrapper'>
								<button>Edit skills</button>
								<div className='border bottom' />
								<div className='border left' />
								<div className='border right' />
								<div className='border topright' />
								<div className='border topleft' />
							</div>
						}
						modal={true}
						nested={true}
					>
						<SkillsPopup />
					</Popup>
				)}
			</div>
		</>
	);
}

export default Skills;
