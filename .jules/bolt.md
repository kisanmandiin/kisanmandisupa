## 2026-05-08 - [Vite Route-Based Code Splitting]
**Learning:** [Vite chunks the main bundle automatically when React.lazy is used for top level routes. However, if Vite is executed without clearing the dist folder, or dist is un-ignored, thousands of lines of build artifacts will pollute the git history.]
**Action:** [Always ensure that output build directories like dist/ are in the .gitignore file when running build verifications to avoid huge unreviewable git diffs.]
