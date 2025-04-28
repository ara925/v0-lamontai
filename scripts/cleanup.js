const fs = require("fs")
const path = require("path")

console.log("Starting cleanup...")

// Remove problematic files
const filesToRemove = ["pnpm-lock.yaml", ".yarnrc.yml", "yarn.lock", "package-lock.json"]

filesToRemove.forEach((file) => {
  const filePath = path.join(process.cwd(), file)
  if (fs.existsSync(filePath)) {
    try {
      fs.unlinkSync(filePath)
      console.log(`Removed ${file}`)
    } catch (error) {
      console.error(`Error removing ${file}:`, error.message)
    }
  } else {
    console.log(`${file} not found, skipping`)
  }
})

console.log("Cleanup completed")
