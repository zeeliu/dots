$(() => {
	checkUserId();

	//Event Delegation
	$(document)
		//ROUTING
		.on("pagecontainerbeforeshow", function (e, ui) {
			console.log(ui.toPage[0].id);
			switch (ui.toPage[0].id) {
				case "home-page":
					showHomePage();
					break;
				case "addlocation-page":
					showAddLocationPage();
					break;
				case "list-page":
					showListPage();
					break;
				case "profile-page":
					showUserPage();
					break;
				case "mood-page":
					showMoodPage();
					break;
				case "profile-edit-page":
					showProfileEditPage();
					break;
				case "addmood-page":
					showAddMoodPage();
					break;
				case "moodedit-page":
					showMoodEditPage();
					break;
			}
		})

		// FORMS

		.on("submit", "#login-form", function (e) {
			e.preventDefault();
			checkLoginForm();
		})

		.on("submit", "#signup-form", function (e) {
			e.preventDefault();

			if ($("#signup-password").val() != $("#signup-password2").val()) {
				throw "Passwords don't match";
				return;
			}

			query({
				type: "insert_user",
				params: [
					$("#signup-username").val(),
					$("#signup-email").val(),
					$("#signup-password").val(),
					$("#signup-name").val(),
				],
			}).then((d) => {
				if (d.error) throw d.error;
				$.mobile.navigate("#home-page");
			});
		})

		// use async function so we can make synchronous requests with "await"
		.on("submit", "#list-add-form", async function (e) {
			e.preventDefault();

			// get variables from the form and session
			const userId = sessionStorage.userId;
			const name = $("#list-add-name").val();
			const description = $("#list-add-description").val();

			try {
				// insert a new mood on the table for the current user
				await query({
					type: "insert_mood",
					params: [userId, name, description],
				});

				// get the mood we just saved
				const d = await query({
					type: "moods_from_user",
					params: [userId],
				});

				// set the moodId in the session so we have it on other pages
				sessionStorage.moodId = d.result[0].id;

				// navigate to mood-page and show content using showMoodPage
				$.mobile.navigate("#mood-page");
			} catch (e) {
				throw e;
			}
		})

	/* CLICKS */

	// https://codepen.io/bronkula/pen/yPBbWY

		.on("click", "#addlocation-page .cta-button", async function(e) {
			const map_el = await makeMap("#addlocation-page .map");
			console.log({map_el})
			const center = map_el.data("map").getCenter();
			// const color = sessionStorage.moodColor;
			// setMarker(map_el, {
			// 	lat: center.lat(),
			// 	lng: center.lng(),
			// }, color)

			query({
				type: "insert_location",
				params: [
					sessionStorage.moodId,
					center.lat(),
					center.lng(),
					1,
					0,
					$("#addlocation-page textarea").val(),
				],
			}).then((d) => {
				if (d.error) throw d.error;
				console.log(d)
				$.mobile.navigate("#home-page");
			});
		})

		.on("click", "#list-page .moodlist li", function (e) {
			if ($(this).data("id") === undefined) {
				throw "No id defined on this element";
			}
			sessionStorage.moodId = $(this).data("id");
			$.mobile.navigate("#mood-page");
		})

		.on("click", "#moodedit-page .cta-button", function(e) {
			query({
				type: "edit_mood",
				params: [
					$("#moodedit-page .mood-name").val(),
					$("#moodedit-page .bg-color.selected").attr("data-color"),
					$("#moodedit-page .description").val(),
					$("#moodedit-page [data-imgid]").attr("data-imgid"),
					sessionStorage.moodId,
				],
			}).then((d) => {
				if (d.error) throw d.error;
				console.log(d)
				$.mobile.navigate("#mood-page");
			});
		})

		.on("click", "#addmood-page .cta-button", function(e) {
			query({
				type: "insert_mood",
				params: [
					sessionStorage.userId,
					$("#addmood-page .mood-name").val(),
					$("#addmood-page .bg-color.selected").attr("data-color"),
					$("#addmood-page .description").val(),
					$("#addmood-page [data-imgid]").attr("data-imgid"),
				],
			}).then((d) => {
				if (d.error) throw d.error;
				console.log(d)
				sessionStorage.moodId = d.result[0].id
				$.mobile.navigate("#mood-page");
			});
		})

		.on("click", ".bg-color", function(e) {
			const color = $(this).attr('data-color')
			$(this).siblings().removeClass("selected");
			$(this).addClass("selected");
			$("#addmood-page img, #moodedit-page img").css({ "background-color": color });
		})

		.on("click", ".profile-image .left, .profile-image .right", function(e) {
			const img = $(this).siblings("img");
			let id = Number(img.attr("data-imgId"));
			const min = 1;
			const max = 6;
			if ($(this).hasClass("left")) {
				if (id == min) {
					id = max;
				} else {
					id = id - 1;
				}
			} else if ($(this).hasClass("right")) {
				if (id == max) {
					id = min;
				} else {
					id = id + 1;
				}
			}
			img.attr("data-imgId", id).attr("src", `img/dots/icons/face${id}.svg`);
		})

		// .on("click", ".js-addlocation", function (e) {
		// 	query({
		// 		type: "insert_location",
		// 		params: [
		// 			sessionStorage.moodId,
		// 			$("#add-location-lat").val(),
		// 			$("#add-location-lng").val(),
		// 			$("#add-location-description").val(),
		// 		],
		// 	}).then((d) => {
		// 		if (d.error) throw d.error;
		// 		$.mobile.navigate("#home-page");
		// 	});
		// })

		.on("click", ".js-edit-user", function (e) {
			query({
				type: "edit_user",
				params: [
					$("#edit-user-name").val(),
					$("#edit-user-gender").val(),
					$("#edit-user-city").val(),
					$("#edit-user-bio").val(),
					sessionStorage.userId,
				],
			}).then((d) => {
				if (d.error) throw d.error;
			});
		})

		.on("click", ".js-logout", function (e) {
			sessionStorage.removeItem("userId");

			checkUserId();
		})

		// set the session locationId when we click the "Visit Dot" button in makeHomeWindow
		.on("click", ".location-button", function (e) {
			if ($(this).data("id") === undefined) {
				throw "No id defined on this element";
			}
			sessionStorage.locationId = $(this).data("id");
		})

		.on("click", ".js-delete-mood", function (e) {
			query({
				type: "delete_mood",
				params: [sessionStorage.moodId],
			}).then((d) => {
				if (d.error) throw d;
				$.mobile.navigate("#list-page");
			});
		})

		.on("click", "#mood-page .nav-tabs li", function (e) {
			if ($(this).hasClass("active")) {
				return;
			}
			$(this).addClass("active")
			if ($(this).hasClass("description")) {
				$('#mood-page .nav-tabs .locations').removeClass("active")
				$('#mood-page .profile-map').removeClass("active")
				$('#mood-page .profile-content').addClass("active")
			} else {
				$('#mood-page .nav-tabs .description').removeClass("active")
				$('#mood-page .profile-content').removeClass("active")
				$('#mood-page .profile-map').addClass("active")
			}
		})

		.on("change", "#edit-upload-image", function (e) {
			const file = $(this).find('input[name|="userfile"]')[0].files[0]
			$("#profile-edit-page .pic .loading").show();
			$("#profile-edit-page .pic img").css('opacity', '0.5');

			upload(file).then((d) => {
				if (d.error) throw d;
				else {
					const src = `https://zeeliu.com/aau/wnm617/omid/uploads/${d.result}`;
					console.log('upload complete!',src)
					console.log('saving image to user...')

					query({
						type: "edit_user_image",
						params: [
							src,
							sessionStorage.userId,
						],
					}).then((d) => {
						if (d.error) throw d.error;
						console.log('image saved!')
						$("#profile-edit-page .pic .loading").hide();
						$("#profile-edit-page .pic img")
							.attr('src', src)
							.css('opacity', '1')
							.show();
					});
				}
			});
		})
		.on("click", ".js-editupload", function (e) {
			query({
				type: "edit_" + $("#edit-upload-type").val() + "_image",
				params: [
					$("#edit-upload-filename").val(),
					$("#edit-upload-id").val(),
				],
			}).then((d) => {
				if (d.error) throw d;
			});
		})

		/* DATA ACTIVATE */
		.on("click", "[data-activate]", function (e) {
			$($(this).data("activate")).addClass("active");
		})
		.on("click", "[data-deactivate]", function (e) {
			$($(this).data("deactivate")).removeClass("active");
		})
		.on("click", "[data-toggle]", function (e) {
			$($(this).data("toggle")).toggleClass("active");
		})
		.on("click", "[data-activateone]", function (e) {
			$($(this).data("activateone"))
				.addClass("active")
				.siblings()
				.removeClass("active");
		});

	$("[data-template]").each(function () {
		let template_id = $(this).data("template");
		let template_str = $(template_id).html();
		$(this).html(template_str);
	});
});
