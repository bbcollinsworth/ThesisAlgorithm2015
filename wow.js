// this runs algorithm
// attached to index.php

//B.C. : NOTE - COPY PASTE index.php URL into new window or will auto-close after running algorithm

var got_first = 0;
var got_second = 0;
var got_third = 0;
var got_none = 0;
var got_one = 0;
var got_peers = 0;
var ajaxed = false;
var numstudents = 0;

jQuery(document).ready(function($) {
	// list of teachers -- B.C. : MUST BE HAND-UPDATED YEARLY UNLESS CODE IS REDONE
	var burroughs = [
		"Travis",
		"MacDonald",
		"Sicchio",
		"Crean",
		"Pobiner",
		"Sharp",
		"Seymour"
	];
	// unknown
	var data;
	// temporarily stores remaining students before they're placed in a thesis section
	var students_left = [];
	// container for json.students data
	var students = [];
	// unknown
	var teacher_chosen;
	// empty array to store teacher student preferences?
	var prefs = [];
	// variable for processed data after ajax loads students.json
	var student_data = [];

	// B.C. : THESE AJAX CALLS PULL DATA FROM 2 JSON FILES: 
	//"students.json" and "teachers.json" -- see GitHub README for JSON file formatting instructions
	$.ajax({
		dataType: "json",
		url: "students.json",
		success: function(d) {
			// maybe not used
			var counter = 0;
			for (N in d.students) {
				var peers = d.students[N].peers;
				// split string of peers into array
				var arr = (true) ? peers.split(" ") : "";

				//B.C. : LOOP THROUGH ALL PEER ARRAYS to replace PEER NET IDs in JSON file 
				//with the unique IDs assigned to each student for the sort
				for (var i = 0; i < arr.length; i++) {
					for (var p = 0; p < d.students.length; p++) {
						if (d.students[p].NetID == arr[i]) {
							arr[i] = p;
							//console.log("FOUND MATCH: " + d.students[p].NetID);
						} else {}
					}
				}

				//B.C. : PARSE STUDENTS' THESIS TEACHER 1ST, 2ND, 3RD CHOICES INTO ARRAY:
				var choices = d.students[N].choices;
				var choicesArr = (true) ? choices.split(" ") : "";


				// single processed student gets pushed to student_data array
				var s = {
					"id": N, // assigns unique ID to each student that corresponds to their index in students array
					"name": d.students[N].name, // student's name
					"NetID": d.students[N].NetID, // their N number
					"choices": choicesArr, //parsed array of teacher choices,
					"peers": arr, //  parsed array of student peer preferences
					"thesis": -1 // -1 means they haven't been placed in a real thesis section yet
				}
				counter++;
				student_data.push(s);
				console.log(s);
			}


			$.ajax({
				dataType: "json",
				url: "teachers.json",
				success: function(data) {
					// B.C.: ***NOTE*** TEACHER NAMES WILL NEED TO BE HAND-CHANGED EVERY SEMESTER or THIS MUST BE REWRITTEN
					for (i = 0; i < data.teachers.length; i++) {
						if (data.teachers[i].name == "Travis") {
							// all section preferences
							prefs[0] = [];
							choices = data.teachers[i].choices.split(" ");
							for (j = 0; j < student_data.length; j++) {
								for (k = 0; k < choices.length; k++) {
									// if professor's N number choice matches student's N number
									if (choices[k] == student_data[j].NetID) {
										// each array has an index
										// add array index of student from student_data to prefs 0 array 
										prefs[0].push(j);
									}
								}
							}
						}
						// repeat with next ... teachers
						if (data.teachers[i].name == "MacDonald") {
							prefs[1] = [];
							choices = data.teachers[i].choices.split(" ");
							for (j = 0; j < student_data.length; j++) {
								for (k = 0; k < choices.length; k++) {
									if (choices[k] == student_data[j].NetID) {
										prefs[1].push(j);
									}
								}
							}
						}
						if (data.teachers[i].name == "Sicchio") {
							prefs[2] = [];
							choices = data.teachers[i].choices.split(" ");
							for (j = 0; j < student_data.length; j++) {
								for (k = 0; k < choices.length; k++) {
									if (choices[k] == student_data[j].NetID) {
										prefs[2].push(j);
									}
								}
							}
						}
						if (data.teachers[i].name == "Crean") {
							prefs[3] = [];
							choices = data.teachers[i].choices.split(" ");
							for (j = 0; j < student_data.length; j++) {
								for (k = 0; k < choices.length; k++) {
									if (choices[k] == student_data[j].NetID) {
										prefs[3].push(j);
									}
								}
							}
						}
						if (data.teachers[i].name == "Pobiner") {
							prefs[4] = [];
							choices = data.teachers[i].choices.split(" ");
							for (j = 0; j < student_data.length; j++) {
								for (k = 0; k < choices.length; k++) {
									if (choices[k] == student_data[j].NetID) {
										prefs[4].push(j);
									}
								}
							}
						}
						if (data.teachers[i].name == "Sharp") {
							prefs[5] = [];
							choices = data.teachers[i].choices.split(" ");
							for (j = 0; j < student_data.length; j++) {
								for (k = 0; k < choices.length; k++) {
									if (choices[k] == student_data[j].NetID) {
										prefs[5].push(j);
									}
								}
							}
						}
						if (data.teachers[i].name == "Seymour") {
							prefs[6] = [];
							choices = data.teachers[i].choices.split(" ");
							for (j = 0; j < student_data.length; j++) {
								for (k = 0; k < choices.length; k++) {
									if (choices[k] == student_data[j].NetID) {
										prefs[6].push(j);
									}
								}
							}
						}

						//console.log(prefs);

					}
					// Initialize global variables - generateThesis ***MUST*** always be before generateStudents
					// create AJAX SCOPE STUDENT ARRAY!
					var students = generateStudents(student_data);
					// get number of students
					numstudents = students.length;
					// B.C.: The following creates an array of index numbers, from 0 to students.length, in random order
					var shuffled_ids = uniqueRandom(students.length, students.length);
					var theses = generateTheses(7);
					getThesisInterest();
					/*
			for(var i=0;i<unshuffled_students.length;i++){
				// students[i] = unshuffled_students[i];
				students[i] = unshuffled_students[shuffled_ids[i]];
			}
*/
					// This is the algorithm
					sausage_factory();

					// Get dataviz data
					var dataviz = dataviz();

					ajaxed = true;
					// Functions
					function generateTheses(total) {
						var sections = [];
						for (var i = 0; i < total; i++) {
							// if teacher doesn't have a student preference(?) add a blank array
							if (!prefs[i]) {
								p = [];
							} else {
								// otherwise make p their set of preferences
								p = prefs[i];
							}
							sections[i] = {
								"id": i,
								"teacher": burroughs[i],
								"total": 15,
								"enrolled": [],
								"teacher_pref": p,
								"choices": [],
								"not_chosen": 0,
								"chosen": 0,
								"totalinterest": []
							};
						}
						return sections;
						console.log(sections);
					}

					function getThesisInterest() {
						// add student to total interest array to keep track of all students interested in each section / teacher
						for (var i = 0; i < theses.length; i++) {
							var interest = [];
							var pref = [];
							for (var j = 0; j < students.length; j++) {
								for (var k = 0; k < students[j].choices.length; k++) {
									if (students[j].choices[k] == theses[i].teacher) {
										interest.push(j);
									}
								}
							}

							//console.log(interest);
							theses[i].totalinterest = interest;
						}
					}

					function generateStudents(student_data) {
						// move contents from student_data into new students array
						// push every student id into students_left
						var students = [];
						for (var i = 0; i < student_data.length; i++) {
							students[i] = student_data[i];
							students_left.push(students[i].id);
						}
						return students;
					}


					//B.C.: this function generates a range of unique numbers between 0 and students.length in random order
					//for shuffling students
					function uniqueRandom(count, bound) {
						// count = array length
						// bound = range of data
						if (bound >= count) {
							var set = [];
							for (var j = 0; j < count; j++) {
								if (j == 0) {
									set [j] = Math.floor(Math.random() * bound);
								} else {
									set [j] = Math.floor(Math.random() * bound);
									for (k = 0; k < j; k++) {
										if (set [j] == set [k]) {
											set [j] = checkRepeat(set [k], set [j], bound);
											k = -1;
										}
									}
								}
							}
							return set;
						} else {
							return false;
						}
					}

					function checkRepeat(n1, n2, total) {
						if (n1 == n2) {
							n2 = Math.floor(Math.random() * total);
							return checkRepeat(n1, n2, total);
						} else {
							return n2;
						}
					}

					function sausage_factory() {
						// after thesis object created
						// data viz using google forms
						iteration++;
						// Initialize student interest data
						for (var i = 0; i < theses.length; i++) {
							// totals for how many people want each teacher's thesis section 
							var first = 0;
							var second = 0;
							var third = 0;
							// how many students didn't pick them at all
							var not_chosen = 0;
							// total amount of people that picked them
							var chosen = 0;
							// all the students interested in a given section 
							var interested_students = [];

							for (var j = 0; j < students.length; j++) {
								//if(students[shuffled_ids[j]].choices[0] == i){
								if (students[shuffled_ids[j]].choices[0] == theses[i].teacher) {
									first++;
									//interested_students.push(students[shuffled_ids[j]].NetID);
									interested_students.push(students[shuffled_ids[j]].id);
								}
								if (students[shuffled_ids[j]].choices[1] == theses[i].teacher) {
									second++;
									interested_students.push(students[shuffled_ids[j]].id);
								}
								if (students[shuffled_ids[j]].choices[2] == theses[i].teacher) {
									third++;
									interested_students.push(students[shuffled_ids[j]].id);
								}
								if (students[shuffled_ids[j]].choices[2] != theses[i].teacher && students[shuffled_ids[j]].choices[1] != theses[i].teacher && students[shuffled_ids[j]].choices[0] != theses[i].teacher) {
									not_chosen++;
								}
							}
							theses[i].choices[0] = first;
							theses[i].choices[1] = second;
							theses[i].choices[2] = third;
							theses[i].not_chosen = not_chosen;
							theses[i].chosen = first + second + third;
						}

						// Pre-Iteration (uncontested sections)
						// For each section...
						for (var i = 0; i < theses.length; i++) {
							// See how many people picked it as their first choice. i=thesis section, 0=1st choice
							//var choosers = getChoice(i, 0);
							var choosers = getChoice(theses[i].teacher, 0);
							// If the number of 1st choice students is less than the total allowable students for that section...
							if (choosers.length <= theses[i].total) {
								// Add them all to that section
								for (var j = 0; j < choosers.length; j++) {
									// add student to thesis without any other checks
									addStudent(students[choosers[j]], i);
								}
							}
						}

						// The remaining sections are contested
						// Iterations (x3) 1st, 2nd, & 3rd choices for thesis
						for (var n = 0; n < 3; n++) {
							// For each section...
							for (var i = 0; i < theses.length; i++) {
								// Find out which students selected that section as this iteration's choice (1st, 2nd, or 3rd). i=thesis section, n=choice, 1-3
								//var choosers = getChoice(i, n);
								var choosers = getChoice(theses[i].teacher, 0);
								teacher_chosen = 0;
								teacherChoice(i, choosers);
							}
							for (var i = 0; i < theses.length; i++) {
								//if (teacher_chosen > 0) {
								friendIn(n, i);
								//}
							}
							for (var i = 0; i < theses.length; i++) {
								friendOut(n, i);
							}
							for (var i = 0; i < theses.length; i++) {
								oneAttaTime(n, i);
							}
							// Repeat for 2nd & 3rd choices...
						}
						anyLeft();
						printResults();
						students_small = {
							"students": []
						};
						for (i = 0; i < students.length; i++) {
							var s = {
								"id": students[i].id,
								"NetID": students[i].NetID,
								"choices": students[i].choices,
								"thesis": students[i].thesis,
								//"current": students[i].current,
								"name": students[i].name
							}
							students_small.students.push(s);
						}
						var postdata = {
							'theses': theses,
							'students': students_small
						};
						$.ajax({
							url: "savelog.php",
							type: "POST",
							data: postdata,
							success: function(result) {
								console.log("success! " + result);
								window.close();
							}
						});
					}



					// ************************** FUNCTION DECLARATIONS ************************** //



					function printResults() {
						var c = $('li.blank').clone();
						c.removeClass('blank');
						c.removeClass('off');
						c.addClass('i-' + iteration);
						// c.find('h1').html('Iteration '+iteration);
						$('li.blank').before(c);

						// Print to screen
						for (var i = 0; i < theses.length; i++) {
							var pr = '';
							var en = '';
							for (var j = 0; j < theses[i].teacher_pref.length; j++) {
								pr += students[theses[i].teacher_pref[j]].name;
								pr += ', ';
							}
							for (var j = 0; j < theses[i].enrolled.length; j++) {
								en += students[theses[i].enrolled[j]].name;
								en += ', ';
							}
							pr = pr.substr(0, pr.length - 2);
							en = en.substr(0, en.length - 2);
							$('.i-' + iteration + ' .theses tbody').append('<tr><td>' + burroughs[i] + '</td><td>' + theses[i].choices[0] + '</td><td>' + theses[i].choices[1] + '</td><td>' + theses[i].choices[2] + '</td><td>' + theses[i].chosen + '</td><td>' + theses[i].not_chosen + '</td><td>' + pr + '</td><td>' + en + '</td></tr>');
						}
					}


					function oneAttaTime(n, i) {
						// For all the students...
						for (var j = 0; j < students.length; j++) {
							// If they are not enrolled in this section and want to be...
							if (students[shuffled_ids[j]].choices[n] == i && students[shuffled_ids[j]].thesis == -1) {
								// If there's still room...
								if (theses[i].enrolled.length < theses[i].total) {
									// That student is enrolled in the section
									addStudent(students[shuffled_ids[j]], i);
									friendIn(n, i);
									friendOut(n, i);
								}
							}
						}
					}


					function teacherChoice(i, choosers) {
						//B.C. : REVERSED THESE FOR LOOPS TO RANDOMIZE ORDER TEACHER-CHOSEN STUDENTS ARE ADDED TO CLASS
						for (var k = 0; k < choosers.length; k++) {
							for (var j = 0; j < theses[i].teacher_pref.length; j++) {

								// If the teacher selected any of those students... 
								if (choosers[k] == theses[i].teacher_pref[j]) {
									// Add them to that section
									addStudent(students[choosers[k]], i);
									teacher_chosen++;
								}
							}
						}
					}



					function friendIn(n, i) {


						//B.C.: maximum number of peers... MUST BE CHANGED EACH YEAR or SET TO AUTO-UPDATE
						var maxPeers = 4;

						// Start with the 1st peer of every student (i.e. index "0" in that student's "peers" array)...
						var peerIndex = 0;
						// As long as we're still within the maximum number of peers...
						while (peerIndex < maxPeers) {
							console.log(peerIndex);

							// For all the students...
							for (var j = 0; j < students.length; j++) {
								//set up an easy variable representing the student at this index:
								var thisStudent = students[shuffled_ids[j]];

								//RUN FIRST FOR TEACHER PICKS (OTHERWISE THINGS CAN GET MESSY, e.g. peers of peers pulled in before all teacher pref peers)
								for (var k = 0; k < theses[i].teacher_pref.length; k++) {
									// If they are now enrolled in this section and they're a teacher pick and there's room...
									if (thisStudent.thesis == i && shuffled_ids[j] == theses[i].teacher_pref[k] && theses[i].enrolled.length < theses[i].total) {

										// Check to see if this student still has peers in their peer array
										// (since students can select fewer peers than the max)
										if (peerIndex < thisStudent.peers.length) {
											//create a counter to advance through this student's peers array, searching for the first peer who ranked this section
											var peerIndexAdvance = 0;

											// Cycle through that sutdent's peers and find the first one (if any) who ranked this section as their choice for this iteration (1st, 2nd, 3rd)
											while (peerIndexAdvance < thisStudent.peers.length - peerIndex) {
												var tempIndex = peerIndex + peerIndexAdvance;
												var peerID = thisStudent.peers[tempIndex];
												//console.log("Peer" + peerID + " of " + thisStudent.name);
												//console.log(students[peerID]);

												//if this peer has chosen this thesis and isn't already in a section...
												if (students[peerID] !== undefined && students[peerID].choices[n] !== undefined && students[peerID].choices[n] == theses[i].teacher && students[peerID].thesis == -1) {

													addStudent(students[peerID], i);
													//console.log("Peer " + students[peerID].name + " of " + thisStudent.name + " added to " + i + "!");
													//then break the while loop:
													break;
												//otherwise keep looking for a peer to add:
												} else {
													peerIndexAdvance++;
												}

											}
										}
									}

								}
							}
							// Within the while loop, increment the peerIndex to run through the next set of peers for all students
							peerIndex++;
						}

						// RUN THE WHOLE THING AGAIN FOR NON-TEACHER PICKS...

						// reset the peer index (to loop through peer arrays of all non-teacher picks)
						peerIndex = 0;
						// As long as we're still within the maximum number of peers...
						while (peerIndex < maxPeers) {
							console.log(peerIndex);

							// For all the students...

							for (var j = 0; j < students.length; j++) {

								var thisStudent = students[shuffled_ids[j]];

								// Check to see if this student still has peers in their peer array
								// (since students can select fewer peers than the max)

								// If they are now enrolled in this section and and there's room...
								if (thisStudent.thesis == i && theses[i].enrolled.length < theses[i].total) {
									// If they are now enrolled in this section...

									//create a counter to advance through peers, searching for a peer who ranked this section
									if (peerIndex < thisStudent.peers.length) {
										var peerIndexAdvance = 0;

										// Cycle through that sutdents peers and find the first one (if any) who ranked this section as their choice for this iteration (1st, 2nd, 3rd)
										while (peerIndexAdvance < thisStudent.peers.length - peerIndex) {
											var tempIndex = peerIndex + peerIndexAdvance;
											var peerID = thisStudent.peers[tempIndex];
											//console.log("Peer" + peerID + " of " + thisStudent.name);
											//console.log(students[peerID]);

											if (students[peerID] !== undefined && students[peerID].choices[n] !== undefined && students[peerID].choices[n] == theses[i].teacher && students[peerID].thesis == -1) {

												addStudent(students[peerID], i);
												//console.log("Peer " + students[peerID].name + " of " + thisStudent.name + " added to " + i + "!");
												break;
											} else {
												peerIndexAdvance++;
											}

										}
									}

								}
							}
			
							peerIndex++;
						}
					}


					function friendOut(n, i) {
						// For all the students...
						for (var j = 0; j < students.length; j++) {
							// If they are not enrolled in this section and want to be...
							var thisStudent = students[shuffled_ids[j]];
							if (thisStudent.choices[n] == theses[i].teacher && thisStudent.thesis == -1) {
								for (var k = 0; k < thisStudent.peers.length; k++) {
									// If any of their peers are already enrolled in the section and there's still room...
									var peerID = thisStudent.peers[k];
									if (students[peerID].thesis == i && theses[i].enrolled.length < theses[i].total) {
										// That student is enrolled in the section
										addStudent(thisStudent, i);
									}
								}
							}
						}
					}

					function spaceLeft(n, i) {
						// For all the students...
						for (var j = 0; j < students.length; j++) {
							// If they are not enrolled in this section and want to be...
							if (students[shuffled_ids[j]].choices[n] == i && students[shuffled_ids[j]].thesis == -1) {
								// If there's still room...
								if (theses[i].enrolled.length < theses[i].total) {
									// That student is enrolled in the section
									addStudent(students[shuffled_ids[j]], i);
								}
							}
						}
					}

					function anyLeft() {
						// For each section...
						for (var j = 0; j < students.length; j++) {
							if (students[shuffled_ids[j]].thesis == -1) {
								for (var k = 0; k < theses.length; k++) {
									// If there is space left
									if (theses[k].enrolled.length < theses[k].total) {
										// Add that student
										addStudent(students[shuffled_ids[j]], k);
									}
								}
							}
						}
					}


					function getChoice(section, choice) {
						var choosers = [];
						for (var i = 0; i < students.length; i++) {
							if (students[shuffled_ids[i]].choices[choice] == section) {
								choosers.push(shuffled_ids[i]);
							}
						}
						return choosers;
					}

					function addStudent(student, section) {
						if (student.thesis == -1) {
							student.thesis = section;
							theses[section].enrolled.push(student.id);

							console.log("Student " + student.name + " added to " + theses[section].teacher + "!");
						}
					}

					function studentsLeft() {
						var sl = [];
						for (var i = 0; i < students.length; i++) {
							if (students[shuffled_ids[i]].thesis == -1) {
								sl.push(shuffled_ids[i]);
							}
						}
						return sl;
					}

					function dataviz() {

						for (var i = 0; i < students.length; i++) {
							var thisStudent = students[shuffled_ids[i]];
							var thesisIndex = thisStudent.thesis;
							//console.log(thisStudent.name);
							//console.log(theses[thesisIndex].teacher);
							if (thisStudent.choices[0] == theses[thesisIndex].teacher) {
								
								got_first++;
							} else if (thisStudent.choices[1] == theses[thesisIndex].teacher) {
								got_second++;
							} else if (thisStudent.choices[2] == theses[thesisIndex].teacher) {
								got_third++
							} else {
								got_none++;
							}
							var peers = students[shuffled_ids[i]].peers;
							var flag = false;
							for (var j = 0; j < peers.length; j++) {
								var peer_id = peers[j];
								var peer = students[peer_id];

								//need undefined because not all people have full peer lists
								if (peer !== undefined && peer.thesis == students[shuffled_ids[i]].thesis) {
									flag = true;
								}
							}
							if (flag) {
								got_peers++;
							}
						}

						got_one = got_first + got_second + got_third;

						console.log(got_first + ", " + got_second + ", " + got_third + ", " + got_one + ", " + got_none + ", " + got_peers);

						var dataviz = {
							"got_first": got_first,
							"got_second": got_second,
							"got_third": got_third,
							"got_none": got_none,
							"got_one": got_one,
							"got_peers": got_peers
						}



						$('.dataviz tbody').append('<tr><td>' + dataviz.got_first + ' -> ' + (dataviz.got_first / students.length) * 100 + '%</td><td>' + dataviz.got_second + ' -> ' + (dataviz.got_second / students.length) * 100 + '%</td><td>' + dataviz.got_third + ' -> ' + (dataviz.got_third / students.length) * 100 + '%</td><td>' + dataviz.got_one + ' -> ' + (dataviz.got_one / students.length) * 100 + '%</td><td>' + dataviz.got_none + ' -> ' + (dataviz.got_none / students.length) * 100 + '%</td><td>' + dataviz.got_peers + ' -> ' + (dataviz.got_peers / students.length) * 100 + '%</td></tr>');


					}

					$('#show_hide_students').click(function() {
						if ($('table.students').hasClass('off')) {
							$('table.students').removeClass('off');
							$('#show_hide_students').html('-');
						} else {
							$('table.students').addClass('off');
							$('#show_hide_students').html('+');
						}
					});
				}
			});
		}
	});
	var iteration = 0;
});

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {
	'packages': ['corechart']
});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {
	var i = setInterval(function() {
		if (ajaxed) {
			drawChart1();
			drawChart2();
			drawChart3();
		}
	}, 100);
}

function drawChart1() {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Choice');
	data.addColumn('number', 'Students');
	data.addRows([
		['1st Choice', got_first],
		['2nd Choice', got_second],
		['3rd Choice', got_third],
		['No choice', got_none],
	]);

	// Set chart options
	var options = {
		'title': 'Students by choice',
		'width': 400,
		'height': 300
	};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart_div1'));
	chart.draw(data, options);
}

function drawChart2() {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Choice');
	data.addColumn('number', 'Students');
	data.addRows([
		['Got one of their choices', got_one],
		['Didn\'t get any of their choices', got_none],
	]);

	// Set chart options
	var options = {
		'title': 'Got One vs. Got None',
		'width': 400,
		'height': 300
	};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart_div2'));
	chart.draw(data, options);
}

function drawChart3() {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Choice');
	data.addColumn('number', 'Students');
	data.addRows([
		['In a section with a peer', got_peers],
		['In a section with no peers', (numstudents - got_peers)]
	]);

	// Set chart options
	var options = {
		'title': 'Students by peers',
		'width': 400,
		'height': 300
	};

	// Instantiate and draw our chart, passing in some options.
	var chart = new google.visualization.PieChart(document.getElementById('chart_div3'));
	chart.draw(data, options);
}