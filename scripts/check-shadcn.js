const fs = require("fs")
const path = require("path")

console.log("=== CHECKING FOR SHADCN-UI COMPONENTS ===")

// Function to recursively search for files
function findFiles(dir, pattern, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    // Skip node_modules and .next
    if (entry.name === "node_modules" || entry.name === ".next") continue

    if (entry.isDirectory()) {
      findFiles(fullPath, pattern, fileList)
    } else if (pattern.test(entry.name)) {
      fileList.push(fullPath)
    }
  }

  return fileList
}

// Look for shadcn-ui component files
const componentFiles = findFiles(process.cwd(), /\.(tsx|jsx|ts|js)$/)
const shadcnImports = []

componentFiles.forEach((file) => {
  try {
    const content = fs.readFileSync(file, "utf8")
    const lines = content.split("\n")

    lines.forEach((line, index) => {
      // Check for shadcn-ui imports or @ui imports
      if ((line.includes("@/components/ui") || line.includes("@ui/")) && line.includes("import")) {
        shadcnImports.push({
          file: path.relative(process.cwd(), file),
          line: index + 1,
          content: line.trim(),
        })
      }
    })
  } catch (error) {
    console.error(`Error reading file ${file}:`, error.message)
  }
})

if (shadcnImports.length > 0) {
  console.log(`Found ${shadcnImports.length} shadcn-ui component imports:`)
  shadcnImports.forEach(({ file, line, content }) => {
    console.log(`${file}:${line} - ${content}`)
  })

  console.log("\nShadcn-ui components often use workspace: protocol in their dependencies.")
  console.log("Check if you have a components/ui directory with shadcn components.")
} else {
  console.log("No shadcn-ui component imports found.")
}

// Check for components/ui directory
const uiComponentsDir = path.join(process.cwd(), "components", "ui")
if (fs.existsSync(uiComponentsDir)) {
  console.log("\nFound components/ui directory. Checking for shadcn components...")

  const uiComponentFiles = fs.readdirSync(uiComponentsDir)
  console.log(`Found ${uiComponentFiles.length} files in components/ui:`)
  console.log(uiComponentFiles.join(", "))

  // Check for package.json in components/ui
  const uiPackageJsonPath = path.join(uiComponentsDir, "package.json")
  if (fs.existsSync(uiPackageJsonPath)) {
    console.log("⚠️ Found package.json in components/ui directory!")
    try {
      const packageJson = JSON.parse(fs.readFileSync(uiPackageJsonPath, "utf8"))
      console.log("Dependencies:", Object.keys(packageJson.dependencies || {}))
    } catch (error) {
      console.error("Error parsing components/ui/package.json:", error.message)
    }
  }
} else {
  console.log("\nNo components/ui directory found.")
}

console.log("\n=== SHADCN-UI CHECK COMPLETE ===")
