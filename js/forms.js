jQuery("document").ready(function () {
    // The DOM is ready!
    // The rest of the code goes here

    jQuery("#test").on("click", function() {
        alert("Hello world");
    });


    jQuery("#car").on("change", function() {
        var selectedValue = jQuery(this).val();
        console.log("selected value is:" , selectedValue); 

        jQuery("#mySelected").html("<div>You have selected: "+ selectedValue+ "</div>")
    });
});