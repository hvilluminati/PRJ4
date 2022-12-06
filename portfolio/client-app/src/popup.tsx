import react, { useState, useEffect } from 'react';
import {
	putDescription,
	putTitle,
	putSkill,
	deleteSkill,
	postSkill,
} from './axioscalls';
import { lang } from './pos';
import Popup from 'reactjs-popup';

export const AboutPopup = ({
	sender,
	func,
}: {
	sender: string;
	func: Function;
}) => {
	const [text, setText] = useState(
		document.getElementById(sender === 'title' ? 'aboutTitleText' : 't')!
			.innerHTML
	);

	function click() {
		if (sender === 'title') putTitle(text);
		else putDescription(text);

		func(text);
	}

	return (
		<div id='popupWrapper' className={sender + 'Wrapper'}>
			<textarea
				id={sender + 'Text'}
				onChange={(event) => setText(event.target.value)}
				placeholder={'Insert ' + sender}
			/>
			<div id='about-btn-wrapper'>
				<button onClick={click}>Set new {sender}</button>
				<div className='border bottom' />
				<div className='border left' />
				<div className='border right' />
				<div className='border topright' />
				<div className='border topleft' />
			</div>
		</div>
	);
};

export const SkillsPopup = () => {
	const [height, setHeight] = useState('1px');

	function addSkill() {}

	useEffect(() => {
		setHeight(lang.length * 40 + 40 + 'px');
	}, []);
	return (
		<div id='skillsWrapper' style={{ height: height }}>
			{lang.map((l, i) => (
				<Popup
					trigger={<button id={'skill'}>{l[1]}</button>}
					arrow={false}
					position={i % 2 === 0 ? 'left center' : 'right center'}
					key={i}>
					<SkillPopup skill={l} />
				</Popup>
			))}
			<Popup
				trigger={
					<div id='skill-btn-wrapper'>
						<button onClick={addSkill} style={{ color: '#16a085' }}>
							Add skill
						</button>
						<div className='border bottom' />
						<div className='border left' />
						<div className='border right' />
						<div className='border topright' />
						<div className='border topleft' />
					</div>
				}>
				<SkillPopup />
			</Popup>
		</div>
	);
};

const SkillPopup = ({ skill }: { skill?: any }) => {
	const [skillName, setSkillName] = useState(
		skill !== undefined ? skill[1] : ''
	);
	const [skillLevel, setSkillLevel] = useState(
		skill !== undefined ? skill[2] : ''
	);
	const [monthsOfExperience, setMonthsOfExperience] = useState(
		skill !== undefined ? skill[3] : ''
	);

	function editSkill() {
		putSkill({
			skillID: skill[0],
			skillName: skillName,
			skillLevel: skillLevel,
			monthsOfExperience: monthsOfExperience,
		});
		console.log('Skill has been edited');
	}

	function delSkill() {
		deleteSkill(skill[0]);
		console.log('Skill has been deleted');
	}

	function addSkill() {
		postSkill({
			skillName: skillName,
			skillLevel: skillLevel,
			monthsOfExperience: monthsOfExperience,
		});
		console.log('Skill has been added');
	}

	return (
		<div id='skillWrapper'>
			<textarea
				id='skillAtt'
				placeholder={skillName}
				onChange={(event) => setSkillName(event.target.value)}
			/>
			<textarea
				id='skillAtt'
				placeholder={skillLevel}
				onChange={(event) => setSkillLevel(event.target.value)}
			/>
			<textarea
				id='skillAtt'
				placeholder={monthsOfExperience}
				onChange={(event) => setMonthsOfExperience(event.target.value)}
			/>
			<div id='skill-btn-wrapper'>
				<button onClick={skill !== undefined ? editSkill : addSkill}>
					{skill !== undefined ? 'Change' : 'Add'} skill
				</button>
				<div className='border bottom' />
				<div className='border left' />
				<div className='border right' />
				<div className='border topright' />
				<div className='border topleft' />
			</div>
			{skill !== undefined && (
				<div id='skill-btn-wrapper'>
					<button onClick={delSkill} style={{ color: 'red' }}>
						Delete skill
					</button>
					<div className='border bottom' style={{ backgroundColor: 'red' }} />
					<div className='border left' style={{ backgroundColor: 'red' }} />
					<div className='border right' style={{ backgroundColor: 'red' }} />
					<div className='border topright' style={{ backgroundColor: 'red' }} />
					<div className='border topleft' style={{ backgroundColor: 'red' }} />
				</div>
			)}
		</div>
	);
};

// const AddSkillPopup = () => {
// 	<div id='skillWrapper'>
// 			<textarea
// 				id='skillAtt'
// 				placeholder={skillName}
// 				onChange={(event) => setSkillName(event.target.value)}
// 			/>
// 			<textarea
// 				id='skillAtt'
// 				placeholder={skillLevel}
// 				onChange={(event) => setSkillLevel(event.target.value)}
// 			/>
// 			<textarea
// 				id='skillAtt'
// 				placeholder={monthsOfExperience}
// 				onChange={(event) => setMonthsOfExperience(event.target.value)}
// 			/>
// 			<div id='skill-btn-wrapper'>
// 				<button onClick={editSkill}>Change skill</button>
// 				<div className='border bottom' />
// 				<div className='border left' />
// 				<div className='border right' />
// 				<div className='border topright' />
// 				<div className='border topleft' />
// 			</div>
// 			<div id='delete-skill-btn-wrapper'>
// 				<button onClick={delSkill}>Delete skill</button>
// 				<div className='del-border bottom' />
// 				<div className='del-border left' />
// 				<div className='del-border right' />
// 				<div className='del-border topright' />
// 				<div className='del-border topleft' />
// 			</div>
// 		</div>
// }
