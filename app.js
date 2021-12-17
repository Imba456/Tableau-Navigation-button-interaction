console.log("Hello DSX!🎈");

//create an url variable
const url =
  "https://public.tableau.com/views/LearnEmbeddedAnalytics_16397517319010/SalesOverviewDashboard?:language=en-US&:display_count=n&:origin=viz_share_link"
  ;
//create an options variable
const options = {
  device: "desktop",
};
//create a varaible for the vizcontainer linked to the html
const vizContainer = document.getElementById("vizContainer");

//create a function to render the tableau viz
function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
  console.log("viz loaded😁");
}

//run this function on the first load of the page
document.addEventListener("DOMContentLoaded", initViz);

//create a variable for the buttons
const showVizbutton = document.getElementById("showViz");
const hideVizbutton = document.getElementById("hideViz");

//create functions for the buttons
function showViz() {
  viz.show();
}

function hideViz() {
  viz.hide();
}

//to access viz we need to define it first as previously it was defined within a function - we remove the const from the function
let viz;

//create event listeners for the buttons
showVizbutton.addEventListener("click", showViz);
hideVizbutton.addEventListener("click", hideViz);

//Create variables for PDF and PPT buttons
const exportPDFbutton = document.getElementById("exportPDF");
const exportPPTbutton = document.getElementById("exportPPT");

//create functions for PDF and PPT buttons
function exportPDFfunction() {
  viz.showExportPDFDialog();
  console.log("PDF export loading");
}

function exportPPTfunction() {
  viz.showExportPowerPointDialog();
}

//create event listeners for the buttons PPT and PDF
exportPDFbutton.addEventListener("click", exportPDFfunction);
exportPPTbutton.addEventListener("click", exportPPTfunction);

// function on getting the range values and applying them to the sheet
function getRangeValues() {
  //get values from min and max
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  //get the workbook object
  const workbook = viz.getWorkbook();
  const activesheet = workbook.getActiveSheet();
  const sheets = activesheet.getWorksheets();
  const sheetToFilter = sheets[(0, 1)];
  sheetToFilter.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
  console.log("getrangevalues applied");
}

document.getElementById("applyBtn").addEventListener("click", getRangeValues);
