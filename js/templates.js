//templater (f=>{}) ([{},{}])


const makeMoodList = templater(
	(o) => `
		<li class="mood-jump" data-id="${o.id}">
			<img src="${o.img}" style="background-color: ${o.bgc}">
		</li>
	`
);


const makeChooseMoodList = templater(
	(o) => `
		<li><a href="#addlocation-page" class="mood-jump" data-id="${o.id}">
			<img src="${o.img}">
		</a></li>
	`
);


const makeUserProfile = templater(
	(o) => `
		<div class="profile-head">
			<div class="profile-image">
				<img src="${o.img}" alt="">
			</div>
		</div>
		<h1>${o.name}</h1>
		<P>${o.gender}</P>
		<p>${o.city}</p>
		<p>${o.bio}</p>
	`
);





const makeMoodImage = templater(
	(o) => `
		<img class="face" src="${o.img}" style+"background-color: ${o.bgc}" alt="">

	`
);

const makeMoodProfile = templater(
	(o) => `
		<div class="profile-body">
			<div class="profile-name">${o.name}</div>
			<div class="profile-description">
				<div>Description<span>${o.description}</span></div>
			</div>
			<div class="button-group">
				<div class="cta-button">
					<a href="#addlocation-page">Make a dot</a>
				</div>
				<div class="secondary-button">
					<a href="#moodedit-page" data-id="${o.id}">Edit mood</a>
				</div>
			</div>
		</div>
	`
);

const makeLocationProfile = templater(
	(o) => `
		<h1 class="profile-name">${o.name}</h1>
		<div class="bgc" style="background-color: ${o.bgc}"> </div>
	`
);


const makeMoodProfile = templater(
	(o) => `
		<div class="profile-body">
			
			<div class="profile-description" style="border-bottom-color: ${o.bgc}">
				<div><span>${o.description}</span></div>
			</div>
			
	
		</div>
	`
);

const makeButtonGroup = templater(
	(o) => `
			
				<div class="cta-button">
					<a href="#addlocation-page">Make a dot</a>
				</div>
				<div class="secondary-button">
					<a href="#moodedit-page" data-id="${o.id}">Edit mood</a>

				</div>



`);




const makeHomeWindow = templater(
	(o) => `
		<div class="display-flex recent-mood">
			<div class="flex-none">
				<div class="recent-image">
					<img src="${o.img}" alt="">
				</div>
			</div>
			<div class="flex-stretch">
				<h2>${o.name}</h2>
				<div><strong>Description</strong> <span>${o.description}</span></div>
				<div><strong>Favorite</strong> <span>${o.favorite}</span></div>
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

const makeEditMoodForm = (o) => {
	return `
		<form>
			<div class="form-control">
				<label for="name">Name</label>
				<input type="text" class="form-input" placeholder="Mood Name" id="edit-mood-name" data-role="none" value="${o.name}">
			</div>

			<div class="choose-bg">
				<div class="bg-color" style="background-color: #F36E54;" data-color="#F36E54"></div>
				<div class="bg-color" style="background-color: #E889B9;" data-color="#E889B9"></div>
				<div class="bg-color" style="background-color: #F8D26C;" data-color="#F8D26C"></div>
				<div class="bg-color" style="background-color: #BBD534;" data-color="#BBD534"></div>
				<div class="bg-color" style="background-color: #5486C5;" data-color="#5486C5"></div>
				<div class="bg-color" style="background-color: #9D80BB;" data-color="#9D80BB"></div>
				<div class="bg-color" style="background-color: #223F7B;" data-color="#223F7B"></div>
				<div class="bg-color" style="background-color: #37BA9A;" data-color="#37BA9A"></div>
			</div>

			<div class="form-control">
				<label for="name">Description</label>
				<textarea class="form-input" placeholder="Type your Description" id="edit-mood-description"> ${o.description}</textarea>
			</div>

		</form>
	`;
};
