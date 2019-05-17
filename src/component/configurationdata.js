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
			"severity": ["Admin", "Manager"],
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
					"text": "Create BC Plan",
					"icontext": "CP",
					"href": "#/planning/createplan",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "Review BC Plan",
					"icontext": "RE",
					"href": "#/planning/planreview",
					"severity": ["Admin", "Manager"]
				},
				{
					"text": "Modify BC Plan",
					"icontext": "RP",
					"href": "#/planning/planreviewpending",
					"severity": ["Admin", "Editor"]
				},
				{
					"text": "View BC Plan",
					"icontext": "VP",
					"href": "#/planning/viewplan",
					"severity": ["Admin", "Manager"]
				}/*,
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
				}*/
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
					"text": "Review Test Plan",
					"icontext": "RP",
					"href": "#/testing/reviewtestplan",
					"severity": ["Admin", "Manager"]
				},
				{
					"text": "View Test Plan",
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
		,{"dataTitle":"Password", "dataField":"password"},{"dataTitle":"PrimaryNumber", "dataField":"primaryNumber"}, {"dataTitle":"Secondary Number", "dataField":"secondaryNumber"}, 
		{"dataTitle":"Role", "dataField":"role",editable:{type: 'select', options: { values: ['Admin','Tester','Manager','Editor']}}}, {"dataTitle":"Address", "dataField":"address"}],
	"LocationTable": [{"dataTitle":"Country", "dataField":"country"}, {"dataTitle":"Location", "dataField":"location",required:true},{"dataTitle":"Location Code", "dataField":"id", "isKey":true} 
		],	
	"ProjectTable": [{"dataTitle":"Project Name", "dataField":"projectName"}, {"dataTitle":"Project Code", "dataField":"id","isKey":true}, 
		{"dataTitle":"Project Description", "dataField":"projectDesc"}],	
	"BussinessImpact": [{"dataTitle":"id", "dataField":"id","isKey":true,autoValue:true,hidden:true},{"dataTitle":"Time", "dataField":"TIMEFRAME"}, {"dataTitle":"Service / Project","dataField":"PROJECT"},{"dataTitle":"Tasks", "dataField":"TASK",editable:{ type:'textarea'}}, {"dataTitle":"Business / Financial Impact", "dataField":"BUSINESSIMPACT",editable:{ type:'textarea'}}, {"dataTitle":"Comments", "dataField":"COMMENTS",editable:{ type:'textarea'}},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
		 
	 "RiskAssessment": [{"dataTitle":"Risk Id", "dataField":"id","isKey":true}, {"dataTitle":"Vulnerable Enabler", "dataField":"VULNERABLE"}, {"dataTitle":"Risk Description", "dataField":"RISKDESC",editable:{ type:'textarea'}}, {"dataTitle":"Likelihood", "dataField":"LIKELIHOOD"}, 
		 {"dataTitle":"Impact Description", "dataField":"IMPACTDESC",editable:{ type:'textarea'}}, {"dataTitle":"Impact Rating", "dataField":"IMPACTRATING"}, {"dataTitle":"Risk Level", "dataField":"RISKLEVEL"}, {"dataTitle":"Risk Mitigation", "dataField":"RISKMITIGATION",editable:{ type:'textarea'}}, 
		 {"dataTitle":"Risk Contingency", "dataField":"RISKCONTINGENCY",editable:{ type:'textarea'}}, {"dataTitle":"Owner", "dataField":"RESPONSIBLEOWNER"},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
		 
	 "RecoveryObjectives": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true,autoValue:true},{"dataTitle":"Service / Project/ Process","dataField":"PROJECT"},{"dataTitle": "SLA", "dataField":"SLA"}, {"dataTitle": "Recovery Time Objectives", "dataField":"RECOVERYTIME"}, {"dataTitle": "Recovery Point Objectives", "dataField":"RECOVERYPOINT",editable:{ type:'textarea'}}, 
		 {"dataTitle": "Maximum Tolerable Period of Disruption", "dataField":"TOLERABLE",editable:{ type:'textarea'}}, {"dataTitle": "No. of total Resources", "dataField":"TOTRESOURCES"}, {"dataTitle": "No. of Critical Resources", "dataField":"CRIRESOURCES"}, 
		 {"dataTitle": "Working Window (IST)", "dataField":"WORKWINDOW",editable:{ type:'textarea'}}, {"dataTitle": "Can Working Window Be Extended", "dataField":"EXTWINDOW"}, {"dataTitle": "Window Be Extended By How Much?", "dataField":"EXTWORKWINDOW"}, 
		 {"dataTitle": "Can any security conditions be relaxed?", "dataField":"SEQURITY"}, {"dataTitle": "Can any quality conditions be relaxed?", "dataField":"QUALITY"},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
		 
	 "AwayTeam": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true,autoValue:true},{"dataTitle":"Service / Project","dataField":"PROJECT"},{"dataTitle":"Experts", "dataField":"EXPERTSCOUNT"}, {"dataTitle":"Skill Sets", "dataField":"EXPERTSKILLSET",editable:{ type:'textarea'}}, {"dataTitle":"Others", "dataField":"OTHERS"}, 
		 {"dataTitle":"Others Skill Set", "dataField":"SKILLSET",editable:{ type:'textarea'}},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
		 
	 "SeatingInformation": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true,autoValue:true},{"dataTitle":"Seating Arrangement", "dataField":"COMMENTS",editable:{ type:'textarea'}},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
		 
	 "CommunicationPlan": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true,autoValue:true},{"dataTitle":"Rating", "dataField":"RATING"}, {"dataTitle":"Impact", "dataField":"IMPACT",editable:{ type:'textarea'}}, {"dataTitle":"Response", "dataField":"RESPONSE",editable:{ type:'textarea'}}, {"dataTitle":"Escalation", "dataField":"ESCALATION",editable:{ type:'textarea'}},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
		 
	 "CommunicationsTree": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true,autoValue:true},{"dataTitle":"Authority", "dataField":"TREEMODE"}, {"dataTitle":"Tree Owner", "dataField":"TREEOWNER"}, {"dataTitle":"Family Name", "dataField":"FAMILYNAME"}, {"dataTitle":"First Name", "dataField":"FIRSTNAME"}, 
		 {"dataTitle":"Known As", "dataField":"NICKNAME"}, {"dataTitle":"Role", "dataField":"ROLES"}, {"dataTitle":"Deputy", "dataField":"DEPUTY"}, {"dataTitle":"Cascade From", "dataField":"CASCADEFROM"}, 
		 {"dataTitle":"Available", "dataField":"AVAILABLE"}, {"dataTitle":"Home No", "dataField":"HOMENUMBER"}, {"dataTitle":"Mobile No", "dataField":"MOBILENUMBER"}, {"dataTitle":"Office No", "dataField":"OFFICENUMBER"}, 
		 {"dataTitle":"Recidence Address", "dataField":"RESIDENCE",editable:{ type:'textarea'}}, {"dataTitle":"Town", "dataField":"TOWN"},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
		 
	 "HardWareSpecifications": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true,autoValue:true},{"dataTitle":"Type", "dataField":"CONFIGURATIONTYPE"}, {"dataTitle":"Responsibility", "dataField":"RESPONSIBILITY"}, {"dataTitle":"Details", "dataField":"DETAILS",editable:{ type:'textarea'}},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
		 
	 "SoftwareSpecifications": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true,autoValue:true},{"dataTitle":"Type", "dataField":"CONFIGURATIONTYPE"}, {"dataTitle":"Responsibility", "dataField":"RESPONSIBILITY"}, {"dataTitle":"Details", "dataField":"DETAILS",editable:{ type:'textarea'}},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
		 
	 "TestPlanning": [{"dataTitle":"id", "dataField":"id","hidden":true,"editable":true,"isKey":true,autoValue:true},{"dataTitle":"Type of Test", "dataField":"TESTTYPE"}, {"dataTitle":"Frequency", "dataField":"FREQUENCY"}, {"dataTitle":"Details of Test", "dataField":"DETAILS",editable:{ type:'textarea'}}, {"dataTitle":"Remarks", "dataField":"REMARKS",editable:{ type:'textarea'}},{"dataTitle":"Reviewer Comments", "dataField":"REVIEWERCOMMENTS",editable:false,hidden:true},{"dataTitle":"Author Comments", "dataField":"AUTHORCOMMENTS",editable:false,hidden:true}],
	 
	 "PreviewPlanningTest" : [{"dataField": "empId","dataTitle" : "Emp Id"},{"dataField": "empName","dataTitle" : "Emp Name"},{"dataField": "empContNo","dataTitle" : "Emp Contact no"}],
	 "CreateTestReport" : [{"dataField": "empId","dataTitle" : "Emp Id"},{"dataField": "empName","dataTitle" : "Emp Name"},{"dataField": "empContNo","dataTitle" : "Emp Contact no"},{"dataField": "ATTEMPT_COUNT","dataTitle" : "No. of Attempts"}],
	 "ViewTestingReport" : [{"dataField": "empId","dataTitle" : "Emp Id"},{"dataField": "empName","dataTitle" : "Emp Name"},{"dataField": "empContNo","dataTitle" : "Emp Contact no"},{"dataField": "ContactedYesorNo","dataTitle" : "Contacted Y/N"},{"dataField": "ATTEMPT_COUNT","dataTitle" : "No. of Attempts"}],
	"CommunicationCallTreeDetails": [{"dataTitle":"id", "dataField":"id","editable":true,"isKey":true,autoValue:true},{"dataTitle":"Employee Name", "dataField":"username",editable:false}, {"dataTitle":"Mobile Number", "dataField":"primaryNumber",editable:false}, {"dataTitle":"No Of Attempts", "dataField":"NoOfAttempts","editable":true,hidden:true}, {"dataTitle":"Contacted Y/N", "dataField":"NoOfAttempts","editable":false,hidden:true,dataFormat:true}],
	"CommCallTreewithoutContacted": [{"dataTitle":"id", "dataField":"id","editable":true,"isKey":true,autoValue:true},{"dataTitle":"Employee Name", "dataField":"username",editable:false}, {"dataTitle":"Mobile Number", "dataField":"primaryNumber",editable:false}],
	"ViewBCPlan": [{"dataTitle":"Project", "dataField":"project",dataFormat:true},{"dataTitle":"Location", "dataField":"location"},{"dataTitle":"Status", "dataField":"STATUS"}],
}

const TableReferenceMapping = {
	"BusinessimpactTime":["0-4 hrs","4-8 hrs","8-12 hrs"]
}
const monthNames = ["","January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]
const GridColumnMapping = {
	"ReviewTestPlan":[{"dataTitle":"Project Details", "dataField":"projectDetails",dataFormat:true},{"dataTitle":"Test Plan Status", "dataField":"status",dataFormat:true}, {"dataTitle":"Test Plan Date", "dataField":"testPlanDate"}]
	,"SearchTestPlanReport":[{"dataTitle":"Project Details", "dataField":"projectDetails",dataFormat:true},{"dataTitle":"Test Plan Status", "dataField":"status",dataFormat:true}, {"dataTitle":"Test Plan Date", "dataField":"testPlanDate"}, {"dataTitle":"Test Report Status", "dataField":"reportstatus"}]
}


export {
	TableColumnMapping,
	URLmapping,
	TableReferenceMapping,
	GridColumnMapping,
	monthNames
}