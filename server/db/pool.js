const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "routers.db");

// Open database (or create if it doesn't exist)
const db = new sqlite3.Database(dbPath, (err) => {
	if (err) {
		console.error("Error opening database:", err.message);
	} else {
		console.log("Connected Successfully to Database.")
	}
});

module.exports = db;
