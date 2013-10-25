//JSONP version
//we get a json array and manipulate it.

function getItemJSONP(urlTemp) {
    //alert(urlTemp);
    jQuery.ajax({
        url: urlTemp,
        dataType: "jsonp",
        success: function(data) 
        {

            var arrayWithJSONS = JSON.parse(data);
            console.log(arrayWithJSONS);
            
            var item = arrayWithJSONS[0];
            
             //-- //if languageBlocks is array
            
             //-- //if languageBlocks has ONLY one value => not array
            if (item.languageBlocks.length == undefined && item.languageBlocks !== undefined) 
            {
            	console.log("dupper");
            	//keys for different language versions of this item. (i.e en, gr, no,)
                var language = Object.keys(arrayWithJSONS[0].languageBlocks); 
                
                /////get always language "en" else the first one
                if (arrayWithJSONS[0].languageBlocks['en'] == undefined) 
                {
                    languageBlock = arrayWithJSONS[0].languageBlocks[language[0]]; // We always get language[0] as key
                } 
                else 
                {
                    languageBlock = arrayWithJSONS[0].languageBlocks['en']; // We always get language['en'] as key
                }
                
                //----------------MORE INFO
                
                //-Language
                if (item.expressions[0].language !== undefined) 
                {
                    jQuery('#itemLanguage').append('<span class="flag ' + item.expressions[0].language + 'flag">' + item.expressions[0].language + '</span>');
                }
                
                //-Format
                if (item.expressions[0].manifestations[0].parameter !== undefined) 
                {
                    jQuery('#itemFormat').append( getElement(item.expressions[0].manifestations[0].parameter ));
                }
                
                //-Date
                if(item.contributors[0]!=undefined)
                {
	                jQuery('#itemDate').append(getElement(item.contributors[0].date ).split('T')[0]);
                }
                else
                {
	                jQuery('#itemDate').append("-");
                }
                
                
                //-Type
                if(item.tokenBlock.learningResourceTypes!=undefined)
                {
                	document.getElementById('itemType').innerHTML = getElement(item.tokenBlock.learningResourceTypes[0]);
                }
                else
                {
	                document.getElementById('itemType').innerHTML = "-";
                }
                

                //-Intended User Roles
                if(item.tokenBlock.endUserRoles!=undefined)
                {
                	document.getElementById('itemTargetAudience').innerHTML = getElement(item.tokenBlock.endUserRoles[0]);
                }
                else
                {
	                document.getElementById('itemTargetAudience').innerHTML = "-";
                }
                
                
                
                //-------------CENTER DIV INFO
                //-Title
                if (languageBlock.title !== undefined) 
                {
                    var thisTitle = languageBlock.title;
                    if (arrayWithJSONS[0].expressions[0].manifestations[0].items[0].url !== undefined) {
                        thisTitle = "<a target=\"_blank\" href=\"" + arrayWithJSONS[0].expressions[0].manifestations[0].items[0].url + "\">" + languageBlock.title + "</a>"
                    }
                    document.getElementById('itemTitle').innerHTML = thisTitle;
                }
                
                //-Description
                document.getElementById('itemDescription').innerHTML = getElement(languageBlock.description);

				//-Access to the resource
				if (item.expressions[0].manifestations[0].items[0].url !== undefined) 
				{
                    jQuery('#itemAccess').append('<a target="_blank" href="' 
                    + item.expressions[0].manifestations[0].items[0].url + '" class="access  secondary">Access to the resource</a>');
                }
                
                //-Keywords
                if (languageBlock.keywords !== undefined && languageBlock.keywords.length !== undefined) 
                {
                   //*ARRAY of keywords in current version
                   for (var j = 0; j < languageBlock.keywords.length; j++) 
                    {
                        if (j == languageBlock.keywords.length - 1) 
                        {
                            jQuery('#itemKeywords').append('<a  href="listing.html?query=' 
                            + languageBlock.keywords[j] + '" class="forKomma link last">' + languageBlock.keywords[j] + '</a>');
                        } else {
                            jQuery('#itemKeywords').append('<a  href="listing.html?query=' 
                            + languageBlock.keywords[j] + '" class="forKomma link">' + languageBlock.keywords[j] + '</a>');
                        }
                    }
                }
                
                //-Type Of Event (context)
                if (item.tokenBlock.contexts !== undefined) {
                    for (var j = 0; j < item.tokenBlock.contexts.length; j++) //*ARRAY of keywords in current version
                    {
                        if (j == item.tokenBlock.contexts.length - 1) {
                            jQuery('#itemTypeOfEvent').append('<span class="forKomma last">' + item.tokenBlock.contexts[j] + '<span>');
                        } else {
                            jQuery('#itemTypeOfEvent').append('<span class="forKomma">' + item.tokenBlock.contexts[j] + '<span>');
                        }
                    }
                }
                
                //-Classification
                if(item.tokenBlock.taxonPaths!=undefined)
                {
	                jQuery('#itemClassification').append(getElement(item.tokenBlock.taxonPaths['en']) );
                }
                else
                {
	                 jQuery('#itemClassification').append("-");
                }
                
                
                //-Rights
                if(item.tokenBlock.description!=undefined)
                {
                	jQuery('#itemRights').append( getElement(item.rights.description['en']));
            	}
                else
                {
	                 jQuery('#itemRights').append("-");
                }
                
                //-Related
                if(item.learningObjectives['Green ideas'])
                {
	                for(var temp in item.learningObjectives['Green ideas'])
	                {
	                    jQuery('#itemRelated').append(getElement(item.learningObjectives['Green ideas'][temp]));
	                }
	            }
                else
                {
	                jQuery('#itemRelated').append("-");
                }
                

			}//--end 'if languageBlocks has ONLY one value'
            
            
        }
        
        
    })
}

function getElement(data)
{
	var element="-";
	
	//console.log(data);
	if(data!=undefined)
	{
		if (data instanceof Object == false) 
		{
		  if(data!=undefined)
		  {
		      element = data;
		  }
		}
		else
		{
		  if(data!=undefined && data.length > 0 )
		  {
		  	element="";
		  	for(var i=0, length = data.length; i<length; i++)
		  	{
		  		if(i=0){element = data[i];}
		  		else{element = element+", "+data[i];}
		  	}
		  }
		  
		  var element = Object.keys(data)
		 
		}
		
	}	
	return element;

}

// ADD THE LINK TO THE BANNER IMAGES

function imageClick(url) { window.location = url; }