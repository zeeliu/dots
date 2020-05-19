// ASYNC

const MOOD_COLORS = [
	'#F36E54',
	'#E889B9',
	'#F8D26C',
	'#BBD534',
	'#5486C5',
	'#9D80BB',
	'#223F7B',
	'#37BA9A',
]

const showAddNewPage = async () => {
	let d = await query({
		type: "moods_from_user",
		params: [sessionStorage.userId],
	});
	console.log(d);

	if (d.result.length === 0) {
		$("#addnew-page .no-moods").show().html("You don't have any moods! Click add mood below to create a new mood.");
	} else {
		$("#addnew-page .no-moods").hide();
		$("#addnew-page .moodlist").html(makeMoodList(d.result));
	}
};

const showListPage = async () => {
	$("#list-page .home-nav .nav-dot").hide();
	$("#list-page .list-nav .nav-dot").show();
	$("#list-page .profile-nav .nav-dot").hide();

	let d = await query({
		type: "moods_from_user",
		params: [sessionStorage.userId],
	});
	console.log(d);

	if (d.result.length === 0) {
		$("#list-page .no-moods").show().html("You don't have any moods! Click add mood below to create a new mood.");
	} else {
		$("#list-page .no-moods").hide();
		$("#list-page .moodlist").html(makeMoodList(d.result));
	}
};

const showAddLocationPage = async () => {
	const map_el = await makeMap("#addlocation-page .map");
	$("#addlocation-page .dot").css("background-color", sessionStorage.moodColor)
	setMapBounds(map_el.data("map"), []);
};

const showUserPage = async () => {
	$("#profile-page .home-nav .nav-dot").hide();
	$("#profile-page .list-nav .nav-dot").hide();
	$("#profile-page .profile-nav .nav-dot").show();

	let d = await query({
		type: "user_by_id",
		params: [sessionStorage.userId],
	});
	console.log(d);

	$("#profile-page .card").html(makeUserProfile(d.result));
};

const showMoodPage = async () => {
	if (sessionStorage.moodId === undefined) {
		throw "No mood id defined";
	}

	// only need to query mood_by_id once
	query({
		type: "mood_by_id",
		params: [sessionStorage.moodId],
	}).then((d) => {
		console.log(d);
		sessionStorage.moodColor = d.result[0].bgc
		$("#mood-page .profile-image").html(makeMoodImage(d.result));		
		$("#mood-page .profile-content").html(makeMoodProfile(d.result));
		return d
	}).then((mood) => {
		query({
			type: "locations_from_mood",
			params: [sessionStorage.moodId],
		}).then(async (d) => {
			console.log(d);
			const map_el = await makeMap("#mood-page .map");
			makeMarkers(map_el, d.result, mood.result[0].bgc);
		});
	})

};

const showHomePage = async () => {
	$("#home-page .home-nav .nav-dot").show();
	$("#home-page .list-nav .nav-dot").hide();
	$("#home-page .profile-nav .nav-dot").hide();

	let d = await query({
		type: "recent_moods_locations",
		params: [sessionStorage.userId],
	});

	console.log(d);

	let moods = d.result.reduce((r, o) => {
		o.icon = `img/dots/icons/${o.name}.svg`;
		if (o.lat) r.push(o);
		return r;
	}, []);
	console.log({moods}, {res:d.result});

	let map_el = await makeMap("#home-page .map");

	makeMarkers(map_el, moods);
	if (!map_el.data("markers")) return;
	
	map_el.data("markers").forEach((o, i) => {
		o.addListener("click", function (e) {
			console.log(moods[i]);
			map_el.data("infoWindow").open(map_el.data("map"), o);
			map_el.data("infoWindow").setContent(makeHomeWindow(moods[i]));
		});
	});
};

const showProfileEditPage = async () => {
	const d = await query({
		type: "user_by_id",
		params: [sessionStorage.userId],
	});
	console.log('got user',d)
	const img = d.result[0].img

	$("#profile-edit-page .pic .loading").hide();
	if (img) {
		$("#profile-edit-page .pic img").attr('src', img).show();
	}
	$("#profile-edit-page .edit-form").html(makeEditUserForm(d.result[0]));

	const gender = d.result[0].gender;
	if (gender) {
		const genderEl = $(`#edit-profile-form .genders .${gender}`)
		genderEl.addClass("active");
		genderEl.siblings().removeClass("active");
		sessionStorage.gender = gender;
	}

};

const showAddMoodPage = async () => {
	$("#addmood-page .edit-form").html(makeEditMoodForm({name: "", description: ""}, MOOD_COLORS));
	const selectedColor = MOOD_COLORS[0]
	$("#addmood-page img")
		.css({ "background-color": selectedColor })
		.attr("src", `img/dots/icons/face1.svg`);
	$(`#addmood-page .bg-color[data-color|='${selectedColor}']`).addClass('selected');
};

const showMoodEditPage = async () => {
	let d = await query({
		type: "mood_by_id",
		params: [sessionStorage.moodId],
	});

	$("#moodedit-page .edit-form").html(makeEditMoodForm(d.result[0], MOOD_COLORS));
	$("#moodedit-page img")
		.css({ "background-color": d.result[0].bgc })
		.attr("src", `img/dots/icons/face${d.result[0].img}.svg`)
	$(`#moodedit-page .bg-color[data-color|='${d.result[0].bgc}']`).addClass('selected');
};
