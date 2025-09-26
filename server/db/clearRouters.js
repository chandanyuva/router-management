const db = require("./pool");

db.serialize(() => {
	// Delete all rows
	db.run("DELETE FROM routers", function(err) {
		if (err) {
			console.error("❌ Error deleting routers:", err.message);
			process.exit(1);
		}
		console.log(`🗑️ Deleted ${this.changes} rows from routers table`);
	});

	// Reset AUTOINCREMENT counter
	db.run("DELETE FROM sqlite_sequence WHERE name = 'routers'", function(err) {
		if (err) {
			// If sqlite_sequence doesn't exist, warn instead of crashing
			if (err.message.includes("no such table")) {
				console.warn("⚠️ sqlite_sequence not found (maybe no AUTOINCREMENT used). Skipping reset.");
			} else {
				console.error("❌ Error resetting ID sequence:", err.message);
				process.exit(1);
			}
		} else {
			console.log("🔄 ID sequence reset successfully");
		}

		// Close DB after all queries finish
		db.close((err) => {
			if (err) {
				console.error("❌ Error closing DB:", err.message);
				process.exit(1);
			}
			console.log("✅ DB connection closed");
			process.exit(0);
		});
	});
});
