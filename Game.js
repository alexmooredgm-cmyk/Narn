/**
 * NARN - Core Engine
 * Collaboration: Gemini (Chaos/Procedural), Clyde (Logic), Meta (UI), DeepSeek (Opt)
 */

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// --- GAME STATE ---
const Narn = {
    width: 800,
    height: 600,
    gravity: 0.5,
    entities: [],
    npcs: [],
    seed: Math.random(),
    isDarknessRising: false
};

// --- THE 8 NPCS (Ready for Clyde's Logic) ---
const npcNames = ["Seeker", "Shadow", "Light", "Trickster", "Builder", "Dreamer", "Warrior", "Ghost"];

function initNPCs() {
    npcNames.forEach((name, i) => {
        Narn.npcs.push({
            name: name,
            x: 100 + (i * 80),
            y: 500,
            width: 32,
            height: 32,
            color: i % 2 === 0 ? "#1a1a1a" : "#0d0d0d", // Dark palette
            whisper: "" // For Kimiko's dialogue
        });
    });
}

// --- GEMINI'S PROCEDURAL FOREST ---
function generateForest() {
    Narn.entities = [];
    // Generate 50 "Static" environmental pieces
    for (let i = 0; i < 50; i++) {
        const x = Math.sin(Narn.seed + i) * 2000; // Spread across a wide "world"
        const type = Math.random() > 0.8 ? 'Rune' : 'DeadTree';
        
        Narn.entities.push({
            x: x % 1600, // Loop the forest
            y: 400 + (Math.random() * 100),
            type: type,
            pulse: Math.random() * Math.PI
        });
    }
}

// --- RENDERING ---
function draw() {
    // 1. Clear & Background (Dark Eerie Blue-Black)
    ctx.fillStyle = "#020205";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw Procedural Forest
    Narn.entities.forEach(ent => {
        if (ent.type === 'Rune') {
            const glow = Math.sin(Date.now() / 1000 + ent.pulse) * 5;
            ctx.fillStyle = `rgba(100, 0, 0, ${0.3 + (glow/10)})`; // Faint red glow
            ctx.fillRect(ent.x, ent.y, 10, 10);
        } else {
            ctx.fillStyle = "#0a0a0a"; // Dead Tree silhouette
            ctx.fillRect(ent.x, ent.y - 100, 5, 100);
        }
    });

    // 3. Draw NPCs (Placeholders for ChatGPT's Sprites)
    Narn.npcs.forEach(npc => {
        ctx.fillStyle = npc.color;
        ctx.fillRect(npc.x, npc.y, npc.width, npc.height);
        
        // Shadow effect under feet
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.ellipse(npc.x + 16, npc.y + 32, 15, 5, 0, 0, Math.PI * 2);
        ctx.fill();
    });

    // 4. UI Overlay (Meta's Territory)
    ctx.font = "12px monospace";
    ctx.fillStyle = "#444";
    ctx.fillText("NARN v0.0.1 - THE FOREST WATCHES", 20, 30);
}

// --- THE HEARTBEAT ---
function gameLoop() {
    // Update logic would go here (Clyde's movement, DeepSeek's cleanup)
    draw();
    requestAnimationFrame(gameLoop);
}

// Start Narn
initNPCs();
generateForest();
gameLoop();
