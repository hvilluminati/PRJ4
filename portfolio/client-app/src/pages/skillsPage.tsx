import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { SkillsPopup } from '../popup';

//https://codepen.io/ryasan86/pen/bGpqdYV
function Skills() {
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		if (localStorage.getItem('jwt') !== null) {
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
						Click the bar to see more information, and click a code language to
						close
					</div>
				</div>
				<div id='skillLVL'>
					Skill lvl: Noob <br></br> Experience: <br></br> 2 days <br></br> 50%
				</div>
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
						nested={true}>
						<SkillsPopup />
					</Popup>
				)}
			</div>
		</>
	);
}

export default Skills;
