/////////////////////////////////////////////////////////////////////
// setup the In Line Routing object
/////////////////////////////////////////////////////////////////////
var $ilr = {
	// object prop
	activePage: '',
	spaName: '',
	spaUrl: '',
    
    // control value
    uriVar: '',
	fileExt: 'php',
	
	// this is called in the active page to setup the object
	// Note. this should only be setup once for a spa Application
	initialize: function(){
		this.spaName = this.getCurrentFile();
	},
	
	// get the current spa file name
	getCurrentFile: function(){
		// this will be the final file name as a string
		var currentFile = window.document.URL;
		// clear any hashs
		if(currentFile.indexOf("#")>0)
		{
			currentFile = currentFile.split("#")[0];
		}
		// clear any values
		if(currentFile.indexOf("?")>0)
		{
			currentFile = currentFile.split("?")[0];
		}
		// set the current webSite
		this.spaUrl = currentFile;
		// clear leading directories
		if(currentFile.indexOf("/")>0)
		{
			var dirLength = currentFile.split("/").length;
			currentFile = currentFile.split("/")[dirLength-1];
		}
		
		return currentFile;
	},
	
	// if you need to reset the URL to the base route
	resetRoute: function() {
		window.history.pushState();
	},
	
	// set the URI route
	set: function(options) {
		
		if(options.route === true) $_GET = [];
		if(options.page === undefined) options.page = "";
		
		var uri = "";
		
		$_GET[options.route] = options.value;
		
		for(i in $_GET)
		{
			if(i!='')
			{
				uri += i + '=' + $_GET[i] + '&';
			}
		}
		
		uri = uri.replace(/&$/, '');
				
		window.history.pushState(
			{ 
				page: options.dataValue 
			},
			options.page, 
			this.spaName+'?'+uri
		);
		this.activePage = options.page;
	}
}

/////////////////////////////////////////////////////////////////////
// construct a $_GET style array of the URI
// note this will be a pivital tool for $ilr
/////////////////////////////////////////////////////////////////////
var $_GET = {};
var parts = window.location.search.substr(1).split("&");
for (var i = 0; i < parts.length; i++)
{
	var temp = parts[i].split("=");
	$_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
}

/////////////////////////////////////////////////////////////////////
// initialize the $ilr object 
/////////////////////////////////////////////////////////////////////
$ilr.initialize();