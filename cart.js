	let orderItems = [];//all goods in a shopping card
	const items = {};//item from a product card
	$('.cart').append($('<div>').addClass('cart-items'));

//get name and price from a shopping card
$('.waren button').click(function () {
	let p = $(this).siblings('p');
	items['name'] = p.eq(0).text();
	items['price'] = p.eq(1).text();
	orderItems.push(items);//add to all goods array
	shoppingCard(items);//transfer dara to shopping card
});

function shoppingCard (items) {
	//add bootstrap 4 card
	//<div> class = 'card' append
	//<div> class = 'card-body' append
	//<h5> class = 'card-title' and
	//<p> class = 'card-text' and
	//<a> class = 'btn btn-danger' with html text
	$('.cart-items')
		.append($('<div>').addClass('card')
		.append($('<div>').addClass('card-body')
		.append($('<h5>').addClass('card-title'), 
				$('<p>').addClass('card-text'), 
				$('<a>').addClass('btn btn-danger').html('Delete item'))));

	//transfer values from string to float number:
	//first remove '$' symbol from '$10.99' and
	//then transfer result to the float
	let price = parseFloat(items['price'].slice(1));
	let tax = price * 0.1;
	let totalPrice = tax + price;

	//add item's name to the card-title class
	//add price, tax and total price to the card-text
	$('.card-title').html(items['name']);
	$('.card-text')
		.html('Subtotal price: $' + price + 
			'<br> Tax: $' + tax.toFixed(2) + 
			'<br> Total price: $' + totalPrice.toFixed(2));

	//when button 'Delete item' class .btn-danger clicked
	//remove this item
	$('.btn-danger').click(function () {
		let indexOfElement = $('.card').index($(this).closest('.card'))
		if (indexOfElement >= 0) orderItems.splice(indexOfElement, 1);
		$(this).closest('.card').remove();
	});
}

//to make a form for the user 
//to enter their Shipping Information
function shippingInformation () {
	//no scrolling background
	$('body').addClass('activ');
	//add shipping info block
	$('.main')
		.append($('<div>')
		.addClass('container shipping-info'));
	//add input form for shipping info
	$('<div>')
		.addClass('input-form')
		.appendTo('.shipping-info');
	//add label & input for name
	$('.input-form')
		.append($('<label [for="name-input" class="input-label"]>')
		.text('Input name'), $('<input [ type="text" class="form-control" id="name-input" placeholder="Name" ]>'));
	//add label & input for email
	$('.input-form')
		.append($('<label [for="form-control" class="input-label"]>')
		.text('Email address'), $('<input [type="email" class="form-control" id="form-control" placeholder="name@example"]>'));
	//add submit button
	$('.input-form')
		.append($('<button [type="button" class="btn btn-secondary input-form__button"]>')
		.text('Submit'));


	let nameSubmit;//for name from input
	let emailSubmit;//for email from input
	//add event listener to the name input form
	$('#name-input').change(function(){
		nameSubmit = $('#name-input').val();
	});
	//add event listener to the email input form
	$('#form-control').change(function(){
		emailSubmit = $('#form-control').val();
	});

	
	//add event listener for submit button
	$('.input-form__button').click(() => {
		//check whether the input data is correct
		if (inputCorrect(nameSubmit, emailSubmit)) {
			//run submit button function
			submitItems(nameSubmit, emailSubmit)
		} else {
			alert('Incorrect input of name or email!');
		}
	});
}

//check whether the input data is correct
function inputCorrect(nameSubmit, emailSubmit) {
	//whether input no empty
	if(!nameSubmit || !emailSubmit) return false;

	//check whether the name is correct
	for (let ch of nameSubmit)
		if(!ch.match(/[a-zA-Z ]/))
			return false;

	//check whether the email is correct
	let correctEmailPattern = /[\w\.]{1,}@[\w\.]{1,}\.[\w]{1,}/;
	if (!emailSubmit.match(correctEmailPattern))
		return false;

	return true;
}

//calculates subtotal price of goods
function subtotalPrice(resultItems) {
	return resultItems.reduce((sPrice, els) => 
		sPrice += parseFloat(els['price'].slice(1))
	, 0).toFixed(2);
}

//run when submit button pressed
function submitItems (nameSubmit, emailSubmit) {
	//removes all items from shopping card
	$('.cart-items').empty();
	//makes background scrollable again
	$('body').removeClass('activ');
	//removes a form where the user 
	//entered their Shipping Information
	$('.shipping-info').remove();
	
	//shows name, email, number of goods, subtotal price 
	// and taxes
	alert(`The order has been sent with data: \nName of customer: ${nameSubmit}\nEmail of customer: ${emailSubmit}\nThere are ${orderItems.length} elements in shopping list\nwith subtotal price $${subtotalPrice(orderItems)}\nand total tax $${(subtotalPrice(orderItems) * 0.1).toFixed(2)}\n\nThank you for shopping!`);
	//empty all goods in the shopping card
	orderItems = [];
}

//add event listener for 'Bye'-button on Shopping Cart
$('.col-sm-3 button').click(()=> {
	if(orderItems.length)
		shippingInformation();
	else alert('There is no item in the list!');
});