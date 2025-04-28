const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

console.log("=== DEPENDENCY DIAGNOSIS TOOL ===")
console.log("Node version:", process.version)
console.log("Platform:", process.platform)

// Function to safely parse JSON
function safeJsonParse(content) {
  try {
    return JSON.parse(content)
  } catch (error) {
    console.error("Error parsing JSON:", error.message)
    return null
  }
}

// Check main package.json
console.log("\n=== CHECKING MAIN PACKAGE.JSON ===")
try {
  const packageJsonPath = path.join(process.cwd(), "package.json")
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = safeJsonParse(fs.readFileSync(packageJsonPath, "utf8"))
    if (packageJson) {
      console.log("Package name:", packageJson.name)
      console.log("Dependencies count:", Object.keys(packageJson.dependencies || {}).length)
      console.log("DevDependencies count:", Object.keys(packageJson.devDependencies || {}).length)

      // Check for workspace references in dependencies
      let hasWorkspaceRefs = false
      Object.entries(packageJson.dependencies || {}).forEach(([dep, version]) => {
        if (typeof version === "string" && version.includes("workspace:")) {
          console.log(`⚠️ Workspace reference found in dependencies: ${dep}@${version}`)
          hasWorkspaceRefs = true
        }
      })

      // Check for workspace references in devDependencies
      Object.entries(packageJson.devDependencies || {}).forEach(([dep, version]) => {
        if (typeof version === "string" && version.includes("workspace:")) {
          console.log(`⚠️ Workspace reference found in devDependencies: ${dep}@${version}`)
          hasWorkspaceRefs = true
        }
      })

      if (!hasWorkspaceRefs) {
        console.log("✅ No workspace references found in main package.json")
      }
    }
  } else {
    console.log("❌ package.json not found in current directory")
  }
} catch (error) {
  console.error("Error checking package.json:", error)
}

// Check for lock files
console.log("\n=== CHECKING LOCK FILES ===")
const lockFiles = ["package-lock.json", "yarn.lock", "pnpm-lock.yaml"]
lockFiles.forEach((lockFile) => {
  const lockFilePath = path.join(process.cwd(), lockFile)
  if (fs.existsSync(lockFilePath)) {
    console.log(`⚠️ Found lock file: ${lockFile}`)

    // If it's package-lock.json, check for workspace references
    if (lockFile === "package-lock.json") {
      try {
        const lockFileContent = fs.readFileSync(lockFilePath, "utf8")
        if (lockFileContent.includes("workspace:")) {
          console.log(`⚠️ Workspace references found in ${lockFile}`)
        }
      } catch (error) {
        console.error(`Error reading ${lockFile}:`, error.message)
      }
    }
  } else {
    console.log(`✅ No ${lockFile} found`)
  }
})

// Check for workspace configuration
console.log("\n=== CHECKING WORKSPACE CONFIGURATION ===")
const workspaceConfigFiles = [".yarnrc.yml", "pnpm-workspace.yaml", "lerna.json"]
workspaceConfigFiles.forEach((configFile) => {
  const configFilePath = path.join(process.cwd(), configFile)
  if (fs.existsSync(configFilePath)) {
    console.log(`⚠️ Found workspace config file: ${configFile}`)
    try {
      const content = fs.readFileSync(configFilePath, "utf8")
      console.log(`Content preview: ${content.substring(0, 100)}...`)
    } catch (error) {
      console.error(`Error reading ${configFile}:`, error.message)
    }
  } else {
    console.log(`✅ No ${configFile} found`)
  }
})

// Check for nested package.json files
console.log("\n=== CHECKING FOR NESTED PACKAGE.JSON FILES ===")
function findNestedPackageJsonFiles(dir, depth = 0, maxDepth = 3) {
  if (depth > maxDepth) return []

  let results = []
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      // Skip node_modules
      if (entry.name === "node_modules") continue

      if (entry.isDirectory()) {
        results = results.concat(findNestedPackageJsonFiles(fullPath, depth + 1, maxDepth))
      } else if (entry.name === "package.json" && fullPath !== path.join(process.cwd(), "package.json")) {
        results.push(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message)
  }

  return results
}

const nestedPackageJsonFiles = findNestedPackageJsonFiles(process.cwd())
if (nestedPackageJsonFiles.length > 0) {
  console.log(`Found ${nestedPackageJsonFiles.length} nested package.json files:`)

  nestedPackageJsonFiles.forEach((filePath) => {
    console.log(`\nExamining: ${filePath}`)
    try {
      const packageJson = safeJsonParse(fs.readFileSync(filePath, "utf8"))
      if (packageJson) {
        console.log(`Package name: ${packageJson.name || "unnamed"}`)

        // Check for workspace references
        let hasWorkspaceRefs = false
        Object.entries(packageJson.dependencies || {}).forEach(([dep, version]) => {
          if (typeof version === "string" && version.includes("workspace:")) {
            console.log(`⚠️ Workspace reference found in dependencies: ${dep}@${version}`)
            hasWorkspaceRefs = true
          }
        })

        Object.entries(packageJson.devDependencies || {}).forEach(([dep, version]) => {
          if (typeof version === "string" && version.includes("workspace:")) {
            console.log(`⚠️ Workspace reference found in devDependencies: ${dep}@${version}`)
            hasWorkspaceRefs = true
          }
        })

        if (!hasWorkspaceRefs) {
          console.log("✅ No workspace references found in this file")
        }
      }
    } catch (error) {
      console.error(`Error examining ${filePath}:`, error.message)
    }
  })
} else {
  console.log("✅ No nested package.json files found")
}

// List installed packages that might use workspace protocol
console.log("\n=== CHECKING FOR COMMON PROBLEMATIC PACKAGES ===")
const problematicPackages = [
  "@tailwindcss/typography",
  "shadcn-ui",
  "@radix-ui/react-icons",
  "@radix-ui/themes",
  "tailwindcss-animate",
]

problematicPackages.forEach((pkg) => {
  try {
    const packageJsonPath = path.join(process.cwd(), "node_modules", pkg, "package.json")
    if (fs.existsSync(packageJsonPath)) {
      console.log(`Found potentially problematic package: ${pkg}`)
      const packageJson = safeJsonParse(fs.readFileSync(packageJsonPath, "utf8"))
      if (packageJson && packageJson.dependencies) {
        Object.entries(packageJson.dependencies).forEach(([dep, version]) => {
          if (typeof version === "string" && version.includes("workspace:")) {
            console.log(`⚠️ Workspace reference found in ${pkg}'s dependencies: ${dep}@${version}`)
          }
        })
      }
    }
  } catch (error) {
    // Ignore errors for packages that don't exist
  }
})

console.log("\n=== DIAGNOSIS COMPLETE ===")
