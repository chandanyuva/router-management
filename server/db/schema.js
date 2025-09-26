const db = require("./pool.js");

db.serialize(() => {
	db.run(`CREATE TABLE IF NOT EXISTS routers (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			ssid TEXT NOT NULL,
			password TEXT NOT NULL
		)`, (err) => {
		if (err) console.error("Error creating table:", err.message);
		else console.log("Routers table created.");
	});
	db.run(`CREATE TABLE IF NOT EXISTS routers2 (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			name TEXT NOT NULL,
			ssid TEXT NOT NULL,
			password TEXT NOT NULL
		)`, (err) => {
		if (err) console.error("Error creating table:", err.message);
		else console.log("Routers table created.");
	});

});

db.close();
