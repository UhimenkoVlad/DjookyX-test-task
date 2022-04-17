let todoList = [];
let input = document.querySelector('.input');
let list = document.querySelector('.list');
let editBut = document.querySelector('.editButton');
let delBut = document.querySelector('.deleteButton');

if (localStorage.getItem('todo')) {
	todoList = JSON.parse(localStorage.getItem('todo'));

	displayMessages();
}

isDisabled(editBut);
isDisabled(delBut);

function addToDoList () {
	let todo = {
		id: 0,
		todo: input.value,
		checked: false,
	};
	if (input.value) todoList.push(todo);
	input.value = '';

	displayMessages();
}

function editItemToDoList () {
	for (elem of todoList) {
		if (elem.checked) {
			let editEl = prompt('Редактирование', elem.todo);
			if (editEl) elem.todo = editEl;
			elem.checked = false;
		}
	}
	editBut.disabled = true;
	delBut.disabled = true;


	displayMessages();
}

function delItemToDoList() {
	for (let i = 0; i < todoList.length; i++) {
		if (todoList[i].checked) {
			todoList.splice(i, 1);
			i--;
		}
	}
	editBut.disabled = true;
	delBut.disabled = true;

	displayMessages();
}

function displayMessages() {
	let displayMessage = '';
	todoList.forEach((elem, index) => {
		elem.id = index;
		let li = `
			<li class='list__item' id="${index}" draggable='true'>
				<div class='flex' id="${index}">
					<input type="checkbox" id="${index}" ${elem.checked ? 'checked' : ''}>
					<label for="${index}" id="${index}">${elem.todo}</label>
				</div>
			</li>
		`;
		displayMessage += li;
	});

	list.innerHTML = displayMessage;
	localStorage.setItem('todo', JSON.stringify(todoList));
}

function isDisabled(button) {
	button.disabled = (function () {
		for (elem of todoList) {
			if (elem.checked) {
				return false;
			}
		}
		return true;
	})();
}

list.addEventListener('change', function(event) {
	let elem = todoList[event.target.id];
	elem.checked = !elem.checked;

	isDisabled(editBut);
	isDisabled(delBut);

	localStorage.setItem('todo', JSON.stringify(todoList));
});

input.addEventListener('keyup', function(event) {
	if(event.which === 13){
  	addToDoList();
  }
})


// drag & drop

let idActiveItemANDidCurrentItem = [];

list.addEventListener('dragstart', function(event) {
	event.target.classList.add('selected');
	idActiveItemANDidCurrentItem = [];
});

list.addEventListener('dragover', (event) => {
	event.preventDefault();
	const activeItem = list.querySelectorAll('.selected')[0];
	const currentItem = event.target.id ?
		document.getElementById(`${event.target.id}`) :
		false;

	const isMobil = currentItem && (activeItem !== currentItem);
	if (!isMobil) return;

	const nextCurrentItem = (activeItem.nextElementSibling === currentItem) ?
		currentItem.nextElementSibling  :
		currentItem;
	list.insertBefore(activeItem, nextCurrentItem);

	const idActiveItem = activeItem.id;
	const idCurrentItem = currentItem.id;
	idActiveItemANDidCurrentItem = [];
	idActiveItemANDidCurrentItem.push(idActiveItem, idCurrentItem);
})

list.addEventListener('dragend', function(event) {
	event.target.classList.remove('selected');

	const idActiveItem = idActiveItemANDidCurrentItem[0];
	const idCurrentItem = idActiveItemANDidCurrentItem[1];
	if (idCurrentItem) {
		const del = todoList[idActiveItem];
		todoList.splice(idActiveItem, 1);
		todoList.splice(idCurrentItem, 0, del);
		displayMessages();
	}
});
