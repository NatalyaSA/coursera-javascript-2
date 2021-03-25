module.exports = Collection;

/**
 * Конструктор коллекции
 * @constructor
 */
function Collection() {
	Object.defineProperty(this, "_array", {
		enumerable: false,
		writable: true,
		value: []
	});
}


// Методы коллекции
Collection.prototype.values = function () {
	return this._array;
};
// другие методы
Collection.prototype.append = function (val) {
	if (val instanceof Collection) {
		this._array = this._array.concat(val.values());
	}
	else {
		this._array.push(val);
	}
};

Collection.prototype.at = function (number) {
	return (number > 0 && number <= this._array.length) ?
		this._array[number - 1] :
		null;
};

Collection.prototype.removeAt = function (number) {
	if (number > 0 && number <= this._array.length) {
		this._array.splice(number - 1, 1);
		return true;
	}
	else {
		return false;
	}
};

Collection.prototype.count = function () {
	return this._array.length;
};


/**
 * Создание коллекции из массива значений
 */
Collection.from = function (array) {
	// var collection = new Collection();
	// collection._array = array;
	// return collection;
	return Object.create(new Collection, {
		_array: { value: array}
	});
};