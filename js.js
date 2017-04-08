document.addEventListener("DOMContentLoaded", function(){
	
	//rozwijane podmenu:
	
	var menu = document.querySelector(".menu");  
	
	var submenu = document.querySelector(".submenu");
	
	submenu.style.display = "none";
	
	var about_us_li = menu.firstElementChild;
	console.log(about_us_li);
	
	about_us_li.addEventListener("mouseover", function(){
		submenu.style.display = "block";
	});
	
	about_us_li.addEventListener("mouseout", function(){
		submenu.style.display = "none";
	});
	
	
	//znikający opis obrazka:
	
	var img1_opacity = document.querySelector(".img1_opacity");
	var img2_opacity = document.querySelector(".img2_opacity");
	
	img1_opacity.addEventListener("mouseover", function(){
		img1_opacity.style.opacity = 0;
	});
	
	
	img1_opacity.addEventListener("mouseout", function(){
		img1_opacity.style.opacity = 1;
	});
	
	
	img2_opacity.addEventListener("mouseover", function(){
		img2_opacity.style.opacity = 0;
	});
	
	
	img2_opacity.addEventListener("mouseout", function(){
		img2_opacity.style.opacity = 1;
	});
	
	
	
	//slajder:
	
	var slideNr = 0;  
	var slider = document.querySelector('.slider_outer');
	var sliderInner = document.querySelector('.slider_inner');
	var slides = document.querySelectorAll('.slider_outer .box');
	var next = document.querySelector('.slider_outer .next');
	var prev = document.querySelector('.slider_outer .prev');
	var slidesLength = slides.length;
	
	var slideWidth = 1000; 
	
	sliderInner.style.width = (slideWidth * slidesLength) + 'px';
	
	prev.addEventListener("click", function(){
		if(slideNr > 0){
			slideNr--;
		}
		else{
			slideNr = slidesLength - 1;
		}
		sliderInner.style.marginLeft = -(slideNr * slideWidth) + 'px';
			
	});
	
	next.addEventListener("click", function(){
		if(slideNr < slidesLength - 1){
			slideNr++;
		}
		else{
			slideNr = 0; 
		} 
		sliderInner.style.marginLeft = -(slideNr * slideWidth) + 'px';
	});
	
	
	//rozwijane pola wyboru:
	
	var list_panel = document.querySelectorAll(".list_panel");
	console.log(list_panel);
	
	for(var i = 0; i < list_panel.length; i++){
		list_panel[i].style.display = "none";
	}
	
	var arrow_down = document.querySelectorAll(".list_arrow_down");
	console.log(arrow_down);
	
	for(var i = 0; i < arrow_down.length; i++){
		arrow_down[i].addEventListener("click", function(){
			
			if (this.className.indexOf("disabled") < 0){
				
				if (this.classList.contains('list_arrow_down')) {
					this.classList.remove('list_arrow_down');
					this.classList.add('list_arrow_up');
					this.nextElementSibling.style.display = "block";
				} else {
					this.classList.add('list_arrow_down');
					this.classList.remove('list_arrow_up');
					this.nextElementSibling.style.display = "none";
				}
			}
			else{
				if(this.className.indexOf("colors") >= 0){
					alert("Wybierz najpierw rodzaj fotela!");
				}
				else if(this.className.indexOf("materials") >= 0){
					alert("Wybierz najpierw kolor fotela!");
				}
				
			}
		});
	}
	
	
	//kalkulator cen
	
	var updatePrice = function() {
		var totalPrice = 0;
		
		var selectedType = document.querySelector('.list_panel.type a.selected');
		var selectedColor = document.querySelector('.list_panel.colors a.selected');
		var selectedFabric = document.querySelector('.list_panel.fabric a.selected');
		
		totalPrice += parseInt(selectedType.attributes['data-price'].value);
		
		// jeśli kolor nie został jeszcze wybrany, to zmienna selctedKolor ma wartość null
		if(selectedColor !== null){
			totalPrice += parseInt(selectedColor.attributes['data-price'].value);	
		}
		
		if(selectedFabric !== null){
			totalPrice += parseInt(selectedFabric.attributes['data-price'].value);	
		}
		
		document.querySelector('.sum strong').innerHTML = totalPrice + ' zł';
	};
	
	
	var types = document.querySelectorAll('.list_panel.type a');
	
	var colors = document.querySelectorAll('.list_panel.colors a');
	
	var fabric = document.querySelectorAll('.list_panel.fabric a');
	
	var type_name = document.querySelector(".type_name");
	var chair_color = document.querySelector(".chair_color");
	var color_value = document.querySelector(".chair_color.value");
	var chair_pattern = document.querySelector(".chair_pattern");
	var pattern_value = document.querySelector(".chair_pattern.value");
	var transport = document.getElementById("transport");
	var chair_transport = document.querySelector(".chair_transport");
	var transport_value = document.querySelector(".chair_transport.value");
	console.log(transport_value);
	
	for (var i = 0; i < types.length; i++) {		
		types[i].addEventListener("click", function(e){
			for (var j = 0; j < types.length; j++) {
				types[j].classList.remove('selected');
			}
			
			e.preventDefault();
			this.classList.add('selected');
			
			type_name.innerText = this.innerText;
			
			var colorsSpan = document.querySelector('.list_arrow_down.colors');
			if (colorsSpan.classList.contains('disabled')) {
				colorsSpan.classList.remove('disabled');
			}
			updatePrice();
		});
	}
	
	for (var i = 0; i < colors.length; i++) {
		colors[i].addEventListener("click", function(e){
			for (var j = 0; j < colors.length; j++) {
				colors[j].classList.remove('selected');
			}
			
			e.preventDefault();
			this.classList.add('selected');
			
			chair_color.innerText = this.innerText;
			color_value.innerText = parseInt(this.attributes['data-price'].value);
			
			var fabricSpan = document.querySelector('.list_arrow_down.fabric');
			if (fabricSpan.classList.contains('disabled')) {
				fabricSpan.classList.remove('disabled');
			}
			
			var price = parseInt(this.attributes['data-price'].value);
			totalPrice = price;
			
			updatePrice();
		});
	}
	
	for (var i = 0; i < fabric.length; i++) {
		fabric[i].addEventListener("click", function(e){
			for (var j = 0; j < fabric.length; j++) {
				fabric[j].classList.remove('selected');
			}
			
			e.preventDefault();
			this.classList.add('selected');
			
			chair_pattern.innerText = this.innerText;
			pattern_value.innerText = parseInt(this.attributes['data-price'].value);
			
			var price = parseInt(this.attributes['data-price'].value);
			totalPrice = price;
			
			updatePrice();
		});
	}
	
	transport.addEventListener("change", function(e){
		chair_transport.innerText = "Transport";
		transport_value.innerText = "TAK";
		
		if(transport.checked === true){
			transport_value.innerText = "TAK";
		}
		else{
			transport_value.innerText = "NIE";
		}
	});
	
	
	
}); 