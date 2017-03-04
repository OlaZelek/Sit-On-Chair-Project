document.addEventListener("DOMContentLoaded", function(){
	
	//rozwijane podmenu:
	
	var menu = document.querySelector(".menu");  
	
	var submenu = document.querySelector(".submenu");
	
	submenu.style.display = "none";
	
	var ofirmie = menu.firstElementChild;
	console.log(ofirmie);
	
	ofirmie.addEventListener("mouseover", function(){
		submenu.style.display = "block";
	});
	
	ofirmie.addEventListener("mouseout", function(){
		submenu.style.display = "none";
	});
	
	
	//znikający opis z obrazka:
	
	var clair = document.querySelector(".Clair");
	console.log(clair);
	var margarita = document.querySelector(".Margarita");
	console.log(margarita);
	
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
	
	
	var updatePrice = function() {
		var totalPrice = 0;
		
		var selectedRodzaj = document.querySelector('.list_panel.rodzaj a.selected');
		var selectedKolor = document.querySelector('.list_panel.colors a.selected');
		var selectedMaterial = document.querySelector('.list_panel.materials a.selected');
		
		totalPrice += parseInt(selectedRodzaj.attributes['data-price'].value);
		
		// jeśli kolor nie został jeszcze wybrany, to zmienna selctedKolor ma wartość null
		if(selectedKolor !== null){
			totalPrice += parseInt(selectedKolor.attributes['data-price'].value);	
		}
		
		if(selectedMaterial !== null){
			totalPrice += parseInt(selectedMaterial.attributes['data-price'].value);	
		}
		
		document.querySelector('.sum strong').innerHTML = totalPrice + ' zł';
	};
	
	
	var rodzaje = document.querySelectorAll('.list_panel.rodzaj a');
	
	var kolory = document.querySelectorAll('.list_panel.colors a');
	
	var materialy = document.querySelectorAll('.list_panel.materials a');
	
	var nazwa = document.querySelector(".nazwa");
	var chair_color = document.querySelector(".chair_color");
	var color_value = document.querySelector(".chair_color.value");
	var chair_pattern = document.querySelector(".chair_pattern");
	var pattern_value = document.querySelector(".chair_pattern.value");
	var transport = document.getElementById("transport");
	var chair_transport = document.querySelector(".chair_transport");
	var transport_value = document.querySelector(".chair_transport.value");
	console.log(transport_value);
	
	for (var i = 0; i < rodzaje.length; i++) {		
		rodzaje[i].addEventListener("click", function(e){
			for (var j = 0; j < rodzaje.length; j++) {
				rodzaje[j].classList.remove('selected');
			}
			
			e.preventDefault();
			this.classList.add('selected');
			
			nazwa.innerHTML = this.innerText;
			
			var colorsSpan = document.querySelector('.list_arrow_down.colors');
			if (colorsSpan.classList.contains('disabled')) {
				colorsSpan.classList.remove('disabled');
			}
			updatePrice();
		});
	}
	
	for (var i = 0; i < kolory.length; i++) {
		kolory[i].addEventListener("click", function(e){
			for (var j = 0; j < kolory.length; j++) {
				kolory[j].classList.remove('selected');
			}
			
			e.preventDefault();
			this.classList.add('selected');
			
			chair_color.innerHTML = this.innerText;
			color_value.innerHTML = parseInt(this.attributes['data-price'].value);
			
			var materialsSpan = document.querySelector('.list_arrow_down.materials');
			if (materialsSpan.classList.contains('disabled')) {
				materialsSpan.classList.remove('disabled');
			}
			
			var price = parseInt(this.attributes['data-price'].value);
			totalPrice = price;
			
			updatePrice();
		});
	}
	
	for (var i = 0; i < materialy.length; i++) {
		materialy[i].addEventListener("click", function(e){
			for (var j = 0; j < materialy.length; j++) {
				materialy[j].classList.remove('selected');
			}
			
			e.preventDefault();
			this.classList.add('selected');
			
			chair_pattern.innerHTML = this.innerText;
			pattern_value.innerHTML = parseInt(this.attributes['data-price'].value);
			
			var price = parseInt(this.attributes['data-price'].value);
			totalPrice = price;
			
			updatePrice();
		});
	}
	
	transport.addEventListener("change", function(e){
		chair_transport.innerHTML = "Transport";
		transport_value.innerHTML = "TAK";
		
		if(transport.checked === true){
			transport_value.innerHTML = "TAK";
		}
		else{
			transport_value.innerHTML = "NIE";
		}
	});
	
	
	
}); 