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

const showListPage = async () => {
	let d = await query({
		type: "moods_from_user",
		params: [sessionStorage.userId],
	});
	console.log(d);

	if (d.result.length === 0) {
		$("#list-page .no-moods").show();
	} else {
		$("#list-page .no-moods").hide();
		$("#list-page .moodlist").html(makeMoodList(d.result));
	}

	$("#list-page .moodlist li").on("click", function (e) {
		if ($(this).data("id") === undefined) {
			throw "No id defined on this element";
		}
		sessionStorage.moodId = $(this).data("id");
		$.mobile.navigate("#mood-page");
	});
};

const chooseListPage = async () => {
	let d = await query({
		type: "moods_from_user",
		params: [sessionStorage.userId],
	});
	console.log(d);

	$("#addnew-page .moodlist").html(makeChooseMoodList(d.result));
};

const showAddLocationPage = async () => {
	let map_el = await makeMap("#addlocation-page .map");

	let m = false;

	map_el.data("map").addListener("click", function (e) {
		let pos = {
			lat: e.latLng.lat(),
			lng: e.latLng.lng(),
		};

		if (m != false) m.setMap(null);

		$("#add-location-lat").val(pos.lat);
		$("#add-location-lng").val(pos.lng);

		m = new google.maps.Marker({
			position: pos,
			map: map_el.data("map"),
		});
	});

	setMapBounds(map_el.data("map"), []);
};

const showUserPage = async () => {
	let d = await query({
		type: "user_by_id",
		params: [sessionStorage.userId],
	});
	console.log(d);

	$("#profile-page .profile-body").html(makeUserProfile(d.result));
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
	console.log(moods);


	let map_el = await makeMap("#home-page .map");

	makeMarkers(map_el, moods);

	map_el.data("markers").forEach((o, i) => {
		o.addListener("click", function (e) {
			// example 1
			/*			$("#home-page .basin")
				.addClass("active")
				.html(makeHomeWindow(moods[i]));*/

			// example 2
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
	if (img) {
		$("#profile-edit-page .pic .loading").hide();
		$("#profile-edit-page .pic img").attr('src', img).show();
	}
	$("#profile-edit-page .edit-form").html(makeEditUserForm(d.result[0]));
};

const showAddMoodPage = async () => {
	$("#addmood-page .edit-form").html(makeColorSelection(MOOD_COLORS));
	const selectedColor = MOOD_COLORS[0]
	$("#addmood-page img").css({ "background-color": selectedColor });
	$(`#addmood-page .bg-color[data-color|='${selectedColor}']`).addClass('selected');
};

const showMoodEditPage = async () => {
	let d = await query({
		type: "mood_by_id",
		params: [sessionStorage.moodId],
	});

	$("#moodedit-page .edit-form").html(makeEditMoodForm(d.result[0], MOOD_COLORS));
	$("#moodedit-page img")

		.attr("src", d.result[0].img)
		.css("background", d.result[0].bgc);
};
