const db = require("./pool");

const NUM_ROUTERS = 100; // Number of routers to generate

db.serialize(() => {
  // Check if table is empty
  db.get("SELECT COUNT(*) AS count FROM routers", (err, row) => {
    if (err) {
      console.error("❌ Error checking routers:", err.message);
      return;
    }

    if (row.count === 0) {
      console.log(`🌱 Seeding ${NUM_ROUTERS} routers...`);
      const stmt = db.prepare("INSERT INTO routers (id, name, ssid, password) VALUES (?, ?, ?, ?)");

      for (let i = 1; i <= NUM_ROUTERS; i++) {
        const router = {
          id: i + 1,
          name: `TP-Link-${i}`,
          ssid: `test-${i}`,
          password: `test-${i}`
        };
        stmt.run(router.id, router.name, router.ssid, router.password);
      }

      stmt.finalize(() => {
        console.log("✅ Seeding completed");
        db.close();
      });
    } else {
      console.log("ℹ️ Routers already seeded");
      db.close();
    }
  });
});
