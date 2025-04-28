const fs = require("fs")
const path = require("path")
const { execSync } = require("child_process")

console.log("Starting workspace protocol patch...")

// Function to recursively find all package.json files
function findPackageJsonFiles(dir, depth = 0, maxDepth = 5) {
  if (depth > maxDepth) return []

  let results = []
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name)

      // Skip node_modules except for specific packages we want to patch
      if (entry.name === "node_modules") {
        // Only check specific problematic packages in node_modules
        const packagesToCheck = ["tailwindcss-animate", "@radix-ui"]
        for (const pkg of packagesToCheck) {
          const pkgPath = path.join(fullPath, pkg)
          if (fs.existsSync(pkgPath)) {
            const pkgJsonPath = path.join(pkgPath, "package.json")
            if (fs.existsSync(pkgJsonPath)) {
              results.push(pkgJsonPath)
            }
          }
        }
        continue
      }

      if (entry.isDirectory()) {
        results = results.concat(findPackageJsonFiles(fullPath, depth + 1, maxDepth))
      } else if (entry.name === "package.json") {
        results.push(fullPath)
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error.message)
  }

  return results
}

// Function to patch workspace: references in package.json files
function patchPackageJson(filePath) {
  try {
    console.log(`Checking ${filePath}...`)
    const content = fs.readFileSync(filePath, "utf8")
    const packageJson = JSON.parse(content)
    let modified = false

    // Helper function to patch dependencies
    function patchDeps(deps) {
      if (!deps) return false
      let changed = false

      for (const [dep, version] of Object.entries(deps)) {
        if (typeof version === "string" && version.includes("workspace:")) {
          console.log(`Found workspace reference: ${dep}@${version}`)
          // Replace workspace: with a valid version
          deps[dep] = version.replace("workspace:", "").replace("*", "^1.0.0")
          changed = true
          console.log(`Patched to: ${dep}@${deps[dep]}`)
        }
      }

      return changed
    }

    // Patch all dependency types
    modified = patchDeps(packageJson.dependencies) || modified
    modified = patchDeps(packageJson.devDependencies) || modified
    modified = patchDeps(packageJson.peerDependencies) || modified
    modified = patchDeps(packageJson.optionalDependencies) || modified

    if (modified) {
      console.log(`Writing patched package.json to ${filePath}`)
      fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2))
    }

    return modified
  } catch (error) {
    console.error(`Error patching ${filePath}:`, error.message)
    return false
  }
}

// Main execution
try {
  // Find all package.json files
  const packageJsonFiles = findPackageJsonFiles(process.cwd())
  console.log(`Found ${packageJsonFiles.length} package.json files to check`)

  // Patch each file
  let patchedCount = 0
  for (const file of packageJsonFiles) {
    if (patchPackageJson(file)) {
      patchedCount++
    }
  }

  console.log(`Patched ${patchedCount} package.json files`)

  // Special handling for tailwindcss-animate
  const tailwindAnimatePath = path.join(process.cwd(), "node_modules", "tailwindcss-animate")
  if (fs.existsSync(tailwindAnimatePath)) {
    console.log("Found tailwindcss-animate, applying special patch...")
    const pkgJsonPath = path.join(tailwindAnimatePath, "package.json")

    if (fs.existsSync(pkgJsonPath)) {
      try {
        const content = fs.readFileSync(pkgJsonPath, "utf8")
        const packageJson = JSON.parse(content)

        // Remove any workspace references
        if (packageJson.dependencies) {
          Object.keys(packageJson.dependencies).forEach((dep) => {
            const version = packageJson.dependencies[dep]
            if (typeof version === "string" && version.includes("workspace:")) {
              packageJson.dependencies[dep] = "^1.0.0"
            }
          })
        }

        fs.writeFileSync(pkgJsonPath, JSON.stringify(packageJson, null, 2))
        console.log("Successfully patched tailwindcss-animate/package.json")
      } catch (error) {
        console.error("Error patching tailwindcss-animate:", error.message)
      }
    }
  }

  console.log("Workspace protocol patch completed successfully")
} catch (error) {
  console.error("Error during patching:", error)
  process.exit(1)
}
