//templater (f=>{}) ([{},{}])


const makeMoodList = templater(
	(o) => `
		<li class="mood-jump" data-id="${o.id}">
			<img src="img/dots/icons/face${o.img}.svg" style="background-color: ${o.bgc}">
		</li>
	`
);


const makeChooseMoodList = templater(
	(o) => `
		<li><a href="#addlocation-page" class="mood-jump" data-id="${o.id}">
			<img src="img/dots/icons/face${o.img}.svg" style="background-color: ${o.bgc}">
		</a></li>
	`
);


const makeUserProfile = templater(
	(o) => `
		<div class="user-profile-image">
			<div class="pic">
				${o.img ? `<img src="${o.img}" alt="">` : ''}
			</div>
		</div>
		<div class="profile-name-gender">
			<h1>${o.name || ''}</h1>
			<image src="${o.gender == 'male' ? 'img/male.svg' : 'img/female.svg'}"/>
		</div>
		<div class="profile-city">
			<p>${o.city || ''}</p>
		</div>
		<div class="bio">
			<img src="img/bio-decor.png"/>
			<p>${o.bio || ''}</p>
			<img src="img/bio-decor.png"/>
		</div>
	`
);





const makeMoodImage = templater(
	(o) => `
		<div class="profile-name"><h1>${o.name}</h1></div>
		<img class="face" src="img/dots/icons/face${o.img}.svg" style="background-color: ${o.bgc}" alt="">
		
	`
);


const makeMoodProfile = templater((o) => `
	<div class="profile-description" style="border-bottom-color: ${o.bgc}">
		<div><span>${o.description}</span></div>
	</div>
`);

const makeHomeWindow = templater(
	(o) => `
		<div class="recent-mood">
			<div class="recent-image" style="background-color: ${o.bgc}">
					<img src="img/dots/icons/face${o.img}.svg">
					<div class="window-name">
						<h2>${o.name}</h2>
					</div>
			</div>
			<p class="recent-description">
				<b>Description</b>
				<br/>
				${o.description}
			</p>
		</div>
	`
);

const makeEditUserForm = (o) => {
	return `
		<form id="edit-profile-form">
			<div class="form-control">
				<label for="name">Name</label>
				<input type="text" placeholder="Name" id="edit-user-name" data-role="none" value="${o.name}">
			</div>
				
			<label for="gender">Gender</label>
			<div class="genders">
				<div class="male ${o.gender == 'male' ? 'active' : ''}">M</div>
				<div class="female ${o.gender == 'female' ? 'active' : ''}">F</div>
			</div>

			<div class="form-control">
				<label for="city">City</label>
				<input type="text" placeholder="city" id="edit-user-city" data-role="none" value="${o.city}">
			</div>

			<div class="form-control">
				<label for="bio">Bio</label>
				<input type="text" placeholder="This is the description of a cat. He swag." id="edit-user-bio" data-role="none" value="${o.bio}">
			</div>

		</form>
	`;
};

const makeEditMoodForm = (o, colors) => {
	return `
		<form>
			<div class="form-control">
				<label for="name">Name</label>
				<input type="text" class="form-input mood-name" placeholder="Mood Name" data-role="none" value="${o.name}">
			</div>
			<div class="form-control">
				<label for="name">Choose a Color</label>
				${makeColorSelection(colors)}
			</div>

			<div class="form-control">
				<label for="name">Description</label>
				<textarea class="form-input description" placeholder="Type your Description" id="edit-mood-description">${o.description}</textarea>
			</div>
		</form>
	`;
};

const makeColorSelection = (colors) => {
	return `
		<div class="choose-bg">
			<div class="bg-color" style="background-color: ${colors[0]};" data-color="${colors[0]}"></div>
			<div class="bg-color" style="background-color: ${colors[1]};" data-color="${colors[1]}"></div>
			<div class="bg-color" style="background-color: ${colors[2]};" data-color="${colors[2]}"></div>
			<div class="bg-color" style="background-color: ${colors[3]};" data-color="${colors[3]}"></div>
			<div class="bg-color" style="background-color: ${colors[4]};" data-color="${colors[4]}"></div>
			<div class="bg-color" style="background-color: ${colors[5]};" data-color="${colors[5]}"></div>
			<div class="bg-color" style="background-color: ${colors[6]};" data-color="${colors[6]}"></div>
			<div class="bg-color" style="background-color: ${colors[7]};" data-color="${colors[7]}"></div>
		</div>
	`
};
