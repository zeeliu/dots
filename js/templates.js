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
		<div class="profile-head">
			<div class="user-profile-image">
				<div class="pic">
					${o.img ? `<img src="${o.img}" alt="">` : ''}
				</div>
			</div>
		</div>
		<h1>${o.name || ''}</h1>
		<P>${o.gender || ''}</P>
		<p>${o.city || ''}</p>
		<p>${o.bio || ''}</p>
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
			<div class="flex-none">
				<div class="recent-image" style="background-color: ${o.bgc}">
					<img src="img/dots/icons/face${o.img}.svg">
					<div class="window-name">
						<h2>${o.name}</h2>
					</div>
				</div>
			</div>
			<div class="flex-stretch">
				
				<div><strong>Description</strong> <span>${o.description}</span></div>
			</div>
		</div>
	`
);

const makeEditUserForm = (o) => {
	return `
		<form>
			<div class="form-control">
				<label for="name">Name</label>
				<input type="text" placeholder="Name" id="edit-user-name" data-role="none" value="${o.name}">
			</div>
				
			<div class="form-control">
				<label for="gender">Gender</label>
				<select class="form-button" id="edit-user-gender" data-role="none">
					<option value="female">female</option>
					<option value="male">male</option>
				</select>
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
