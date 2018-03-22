function AJAXInteraction(url, callback) {
    this.doGet = function() {
		$.ajax({
		    url: url,
		    context: document.body,
		    success: function (data) {
		        callback(data);
		    }
		});
    };

}
