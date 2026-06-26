import { join } from "path";

// --- Configuration ---
const EXCLUDE_FOLDERS = [
  "column-resizing", 
  "kitchen-sink", 
  "archive", 
  "with-tanstack-form", 
  "with-tanstack-query", 
  "with-tanstack-router", 
  "column-groups",
  "node_modules"
];

async function run() {
  console.log("🚀 Starting bulk Bun installation in the same folder...");
  console.log("------------------------------------");

  try {
    const currentDir = process.cwd();
    
    // Bun's native fast directory scanner
    const glob = new Bun.Glob("*/");
    
    for await (const matchedPath of glob.scan({ cwd: currentDir, onlyFiles: false })) {
      // Clean trailing slash from the glob result
      const folderName = matchedPath.replace(/\/$/, "");
      
      if (EXCLUDE_FOLDERS.includes(folderName)) {
        console.log(`⏭️  Skipping excluded folder: ${folderName}`);
        continue;
      }

      const targetDir = join(currentDir, folderName);
      console.log(`📦 Installing packages in: ${folderName}...`);

      // Spawn commands using bun's native's API
      await Bun.spawn(["bun", "install"], {
        cwd: targetDir,
        stdout: "inherit", 
        stderr: "inherit",
      }).exited;
      // await Bun.spawn(["bun", "update"], {
      //   cwd: targetDir,
      //   stdout: "inherit", 
      //   stderr: "inherit",
      // }).exited;

      console.log("------------------------------------");
    }

    console.log("✅ Done! All non-excluded folders processed.");
  } catch (error) {
    console.error("❌ An error occurred during execution:", error);
  }
}

run();