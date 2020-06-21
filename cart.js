	//const orderItems = [];
	const items = {};

$('.waren button').click(function () {
	let p = $(this).parent().find('p');
	items['name'] = p.eq(0).text();
	items['price'] = p.eq(1).text();
	//orderItems.push(items);
	shoppingCard(items);
	//console.log(...orderItems);
});

function shoppingCard (items) {
	let div = $('<div>').addClass('cardItems').appendTo($('.cart'));

	let price = parseFloat(items['price'].split(/[^0-9]+/).join('.').slice(1));
	let tax = price * 0.1;
	let totalPrice = tax + price;

	div.append($('<p>').html(items['name']));
	div.append($('<p>').html('Subtotal price: ' + items['price']));
	div.append($('<p>').html('Tax: $' + tax.toFixed(2)));
	div.append($('<p>').html('Total price: $' + totalPrice.toFixed(2)));
}
