// router controller
$ilr.route = {
	active:  [],
	isActive: function($index, $route){
		addRecord = true;
		overWrite = 0;
		
		//console.log("length: " + this.active.length);
		for(i=0; i<=this.active.length; i++)
		{
			if(this.active[i] !== undefined)
			{
				if(this.active[i][0] == $index)
				{
					$ilr.route.active[i][1] = $route;
				}
				else
				{
					$ilr.route.active[$ilr.route.active.length] = [$index, $route];
				}
			}
		}
	}
};

$ilr.defaults = function(defaultArray) {
	
	for(i=0; i<defaultArray.length; i++)
	{	
		routeID = defaultArray[i][0];
		routeUri = defaultArray[i][1];
		
		if($_GET[routeID] == undefined)
		{
			 $ilr.controller(routeID, routeUri);
		}
	}
}

$ilr.loader = function(options) {
	console.log('Target: ' + options.target);
	console.log('URI: ' + options.uri);
}

$ilr.controller = function(routeId, routeString) {
	
    $ilr.uriVar = routeId;
    // there might be multiple routes, so we split them
    rArray = routeString.split('//');
    // now we will loop through each route
    for(i in rArray)
    {
		//console.log(i);
        // split upt the route to be converted into the uri
        rParts = rArray[i].split(':');
		
        // update the browser url
        $ilr.set({ 
                route: this.uriVar,
				value: routeString
        });
        
        // modules my have sub folders, this controller uses '-' to id the folder
        moduleDir = rParts[1]; //.replace(/-/g, '/');
        
        // same applies for the view file
        varArray = rParts[2].split('/');
        
        // construct the properties extension
        propArray = [];
        for(i=0; i<varArray.length; i+=2)
        {
            propArray[propArray.length] = varArray[i] + '=' + varArray[i+1];
        }
		
        // create the uri for the ajax call
        target = '' + moduleDir + '.' + $ilr.fileExt + '?' + propArray.join('&');
		
		$ilr.route.isActive(rParts[0], target);
				
		$ilr.loader({
			target: rParts[0],
			uri: target
		});
    }
}