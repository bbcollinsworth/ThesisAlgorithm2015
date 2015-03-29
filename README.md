The two files used to run the algorithm are:

- index.php (which displays results of each run upon refresh)
- wow.js (the JavaScript that actually contains the algorithm and related data parsing and results display code)

In order to work, these files also need both a "students.json" and "teachers.json" file.

"students.json" must be formatted as follows, then uploaded to the same location as the wow.js and index.php files:

{<br />
	"students": [{<br />
		"name": "Last, First",<br />
		"NetID": "N00XXXXXX",<br />
		"choices": "Teacher1st Teacher2nd Teacher3rd",<br />
		"peers": "N00XXXXXX N00XXXXXX N00XXXXXX N00XXXXXX",<br />
		"thesis": -1<br />
	}, {<br />
		"name": "Last, First",<br />
		"NetID": "N00XXXXXX",<br />
		"choices": "Teacher1st Teacher2nd Teacher3rd",<br />
		"peers": "N00XXXXXX N00XXXXXX N00XXXXXX N00XXXXXX",<br />
		"thesis": -1<br />
	}, <br />
		 etc...<br />
	]<br />
}<br />
<br />
"teachers.json" must be formatted as follows, then uploaded to the same location:<br />
<br />
{<br />
	"teachers": [{<br />
		"name": "FirstThesisTeacher'sLastName",<br />
		"choices": "N00XXXXXX N00XXXXXX N00XXXXXX N00XXXXXX N00XXXXXX"<br />
	}, {<br />
		"name": "SecondThesisTeacher'sLastName",<br />
		"choices": "N00XXXXXX N00XXXXXX N00XXXXXX N00XXXXXX N00XXXXXX"<br />
	}, <br />
		etc...<br />
	]<br />
}<br />
<br />
Once all these files are uploaded, navigate to index.php in a browser to run the algorithm. Refresh the page to keep re-running for different results -- but NOTE that you should copy-paste out any results you want to save before you re-run.
	
