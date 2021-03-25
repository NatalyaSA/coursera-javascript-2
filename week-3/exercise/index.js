/**
 * @param {Function[]} operations
 * @param {Function} callback
 */
module.exports = function (operations, callback) {
	var promises = operations.map(function (func) {
		return new Promise(function (resolve, reject) {
			var next = function (err, data) {
				err ? reject(err) : resolve(data);
			};
			func(next);
		});
	});
	Promise.all(promises).then(
		function (data) { callback(null, data); },
		function (err) { callback(err); }
		);
};

////////////////////////////////////////////////////////////////////
// CALLBACK VER.
////////////////////////////////////////////////////////////////////
// /**
//  * @param {Function[]} operations
//  * @param {Function} callback
//  */
// module.exports = function (operations, callback) {
// 	var result = {};
// 	var isErr = false;

// 	function createNext (num) {
// 		return function (err, data) {
// 			if (!isErr) {
// 				if (err) {
// 					isErr = true;
// 					callback(err);
// 				}
// 				else {
// 					result[num] = data;
// 					if (Object.keys(result).length === operations.length) {
// 						callback(null, getData(result));
// 					}
// 				}
// 			}
// 		}
// 	}

// 	function getData (obj) {
// 		var keys = Object.keys(obj).sort();
// 		return res = keys.reduce(function (acc, key) {
// 			return acc.concat(obj[key]);
// 		}, []);
// 	}

// 	operations.forEach(function (func, ind) {
// 		var next = createNext(ind);
// 		func(next);
// 	});
// };