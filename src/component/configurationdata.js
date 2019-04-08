const URLmapping = {
	"mapping": [
		{
			"text": "Home",
			"icon": "hotel",
			"href": "#/",
			"severity": ["Admin", "Manager", "Editor", "Tester", "User"],
			"mapping": []
		},
		{
			"text": "Search",
			"icon": "search",
			"href": "#/search",
			"severity": ["Admin", "Manager", "Editor", "Tester", "User"],
			"mapping": []
		},
		{
			"text": "Settings",
			"icon": "tools",
			"href": "",
			"severity": ["Admin"],
			"mapping": [
				{
					"text": "Project",
					"icontext": "PR",
					"href": "#/utility/project",
					"severity": ["Admin"]
				},
				{
					"text": "Location",
					"icontext": "LC",
					"href": "#/utility/location",
					"severity": ["Admin"]
				},
				{
					"text": "Employee",
					"icontext": "EM",
					"href": "#/utility/employee",
					"severity": ["Admin"]
				}
			]
		},
		{
			"text": "Planning",
			"icon": "tag",
			"href": "",
			"severity": ["Admin", "Manager", "Editor"],
			"mapping": [
				{
					"text": "Business Impact",
					"icontext": "BI",
					"href": "#/planning/businessimpact",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Risk Assessment",
					"icontext": "RA",
					"href": "#/planning/riskassessment",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Recovery Objectives",
					"icontext": "RO",
					"href": "#/planning/recoveryobjective",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Away Team",
					"icontext": "AT",
					"href": "#/planning/awayteam",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Seating Arrangement",
					"icontext": "SA",
					"href": "#/planning/seatingarragement",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Escalation",
					"icontext": "ES",
					"href": "#/planning/escalation",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Communications Tree",
					"icontext": "CT",
					"href": "#/planning/communicationtree",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Hardware Specification",
					"icontext": "HS",
					"href": "#/planning/hardwarespecification",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Software Specification",
					"icontext": "SS",
					"href": "#/planning/softwarespecifcation",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Test Planning",
					"icontext": "TP",
					"href": "#/planning/testplanning",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Submit",
					"icontext": "SU",
					"href": "#/planning/plansubmit",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Review",
					"icontext": "RE",
					"href": "#/planning/planreview",
					"severity": ["Admin", "Manager"]
				}
			]
		},
		{
			"text": "Testing",
			"icon": "tasks",
			"href": "",
			"severity": ["Admin", "Manager", "Tester"],
			"mapping": [
				{
					"text": "Create Test Planning",
					"icontext": "CP",
					"href": "#/testing/createtestplan",
					"severity": ["Admin", "Tester"]
				},
				{
					"text": "Review Plan",
					"icontext": "RP",
					"href": "#/testing/reviewtestplan",
					"severity": ["Admin", "Manager"]
				},
				{
					"text": "View Plan",
					"icontext": "VP",
					"href": "#/testing/viewapprovedplan",
					"severity": ["Admin", "Manager"]
				},
				{
					"text": "Create Test Report",
					"icontext": "CR",
					"href": "#/testing/createtestreport",
					"severity": ["Admin", "Tester"]
				},
				{
					"text": "Review Test Report",
					"icontext": "RP",
					"href": "#/testing/reviewtestreport",
					"severity": ["Admin", "Manager"]
				},
				{
					"text": "View Test Report",
					"icontext": "VP",
					"href": "#/testing/viewtestreport",
					"severity": ["Admin", "Manager"]
				}
			]
		},
		{
			"text": "Structure",
			"icon": "solar-panel",
			"href": "",
			"severity": ["Admin"],
			"mapping": [
				{
					"text": "Champions",
					"icontext": "CH",
					"href": "#/structure/champions",
					"severity": ["Admin"]
				},
				{
					"text": "Committees",
					"icontext": "CM",
					"href": "#/structure/comittees",
					"severity": ["Admin"]
				},
				{
					"text": "Councils",
					"icontext": "CU",
					"href": "#/structure/councils",
					"severity": ["Admin"]
				}
			]
		},
		{
			"text": "Doc Library",
			"icon": "book",
			"href": "",
			"severity": ["Admin"],
			"mapping": [
				{
					"text": "Other documents",
					"icontext": "OD",
					"href": "#/document/otherdocuments",
					"severity": ["Admin"]
				},
				{
					"text": "Test scheduler",
					"icontext": "TS",
					"href": "#/document/testscheduler",
					"severity": ["Admin"]
				},
				{
					"text": "Site mapping ",
					"icontext": "SM",
					"href": "#/document/sitemapping",
					"severity": ["Admin"]
				}
			]
		},
		{
			"text": "Contact Us",
			"icon": "phone-volume",
			"href": "#/contact",
			"severity": ["Admin"],
			"mapping": []
		}
	]
}

