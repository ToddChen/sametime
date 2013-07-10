$(document).ready(function(){	
	$('.sametime').each(function(){
		var email = $(this).attr('email');
		var schedule = $(this).attr('schedule');
		if(schedule)
			getStatus(email, schedule*1000);
		else 
			getStatus(email);
	});	
	$('.sametime').bind('click',invokeSametime);
});
function getStatus(email, schedule)
{
	$.ajax({
		url: 'http://localhost:59449/stwebapi/getstatus',
		data : {userId:email,
				jsonp: 'jsonpCallback'},
		cache: false,
		type: 'GET', 
		dataType: 'jsonp' 
	});
	if(schedule) setTimeout('getStatus("'+email+'",'+schedule+')',schedule);
}

function jsonpCallback(data) {  
	var el = $('.sametime[email="'+data.username+'"]');
	el.removeClass('offline active away disturb meeting');
	switch(data.status)
	{
	case 0: 
		el.addClass('offline');
		break;
	case 1: 
		el.addClass('active');
		break;
	case 2: 
		el.addClass('away');
		break;
	case 3: 
		el.addClass('disturb');
		break;
	case 4: 
		el.addClass('away');
		break;
	case 5: 
		el.addClass('meeting');
		break;
	default: 
		//statusSpan.addClass('offline');
	}
	
};  

function invokeSametime()
{
	var email = $(this).attr('email');
	$.ajax({
		url: 'http://localhost:59449/stwebapi/chat?userId='+email,
		cache: false,
		type: 'get',
		dataType: 'jsonp',
		contentType: "application/x-www-form-urlencoded;charset=utf-8",
		success: function(){},
		error: function(){}
	});
}