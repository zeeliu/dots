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
};

const showAddLocationPage = async () => {
	const map_el = await makeMap("#addlocation-page .map");
	
	$("#addlocation-page .dot").css("background-color", sessionStorage.moodColor)
	// const center = map_el.data("map").getCenter()
	// $("#add-location-lat").val(center.lat());
	// $("#add-location-lng").val(center.lng());

	// $("#addlocation-page .cta-button").on("click", function(e) {
	// 	const center = map_el.data("map").getCenter()
	// 	setMarker(map_el, {
	// 		lat: center.lat(),
	// 		lng: center.lng(),
	// 	}, 'blue')
	// });

	// let m = false;

	// map_el.data("map").addListener("click", function (e) {
	// 	let pos = {
	// 		lat: e.latLng.lat(),
	// 		lng: e.latLng.lng(),
	// 	};

	// 	if (m != false) m.setMap(null);

	// 	$("#add-location-lat").val(pos.lat);
	// 	$("#add-location-lng").val(pos.lng);

	// 	const color = 'blue'
	// 	m = new google.maps.Marker({
	// 		position: pos,
	// 		map: map_el.data("map"),
	// 		icon: {
	// 			path: google.maps.SymbolPath.CIRCLE,
	// 			fillColor: color,
	// 			strokeColor: color,
	// 			fillOpacity: 1.0,
	// 			scale: 7
	// 		}
	// 	});
	// });

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