const TableColumnMapping = {
	"EmployeeTable": [{"dataTitle":"id", "dataField":"id", "isKey":true},{"dataTitle":"First Name", "dataField":"fName"}, {"dataTitle":"Last Name", "dataField":"lName"}, 
		{"dataTitle":"PrimaryNumber", "dataField":"primaryNumber"}, {"dataTitle":"Secondary Number", "dataField":"secondaryNumber"}, 
		{"dataTitle":"Role", "dataField":"role"}, {"dataTitle":"Address", "dataField":"address"}],
	"LocationTable": [{"dataTitle":"Country", "dataField":"country"}, {"dataTitle":"Location", "dataField":"location",required:true},{"dataTitle":"Location Code", "dataField":"id", "isKey":true} 
		],	
	"ProjectTable": [{"dataTitle":"Project Name", "dataField":"projectName"}, {"dataTitle":"Project Code", "dataField":"id","isKey":true}, 
		{"dataTitle":"Project Description", "dataField":"projectDesc"}],	
	"BussinessImpact": [{"dataTitle":"id", "dataField":"id","isKey":true,hidden:true},{"dataTitle":"Time", "dataField":"TIMEFRAME"}, {"dataTitle":"Service / Project","dataField":"PROJECT"},{"dataTitle":"Tasks", "dataField":"TASK"}, {"dataTitle":"Business / Financial Impact", "dataField":"BUSINESSIMPACT"}, {"dataTitle":"Comments", "dataField":"COMMENTS"},{"dataTitle":"Status", "dataField":"STATUS",editable:false}],
		 
	 "RiskAssessment": [{"dataTitle":"Risk Id", "dataField":"id","isKey":true}, {"dataTitle":"Vulnerable Enabler", "dataField":"VULNERABLE"}, {"dataTitle":"Risk Description", "dataField":"RISKDESC"}, {"dataTitle":"Likelihood", "dataField":"LIKELIHOOD"}, 
		 {"dataTitle":"Impact Description", "dataField":"IMPACTDESC"}, {"dataTitle":"Impact Rating", "dataField":"IMPACTRATING"}, {"dataTitle":"Risk Level", "dataField":"RISKLEVEL"}, {"dataTitle":"Risk Mitigation", "dataField":"RISKMITIGATION"}, 
		 {"dataTitle":"Risk Contingency", "dataField":"RISKCONTINGENCY"}, {"dataTitle":"Owner", "dataField":"RESPONSIBLEOWNER"},{"dataTitle":"Status", "dataField":"STATUS",editable:false}],
		 
	 "RecoveryObjectives": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true},{"dataTitle":"Service / Project/ Process","dataField":"PROJECT"},{"dataTitle": "SLA", "dataField":"SLA"}, {"dataTitle": "Recovery Time Objectives", "dataField":"RECOVERYTIME"}, {"dataTitle": "Recovery Point Objectives", "dataField":"RECOVERYPOINT"}, 
		 {"dataTitle": "Maximum Tolerable Period of Disruption", "dataField":"TOLERABLE"}, {"dataTitle": "Number of total Resources", "dataField":"TOTRESOURCES"}, {"dataTitle": "Number of Critical Resources", "dataField":"CRIRESOURCES"}, 
		 {"dataTitle": "Working Window (IST)", "dataField":"WORKWINDOW"}, {"dataTitle": "Can Working Window Be Extended", "dataField":"EXTWINDOW"}, {"dataTitle": "Window Be Extended By How Much?", "dataField":"EXTWORKWINDOW"}, 
		 {"dataTitle": "Can any security conditions be relaxed?", "dataField":"SEQURITY"}, {"dataTitle": "Can any quality conditions be relaxed?", "dataField":"QUALITY"},{"dataTitle":"Status", "dataField":"STATUS",editable:false}],
		 
	 "AwayTeam": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true},{"dataTitle":"Service / Project","dataField":"PROJECT"},{"dataTitle":"Experts", "dataField":"EXPERTSCOUNT"}, {"dataTitle":"Skill Sets", "dataField":"EXPERTSKILLSET"}, {"dataTitle":"Others", "dataField":"OTHERS"}, 
		 {"dataTitle":"Others Skill Set", "dataField":"SKILLSET"},{"dataTitle":"Status", "dataField":"STATUS",editable:false}],
		 
	 "SeatingInformation": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true},{"dataTitle":"Seating Arrangement", "dataField":"COMMENTS"},{"dataTitle":"Status", "dataField":"STATUS",editable:false}],
		 
	 "CommunicationPlan": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true},{"dataTitle":"Rating", "dataField":"RATING"}, {"dataTitle":"Impact", "dataField":"IMPACT"}, {"dataTitle":"Response", "dataField":"RESPONSE"}, {"dataTitle":"Escalation", "dataField":"ESCALATION"},{"dataTitle":"Status", "dataField":"STATUS",editable:false}],
		 
	 "CommunicationsTree": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true},{"dataTitle":"Authority", "dataField":"TREEMODE"}, {"dataTitle":"Tree Owner", "dataField":"TREEOWNER"}, {"dataTitle":"Family Name", "dataField":"FAMILYNAME"}, {"dataTitle":"First Name", "dataField":"FIRSTNAME"}, 
		 {"dataTitle":"Known As", "dataField":"NICKNAME"}, {"dataTitle":"Role", "dataField":"ROLES"}, {"dataTitle":"Deputy", "dataField":"DEPUTY"}, {"dataTitle":"Cascade From", "dataField":"CASCADEFROM"}, 
		 {"dataTitle":"Available", "dataField":"AVAILABLE"}, {"dataTitle":"Home No", "dataField":"HOMENUMBER"}, {"dataTitle":"Mobile No", "dataField":"MOBILENUMBER"}, {"dataTitle":"Office No", "dataField":"OFFICENUMBER"}, 
		 {"dataTitle":"Recidence Address", "dataField":"RESIDENCE"}, {"dataTitle":"Town", "dataField":"TOWN"},{"dataTitle":"Status", "dataField":"STATUS",editable:false}],
		 
	 "HardWareSpecifications": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true},{"dataTitle":"Status", "dataField":"STATUS",editable:false},{"dataTitle":"Type", "dataField":"CONFIGURATIONTYPE"}, {"dataTitle":"Responsibility", "dataField":"RESPONSIBILITY"}, {"dataTitle":"Details", "dataField":"DETAILS"}],
		 
	 "SoftwareSpecifications": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true},{"dataTitle":"Status", "dataField":"STATUS",editable:false},{"dataTitle":"Type", "dataField":"CONFIGURATIONTYPE"}, {"dataTitle":"Responsibility", "dataField":"RESPONSIBILITY"}, {"dataTitle":"Details", "dataField":"DETAILS"}],
		 
	 "TestPlanning": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true},{"dataTitle":"Type of Test", "dataField":"TESTTYPE"}, {"dataTitle":"Frequency", "dataField":"FREQUENCY"}, {"dataTitle":"Details of Test", "dataField":"DETAILS"}, {"dataTitle":"Remarks", "dataField":"REMARKS"},{"dataTitle":"Status", "dataField":"STATUS",editable:false}],
	 
	 "PreviewPlanningTest" : [{"dataField": "empId","dataTitle" : "Emp Id"},{"dataField": "empName","dataTitle" : "Emp Name"},{"dataField": "empContNo","dataTitle" : "Emp Contact no"}],
	 "CreateTestReport" : [{"dataField": "empId","dataTitle" : "Emp Id"},{"dataField": "empName","dataTitle" : "Emp Name"},{"dataField": "empContNo","dataTitle" : "Emp Contact no"},{"dataField": "ATTEMPT_COUNT","dataTitle" : "No. of Attempts"}],
	 "ViewTestingReport" : [{"dataField": "empId","dataTitle" : "Emp Id"},{"dataField": "empName","dataTitle" : "Emp Name"},{"dataField": "empContNo","dataTitle" : "Emp Contact no"},{"dataField": "ContactedYesorNo","dataTitle" : "Contacted Y/N"},{"dataField": "ATTEMPT_COUNT","dataTitle" : "No. of Attempts"}],
	"CommunicationCallTreeDetails": [{"dataTitle":"id", "dataField":"id","editable":true,"isKey":true},{"dataTitle":"Employee Name", "dataField":"username",editable:false}, {"dataTitle":"Mobile Number", "dataField":"primaryNumber",editable:false}],
}

const TableReferenceMapping = {
	"BusinessimpactTime":["0-4 hrs","4-8 hrs","8-12 hrs"]
}

const GridColumnMapping = {
	"ReviewTestPlan":[{"dataTitle":"Project Details", "dataField":"projectDetails",dataFormat:true},{"dataTitle":"Test Plan Status", "dataField":"status"}, {"dataTitle":"Test Plan Date", "dataField":"testPlanDate"}]
}


export {
	TableColumnMapping,
	URLmapping,
	TableReferenceMapping,
	GridColumnMapping
}